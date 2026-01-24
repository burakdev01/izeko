import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import RichTextEditor from '@/components/admin/rich-text-editor';
import AdminLayout from '@/layouts/admin-layout';
import { useForm } from '@inertiajs/react';

type ChairmanMessage = {
    id: number;
    content: string;
    image?: string | null;
};

type Props = {
    message: ChairmanMessage | null;
};

export default function ChairmanMessageEdit({ message }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            content: message?.content ?? '',
            image_file: null as File | null,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.chairman-message.update'));
    };

    return (
        <AdminLayout title="Yönetim Kurulu Başkanımız">
            <form onSubmit={submit} className="mx-auto max-w-5xl space-y-6">
                <AdminFormHeader
                    title="Yönetim Kurulu Başkanımız"
                    description="Yönetim Kurulu Başkanının mesajını düzenleyin."
                    submitLabel="Güncelle"
                    cancelHref="/admin/board-members"
                    processing={processing}
                />

                {recentlySuccessful && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
                        İçerik başarıyla güncellendi.
                    </div>
                )}

                <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
                    <div className="space-y-6 md:col-span-2">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="space-y-4 p-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Mesaj İçeriği
                                    </label>
                                    <div className="min-h-[400px]">
                                        <RichTextEditor
                                            value={data.content}
                                            onChange={(val) =>
                                                setData('content', val)
                                            }
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <AdminMediaUpload
                                label="Başkan Görseli"
                                name="image_file"
                                initialPreview={message?.image ?? null}
                                error={errors.image_file}
                                onChange={(file) => setData('image_file', file)}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
