import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    is_active: boolean;
};

type UserEditProps = {
    user: User;
};

export default function UserEdit({ user }: UserEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        surname: user.surname || '',
        email: user.email,
        phone_number: user.phone_number || '',
        is_active: user.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/kullanicilar/${user.id}`);
    };

    return (
        <AdminLayout title="Kullanıcı Düzenle">
            <Head title="Kullanıcı Düzenle" />

            <form onSubmit={submit} className="space-y-6">
                <AdminFormHeader
                    title="Kullanıcı Düzenle"
                    description="Kullanıcı bilgilerini ve durumunu güncelleyin."
                    submitLabel="Güncelle"
                    cancelHref="/admin/kullanicilar"
                    processing={processing}
                />

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Ad
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Soyad
                            </label>
                            <input
                                type="text"
                                value={data.surname}
                                onChange={(e) =>
                                    setData('surname', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.surname}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                E-posta
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Telefon
                            </label>
                            <input
                                type="text"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData('phone_number', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone_number}
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
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
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
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
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Pasif / Onay Bekliyor
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
