import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Manager = {
    id: number;
    name: string;
    title: string;
    image: string | null;
    active: boolean;
    sort_order: number;
};

type Props = {
    managers: Manager[];
};

export default function RegionalManagersIndex({ managers }: Props) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: managers,
        reorderUrl: route('admin.regional-managers.reorder'),
    });

    return (
        <AdminLayout title="Bölge Sorumlularımız">
            <Head title="Bölge Sorumlularımız" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Bölge Sorumlularımız"
                    description="Bölge sorumlularını yönetin ve sıralayın."
                    actionLabel="Yeni Sorumlu Ekle"
                    actionHref={route('admin.regional-managers.create')}
                />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"></th>

                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ad Soyad
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Bölge / Ünvan
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Durum
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz bölge sorumlusu eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((manager) => (
                                    <tr
                                        key={manager.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(manager.id)}
                                        className={`transition ${
                                            draggedId === manager.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    manager.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {manager.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {manager.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    manager.active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {manager.active
                                                    ? 'Aktif'
                                                    : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={route(
                                                    'admin.regional-managers.edit',
                                                    manager.id,
                                                )}
                                                deleteHref={route(
                                                    'admin.regional-managers.destroy',
                                                    manager.id,
                                                )}
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
