<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegistrationFee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationFeeController extends Controller
{
    public function index()
    {
        $fees = RegistrationFee::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('admin/registration-fees/index', [
            'fees' => $fees,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/registration-fees/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'newspaper_fee' => ['nullable', 'string', 'max:255'],
            'tax_fee' => ['nullable', 'string', 'max:255'],
            'registration_fee' => ['nullable', 'string', 'max:255'],
            'service_fee' => ['nullable', 'string', 'max:255'],
            'total' => ['nullable', 'string', 'max:255'],
            'active' => ['nullable', 'boolean'],
        ]);

        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (RegistrationFee::max('sort_order') ?? 0) + 1;

        RegistrationFee::create($validated);

        return redirect()
            ->route('admin.registration-fees.index')
            ->with('status', 'Kayıt ücreti eklendi.');
    }

    public function edit(RegistrationFee $registrationFee)
    {
        return Inertia::render('admin/registration-fees/edit', [
            'fee' => $registrationFee,
        ]);
    }

    public function update(Request $request, RegistrationFee $registrationFee)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'newspaper_fee' => ['nullable', 'string', 'max:255'],
            'tax_fee' => ['nullable', 'string', 'max:255'],
            'registration_fee' => ['nullable', 'string', 'max:255'],
            'service_fee' => ['nullable', 'string', 'max:255'],
            'total' => ['nullable', 'string', 'max:255'],
            'active' => ['nullable', 'boolean'],
        ]);

        $validated['active'] = $request->boolean('active');

        $registrationFee->update($validated);

        return redirect()
            ->route('admin.registration-fees.index')
            ->with('status', 'Kayıt ücreti güncellendi.');
    }

    public function destroy(RegistrationFee $registrationFee)
    {
        $registrationFee->delete();

        return redirect()
            ->route('admin.registration-fees.index')
            ->with('status', 'Kayıt ücreti silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:registration_fees,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            RegistrationFee::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.registration-fees.index')
            ->with('status', 'Sıralama güncellendi.');
    }
}
