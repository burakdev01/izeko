import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    phone_number: string;
};

type Office = {
    id: number;
    name: string;
};

type SmsCreateProps = {
    users: User[];
    offices: Office[];
};

export default function SmsCreate({ users, offices }: SmsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        audience: 'all', // all, offices, users, custom
        selected_users: [] as number[],
        selected_offices: [] as number[],
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/bildirimler/sms');
    };

    const toggleUser = (id: number) => {
        if (data.selected_users.includes(id)) {
            setData(
                'selected_users',
                data.selected_users.filter((userId) => userId !== id),
            );
        } else {
            setData('selected_users', [...data.selected_users, id]);
        }
    };

    const toggleAllUsers = () => {
        if (data.selected_users.length === users.length) {
            setData('selected_users', []);
        } else {
            setData(
                'selected_users',
                users.map((u) => u.id),
            );
        }
    };

    const toggleOffice = (id: number) => {
        if (data.selected_offices.includes(id)) {
            setData(
                'selected_offices',
                data.selected_offices.filter((officeId) => officeId !== id),
            );
        } else {
            setData('selected_offices', [...data.selected_offices, id]);
        }
    };

    const toggleAllOffices = () => {
        if (data.selected_offices.length === offices.length) {
            setData('selected_offices', []);
        } else {
            setData(
                'selected_offices',
                offices.map((o) => o.id),
            );
        }
    };

    return (
        <AdminLayout title="Yeni SMS Gönder">
            <Head title="Yeni SMS Gönder" />

            <form onSubmit={submit} className="space-y-6">
                <AdminFormHeader
                    title="Yeni SMS Gönder"
                    description="Kullanıcılara veya ofislere toplu SMS gönderin."
                    submitLabel="Gönder"
                    cancelHref="/admin/bildirimler/sms"
                    processing={processing}
                />

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-6 p-6">
                        {/* Audience Selection */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Hedef Kitle
                            </label>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                <label className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="audience"
                                        value="all"
                                        checked={data.audience === 'all'}
                                        onChange={(e) =>
                                            setData('audience', e.target.value)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Tüm Herkes
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="audience"
                                        value="offices"
                                        checked={data.audience === 'offices'}
                                        onChange={(e) =>
                                            setData('audience', e.target.value)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Tüm Ofisler
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="audience"
                                        value="users"
                                        checked={data.audience === 'users'}
                                        onChange={(e) =>
                                            setData('audience', e.target.value)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Tüm Kullanıcılar
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="audience"
                                        value="custom"
                                        checked={data.audience === 'custom'}
                                        onChange={(e) =>
                                            setData('audience', e.target.value)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Özel Seçim
                                    </span>
                                </label>
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.audience}
                            />
                        </div>

                        {/* Custom Selection Area */}
                        {data.audience === 'custom' && (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Office List */}
                                <div className="rounded-xl border border-gray-200 p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Ofisler
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={toggleAllOffices}
                                            className="text-xs font-medium text-[#da1f25] hover:text-[#b0181d]"
                                        >
                                            {data.selected_offices.length ===
                                            offices.length
                                                ? 'Tümünü Kaldır'
                                                : 'Tümünü Seç'}
                                        </button>
                                    </div>
                                    <div className="max-h-60 space-y-2 overflow-y-auto">
                                        {offices.map((office) => (
                                            <label
                                                key={office.id}
                                                className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1.5 hover:bg-gray-50"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.selected_offices.includes(
                                                        office.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleOffice(office.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {office.name}
                                                </span>
                                            </label>
                                        ))}
                                        {offices.length === 0 && (
                                            <p className="text-sm text-gray-500">
                                                Listelenecek ofis yok.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* User List */}
                                <div className="rounded-xl border border-gray-200 p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Kullanıcılar
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={toggleAllUsers}
                                            className="text-xs font-medium text-[#da1f25] hover:text-[#b0181d]"
                                        >
                                            {data.selected_users.length ===
                                            users.length
                                                ? 'Tümünü Kaldır'
                                                : 'Tümünü Seç'}
                                        </button>
                                    </div>
                                    <div className="max-h-60 space-y-2 overflow-y-auto">
                                        {users.map((user) => (
                                            <label
                                                key={user.id}
                                                className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1.5 hover:bg-gray-50"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.selected_users.includes(
                                                        user.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleUser(user.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {user.name} (
                                                    {user.phone_number || '-'})
                                                </span>
                                            </label>
                                        ))}
                                        {users.length === 0 && (
                                            <p className="text-sm text-gray-500">
                                                Listelenecek kullanıcı yok.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Mesaj
                            </label>
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                rows={4}
                                maxLength={160}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                            />
                            <div className="mt-1 flex justify-end">
                                <span className="text-xs text-gray-500">
                                    {data.message.length} / 160
                                </span>
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.message}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
