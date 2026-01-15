import AdminFileUpload from '@/components/admin/admin-file-upload';
import AdminField from '@/components/admin/admin-field';
import AdminFormActions from '@/components/admin/admin-form-actions';
import AdminImagePreview from '@/components/admin/admin-image-preview';
import AdminInput from '@/components/admin/admin-input';
import AdminSection from '@/components/admin/admin-section';
import AdminTextarea from '@/components/admin/admin-textarea';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

interface Announcement {
    id: number;
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    image: string;
    link: string;
    date: string;
}

interface AnnouncementFormData {
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    image: string;
    image_file: File | null;
    link: string;
    date: string;
}

interface AnnouncementEditProps {
    announcement: Announcement;
}

export default function AnnouncementEdit({
    announcement,
}: AnnouncementEditProps) {
    const { data, setData, put, processing, errors } = useForm<AnnouncementFormData>(
        {
            title: announcement.title ?? '',
            subtitle: announcement.subtitle ?? '',
            excerpt: announcement.excerpt ?? '',
            content: announcement.content ?? '',
            image: announcement.image ?? '',
            image_file: null,
            link: announcement.link ?? '',
            date: announcement.date ?? '',
        },
    );

    const filePreview = useFilePreview(data.image_file);
    const imagePreview = filePreview ?? (data.image || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/duyurular/${announcement.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout
            title="Duyuru Düzenle"
            description="Duyuru kaydını güncelleyin."
        >
            <Head title="Duyuru Düzenle" />
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
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
                                    placeholder="Duyuru başlığı"
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

                            <AdminField
                                label="Detay Linki"
                                htmlFor="link"
                                error={errors.link}
                            >
                                <AdminInput
                                    id="link"
                                    type="url"
                                    value={data.link}
                                    onChange={(event) =>
                                        setData('link', event.target.value)
                                    }
                                    placeholder="https://... (opsiyonel)"
                                />
                            </AdminField>

                            <AdminField
                                label="Özet"
                                htmlFor="excerpt"
                                error={errors.excerpt}
                            >
                                <AdminTextarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(event) =>
                                        setData('excerpt', event.target.value)
                                    }
                                    placeholder="Kısa özet"
                                    className="min-h-[120px]"
                                />
                            </AdminField>

                            <AdminField
                                label="İçerik"
                                htmlFor="content"
                                error={errors.content}
                            >
                                <AdminTextarea
                                    id="content"
                                    value={data.content}
                                    onChange={(event) =>
                                        setData('content', event.target.value)
                                    }
                                    placeholder="Duyuru içeriği"
                                    className="min-h-[220px]"
                                />
                            </AdminField>
                        </div>
                    </AdminSection>

                    <AdminSection title="Medya">
                        <div className="grid gap-5">
                            <AdminFileUpload
                                id="image_file"
                                file={data.image_file}
                                onChange={(file) => setData('image_file', file)}
                                onClear={() => setData('image_file', null)}
                                error={errors.image_file ?? errors.image}
                            />

                            <AdminImagePreview src={imagePreview} />
                        </div>
                    </AdminSection>
                </div>

                <AdminFormActions
                    submitLabel="Güncelle"
                    cancelHref="/admin/duyurular"
                    isSubmitting={processing}
                />
            </form>
        </AdminLayout>
    );
}
