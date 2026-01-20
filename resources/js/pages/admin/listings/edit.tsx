import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

type Listing = {
    id: number;
    title: string;
    description: string;
    office_id: number;
    user_id: number;
    price: number | string;
    listing_status: 'pending' | 'active' | 'inactive';
};

type ListingEditProps = {
    listing: Listing;
};

export default function ListingEdit({ listing }: ListingEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: listing.title,
        description: listing.description,
        office_id: listing.office_id,
        user_id: listing.user_id,
        price: listing.price,
        listing_status: listing.listing_status,
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

                        <div className="col-span-1 md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Açıklama
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.description}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Ofis ID
                            </label>
                            <input
                                type="number"
                                value={data.office_id}
                                onChange={(e) =>
                                    setData('office_id', Number(e.target.value))
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.office_id}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kullanıcı ID
                            </label>
                            <input
                                type="number"
                                value={data.user_id}
                                onChange={(e) =>
                                    setData('user_id', Number(e.target.value))
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.user_id}
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

                        <div className="col-span-1 md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Durum
                            </label>
                            <div className="flex space-x-4">
                                {(
                                    ['pending', 'active', 'inactive'] as const
                                ).map((status) => (
                                    <label
                                        key={status}
                                        className="flex cursor-pointer items-center space-x-2"
                                    >
                                        <input
                                            type="radio"
                                            name="listing_status"
                                            value={status}
                                            checked={
                                                data.listing_status === status
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'listing_status',
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
                                message={errors.listing_status}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
