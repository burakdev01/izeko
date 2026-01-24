<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
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
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('surname', 'like', "%{$search}%")
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
        $user->load(['address', 'staffDetails', 'userOffices.role']);

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
            'password' => 'nullable|string|min:8', // Make sure to handle hashing if provided

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
        // Strategy: Delete existing and recreate, or sync. Since complex structure, delete & recreate might be easier but less efficient.
        // Let's go with a sync-like approach manually.
        
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

        return redirect()->route('admin.kullanicilar.index')
            ->with('success', 'Kullanıcı ve tüm detayları başarıyla güncellendi.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()
            ->with('success', 'Kullanıcı silindi.');
    }
}
