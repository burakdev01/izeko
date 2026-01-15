import AdminFileUpload from '@/components/admin/admin-file-upload';
import AdminField from '@/components/admin/admin-field';
import AdminFormActions from '@/components/admin/admin-form-actions';
import AdminImagePreview from '@/components/admin/admin-image-preview';
import AdminInput from '@/components/admin/admin-input';
import AdminSection from '@/components/admin/admin-section';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Video } from 'lucide-react';

interface HeroSlideFormData {
    title: string;
    subtitle: string;
    image: string;
    image_file: File | null;
    video: string;
    poster: string;
    poster_file: File | null;
    sort_order: number;
}

export default function HeroSlideCreate() {
    const { data, setData, post, processing, errors } = useForm<HeroSlideFormData>(
        {
            title: '',
            subtitle: '',
            image: '',
            image_file: null,
            video: '',
            poster: '',
            poster_file: null,
            sort_order: 0,
        },
    );

    const imageFilePreview = useFilePreview(data.image_file);
    const posterFilePreview = useFilePreview(data.poster_file);
    const imagePreview = imageFilePreview ?? (data.image || null);
    const posterPreview = posterFilePreview ?? (data.poster || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/admin/hero-slides', { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Hero Slide Ekle"
            description="Slider görünümü için yeni içerik ekleyin."
        >
            <Head title="Hero Slide Ekle" />
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
                    <AdminSection title="İçerik">
                        <div className="grid gap-5">
                            <AdminField
                                label="Başlık"
                                htmlFor="title"
                                error={errors.title}
                            >
                                <AdminInput
                                    id="title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    placeholder="Slide başlığı"
                                />
                            </AdminField>

                            <AdminField
                                label="Alt Başlık"
                                htmlFor="subtitle"
                                error={errors.subtitle}
                            >
                                <AdminInput
                                    id="subtitle"
                                    value={data.subtitle}
                                    onChange={(event) =>
                                        setData('subtitle', event.target.value)
                                    }
                                    placeholder="Opsiyonel alt başlık"
                                />
                            </AdminField>

                            <AdminField
                                label="Sıra"
                                htmlFor="sort_order"
                                error={errors.sort_order}
                            >
                                <AdminInput
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(event) =>
                                        setData(
                                            'sort_order',
                                            Number(event.target.value || 0),
                                        )
                                    }
                                />
                            </AdminField>
                        </div>
                    </AdminSection>

                    <AdminSection
                        title="Medya"
                        className="[--admin-image-preview-height:9rem]"
                    >
                        <div className="grid gap-5">
                            <AdminFileUpload
                                id="image_file"
                                file={data.image_file}
                                onChange={(file) => setData('image_file', file)}
                                onClear={() => setData('image_file', null)}
                                error={errors.image_file ?? errors.image}
                            />

                            <AdminImagePreview src={imagePreview} />

                            <AdminField
                                label="Video URL"
                                htmlFor="video"
                                error={errors.video}
                            >
                                <AdminInput
                                    id="video"
                                    type="url"
                                    value={data.video}
                                    onChange={(event) =>
                                        setData('video', event.target.value)
                                    }
                                    placeholder="https://..."
                                />
                            </AdminField>

                            <AdminFileUpload
                                id="poster_file"
                                label="Poster Yükle"
                                hint="Videolar için poster görseli ekleyin."
                                file={data.poster_file}
                                onChange={(file) => setData('poster_file', file)}
                                onClear={() => setData('poster_file', null)}
                                error={errors.poster_file ?? errors.poster}
                                icon={Video}
                            />

                            <AdminImagePreview src={posterPreview} />
                        </div>
                    </AdminSection>
                </div>

                <AdminFormActions
                    submitLabel="Kaydet"
                    cancelHref="/admin/hero-slides"
                    isSubmitting={processing}
                />
            </form>
        </AdminLayout>
    );
}
