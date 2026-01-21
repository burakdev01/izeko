import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { ImagePlus } from 'lucide-react';

export default function SpotlightCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.spotlights.store'));
    };

    return (
        <AdminLayout>
            <Head title="Yeni Manşet Ekle" />

            <form onSubmit={submit} className="mx-auto max-w-3xl">
                <AdminFormHeader
                    title="Yeni Manşet Ekle"
                    backHref={route('admin.spotlights.index')}
                />

                <div className="mt-6 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Başlık
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#da1f25] focus:ring-[#da1f25]"
                            required
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Açıklama (İsteğe Bağlı)
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#da1f25] focus:ring-[#da1f25]"
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label
                            htmlFor="image"
                            className="mb-2 block text-sm font-medium text-gray-900"
                        >
                            Görsel
                        </label>
                        <div className="flex w-full items-center justify-center">
                            <label
                                htmlFor="image-upload"
                                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImagePlus className="mb-4 h-8 w-8 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">
                                            Yüklemek için tıklayın
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF (Max 2MB)
                                    </p>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        {data.image && (
                            <div className="mt-2 text-sm text-gray-500">
                                Seçilen dosya: {data.image.name}
                            </div>
                        )}
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Active */}
                    <div className="flex items-center">
                        <input
                            id="active"
                            type="checkbox"
                            checked={data.active}
                            onChange={(e) =>
                                setData('active', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-[#da1f25] focus:ring-2 focus:ring-[#da1f25]"
                        />
                        <label
                            htmlFor="active"
                            className="ml-2 text-sm font-medium text-gray-900"
                        >
                            Aktif
                        </label>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-[#da1f25] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none disabled:opacity-50"
                        >
                            {processing ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
