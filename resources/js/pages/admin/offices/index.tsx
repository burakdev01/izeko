import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
};

type Office = {
    id: number;
    name: string;
    address: string;
    is_active: boolean;
    created_at: string;
    users: User[];
};

type Stats = {
    total: number;
    active: number;
    pending: number;
    suspended: number;
};

type OfficeIndexProps = {
    offices: Office[];
    filters: {
        search?: string;
        status?: string;
    };
    stats: Stats;
};

export default function OfficesIndex({
    offices,
    filters,
    stats,
}: OfficeIndexProps) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        status: filters.status || 'all',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/admin/ofisler');
    };

    const clearFilters = () => {
        setData({ search: '', status: 'all' });
        // Can't directly call get() here due to async state update, better to direct visit or use effect
        window.location.href = '/admin/ofisler';
    };

    return (
        <AdminLayout title="Ofis Yönetimi">
            <Head title="Ofis Yönetimi" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Ofis Yönetimi"
                    description="Sistemdeki tüm ofisleri yönetin."
                    actionHref="/admin/ofisler/create"
                    actionLabel="Yeni Ofis Ekle"
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE9EA] text-[#da1f25]">
                                <span className="text-lg font-bold">
                                    {stats.total}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Toplam Ofis
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                                <span className="text-lg font-bold">
                                    {stats.active}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Aktif Ofis
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                                <span className="text-lg font-bold">
                                    {stats.pending}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Onay Bekliyor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                                <span className="text-lg font-bold">
                                    {stats.suspended}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Askıya Alınmış
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-4 md:flex-row md:items-end"
                    >
                        <div className="flex-1">
                            <label className="mb-1 block text-sm font-medium text-[#da1f25]">
                                Durum
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#da1f25] focus:ring-[#da1f25]"
                            >
                                <option value="all">Tümü</option>
                                <option value="active">Aktif</option>
                                <option value="pending">
                                    Pasif / Beklemede
                                </option>
                            </select>
                        </div>
                        <div className="flex-[2]">
                            <label className="mb-1 block text-sm font-medium text-[#da1f25]">
                                Arama
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData('search', e.target.value)
                                    }
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-[#da1f25] focus:ring-[#da1f25]"
                                    placeholder="Ticaret ünvanı, yasal ünvan veya email"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-[#da1f25] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#b0181d] focus:ring-4 focus:ring-red-300 focus:outline-none"
                            >
                                Filtrele
                            </button>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none"
                            >
                                Temizle
                            </button>
                        </div>
                    </form>
                </div>

                {/* Filter List Header */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Ofis Listesi ({offices.length} kayıt)
                    </h3>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ofis Bilgileri
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Sahip
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İletişim
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Durum
                                    </th>
                                    <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Oluşturulma
                                    </th>
                                    <th className="px-3 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {offices.map((office) => (
                                    <tr
                                        key={office.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="max-w-[200px] px-3 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                                    {office.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div
                                                        className="truncate text-sm font-medium text-[#da1f25]"
                                                        title={office.name}
                                                    >
                                                        {office.name}
                                                    </div>
                                                    <div
                                                        className="truncate text-xs text-gray-500"
                                                        title={office.address}
                                                    >
                                                        {office.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-[150px] px-3 py-4">
                                            {office.users &&
                                            office.users.length > 0 ? (
                                                <div className="text-sm text-gray-900">
                                                    <div
                                                        className="truncate font-medium"
                                                        title={
                                                            office.users[0].name
                                                        }
                                                    >
                                                        {office.users[0].name}
                                                    </div>
                                                    <div
                                                        className="truncate text-xs text-gray-500"
                                                        title={
                                                            office.users[0]
                                                                .email
                                                        }
                                                    >
                                                        {office.users[0].email}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="max-w-[150px] px-3 py-4">
                                            {office.users &&
                                            office.users.length > 0 ? (
                                                <div className="text-sm text-gray-500">
                                                    <div
                                                        className="truncate"
                                                        title={
                                                            office.users[0]
                                                                .email
                                                        }
                                                    >
                                                        {office.users[0].email}
                                                    </div>
                                                    <div className="truncate">
                                                        {office.users[0]
                                                            .phone_number ||
                                                            '-'}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            {office.is_active ? (
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs leading-5 font-semibold text-yellow-800">
                                                    Pasif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                                            {new Date(
                                                office.created_at,
                                            ).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-3 py-4 text-center whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={route(
                                                    'admin.ofisler.edit',
                                                    office.id,
                                                )}
                                                deleteHref={route(
                                                    'admin.ofisler.destroy',
                                                    office.id,
                                                )}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {offices.length === 0 && (
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
