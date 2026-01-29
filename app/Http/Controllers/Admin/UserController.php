<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

use App\Http\Controllers\Concerns\HandlesUploads;

class UserController extends Controller
{
    use HandlesUploads;

    public function index(Request $request)
    {
        $query = User::query()->where('is_admin', false);

        // Filter by status
        if ($request->has('status') && in_array($request->status, ['active', 'pending', 'passive'])) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereRaw('name COLLATE utf8mb4_turkish_ci LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('surname COLLATE utf8mb4_turkish_ci LIKE ?', ["%{$search}%"])
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%");
            });
        }

        $users = $query->orderByDesc('created_at')->get();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(User $user)
    {
        $user->load(['address', 'staffDetails', 'files', 'userOffices.role']);

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        // Load relationships including files
        $user->load(['address', 'staffDetails', 'userOffices.role', 'files']);

        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'offices' => \App\Models\Office::all(),
            'roles' => \App\Models\Role::where('name', '!=', 'Admin')->get(),
            'provinces' => \App\Models\Province::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            // User Info
            'name' => 'required|string|max:255',
            'surname' => 'nullable|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone_number' => 'nullable|string|max:255',
            'status' => 'required|in:active,pending,passive',
            'password' => 'nullable|string|min:8',

            // Address Info (nested in address array)
            'address.province_id' => 'nullable|integer',
            'address.district_id' => 'nullable|integer',
            'address.neighborhood_id' => 'nullable|integer',
            'address.description' => 'nullable|string',

            // Staff Details (nested in staff_details array)
            'staff_details.license_number' => 'nullable|string',
            'staff_details.chamber_registration_number' => 'nullable|string',
            'staff_details.tax_number' => 'nullable|string',
            'staff_details.tax_office' => 'nullable|string',
            'staff_details.national_id_number' => 'nullable|string',
            'staff_details.title' => 'nullable|string',

            // Offices (array of objects with office_id and role_id)
            'offices' => 'nullable|array',
            'offices.*.office_id' => 'required|exists:offices,id',
            'offices.*.role_id' => 'required|exists:roles,id',
            
            // Files
            'oda_yetki_belgesi' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'yetki_belgesi' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'vergi_levhasi' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
        ]);

        // 1. Update User Basic Info
        $userData = collect($validated)->only(['name', 'surname', 'email', 'phone_number', 'status'])->toArray();
        if ($request->filled('password')) {
            $userData['password'] = bcrypt($request->password);
        }
        $user->update($userData);

        // 2. Update/Create Address
        $user->address()->updateOrCreate(
            ['user_id' => $user->id],
            $request->input('address', [])
        );

        // 3. Update/Create Staff Details
        $user->staffDetails()->updateOrCreate(
            ['user_id' => $user->id],
            $request->input('staff_details', [])
        );

        // 4. Sync Customer Offices & Roles
        $submittedOffices = $request->input('offices', []);
        
        // Remove old associations
        $user->userOffices()->delete(); // This deletes UserOffice records. user_office_roles should cascade delete.

        foreach ($submittedOffices as $officeData) {
            $userOffice = $user->userOffices()->create([
                'office_id' => $officeData['office_id'],
            ]);

            $userOffice->userOfficeRole()->create([
                'role_id' => $officeData['role_id'],
            ]);
        }
        
        // 5. Handle File Uploads
        $documentTypes = ['oda_yetki_belgesi', 'yetki_belgesi', 'vergi_levhasi'];
        $directory = "users/{$user->id}/documents";
        $fileNames = [
            'oda_yetki_belgesi' => 'Oda Yetki Belgesi',
            'yetki_belgesi' => 'Yetki Belgesi',
            'vergi_levhasi' => 'Vergi Levhası',
        ];

        foreach ($documentTypes as $type) {
            \Illuminate\Support\Facades\Log::info("Checking file: $type", [
                'hasFile' => $request->hasFile($type),
                'files_keys' => array_keys($request->allFiles()),
                'input_keys' => array_keys($request->all()),
            ]);

            if ($request->hasFile($type)) {
                try {
                    // Upload and convert to WebP using trait
                    $fileName = $this->storePublicImageNameAsWebp($request, $type, $directory);
                    
                    if ($fileName) {
                        $fullPath = $directory . '/' . $fileName;

                        // Check if file of this type already exists
                        $existingFile = $user->files()
                            ->where('file_type', $type)
                            ->first();

                        if ($existingFile) {
                            // Delete physical file
                            // path stored is full url or relative? Controller stores: $directory . '/' . $fileName
                            // storePublicImageNameAsWebp returns filename.
                            // We constructed $fullPath = "users/{$user->id}/documents" . '/' . $fileName; -> relative path for Storage
                            
                            // existingFile->file_path might be stored as relative path based on previous logic "users/.../file.webp"
                            
                            try {
                                if (\Illuminate\Support\Facades\Storage::disk('public')->exists($existingFile->file_path)) {
                                    \Illuminate\Support\Facades\Storage::disk('public')->delete($existingFile->file_path);
                                }
                            } catch (\Exception $e) {
                                \Illuminate\Support\Facades\Log::warning("Could not delete old file: " . $existingFile->file_path);
                            }

                            // Hard delete record
                            $existingFile->delete();
                        }

                        $user->files()->create([
                            'name' => $fileNames[$type] ?? $request->file($type)->getClientOriginalName(),
                            'file_path' => $fullPath,
                            'file_type' => $type,
                            'is_deleted' => false,
                        ]);
                    }
                } catch (\Exception $e) {
                     // Log error but continue? or fail?
                     \Illuminate\Support\Facades\Log::error("Failed to upload $type: " . $e->getMessage());
                     
                     // ADDED: Flash error to user
                     return redirect()->route('admin.kullanicilar.edit', $user->id)
                        ->with('error', "Dosya yüklenirken hata oluştu ($type): " . $e->getMessage());
                }
            }
        }

        return redirect()->route('admin.kullanicilar.edit', $user->id)
            ->with('success', 'Kullanıcı ve belgeleri başarıyla güncellendi.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()
            ->with('success', 'Kullanıcı silindi.');
    }
}
