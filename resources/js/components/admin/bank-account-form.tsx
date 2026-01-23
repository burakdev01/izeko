import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type BankAccount = {
    id?: number;
    bank_name: string;
    branch_name: string;
    branch_code: string;
    account_no: string;
    iban: string;
    account_name: string;
    image?: string | null;
    active?: boolean;
};

type BankAccountFormProps = {
    title: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    account?: BankAccount;
};

export default function BankAccountForm({
    title,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/bank-accounts',
    account,
}: BankAccountFormProps) {
    const [bankName, setBankName] = useState(account?.bank_name ?? '');
    const [branchName, setBranchName] = useState(account?.branch_name ?? '');
    const [branchCode, setBranchCode] = useState(account?.branch_code ?? '');
    const [accountNo, setAccountNo] = useState(account?.account_no ?? '');
    const [iban, setIban] = useState(account?.iban ?? '');
    const [accountName, setAccountName] = useState(
        account?.account_name ?? 'İZMİR EMLAK KOMİSYONCULARI ODASI',
    );
    const [active, setActive] = useState(account?.active ?? true);

    return (
        <Form
            action={action}
            method={method}
            encType="multipart/form-data"
            className="space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <AdminFormHeader
                        title={title}
                        description=""
                        submitLabel={submitLabel}
                        cancelHref={cancelHref}
                        processing={processing}
                    />

                    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="space-y-4 p-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Banka Adı
                                            </label>
                                            <input
                                                type="text"
                                                name="bank_name"
                                                value={bankName}
                                                onChange={(e) =>
                                                    setBankName(e.target.value)
                                                }
                                                placeholder="Örn: Denizbank"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.bank_name}
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Hesap İsmi
                                            </label>
                                            <input
                                                type="text"
                                                name="account_name"
                                                value={accountName}
                                                onChange={(e) =>
                                                    setAccountName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Hesap Adı"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.account_name}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Şube Adı
                                            </label>
                                            <input
                                                type="text"
                                                name="branch_name"
                                                value={branchName}
                                                onChange={(e) =>
                                                    setBranchName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Örn: Şair Eşref Bulvarı Şubesi"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.branch_name}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Şube Kodu
                                            </label>
                                            <input
                                                type="text"
                                                name="branch_code"
                                                value={branchCode}
                                                onChange={(e) =>
                                                    setBranchCode(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Örn: 2860"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.branch_code}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Hesap No
                                            </label>
                                            <input
                                                type="text"
                                                name="account_no"
                                                value={accountNo}
                                                onChange={(e) =>
                                                    setAccountNo(e.target.value)
                                                }
                                                placeholder="Örn: 4555314"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.account_no}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                IBAN
                                            </label>
                                            <input
                                                type="text"
                                                name="iban"
                                                value={iban}
                                                onChange={(e) =>
                                                    setIban(e.target.value)
                                                }
                                                placeholder="TR..."
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.iban}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <AdminStatusToggle
                                    checked={active}
                                    onChange={setActive}
                                />

                                <AdminMediaUpload
                                    label="Banka Logosu"
                                    name="image_file"
                                    initialPreview={account?.image ?? null}
                                    error={
                                        errors.image ||
                                        errors.image_file ||
                                        undefined
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
