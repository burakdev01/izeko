import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import RichTextEditor from '@/components/admin/rich-text-editor';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

interface Spotlight {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    image: string;
    active: boolean;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
}

export default function SpotlightEdit({ spotlight }: { spotlight: Spotlight }) {
    // Note: Inertia manual says use _method: 'put' or 'patch' for file uploads in updates
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: spotlight.title,
        description: spotlight.description || '',
        content: spotlight.content || '',
        image: null as File | null,
        active: spotlight.active,
        seo_title: spotlight.seo_title || '',
        seo_description: spotlight.seo_description || '',
        seo_keywords: spotlight.seo_keywords || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.spotlights.update', spotlight.id));
    };

    return (
        <AdminLayout>
            <Head title="Manşet Düzenle" />

            <form onSubmit={submit}>
                <AdminFormHeader
                    title="Manşet Düzenle"
                    description="Manşet detaylarını güncelleyin."
                    submitLabel="Güncelle"
                    cancelHref={route('admin.spotlights.index')}
                    processing={processing}
                />

                <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
                    <div className="space-y-6 md:col-span-2">
                        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
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

                            {/* Content */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Detaylı İçerik
                                </label>
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(content) =>
                                        setData('content', content)
                                    }
                                    placeholder="Manşet detay içeriğini buraya giriniz..."
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.content}
                                    </p>
                                )}
                            </div>

                            {/* SEO Information */}
                            <div className="mt-8 border-t border-gray-100 pt-8">
                                <h3 className="mb-4 text-base font-semibold text-gray-800">
                                    SEO Bilgileri
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            SEO Başlığı:
                                        </label>
                                        <input
                                            type="text"
                                            name="seo_title"
                                            value={data.seo_title}
                                            onChange={(e) =>
                                                setData(
                                                    'seo_title',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Seo Başlığı"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            SEO Açıklaması:
                                        </label>
                                        <textarea
                                            name="seo_description"
                                            rows={2}
                                            value={data.seo_description}
                                            onChange={(e) =>
                                                setData(
                                                    'seo_description',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Seo Açıklaması"
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            SEO Anahtar Kelimeler:
                                        </label>
                                        <textarea
                                            name="seo_keywords"
                                            rows={2}
                                            value={data.seo_keywords}
                                            onChange={(e) =>
                                                setData(
                                                    'seo_keywords',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Anahtar kelimeler (virgül ile ayırın)"
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Active */}
                            <AdminStatusToggle
                                checked={data.active}
                                onChange={(checked) =>
                                    setData('active', checked)
                                }
                            />

                            {/* Image */}
                            <AdminMediaUpload
                                label="Kapak Görseli"
                                name="image"
                                initialPreview={spotlight.image}
                                error={errors.image}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
