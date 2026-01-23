import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type RegistrationFee = {
    id?: number;
    category: string;
    newspaper_fee?: string | null;
    tax_fee?: string | null;
    registration_fee?: string | null;
    service_fee?: string | null;
    total?: string | null;
    active?: boolean;
};

type RegistrationFeeFormProps = {
    title: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    fee?: RegistrationFee;
};

export default function RegistrationFeeForm({
    title,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/registration-fees',
    fee,
}: RegistrationFeeFormProps) {
    const [category, setCategory] = useState(fee?.category ?? '');
    const [newspaperFee, setNewspaperFee] = useState(fee?.newspaper_fee ?? '');
    const [taxFee, setTaxFee] = useState(fee?.tax_fee ?? '');
    const [registrationFee, setRegistrationFee] = useState(
        fee?.registration_fee ?? '',
    );
    const [serviceFee, setServiceFee] = useState(fee?.service_fee ?? '');
    const [total, setTotal] = useState(fee?.total ?? '');
    const [active, setActive] = useState(fee?.active ?? true);

    return (
        <Form action={action} method={method} className="space-y-6">
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
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Kategori / İşlem Adı
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            placeholder="Örn: YENİ KAYIT"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.category}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Gazete Ücreti
                                            </label>
                                            <input
                                                type="text"
                                                name="newspaper_fee"
                                                value={newspaperFee}
                                                onChange={(e) =>
                                                    setNewspaperFee(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Örn: 328,00"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.newspaper_fee}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Maliye
                                            </label>
                                            <input
                                                type="text"
                                                name="tax_fee"
                                                value={taxFee}
                                                onChange={(e) =>
                                                    setTaxFee(e.target.value)
                                                }
                                                placeholder="Örn: 1.858,05"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.tax_fee}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Kayıt Ücreti
                                            </label>
                                            <input
                                                type="text"
                                                name="registration_fee"
                                                value={registrationFee}
                                                onChange={(e) =>
                                                    setRegistrationFee(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Örn: 2.674,00"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={
                                                    errors.registration_fee
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Hizmet Bedeli
                                            </label>
                                            <input
                                                type="text"
                                                name="service_fee"
                                                value={serviceFee}
                                                onChange={(e) =>
                                                    setServiceFee(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Örn: 266,00"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.service_fee}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Toplam
                                        </label>
                                        <input
                                            type="text"
                                            name="total"
                                            value={total}
                                            onChange={(e) =>
                                                setTotal(e.target.value)
                                            }
                                            placeholder="Örn: 6.063,05"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.total}
                                        />
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
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
