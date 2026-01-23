import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type Props = {
    title: string;
    action: string;
    method?: 'post' | 'put' | 'patch';
    submitLabel?: string;
    cancelHref?: string;
    item?: {
        title: string | null;
        description: string;
        active: boolean;
    };
};

export default function WhyChooseUsForm({
    title,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/why-choose-us',
    item,
}: Props) {
    const form = useForm({
        title: item?.title ?? '',
        description: item?.description ?? '',
        active: item?.active ?? true,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        form[method](action);
    };

    return (
        <Form onSubmit={handleSubmit} className="space-y-6">
            <AdminFormHeader
                title={title}
                description=""
                submitLabel={submitLabel}
                cancelHref={cancelHref}
                processing={form.processing}
            />

            <div className="grid gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="title">Başlık (Opsiyonel)</Label>
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData('title', e.target.value)
                            }
                            placeholder="Madde başlığı..."
                        />
                        {form.errors.title && (
                            <p className="text-sm text-red-500">
                                {form.errors.title}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">İçerik</Label>
                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            placeholder="İçerik..."
                            rows={5}
                        />
                        {form.errors.description && (
                            <p className="text-sm text-red-500">
                                {form.errors.description}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Durum</Label>
                        <AdminStatusToggle
                            checked={form.data.active}
                            onCheckedChange={(checked) =>
                                form.setData('active', checked)
                            }
                        />
                        {form.errors.active && (
                            <p className="text-sm text-red-500">
                                {form.errors.active}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Form>
    );
}
