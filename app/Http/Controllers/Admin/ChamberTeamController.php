<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\HandlesUploads;
use App\Models\ChamberTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChamberTeamController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $members = ChamberTeam::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (ChamberTeam $member) => $this->mapMember($member));

        return Inertia::render('admin/chamber-teams/index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/chamber-teams/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateMember($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (ChamberTeam::max('sort_order') ?? 0) + 1;

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'chamber_teams',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        ChamberTeam::create($validated);

        return redirect()
            ->route('admin.chamber-teams.index')
            ->with('status', 'Ekip üyesi eklendi.');
    }

    public function edit(ChamberTeam $chamberTeam)
    {
        return Inertia::render('admin/chamber-teams/edit', [
            'member' => $this->mapMember($chamberTeam),
        ]);
    }

    public function update(Request $request, ChamberTeam $chamberTeam)
    {
        $validated = $this->validateMember($request, $chamberTeam);
        $validated['active'] = $request->boolean('active');

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'chamber_teams',
            'uploads',
        );

        if ($image) {
            if ($chamberTeam->image) {
                Storage::disk('uploads')->delete('chamber_teams/' . $chamberTeam->image);
            }
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $chamberTeam->image;
        }

        $chamberTeam->update($validated);

        return redirect()
            ->route('admin.chamber-teams.index')
            ->with('status', 'Ekip üyesi güncellendi.');
    }

    public function destroy(ChamberTeam $chamberTeam)
    {
        if ($chamberTeam->image) {
            Storage::disk('uploads')->delete('chamber_teams/' . $chamberTeam->image);
        }

        $chamberTeam->delete();

        return redirect()
            ->route('admin.chamber-teams.index')
            ->with('status', 'Ekip üyesi silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:chamber_teams,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            ChamberTeam::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.chamber-teams.index')
            ->with('status', 'Sıralama güncellendi.');
    }

    private function validateMember(Request $request, ?ChamberTeam $member = null): array
    {
        $imageRules = ['nullable', 'string', 'max:255'];

        if (! $member || ! $member->image) {
            $imageRules[] = 'required_without:image_file';
        }

        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'active' => ['nullable', 'boolean'],
        ]);
    }

    private function mapMember(ChamberTeam $member): array
    {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'title' => $member->title,
            'image' => $member->image ? (
                str_starts_with($member->image, 'http')
                    ? $member->image
                    : config('filesystems.disks.uploads.url') . '/chamber_teams/' . $member->image
            ) : null,
            'active' => $member->active,
            'sort_order' => $member->sort_order,
        ];
    }
}
