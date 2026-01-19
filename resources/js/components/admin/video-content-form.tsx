import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type VideoContent = {
    id?: number;
    title: string;
    video_url: string;
    thumbnail?: string | null;
    active?: boolean;
};

type VideoContentFormProps = {
    title: string;
    description: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    content?: VideoContent;
    showThumbnail?: boolean;
    labels?: {
        title?: string;
        video?: string;
        image?: string;
    };
};

export default function VideoContentForm({
    title,
    description,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin',
    content,
    showThumbnail = true,
    labels,
}: VideoContentFormProps) {
    const [titleValue, setTitleValue] = useState(content?.title ?? '');
    const [videoUrl, setVideoUrl] = useState(content?.video_url ?? '');
    const [active, setActive] = useState(content?.active ?? true);

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
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            {labels?.title ?? 'Başlık'}
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
                                            {labels?.video ?? 'Video URL'}
                                        </label>
                                        <input
                                            type="url"
                                            name="video_url"
                                            value={videoUrl}
                                            onChange={(event) =>
                                                setVideoUrl(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="https://"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.video_url}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-6">
                            {showThumbnail ? (
                                <AdminMediaUpload
                                    label={
                                        labels?.image ??
                                        'Kapak Görseli (Maks. 4MB)'
                                    }
                                    name="thumbnail_file"
                                    initialPreview={content?.thumbnail ?? null}
                                    error={
                                        errors.thumbnail ||
                                        errors.thumbnail_file ||
                                        undefined
                                    }
                                />
                            ) : null}
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
