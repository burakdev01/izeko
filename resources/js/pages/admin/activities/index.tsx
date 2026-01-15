import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';

interface Activity {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface ActivityIndexProps {
    activities: Activity[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function ActivityIndex({ activities }: ActivityIndexProps) {
    const handleDelete = (activityId: number) => {
        if (!window.confirm('Faaliyet silinsin mi?')) {
            return;
        }

        router.delete(`/admin/faaliyetler/${activityId}`);
    };

    return (
        <AdminLayout
            title="Faaliyetler"
            description="Faaliyetleri ekleyin, duzenleyin ve yonetin."
        >
            <Head title="Faaliyetler" />
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Toplam {activities.length} faaliyet
                </div>
                <Button asChild>
                    <Link href="/admin/faaliyetler/create">
                        Yeni faaliyet
                    </Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                        <tr>
                            <th className="px-5 py-3">Baslik</th>
                            <th className="px-5 py-3">Tarih</th>
                            <th className="px-5 py-3">Gorsel</th>
                            <th className="px-5 py-3">Video</th>
                            <th className="px-5 py-3 text-right">Islem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {activities.map((activity) => (
                            <tr key={activity.id} className="text-gray-700">
                                <td className="px-5 py-4">
                                    <div className="font-medium text-gray-900">
                                        {activity.title}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    {formatDate(activity.date)}
                                </td>
                                <td className="px-5 py-4">
                                    <img
                                        src={activity.thumbnail}
                                        alt={activity.title}
                                        className="h-12 w-20 rounded-lg object-cover"
                                    />
                                </td>
                                <td className="px-5 py-4">
                                    <a
                                        href={activity.video_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Videoyu ac
                                    </a>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/faaliyetler/${activity.id}/edit`}
                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                                        >
                                            Duzenle
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(activity.id)
                                            }
                                            className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {activities.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-10 text-center text-sm text-gray-500"
                                >
                                    Henuz faaliyet eklenmedi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
