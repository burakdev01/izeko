import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

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
