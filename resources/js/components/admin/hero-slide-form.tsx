import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';

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
    const { data, setData, post, processing, errors } = useForm({
        _method: method,
        title: slide?.title ?? '',
        subtitle: slide?.subtitle ?? '',
        image_file: null as File | null,
        video_file: null as File | null,
        remove_image: false,
        remove_video: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(action);
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-6"
            encType="multipart/form-data"
        >
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
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
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
                                    Alt Başlık
                                </label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={data.subtitle}
                                    onChange={(e) =>
                                        setData('subtitle', e.target.value)
                                    }
                                    placeholder="Alt başlık"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                        onChange={(file) =>
                            setData({
                                ...data,
                                image_file: file,
                                remove_image: file === null,
                            })
                        }
                        error={errors.image_file}
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
                        onChange={(file) =>
                            setData({
                                ...data,
                                video_file: file,
                                remove_video: file === null,
                            })
                        }
                        error={errors.video_file}
                    />
                </div>
            </div>
        </form>
    );
}
