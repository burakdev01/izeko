<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\SupervisoryBoardMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SupervisoryBoardMemberController extends Controller
{
    use HandlesUploads;
    public function index()
    {
        $members = SupervisoryBoardMember::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'title' => $member->title,
                'image' => $member->image ? config('filesystems.disks.uploads.url') . '/supervisory_board_members/' . $member->image : null,
                'active' => $member->active,
                'sort_order' => $member->sort_order,
            ]);

        return Inertia::render('admin/supervisory-board/index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/supervisory-board/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'image_file' => ['required', 'image', 'max:2048'], // Required for new members
            'active' => ['boolean'],
        ]);

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'supervisory_board_members',
            'uploads'
        );

        SupervisoryBoardMember::create([
            'name' => $validated['name'],
            'title' => $validated['title'],
            'image' => $image,
            'active' => $validated['active'] ?? true,
            'sort_order' => SupervisoryBoardMember::max('sort_order') + 1,
        ]);

        return redirect()->route('admin.supervisory-board.index')
            ->with('status', 'Denetim kurulu üyesi başarıyla eklendi.');
    }

    public function edit(SupervisoryBoardMember $supervisoryBoardMember)
    {
        return Inertia::render('admin/supervisory-board/edit', [
            'member' => [
                'id' => $supervisoryBoardMember->id,
                'name' => $supervisoryBoardMember->name,
                'title' => $supervisoryBoardMember->title,
                'image' => $supervisoryBoardMember->image ? config('filesystems.disks.uploads.url') . '/supervisory_board_members/' . $supervisoryBoardMember->image : null,
                'active' => $supervisoryBoardMember->active,
            ]
        ]);
    }

    public function update(Request $request, SupervisoryBoardMember $supervisoryBoardMember)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:2048'],
            'active' => ['boolean'],
        ]);

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'supervisory_board_members',
            'uploads'
        );

        if ($image) {
            // Delete old image if exists
            if ($supervisoryBoardMember->image) {
                Storage::disk('uploads')->delete('supervisory_board_members/' . $supervisoryBoardMember->image);
            }
            $supervisoryBoardMember->image = $image;
        }

        $supervisoryBoardMember->name = $validated['name'];
        $supervisoryBoardMember->title = $validated['title'];
        $supervisoryBoardMember->active = $validated['active'] ?? true;
        
        $supervisoryBoardMember->save();

        return redirect()->route('admin.supervisory-board.index')
            ->with('status', 'Denetim kurulu üyesi başarıyla güncellendi.');
    }

    public function destroy(SupervisoryBoardMember $supervisoryBoardMember)
    {
        if ($supervisoryBoardMember->image) {
            Storage::disk('uploads')->delete('supervisory_board_members/' . $supervisoryBoardMember->image);
        }

        $supervisoryBoardMember->delete();

        return redirect()->route('admin.supervisory-board.index')
            ->with('status', 'Denetim kurulu üyesi silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:supervisory_board_members,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            SupervisoryBoardMember::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.supervisory-board.index')
            ->with('status', "Sıralama güncellendi.");
    }
}
