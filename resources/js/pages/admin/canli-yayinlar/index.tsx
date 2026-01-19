import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type LiveStream = {
    id: number;
    title: string;
    video_url: string;
};

type CanliYayinlarIndexProps = {
    streams: LiveStream[];
};

export default function CanliYayinlarIndex({
    streams,
}: CanliYayinlarIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: streams,
        reorderUrl: '/admin/canli-yayinlar/reorder',
    });

    return (
        <AdminLayout title="Canlı Yayınlar">
            <Head title="Canlı Yayınlar" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Canlı Yayın Yönetimi"
                        description="Canlı yayın kayıtlarını yönetin ve yeni yayın ekleyin."
                        actionLabel="Yeni Canlı Yayın"
                        actionHref="/admin/canli-yayinlar/create"
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
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz canlı yayın eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((stream) => (
                                    <tr
                                        key={stream.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(stream.id)}
                                        className={`transition ${
                                            draggedId === stream.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    stream.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {stream.title}
                                        </td>
                                        <td className="hidden px-6 py-4 text-xs text-gray-600 md:table-cell">
                                            <span className="block max-w-xs truncate">
                                                {stream.video_url}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <AdminRowActions
                                                editHref={`/admin/canli-yayinlar/${stream.id}/edit`}
                                                deleteHref={`/admin/canli-yayinlar/${stream.id}`}
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
