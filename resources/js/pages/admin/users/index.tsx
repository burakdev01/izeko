import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        search?: string;
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

    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters.search || '')) {
                router.get(
                    route('admin.kullanicilar.index'),
                    { ...filters, search: searchQuery },
                    { preserveState: true, replace: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, filters]);

    return (
        <AdminLayout title={getPageTitle()}>
            <Head title={getPageTitle()} />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <AdminPageHeader
                        title={getPageTitle()}
                        description="Kullanıcıları listeleyin, düzenleyin veya silin."
                    />
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ad, e-posta veya telefon ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-[#da1f25] focus:ring-1 focus:ring-[#da1f25] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ad Soyad
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
                                        E-posta
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:table-cell">
                                        Telefon
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase xl:table-cell">
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
                                            <div>
                                                {user.name} {user.surname}
                                            </div>
                                            <div className="mt-1 flex flex-col space-y-1 text-xs text-gray-500 md:hidden">
                                                <span>{user.email}</span>
                                                <span className="lg:hidden">
                                                    {user.phone_number || '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">
                                            {user.email}
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">
                                            {user.phone_number || '-'}
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 xl:table-cell">
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
