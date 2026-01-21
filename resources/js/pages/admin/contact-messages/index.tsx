import DashboardStatsCard from '@/components/admin/dashboard-stats-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react'; // Link updated
import {
    CheckCircle,
    Copy,
    Eye,
    Inbox,
    Mail,
    MessageSquare,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    created_at: string;
    is_read: boolean;
}

interface Stats {
    total: number;
    today: number;
    unread: number;
}

interface PageProps {
    messages: {
        data: ContactMessage[];
        links: any[];
        from: number;
        to: number;
        total: number;
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    stats: Stats;
}

export default function ContactMessagesIndex({
    messages,
    filters,
    stats,
}: PageProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.iletisim.index'),
            { search },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.iletisim.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Kopyalandı: ' + text);
    };

    return (
        <AdminLayout title="İletişim Mesajları">
            <Head title="İletişim Mesajları" />

            {/* İstatistikler */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <DashboardStatsCard
                    title="Toplam Mesaj"
                    value={stats.total.toString()}
                    icon={Inbox}
                    color="blue"
                />
                <DashboardStatsCard
                    title="Bugün Gelen"
                    value={stats.today.toString()}
                    icon={MessageSquare}
                    color="green"
                />
                <DashboardStatsCard
                    title="Okunmamış"
                    value={stats.unread.toString()}
                    icon={Mail}
                    color="red"
                />
            </div>

            {/* Filtreler ve Tablo */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Mesajlar
                        </h2>
                        <p className="text-sm text-gray-500">
                            Web sitesinden gelen iletişim formları
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                        <Link
                            href={route('admin.iletisim.index', {
                                status: 'unread',
                            })}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                                filters.status === 'unread'
                                    ? 'border-red-500 bg-red-50 text-red-600'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Okunmamışlar
                        </Link>
                        <Link
                            href={route('admin.iletisim.index')}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                                !filters.status
                                    ? 'border-red-500 bg-red-50 text-red-600'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Tümü
                        </Link>

                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Ara (Ad, E-posta, Konu)..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none md:w-64"
                            />
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </form>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Durum</th>
                                <th className="px-6 py-3">Gönderen</th>
                                <th className="px-6 py-3">İletişim</th>
                                <th className="px-6 py-3">Konu</th>
                                <th className="px-6 py-3">Tarih</th>
                                <th className="px-6 py-3 text-right">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {messages.data.length > 0 ? (
                                messages.data.map((message) => (
                                    <tr
                                        key={message.id}
                                        className={`hover:bg-gray-50 ${!message.is_read ? 'bg-red-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            {message.is_read ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    <CheckCircle size={12} />{' '}
                                                    Okundu
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                    <Mail size={12} /> Yeni
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {message.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span>{message.email}</span>
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                message.email,
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title="E-postayı Kopyala"
                                                    >
                                                        <Copy size={12} />
                                                    </button>
                                                </div>
                                                {message.phone && (
                                                    <span className="text-xs text-gray-500">
                                                        {message.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {message.subject || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                message.created_at,
                                            ).toLocaleDateString('tr-TR', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route(
                                                        'admin.iletisim.show',
                                                        message.id,
                                                    )}
                                                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 hover:shadow-sm"
                                                    title="Görüntüle"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(message.id)
                                                    }
                                                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Inbox
                                                size={48}
                                                className="text-gray-300"
                                            />
                                            <p>Henüz bir mesaj bulunmuyor.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* (Buraya pagination komponenti eklenebilir, şimdilik basit geçildi) */}
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                    <div className="text-sm text-gray-500">
                        Toplam <b>{messages.total}</b> mesajdan{' '}
                        <b>{messages.from}</b> - <b>{messages.to}</b> arası
                        gösteriliyor
                    </div>
                    <div className="flex gap-2">
                        {messages.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`rounded border px-3 py-1 text-sm ${
                                        link.active
                                            ? 'border-red-600 bg-red-600 text-white'
                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                            .replace('Previous', 'Önceki')
                                            .replace('Next', 'Sonraki'),
                                    }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="rounded border border-gray-100 bg-gray-50 px-3 py-1 text-sm text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                            .replace('Previous', 'Önceki')
                                            .replace('Next', 'Sonraki'),
                                    }}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
