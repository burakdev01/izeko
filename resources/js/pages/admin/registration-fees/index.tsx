import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type RegistrationFee = {
    id: number;
    category: string;
    newspaper_fee: string | null;
    tax_fee: string | null;
    registration_fee: string | null;
    service_fee: string | null;
    total: string | null;
    active: boolean;
    sort_order: number;
};

type Props = {
    fees: RegistrationFee[];
};

export default function RegistrationFeesIndex({ fees }: Props) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: fees,
        reorderUrl: route('admin.registration-fees.reorder'),
    });

    return (
        <AdminLayout title="Kayıt Ücretleri">
            <Head title="Kayıt Ücretleri" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Kayıt Ücretleri"
                    description="Kayıt ücretlerini yönetin ve sıralayın."
                    actionLabel="Yeni Ücret Ekle"
                    actionHref={route('admin.registration-fees.create')}
                />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"></th>

                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Gazete
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Maliye
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Kayıt
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Hizmet
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Toplam
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
                                            colSpan={9}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz kayıt ücreti eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((fee) => (
                                    <tr
                                        key={fee.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(fee.id)}
                                        className={`transition ${
                                            draggedId === fee.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    fee.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {fee.category}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {fee.newspaper_fee || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {fee.tax_fee || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {fee.registration_fee || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {fee.service_fee || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">
                                                {fee.total || '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    fee.active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {fee.active ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={route(
                                                    'admin.registration-fees.edit',
                                                    fee.id,
                                                )}
                                                deleteHref={route(
                                                    'admin.registration-fees.destroy',
                                                    fee.id,
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
