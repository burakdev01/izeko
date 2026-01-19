import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type Announcement = {
    id?: number;
    title: string;
    content: string;
    image?: string | null;
    active?: boolean;
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

                    <div className="flex flex-col gap-6">
                        <div>
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
                                            onChange={(event) =>
                                                setTitleValue(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Başlık"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                                        <textarea
                                            name="content"
                                            rows={6}
                                            value={content}
                                            onChange={(event) =>
                                                setContent(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Duyuru içeriğini yazın"
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.content}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-6">
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
