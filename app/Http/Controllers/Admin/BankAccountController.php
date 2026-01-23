<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesUploads;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BankAccountController extends Controller
{
    use HandlesUploads;

    public function index()
    {
        $accounts = BankAccount::orderBy('sort_order')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (BankAccount $account) => $this->mapAccount($account));

        return Inertia::render('admin/bank-accounts/index', [
            'accounts' => $accounts,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/bank-accounts/create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateAccount($request);
        $validated['active'] = $request->boolean('active');
        $validated['sort_order'] = (BankAccount::max('sort_order') ?? 0) + 1;

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'bank_accounts',
            'uploads',
        );

        if ($image) {
            $validated['image'] = $image;
        }

        BankAccount::create($validated);

        return redirect()
            ->route('admin.bank-accounts.index')
            ->with('status', 'Banka hesabı eklendi.');
    }

    public function edit(BankAccount $bankAccount)
    {
        return Inertia::render('admin/bank-accounts/edit', [
            'account' => $this->mapAccount($bankAccount),
        ]);
    }

    public function update(Request $request, BankAccount $bankAccount)
    {
        $validated = $this->validateAccount($request, $bankAccount);
        $validated['active'] = $request->boolean('active');

        $image = $this->storePublicImageNameAsWebp(
            $request,
            'image_file',
            'bank_accounts',
            'uploads',
        );

        if ($image) {
            if ($bankAccount->image) {
                Storage::disk('uploads')->delete('bank_accounts/' . $bankAccount->image);
            }
            $validated['image'] = $image;
        } elseif (! $request->filled('image')) {
            $validated['image'] = $bankAccount->image;
        }

        $bankAccount->update($validated);

        return redirect()
            ->route('admin.bank-accounts.index')
            ->with('status', "Banka hesabı güncellendi.");
    }

    public function destroy(BankAccount $bankAccount)
    {
        if ($bankAccount->image) {
            Storage::disk('uploads')->delete('bank_accounts/' . $bankAccount->image);
        }

        $bankAccount->delete();

        return redirect()
            ->route('admin.bank-accounts.index')
            ->with('status', 'Banka hesabı silindi.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:bank_accounts,id'],
        ]);

        foreach ($validated['order'] as $index => $id) {
            BankAccount::whereKey($id)->update(['sort_order' => $index + 1]);
        }

        return redirect()
            ->route('admin.bank-accounts.index')
            ->with('status', "Sıralama güncellendi.");
    }

    private function validateAccount(Request $request, ?BankAccount $account = null): array
    {
        $imageRules = ['nullable', 'string', 'max:255'];
        
        return $request->validate([
            'bank_name' => ['required', 'string', 'max:255'],
            'branch_name' => ['required', 'string', 'max:255'],
            'branch_code' => ['required', 'string', 'max:255'],
            'account_no' => ['required', 'string', 'max:255'],
            'iban' => ['required', 'string', 'max:255'],
            'account_name' => ['required', 'string', 'max:255'],
            'image' => $imageRules,
            'image_file' => ['nullable', 'image', 'max:5120'],
            'active' => ['nullable', 'boolean'],
        ]);
    }

    private function mapAccount(BankAccount $account): array
    {
        return [
            'id' => $account->id,
            'bank_name' => $account->bank_name,
            'branch_name' => $account->branch_name,
            'branch_code' => $account->branch_code,
            'account_no' => $account->account_no,
            'iban' => $account->iban,
            'account_name' => $account->account_name,
            'image' => $account->image ? (
                str_starts_with($account->image, 'http')
                    ? $account->image
                    : config('filesystems.disks.uploads.url') . '/bank_accounts/' . $account->image
            ) : null,
            'active' => $account->active,
            'sort_order' => $account->sort_order,
        ];
    }
}
