<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Listing;
use Inertia\Inertia;

class ListingController extends Controller
{
    public function index(Request $request)
    {
        $query = Listing::query();

        if ($request->has('status') && in_array($request->status, ['pending', 'active', 'passive'])) {
            $query->where('status', $request->status);
        }

        $listings = $query->orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('admin/listings/index', [
            'listings' => $listings,
            'filters' => $request->only(['status']),
        ]);
    }

    public function edit(Listing $listing)
    {
        return Inertia::render('admin/listings/edit', [
            'listing' => $listing,
        ]);
    }

    public function update(Request $request, Listing $listing)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'office' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'date' => 'required|date',
            'city' => 'required|string|max:255',
            'status' => 'required|in:pending,active,passive',
        ]);

        $listing->update($validated);

        return redirect()->route('admin.ilanlar.index')
            ->with('success', 'İlan başarıyla güncellendi.');
    }

    public function destroy(Listing $listing)
    {
        $listing->delete();

        return redirect()->back()
            ->with('success', 'İlan başarıyla silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:listings,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            Listing::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.ilanlar.index')
            ->with('status', 'Sıralama güncellendi.');
    }
}
