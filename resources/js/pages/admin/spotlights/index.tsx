import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Check, GripVertical, X } from 'lucide-react';

interface Spotlight {
    id: number;
    title: string;
    description: string | null;
    image: string;
    active: boolean;
    sort_order: number;
}

export default function SpotlightsIndex({
    spotlights,
}: {
    spotlights: Spotlight[];
}) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: spotlights,
        reorderUrl: '/admin/spotlights/reorder',
    });

    return (
        <AdminLayout title="Manşet Yönetimi">
            <Head title="Manşet Yönetimi" />

            <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Manşet Yönetimi"
                        actionLabel="Yeni Manşet Ekle"
                        actionHref="/admin/spotlights/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                <tr>
                                    <th
                                        scope="col"
                                        className="w-10 px-6 py-3"
                                    ></th>
                                    <th scope="col" className="px-6 py-3">
                                        Görsel
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Başlık
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Durum
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right"
                                    >
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            Henüz hiç manşet eklenmemiş.
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((spotlight) => (
                                    <tr
                                        key={spotlight.id}
                                        className={`bg-white transition ${
                                            draggedId === spotlight.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                        draggable
                                        onDragStart={handleDragStart(
                                            spotlight.id,
                                        )}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(spotlight.id)}
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing">
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={spotlight.image}
                                                alt={spotlight.title}
                                                className="h-12 w-20 rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {spotlight.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {spotlight.active ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    <Check className="h-3 w-3" />
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                    <X className="h-3 w-3" />
                                                    Pasif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={`/admin/spotlights/${spotlight.id}/edit`}
                                                deleteHref={`/admin/spotlights/${spotlight.id}`}
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
