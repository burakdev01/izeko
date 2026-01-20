import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

export default function OfficeCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        is_active: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/ofisler');
    };

    return (
        <AdminLayout title="Yeni Ofis Ekle">
            <Head title="Yeni Ofis Ekle" />

            <form onSubmit={submit} className="space-y-6">
                <AdminFormHeader
                    title="Yeni Ofis Ekle"
                    description="Sisteme yeni bir ofis kaydedin."
                    submitLabel="Kaydet"
                    cancelHref="/admin/ofisler"
                    processing={processing}
                />

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-6 p-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Ofis Adı
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Adres
                            </label>
                            <textarea
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Durum
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === true}
                                        onChange={() =>
                                            setData('is_active', true)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Aktif
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === false}
                                        onChange={() =>
                                            setData('is_active', false)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Pasif
                                    </span>
                                </label>
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.is_active}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
