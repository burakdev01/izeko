<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FaqReorderRequest;
use App\Http\Requests\Admin\FaqRequest;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $faqs = Faq::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (Faq $faq) => $this->mapFaq($faq));

        return Inertia::render('admin/sss/index', [
            'faqs' => $faqs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/sss/create');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq): Response
    {
        return Inertia::render('admin/sss/edit', [
            'faq' => $this->mapFaq($faq),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (Faq::max('sort_order') ?? 0) + 1;

        Faq::create($validated);

        return redirect()
            ->route('admin.sss.index')
            ->with('status', 'Soru eklendi.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqRequest $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validated();
        $validated['active'] = $request->boolean('active');

        $faq->update($validated);

        return redirect()
            ->route('admin.sss.index')
            ->with('status', "Soru g\u{00FC}ncellendi.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()
            ->route('admin.sss.index')
            ->with('status', 'Soru silindi.');
    }

    public function reorder(FaqReorderRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        foreach ($validated['order'] as $index => $id) {
            Faq::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.sss.index')
            ->with('status', "S\u{0131}ralama g\u{00FC}ncellendi.");
    }

    /**
     * @return array{
     *     id: int,
     *     question: string,
     *     answer: string,
     *     active: bool,
     *     sort_order: int
     * }
     */
    private function mapFaq(Faq $faq): array
    {
        return [
            'id' => $faq->id,
            'question' => $faq->question,
            'answer' => $faq->answer,
            'active' => $faq->active,
            'sort_order' => $faq->sort_order,
        ];
    }
}
