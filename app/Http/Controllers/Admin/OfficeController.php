<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficeController extends Controller
{
    public function index(Request $request)
    {
        $query = Office::query()->with('users'); // Eager load users (owners)

        // Filter by text search (name, address, or user email/name)
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhereHas('users', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'pending') {
                // Assuming 'pending' maps to inactive for now, or specific logic if enum existed
                $query->where('is_active', false);
            }
        }

        $offices = $query->orderByDesc('created_at')->get();

        // Calculate stats
        $stats = [
            'total' => Office::count(),
            'active' => Office::where('is_active', true)->count(),
            'pending' => Office::where('is_active', false)->count(), // Using inactive as pending/suspended placeholder
            'suspended' => 0, // Placeholder as we don't have this status yet
        ];

        return Inertia::render('admin/offices/index', [
            'offices' => $offices,
            'filters' => $request->only(['search', 'status']),
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/offices/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'is_active' => 'boolean',
        ]);

        Office::create($validated);

        return redirect()->route('admin.ofisler.index');
    }

    public function edit(Office $office)
    {
        $office->load('address');
        
        return Inertia::render('admin/offices/edit', [
            'office' => $office,
            'provinces' => Province::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Office $office)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // Allow address to be an array with specific fields
            'address' => 'required|array',
            'address.province_id' => 'required|exists:provinces,id',
            'address.district_id' => 'required|exists:districts,id',
            'address.neighborhood_id' => 'required|exists:neighborhoods,id',
            'address.description' => 'required|string', 
            'is_active' => 'boolean',
        ]);

        $addressData = $validated['address'];

        // Update Office model
        // We populate the legacy 'address' column with the description for backward compatibility
        // and to satisfy the non-null constraint.
        $office->update([
            'name' => $validated['name'],
            'is_active' => $validated['is_active'],
            'address' => $addressData['description'],
        ]);

        // Update or Create the detailed Address record
        $office->address()->updateOrCreate(
            ['office_id' => $office->id],
            [
                'province_id' => $addressData['province_id'],
                'district_id' => $addressData['district_id'],
                'neighborhood_id' => $addressData['neighborhood_id'],
                'description' => $addressData['description'],
            ]
        );

        return redirect()->route('admin.ofisler.index');
    }

    public function destroy(Office $office)
    {
        $office->delete();

        return redirect()->route('admin.ofisler.index');
    }
}
