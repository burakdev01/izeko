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
        $query = User::query();

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'pending' || $request->status === 'passive') {
                $query->where('is_active', false);
            }
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

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'nullable|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone_number' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        $user->update($validated);

        return redirect()->route('admin.kullanicilar.index')
            ->with('success', 'Kullanıcı başarıyla güncellendi.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()
            ->with('success', 'Kullanıcı silindi.');
    }
}
