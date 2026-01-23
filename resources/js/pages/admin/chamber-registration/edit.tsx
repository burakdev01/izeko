import AdminFormHeader from '@/components/admin/admin-form-header';
import RichTextEditor from '@/components/admin/rich-text-editor';
import AdminLayout from '@/layouts/admin-layout';
import { useForm } from '@inertiajs/react';

type ChamberRegistrationItem = {
    id: number;
    content: string;
};

type Props = {
    item: ChamberRegistrationItem | null;
};

export default function ChamberRegistrationEdit({ item }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            content: item?.content ?? '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.chamber-registration.update'));
    };

    return (
        <AdminLayout title="Oda Kayıt İşlemleri">
            <form onSubmit={submit} className="mx-auto max-w-5xl space-y-6">
                <AdminFormHeader
                    title="Oda Kayıt İşlemleri"
                    description="Sayfa içeriğini düzenleyin."
                    submitLabel="Güncelle"
                    cancelHref="/admin/dashboard"
                    processing={processing}
                />

                {recentlySuccessful && (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
                        İçerik başarıyla güncellendi.
                    </div>
                )}

                <div className="flex flex-col gap-6">
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="space-y-4 p-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        İçerik
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
                </div>
            </form>
        </AdminLayout>
    );
}
