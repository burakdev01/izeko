import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import RichTextEditor from '@/components/admin/rich-text-editor';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type Announcement = {
    id?: number;
    title: string;
    content: string;
    image?: string | null;
    active?: boolean;
    seo_title?: string | null;
    seo_description?: string | null;

    seo_url?: string | null;
};

type AnnouncementFormProps = {
    title: string;
    description: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    announcement?: Announcement;
};

export default function AnnouncementForm({
    title,
    description,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/duyurular',
    announcement,
}: AnnouncementFormProps) {
    const [titleValue, setTitleValue] = useState(announcement?.title ?? '');
    const [content, setContent] = useState(announcement?.content ?? '');
    const [active, setActive] = useState(announcement?.active ?? true);
    const [seoTitle, setSeoTitle] = useState(announcement?.seo_title ?? '');
    const [seoDescription, setSeoDescription] = useState(
        announcement?.seo_description ?? '',
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitleValue(newTitle);
    };

    const handleSeoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSeoTitle = e.target.value;
        setSeoTitle(newSeoTitle);
    };

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
                        description={description}
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
                                            Başlık
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={titleValue}
                                            onChange={handleTitleChange}
                                            placeholder="Başlık"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.title}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            İçerik
                                        </label>
                                        <RichTextEditor
                                            value={content}
                                            onChange={setContent}
                                        />
                                        <input
                                            type="hidden"
                                            name="content"
                                            value={content}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.content}
                                        />
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h3 className="mb-4 text-base font-semibold text-gray-800">
                                        SEO Bilgileri
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                SEO Title:
                                            </label>
                                            <input
                                                type="text"
                                                name="seo_title"
                                                value={seoTitle}
                                                onChange={handleSeoTitleChange}
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
                                                message={errors.seo_description}
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
                                    label="Duyuru Görseli"
                                    name="image_file"
                                    initialPreview={announcement?.image ?? null}
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
