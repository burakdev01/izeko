<?php

use App\Models\Faq;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view faq index', function () {
    $admin = createAdminUser();

    Faq::factory()->count(2)->create();

    $this->actingAs($admin)
        ->get(route('admin.sss.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/sss/index')
            ->has('faqs', 2)
        );
});

test('admin can create faq', function () {
    $admin = createAdminUser();

    $this->actingAs($admin)
        ->post(route('admin.sss.store'), [
            'question' => 'Yeni soru?',
            'answer' => 'Yeni cevap.',
            'active' => true,
        ])
        ->assertRedirect(route('admin.sss.index'))
        ->assertSessionHasNoErrors();

    $faq = Faq::query()->first();

    expect($faq)->not->toBeNull();
    expect($faq?->question)->toBe('Yeni soru?');
    expect($faq?->answer)->toBe('Yeni cevap.');
    expect($faq?->active)->toBeTrue();
});

test('admin can update faq', function () {
    $admin = createAdminUser();

    $faq = Faq::factory()->create([
        'active' => true,
    ]);

    $this->actingAs($admin)
        ->put(route('admin.sss.update', $faq), [
            'question' => 'Guncel soru?',
            'answer' => 'Guncel cevap.',
            'active' => false,
        ])
        ->assertRedirect(route('admin.sss.index'))
        ->assertSessionHasNoErrors();

    $faq->refresh();

    expect($faq->question)->toBe('Guncel soru?');
    expect($faq->answer)->toBe('Guncel cevap.');
    expect($faq->active)->toBeFalse();
});

test('admin can delete faq', function () {
    $admin = createAdminUser();

    $faq = Faq::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.sss.destroy', $faq))
        ->assertRedirect(route('admin.sss.index'));

    $this->assertSoftDeleted('faqs', [
        'id' => $faq->id,
    ]);
});

test('admin can reorder faqs', function () {
    $admin = createAdminUser();

    $first = Faq::factory()->create([
        'sort_order' => 1,
    ]);
    $second = Faq::factory()->create([
        'sort_order' => 2,
    ]);

    $this->actingAs($admin)
        ->patch(route('admin.sss.reorder'), [
            'order' => [$second->id, $first->id],
        ])
        ->assertRedirect(route('admin.sss.index'))
        ->assertSessionHasNoErrors();

    expect($first->refresh()->sort_order)->toBe(2);
    expect($second->refresh()->sort_order)->toBe(1);
});

test('faq validation requires question and answer', function (
    array $payload,
    array $errors,
) {
    $admin = createAdminUser();

    $this->actingAs($admin)
        ->post(route('admin.sss.store'), $payload)
        ->assertSessionHasErrors($errors);
})->with([
    'missing question' => [
        [
            'answer' => 'Cevap',
            'active' => true,
        ],
        ['question'],
    ],
    'missing answer' => [
        [
            'question' => 'Soru?',
            'active' => true,
        ],
        ['answer'],
    ],
]);
