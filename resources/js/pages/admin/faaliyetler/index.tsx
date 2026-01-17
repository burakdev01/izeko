import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Activity = {
    id: number;
    title: string;
    video_url: string;
    thumbnail?: string | null;
};

type FaaliyetlerIndexProps = {
    activities: Activity[];
};

const placeholderImage = 'https://via.placeholder.com/96?text=Faaliyet';

export default function FaaliyetlerIndex({
    activities,
}: FaaliyetlerIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: activities,
        reorderUrl: '/admin/faaliyetler/reorder',
    });

    return (
        <AdminLayout title="Faaliyetler">
            <Head title="Faaliyetler" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Faaliyet Yönetimi"
                        description="Mevcut faaliyetleri listeleyin ve yeni faaliyet ekleyin."
                        actionLabel="Yeni Faaliyet"
                        actionHref="/admin/faaliyetler/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500" />
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Başlık
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                                        Video URL
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Görsel
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz faaliyet eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((activity) => (
                                    <tr
                                        key={activity.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(activity.id)}
                                        className={`transition ${
                                            draggedId === activity.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    activity.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {activity.title}
                                        </td>
                                        <td className="hidden px-6 py-4 text-xs text-gray-600 md:table-cell">
                                            <span className="block max-w-xs truncate">
                                                {activity.video_url}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={
                                                        activity.thumbnail ||
                                                        placeholderImage
                                                    }
                                                    alt={activity.title}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <AdminRowActions
                                                editHref={`/admin/faaliyetler/${activity.id}/edit`}
                                                deleteHref={`/admin/faaliyetler/${activity.id}`}
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
