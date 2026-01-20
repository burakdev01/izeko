import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    created_at: string;
};

type UsersIndexProps = {
    users: User[];
    filters: {
        status?: string;
    };
};

export default function UsersIndex({ users, filters }: UsersIndexProps) {
    const getPageTitle = () => {
        switch (filters.status) {
            case 'pending':
                return 'Onay Bekleyen Kullanıcılar';
            case 'active':
                return 'Aktif Kullanıcılar';
            default:
                return 'Tüm Kullanıcılar';
        }
    };

    const getStatusLabel = (isActive: boolean) => {
        return isActive ? 'Aktif' : 'Pasif / Onay Bekliyor';
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <AdminLayout title={getPageTitle()}>
            <Head title={getPageTitle()} />

            <div className="space-y-6">
                <AdminPageHeader
                    title={getPageTitle()}
                    description="Kullanıcıları listeleyin, düzenleyin veya silin."
                    actionHref={undefined} // No create button for now as per design
                    actionText="Yeni Ekle"
                />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ad Soyad
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        E-posta
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Telefon
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Kayıt Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Durum
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {user.name} {user.surname}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.phone_number || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusColor(
                                                    user.is_active,
                                                )}`}
                                            >
                                                {getStatusLabel(user.is_active)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <AdminRowActions
                                                editHref={`/admin/kullanicilar/${user.id}/edit`}
                                                deleteHref={`/admin/kullanicilar/${user.id}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            Kayıt bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
