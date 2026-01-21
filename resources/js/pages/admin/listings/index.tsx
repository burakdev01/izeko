import AdminRowActions from '@/components/admin/admin-row-actions';
import DashboardStatsCard from '@/components/admin/dashboard-stats-card';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    CheckCircle,
    Clock,
    Download,
    Filter,
    GripVertical,
    Handshake,
    Search,
} from 'lucide-react';

type Listing = {
    id: number;
    title: string;
    description: string;
    office_id: number;
    user_id: number;
    price: number;
    visit_count: number;
    listing_status: 'pending' | 'active' | 'inactive';
};

type ListingsIndexProps = {
    listings: Listing[];
    filters: {
        status?: string;
    };
    stats: {
        total: number;
        active: number;
        pending: number;
    };
};

export default function ListingsIndex({
    listings,
    filters,
    stats,
}: ListingsIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: listings,
        reorderUrl: '/admin/ilanlar/reorder',
    });

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Onay Bekliyor';
            case 'active':
                return 'Aktif';
            case 'inactive':
                return 'Pasif';
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPageTitle = () => {
        switch (filters.status) {
            case 'pending':
                return 'Onay Bekleyen İlanlar';
            case 'active':
                return 'Aktif İlanlar';
            case 'inactive':
                return 'Pasif İlanlar';
            default:
                return 'Tüm İlanlar';
        }
    };

    return (
        <AdminLayout title={getPageTitle()}>
            <Head title={getPageTitle()} />

            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardStatsCard
                        title="Toplam İlan"
                        value={stats.total}
                        icon={CheckCircle}
                        color="blue"
                        change="%12 Artış"
                    />
                    <DashboardStatsCard
                        title="Aktif İlan"
                        value={stats.active}
                        icon={CheckCircle}
                        color="green"
                        change="%8 Artış"
                    />
                    <DashboardStatsCard
                        title="Onay Bekleyen"
                        value={stats.pending}
                        icon={Clock}
                        color="orange"
                        change="%2 Azalış"
                        trend="down"
                    />
                    <DashboardStatsCard
                        title="Satılan İlan"
                        value="0"
                        icon={Handshake}
                        color="purple"
                        change="Tamamlandı"
                    />
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* <AdminPageHeader
                        title={getPageTitle()}
                        description="İlanları listeleyin ve yönetin."
                        actionLabel="Yeni İlan"
                        actionHref="/admin/ilanlar/create"
                    /> */}

                    <div className="flex flex-col gap-4 border-b border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="İlan başlığı, ofis veya ID ara..."
                                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-[#da1f25] focus:ring-1 focus:ring-[#da1f25] focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                <Filter className="h-4 w-4" />
                                Filtrele
                            </button>
                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                <Download className="h-4 w-4" />
                                Dışa Aktar
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="hidden w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell" />
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İlan Adı
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:table-cell">
                                        Ofis ID
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
                                        Fiyat
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase xl:table-cell">
                                        Görüntülenme
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Durum
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {listings.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            İlan bulunamadı.
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((listing) => (
                                    <tr
                                        key={listing.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(listing.id)}
                                        className={`transition ${
                                            draggedId === listing.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="hidden px-4 py-4 md:table-cell">
                                            <div
                                                className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    listing.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            <div className="line-clamp-2 md:line-clamp-none">
                                                {listing.title}
                                            </div>
                                            <div className="mt-1 flex flex-col space-y-1 text-xs text-gray-500 md:hidden">
                                                <span>
                                                    {new Intl.NumberFormat(
                                                        'tr-TR',
                                                        {
                                                            style: 'currency',
                                                            currency: 'TRY',
                                                        },
                                                    ).format(listing.price)}
                                                </span>
                                                <span className="lg:hidden">
                                                    Ofis: #{listing.office_id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">
                                            #{listing.office_id}
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">
                                            {new Intl.NumberFormat('tr-TR', {
                                                style: 'currency',
                                                currency: 'TRY',
                                            }).format(listing.price)}
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 xl:table-cell">
                                            {listing.visit_count}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusColor(
                                                    listing.listing_status,
                                                )}`}
                                            >
                                                {getStatusLabel(
                                                    listing.listing_status,
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <AdminRowActions
                                                editHref={`/admin/ilanlar/${listing.id}/edit`}
                                                deleteHref={`/admin/ilanlar/${listing.id}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
