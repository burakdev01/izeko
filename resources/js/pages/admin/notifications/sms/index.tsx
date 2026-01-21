import AdminPageHeader from '@/components/admin/admin-page-header';
import DashboardStatsCard from '@/components/admin/dashboard-stats-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    Download,
    Filter,
    MessageSquare,
    Search,
} from 'lucide-react';

export default function SmsNotificationsIndex() {
    // Mock data for display
    const logs = [
        {
            id: 1,
            message: 'Doğrulama kodunuz: 123456',
            recipient: '+90 555 111 22 33',
            status: 'sent',
            sent_at: '2026-01-21 09:30',
        },
        {
            id: 2,
            message: 'Randevunuz oluşturuldu.',
            recipient: '+90 532 999 88 77',
            status: 'sent',
            sent_at: '2026-01-21 10:00',
        },
        {
            id: 3,
            message: 'Ödeme hatırlatması.',
            recipient: '+90 533 444 55 66',
            status: 'failed',
            sent_at: '2026-01-21 10:45',
        },
    ];

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
                        value="85"
                        icon={MessageSquare}
                        color="blue"
                        change="%8 Artış"
                    />
                    <DashboardStatsCard
                        title="Bu Ay Gönderilen"
                        value="5,432"
                        icon={CheckCircle}
                        color="green"
                        change="%3 Artış"
                    />
                    <DashboardStatsCard
                        title="Bugün Başarısız"
                        value="1"
                        icon={AlertCircle}
                        color="red"
                        change="%1 Azalış"
                        trend="down"
                    />
                </div>

                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Mesaj içeriği veya alıcı ara..."
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

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Mesaj İçeriği
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
                                        Alıcı
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Durum
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase lg:table-cell">
                                        Gönderim Tarihi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="max-w-md px-6 py-4 text-sm font-medium text-gray-900">
                                            <div className="truncate">
                                                {log.message}
                                            </div>
                                            <div className="mt-1 flex flex-col space-y-1 text-xs text-gray-500 md:hidden">
                                                <span>{log.recipient}</span>
                                                <span className="lg:hidden">
                                                    {log.sent_at}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">
                                            {log.recipient}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.status === 'sent' ? (
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                                                    İletildi
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs leading-5 font-semibold text-red-800">
                                                    Hata
                                                </span>
                                            )}
                                        </td>
                                        <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">
                                            {log.sent_at}
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
