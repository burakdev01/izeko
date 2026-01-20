import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

type Listing = {
    id: number;
    title: string;
    office: string;
    price: number | string;
    date: string;
    city: string;
    status: 'pending' | 'active' | 'passive';
};

type ListingEditProps = {
    listing: Listing;
};

export default function ListingEdit({ listing }: ListingEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: listing.title,
        office: listing.office,
        price: listing.price,
        date: listing.date,
        city: listing.city,
        status: listing.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/ilanlar/${listing.id}`);
    };

    return (
        <AdminLayout title="İlan Düzenle">
            <Head title="İlan Düzenle" />

            <form onSubmit={submit} className="space-y-6">
                <AdminFormHeader
                    title="İlan Düzenle"
                    description="İlan detaylarını güncelleyin."
                    submitLabel="Güncelle"
                    cancelHref="/admin/ilanlar"
                    processing={processing}
                />

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                        <div className="col-span-1 md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                İlan Başlığı
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.title}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Ofis
                            </label>
                            <input
                                type="text"
                                value={data.office}
                                onChange={(e) =>
                                    setData('office', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.office}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Şehir
                            </label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) =>
                                    setData('city', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.city}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Fiyat (TL)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.price}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tarih
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData('date', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.date}
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Durum
                            </label>
                            <div className="flex space-x-4">
                                {(
                                    ['pending', 'active', 'passive'] as const
                                ).map((status) => (
                                    <label
                                        key={status}
                                        className="flex cursor-pointer items-center space-x-2"
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={status}
                                            checked={data.status === status}
                                            onChange={(e) =>
                                                setData(
                                                    'status',
                                                    e.target.value as any,
                                                )
                                            }
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 capitalize">
                                            {status === 'pending'
                                                ? 'Onay Bekliyor'
                                                : status === 'active'
                                                  ? 'Aktif'
                                                  : 'Pasif'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.status}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
