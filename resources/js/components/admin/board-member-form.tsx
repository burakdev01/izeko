import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminMediaUpload from '@/components/admin/admin-media-upload';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type BoardMember = {
    id?: number;
    name: string;
    title: string;
    image?: string | null;
    active?: boolean;
};

type BoardMemberFormProps = {
    title: string;
    description: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    member?: BoardMember;
};

export default function BoardMemberForm({
    title,
    description,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/board-members',
    member,
    showImage = true,
}: BoardMemberFormProps & { showImage?: boolean }) {
    const [name, setName] = useState(member?.name ?? '');
    const [roleTitle, setRoleTitle] = useState(member?.title ?? '');
    const [active, setActive] = useState(member?.active ?? true);

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

                    <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="space-y-4 p-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Ad Soyad"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Ünvan
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={roleTitle}
                                            onChange={(e) =>
                                                setRoleTitle(e.target.value)
                                            }
                                            placeholder="Örn: Yönetim Kurulu Başkanı"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <AdminStatusToggle
                                    checked={active}
                                    onChange={setActive}
                                />

                                {showImage && (
                                    <AdminMediaUpload
                                        label="Duyuru Görseli"
                                        name="image_file"
                                        initialPreview={member?.image ?? null}
                                        error={
                                            errors.image ||
                                            errors.image_file ||
                                            undefined
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
