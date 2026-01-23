<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\BoardMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardMemberController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $members = BoardMember::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (BoardMember $member) => $this->mapMember($member));

        return Inertia::render('admin/board-members/index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/board-members/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateMember($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (BoardMember::max('sort_order') ?? 0) + 1;

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'board_members',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        BoardMember::create($validated);

        return redirect()
            ->route('admin.board-members.index')
            ->with('status', 'Yönetim kurulu üyesi eklendi.');
    }

    public function edit(BoardMember $boardMember)
    {
        return Inertia::render('admin/board-members/edit', [
            'member' => $this->mapMember($boardMember),
        ]);
    }

    public function update(Request $request, BoardMember $boardMember)
    {
        $validated = $this->validateMember($request, $boardMember);
        $validated['active'] = $request->boolean('active');

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'board_members',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $boardMember->image;
        }

        $boardMember->update($validated);

        return redirect()
            ->route('admin.board-members.index')
            ->with('status', "Yönetim kurulu üyesi g\u{00FC}ncellendi.");
    }

    public function destroy(BoardMember $boardMember)
    {
        $boardMember->delete();

        return redirect()
            ->route('admin.board-members.index')
            ->with('status', 'Yönetim kurulu üyesi silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:board_members,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            BoardMember::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.board-members.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    private function validateMember(Request $request, ?BoardMember $member = null): array
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

    private function mapMember(BoardMember $member): array
    {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'title' => $member->title,
            'image' => $member->image ? (
                str_starts_with($member->image, 'http')
                    ? $member->image
                    : config('filesystems.disks.uploads.url') . '/board_members/' . $member->image
            ) : null,
            'active' => $member->active,
            'sort_order' => $member->sort_order,
        ];
    }
}
