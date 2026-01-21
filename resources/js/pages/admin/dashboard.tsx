import DashboardStatsCard from '@/components/admin/dashboard-stats-card';
import AdminLayout from '@/layouts/admin-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    Building2,
    FileText,
    Home,
    Megaphone,
    Play,
    Plus,
    Users,
} from 'lucide-react';

type DashboardProps = {
    stats: {
        users: number;
        offices: number;
        listings: number;
        active_listings: number;
        pending_listings: number;
        activities: number;
        streams: number;
        posts: number;
    };
    recentListings: Array<{
        id: number;
        title: string;
        office: string;
        user: string;
        price: number;
        status: string;
        date: string;
    }>;
};

export default function AdminDashboard({
    stats,
    recentListings,
}: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const userName = auth?.user?.name || 'Admin';

    return (
        <AdminLayout title="Anasayfa">
            <Head title="Panel Özeti" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Merhaba, {userName} 👋
                        </h1>
                        <p className="mt-2 text-gray-500">
                            İşte bugünkü panel özetiniz ve istatistikler.
                        </p>
                    </div>
                    <div className="flex hidden gap-3">
                        <Link
                            href={route('admin.ilanlar.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md active:scale-95"
                        >
                            <Plus size={18} />
                            Hızlı İlan Ekle
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardStatsCard
                        title="Toplam İlan"
                        value={stats.listings}
                        icon={Home}
                        change="Tüm İlanlar"
                        color="blue"
                        href={route('admin.ilanlar.index')}
                    />
                    <DashboardStatsCard
                        title="Aktif İlan"
                        value={stats.active_listings}
                        icon={Building2}
                        change="Yayında"
                        color="green"
                        href={route('admin.ilanlar.index')}
                    />
                    <DashboardStatsCard
                        title="Bekleyen İlan"
                        value={stats.pending_listings}
                        icon={Home}
                        change="Onay Bekliyor"
                        color="orange"
                        href={route('admin.ilanlar.index')}
                    />
                    <DashboardStatsCard
                        title="Toplam Üye"
                        value={stats.users}
                        icon={Users}
                        change="Tüm Üyeler"
                        color="purple"
                        href={route('admin.kullanicilar.index')}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content - Recent Listings */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h3 className="font-semibold text-gray-900">
                                    Son Eklenen İlanlar
                                </h3>
                                <Link
                                    href={route('admin.ilanlar.index')}
                                    className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                                >
                                    Tümünü Gör
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                        <tr>
                                            <th className="px-6 py-3">
                                                İlan Başlığı
                                            </th>
                                            <th className="px-6 py-3">Fiyat</th>
                                            <th className="px-6 py-3">
                                                Ekleyen
                                            </th>
                                            <th className="px-6 py-3">Ofis</th>
                                            <th className="px-6 py-3">Durum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentListings.length > 0 ? (
                                            recentListings.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b bg-white hover:bg-gray-50 md:border-none"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-gray-900">
                                                        {new Intl.NumberFormat(
                                                            'tr-TR',
                                                            {
                                                                style: 'currency',
                                                                currency: 'TRY',
                                                                maximumFractionDigits: 0,
                                                            },
                                                        ).format(item.price)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.user}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.office}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-center text-xs font-medium ${
                                                                item.status ===
                                                                'active'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : item.status ===
                                                                        'pending'
                                                                      ? 'bg-yellow-100 text-yellow-800'
                                                                      : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            {item.status ===
                                                            'active'
                                                                ? 'Yayında'
                                                                : item.status ===
                                                                    'pending'
                                                                  ? 'Onay Bekliyor'
                                                                  : 'Pasif'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-8 text-center text-gray-500"
                                                >
                                                    Henüz ilan girişi
                                                    yapılmamış.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Quick Actions */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold text-gray-900">
                                Hızlı İşlemler
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                <Link
                                    href={route('admin.kullanicilar.index')}
                                    className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors group-hover:bg-red-100 group-hover:text-red-600">
                                            <Users size={20} />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            Üye Onayla
                                        </span>
                                    </div>
                                    <Plus className="text-gray-400 group-hover:text-red-500" />
                                </Link>

                                <Link
                                    href={route('admin.duyurular.create')}
                                    className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-orange-100 p-2 text-orange-600 transition-colors group-hover:bg-red-100 group-hover:text-red-600">
                                            <Megaphone size={20} />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            Duyuru Yayınla
                                        </span>
                                    </div>
                                    <Plus className="text-gray-400 group-hover:text-red-500" />
                                </Link>

                                <Link
                                    href={route('admin.haberler.create')}
                                    className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-2 text-purple-600 transition-colors group-hover:bg-red-100 group-hover:text-red-600">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            Blog Yazısı Ekle
                                        </span>
                                    </div>
                                    <Plus className="text-gray-400 group-hover:text-red-500" />
                                </Link>

                                <Link
                                    href={route('admin.canli-yayinlar.create')}
                                    className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all hover:border-red-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-green-100 p-2 text-green-600 transition-colors group-hover:bg-red-100 group-hover:text-red-600">
                                            <Play size={20} />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            Canlı Yayın Ekle
                                        </span>
                                    </div>
                                    <Plus className="text-gray-400 group-hover:text-red-500" />
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-6 text-white shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold">
                                Faaliyet Raporu
                            </h3>
                            <p className="mt-2 text-sm text-red-100 opacity-90">
                                Bu ay toplam {stats.activities} yeni faaliyet ve{' '}
                                {stats.streams} canlı yayın gerçekleştirildi.
                            </p>
                            <div className="hidden">
                                <Link
                                    href={route('admin.faaliyetler.index')}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                >
                                    Raporu Görüntüle
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
