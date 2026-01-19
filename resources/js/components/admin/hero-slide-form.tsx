import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type HeroSlide = {
    id?: number;
    title: string;
    subtitle?: string | null;
    image?: string | null;
    video?: string | null;
    poster?: string | null;
};

type HeroSlideFormProps = {
    title: string;
    description: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    slide?: HeroSlide;
};

export default function HeroSlideForm({
    title,
    description,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/hero-slides',
    slide,
}: HeroSlideFormProps) {
    const [titleValue, setTitleValue] = useState(slide?.title ?? '');
    const [subtitle, setSubtitle] = useState(slide?.subtitle ?? '');

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
                                            Alt Başlık
                                        </label>
                                        <input
                                            type="text"
                                            name="subtitle"
                                            value={subtitle}
                                            onChange={(event) =>
                                                setSubtitle(event.target.value)
                                            }
                                            placeholder="Alt başlık"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.subtitle}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Görsel veya video dosyası yükleyin.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-6">
                            <AdminMediaUpload
                                label="Slider Görseli"
                                name="image_file"
                                initialPreview={slide?.image ?? null}
                                removeName="remove_image"
                                error={
                                    errors.image_file ||
                                    undefined
                                }
                            />
                            <AdminMediaUpload
                                label="Slider Videosu"
                                name="video_file"
                                initialPreview={slide?.video ?? null}
                                accept="video/*"
                                previewType="video"
                                ctaLabel="Video Seç"
                                helperText="MP4, WebM veya OGG yükleyebilirsiniz."
                                removeName="remove_video"
                                error={errors.video_file || undefined}
                            />
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
