import AdminPageHeader from '@/components/admin/admin-page-header';
import DashboardStatsCard from '@/components/admin/dashboard-stats-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';
import { AlertCircle, CheckCircle, MessageSquare, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

type Notification = {
    id: number;
    subject: string;
    message: string;
    recipient_count: number;
    audience: string;
    created_at: string;
};

type SmsNotificationsIndexProps = {
    notifications: Notification[];
    filters: {
        search?: string;
    };
    stats: {
        today: number;
        month: number;
        failed: number;
    };
};

export default function SmsNotificationsIndex({
    notifications,
    filters,
    stats,
}: SmsNotificationsIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== (filters.search || '')) {
                router.get(
                    route('admin.notifications.sms'),
                    { ...filters, search: searchQuery },
                    { preserveState: true, replace: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, filters]);
    return (
        <AdminLayout title="SMS Bildirimleri">
            <Head title="SMS Bildirimleri" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="SMS Bildirimleri"
                    description="Gönderilen SMS bildirimlerinin listesi."
                    actionHref="/admin/bildirimler/sms/yeni"
                    actionLabel="Yeni SMS Gönder"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DashboardStatsCard
                        title="Bugün Gönderilen"
                        value={stats.today.toString()}
                        icon={MessageSquare}
                        color="blue"
                        change=""
                    />
                    <DashboardStatsCard
                        title="Bu Ay Gönderilen"
                        value={stats.month.toLocaleString()}
                        icon={CheckCircle}
                        color="green"
                        change=""
                    />
                    <DashboardStatsCard
                        title="Bugün Başarısız"
                        value={stats.failed.toString()}
                        icon={AlertCircle}
                        color="red"
                        change=""
                        trend="down"
                    />
                </div>

                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Mesaj içeriği veya alıcı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-[#da1f25] focus:ring-1 focus:ring-[#da1f25] focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {/* <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filtrele
                        </button>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Dışa Aktar
                        </button> */}
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Konu
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Alıcı Sayısı
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:table-cell">
                                        Gönderim Tarihi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {notifications.map((notification) => (
                                    <tr
                                        key={notification.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="max-w-md px-6 py-4 text-sm font-medium text-gray-900">
                                            <div className="truncate">
                                                {notification.subject}
                                            </div>
                                            <div className="mt-1 flex flex-col space-y-1 text-xs text-gray-500 md:hidden">
                                                <span>
                                                    {
                                                        notification.recipient_count
                                                    }{' '}
                                                    alıcı
                                                </span>
                                                <span className="lg:hidden">
                                                    {new Date(
                                                        notification.created_at,
                                                    ).toLocaleString('tr-TR')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                                {notification.recipient_count}{' '}
                                                Kişi
                                            </span>
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">
                                            {new Date(
                                                notification.created_at,
                                            ).toLocaleString('tr-TR')}
                                        </td>
                                    </tr>
                                ))}
                                {notifications.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz gönderilmiş bi SMS bildirimi
                                            bulunmuyor.
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
