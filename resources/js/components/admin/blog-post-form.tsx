import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { slugify } from '@/lib/utils';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type BlogPost = {
    id?: number;
    title: string;
    content: string;
    image?: string | null;
    active?: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_url?: string | null;
};

type BlogPostFormProps = {
    post?: BlogPost;
    title: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
};

const seoBaseUrl = '/haberler/';

export default function BlogPostForm({
    post,
    title,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/haberler',
}: BlogPostFormProps) {
    const [titleValue, setTitleValue] = useState(post?.title ?? '');
    const [content, setContent] = useState(post?.content ?? '');
    const [active, setActive] = useState(post?.active ?? true);
    const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? '');
    const [seoDescription, setSeoDescription] = useState(
        post?.seo_description ?? '',
    );
    const seoUrlValue = slugify(titleValue);
    const previewTitle = seoTitle || titleValue || 'Başlık';
    const previewDescription = seoDescription || content || 'Açıklama';
    const previewSlug = seoUrlValue || 'seo-url';

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
                        description="Blog içeriğini buradan düzenleyebilir veya yeni yazı ekleyebilirsiniz."
                        submitLabel={submitLabel}
                        cancelHref={cancelHref}
                        processing={processing}
                    />

                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="flex flex-col gap-6 p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Başlık:
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={titleValue}
                                                onChange={(event) =>
                                                    setTitleValue(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Başlık"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.title}
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                İçerik:
                                            </label>
                                            <textarea
                                                name="content"
                                                rows={6}
                                                value={content}
                                                onChange={(event) =>
                                                    setContent(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Blog içeriğini yazın"
                                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.content}
                                            />
                                        </div>
                                    </div>

                                    <div className="hidden rounded-2xl bg-gray-50 p-6">
                                        <h3 className="mb-4 text-base font-semibold text-gray-800">
                                            SEO Bilgileri
                                        </h3>

                                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
                                            <p className="text-lg font-medium text-blue-700">
                                                {previewTitle}
                                            </p>
                                            <p className="mt-1 text-sm break-all text-green-600">
                                                {seoBaseUrl}
                                                {previewSlug}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {previewDescription}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    SEO Title:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="seo_title"
                                                    value={seoTitle}
                                                    onChange={(event) =>
                                                        setSeoTitle(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="SEO başlığı"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.seo_title}
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    SEO Description:
                                                </label>
                                                <textarea
                                                    name="seo_description"
                                                    rows={3}
                                                    value={seoDescription}
                                                    onChange={(event) =>
                                                        setSeoDescription(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="SEO açıklaması"
                                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        errors.seo_description
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                                    SEO URL:
                                                </label>
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                                    <input
                                                        type="text"
                                                        value={seoBaseUrl}
                                                        readOnly
                                                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 sm:w-auto"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="seo_url"
                                                        value={seoUrlValue}
                                                        placeholder="seo-url"
                                                        readOnly
                                                        className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.seo_url}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 px-6 py-6 text-xs text-gray-500">
                                    Boş bırakılan alanlar kaydedilmez. SEO
                                    alanları isteğe bağlıdır.
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-6">
                            <AdminMediaUpload
                                label="Kapak Görseli"
                                name="image_file"
                                initialPreview={post?.image ?? null}
                                error={
                                    errors.image ||
                                    errors.image_file ||
                                    undefined
                                }
                            />

                            <AdminStatusToggle
                                checked={active}
                                onChange={setActive}
                            />
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
