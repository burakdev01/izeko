import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';

interface Announcement {
    id: number;
    title: string;
    subtitle?: string | null;
    excerpt: string;
    image: string;
    link?: string | null;
    date: string;
}

interface AnnouncementIndexProps {
    announcements: Announcement[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function AnnouncementIndex({
    announcements,
}: AnnouncementIndexProps) {
    const handleDelete = (announcementId: number) => {
        if (!window.confirm('Duyuru silinsin mi?')) {
            return;
        }

        router.delete(`/admin/duyurular/${announcementId}`);
    };

    return (
        <AdminLayout
            title="Duyurular"
            description="Duyurulari ekleyin, duzenleyin ve yonetin."
        >
            <Head title="Duyurular" />
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Toplam {announcements.length} duyuru
                </div>
                <Button asChild>
                    <Link href="/admin/duyurular/create">Yeni duyuru</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                        <tr>
                            <th className="px-5 py-3">Baslik</th>
                            <th className="px-5 py-3">Tarih</th>
                            <th className="px-5 py-3">Gorsel</th>
                            <th className="px-5 py-3">Link</th>
                            <th className="px-5 py-3 text-right">Islem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {announcements.map((announcement) => (
                            <tr
                                key={announcement.id}
                                className="text-gray-700"
                            >
                                <td className="px-5 py-4">
                                    <div className="font-medium text-gray-900">
                                        {announcement.title}
                                    </div>
                                    {announcement.subtitle && (
                                        <div className="text-xs text-gray-500">
                                            {announcement.subtitle}
                                        </div>
                                    )}
                                </td>
                                <td className="px-5 py-4">
                                    {formatDate(announcement.date)}
                                </td>
                                <td className="px-5 py-4">
                                    <img
                                        src={announcement.image}
                                        alt={announcement.title}
                                        className="h-12 w-20 rounded-lg object-cover"
                                    />
                                </td>
                                <td className="px-5 py-4">
                                    {announcement.link ? (
                                        <a
                                            href={announcement.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Linki ac
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-400">
                                            -
                                        </span>
                                    )}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/duyurular/${announcement.id}/edit`}
                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                                        >
                                            Duzenle
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(announcement.id)
                                            }
                                            className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {announcements.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-10 text-center text-sm text-gray-500"
                                >
                                    Henuz duyuru eklenmedi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
