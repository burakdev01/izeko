import AdminFileUpload from '@/components/admin/admin-file-upload';
import AdminField from '@/components/admin/admin-field';
import AdminFormActions from '@/components/admin/admin-form-actions';
import AdminImagePreview from '@/components/admin/admin-image-preview';
import AdminInput from '@/components/admin/admin-input';
import AdminSection from '@/components/admin/admin-section';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

interface LiveStream {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface LiveStreamFormData {
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
    thumbnail_file: File | null;
}

interface LiveStreamEditProps {
    stream: LiveStream;
}

export default function LiveStreamEdit({ stream }: LiveStreamEditProps) {
    const { data, setData, put, processing, errors } = useForm<LiveStreamFormData>(
        {
            title: stream.title ?? '',
            date: stream.date ?? '',
            video_url: stream.video_url ?? '',
            thumbnail: stream.thumbnail ?? '',
            thumbnail_file: null,
        },
    );

    const filePreview = useFilePreview(data.thumbnail_file);
    const thumbnailPreview = filePreview ?? (data.thumbnail || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/canli-yayinlar/${stream.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Canlı Yayın Düzenle"
            description="Canlı yayın kaydını güncelleyin."
        >
            <Head title="Canlı Yayın Düzenle" />
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
                                    placeholder="Canlı yayın başlığı"
                                />
                            </AdminField>

                            <AdminField
                                label="Video URL"
                                htmlFor="video_url"
                                error={errors.video_url}
                            >
                                <AdminInput
                                    id="video_url"
                                    type="url"
                                    value={data.video_url}
                                    onChange={(event) =>
                                        setData('video_url', event.target.value)
                                    }
                                    placeholder="https://www.youtube.com/..."
                                />
                            </AdminField>
                        </div>
                    </AdminSection>

                    <AdminSection title="Medya">
                        <div className="grid gap-5">
                            <AdminField
                                label="Tarih"
                                htmlFor="date"
                                error={errors.date}
                            >
                                <AdminInput
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(event) =>
                                        setData('date', event.target.value)
                                    }
                                />
                            </AdminField>

                            <AdminFileUpload
                                id="thumbnail_file"
                                file={data.thumbnail_file}
                                onChange={(file) =>
                                    setData('thumbnail_file', file)
                                }
                                onClear={() =>
                                    setData('thumbnail_file', null)
                                }
                                error={
                                    errors.thumbnail_file ?? errors.thumbnail
                                }
                            />

                            <AdminImagePreview src={thumbnailPreview} />
                        </div>
                    </AdminSection>
                </div>

                <AdminFormActions
                    submitLabel="Güncelle"
                    cancelHref="/admin/canli-yayinlar"
                    isSubmitting={processing}
                />
            </form>
        </AdminLayout>
    );
}
