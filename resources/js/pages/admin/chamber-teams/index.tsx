import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type ChamberTeamMember = {
    id: number;
    name: string;
    title: string;
    image?: string | null;
    active: boolean;
};

type ChamberTeamsIndexProps = {
    members: ChamberTeamMember[];
};

const placeholderImage = 'https://via.placeholder.com/96?text=Uye';

export default function ChamberTeamsIndex({ members }: ChamberTeamsIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: members,
        reorderUrl: '/admin/chamber-teams/reorder',
    });

    return (
        <AdminLayout title="Oda Ekibimiz">
            <Head title="Oda Ekibimiz" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Oda Ekibimiz"
                        description="Oda ekibi üyelerini yönetin ve sırasını değiştirin."
                        actionLabel="Yeni Üye Ekle"
                        actionHref="/admin/chamber-teams/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase" />
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
                            <tbody className="divide-y divide-gray-200">
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
                                                <img
                                                    src={
                                                        member.image ||
                                                        placeholderImage
                                                    }
                                                    alt={member.name}
                                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {member.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {member.title}
                                        </td>
                                        <td className="px-6 py-4 text-center">
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
                                        <td className="px-6 py-4">
                                            <AdminRowActions
                                                editHref={`/admin/chamber-teams/${member.id}/edit`}
                                                deleteHref={`/admin/chamber-teams/${member.id}`}
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
