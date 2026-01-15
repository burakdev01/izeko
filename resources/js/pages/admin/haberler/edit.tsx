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

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
}

interface BlogFormData {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    image_file: File | null;
    date: string;
}

interface BlogEditProps {
    post: BlogPost;
}

export default function BlogEdit({ post }: BlogEditProps) {
    const { data, setData, put, processing, errors } = useForm<BlogFormData>({
        title: post.title ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        image: post.image ?? '',
        image_file: null,
        date: post.date ?? '',
    });

    const filePreview = useFilePreview(data.image_file);
    const imagePreview = filePreview ?? (data.image || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/haberler/${post.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Haber Düzenle"
            description="Haber kaydını güncelleyin."
        >
            <Head title="Haber Düzenle" />
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
                                    placeholder="Haber başlığı"
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
                                    placeholder="Haber içeriği"
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
                    cancelHref="/admin/haberler"
                    isSubmitting={processing}
                />
            </form>
        </AdminLayout>
    );
}
