import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Member = {
    id: number;
    name: string;
    title: string;
    image: string | null;
    active: boolean;
    sort_order: number;
};

type Props = {
    members: Member[];
};

export default function SupervisoryBoardIndex({ members }: Props) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: members,
        reorderUrl: route('admin.supervisory-board.reorder'),
    });

    return (
        <AdminLayout title="Denetim Kurulu">
            <Head title="Denetim Kurulu" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Denetim Kurulu"
                    description="Denetim kurulu üyelerini yönetin ve sıralayın."
                    actionLabel="Yeni Üye Ekle"
                    actionHref={route('admin.supervisory-board.create')}
                />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Görsel
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ad Soyad
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Ünvan
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
                                            Henüz üye eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((member) => (
                                    <tr
                                        key={member.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(member.id)}
                                        className={`transition ${
                                            draggedId === member.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    member.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <div className="h-12 w-12 flex-shrink-0">
                                                    {member.image ? (
                                                        <img
                                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                                                            src={member.image}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-full bg-gray-200 ring-2 ring-gray-100" />
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {member.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {member.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    member.active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {member.active
                                                    ? 'Aktif'
                                                    : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={route(
                                                    'admin.supervisory-board.edit',
                                                    member.id,
                                                )}
                                                deleteHref={route(
                                                    'admin.supervisory-board.destroy',
                                                    member.id,
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
