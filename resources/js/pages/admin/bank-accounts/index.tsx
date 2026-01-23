import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Account = {
    id: number;
    bank_name: string;
    branch_name: string;
    iban: string;
    image: string | null;
    active: boolean;
    sort_order: number;
};

type Props = {
    accounts: Account[];
};

export default function BankAccountsIndex({ accounts }: Props) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: accounts,
        reorderUrl: route('admin.bank-accounts.reorder'),
    });

    return (
        <AdminLayout title="Oda Hesap Numaraları">
            <Head title="Oda Hesap Numaraları" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Oda Hesap Numaraları"
                    description="Banka hesap numaralarını yönetin ve sıralayın."
                    actionLabel="Yeni Hesap Ekle"
                    actionHref={route('admin.bank-accounts.create')}
                />

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Logo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Banka Adı
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Şube
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        IBAN
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
                                            colSpan={7}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz banka hesabı eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((account) => (
                                    <tr
                                        key={account.id}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop(account.id)}
                                        className={`transition ${
                                            draggedId === account.id
                                                ? 'bg-blue-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <div
                                                className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                draggable
                                                onDragStart={handleDragStart(
                                                    account.id,
                                                )}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <div className="h-12 w-12 flex-shrink-0">
                                                    {account.image ? (
                                                        <img
                                                            className="h-12 w-12 object-contain"
                                                            src={account.image}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded bg-gray-100" />
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {account.bank_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">
                                                {account.branch_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {account.iban}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    account.active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {account.active
                                                    ? 'Aktif'
                                                    : 'Pasif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <AdminRowActions
                                                editHref={route(
                                                    'admin.bank-accounts.edit',
                                                    account.id,
                                                )}
                                                deleteHref={route(
                                                    'admin.bank-accounts.destroy',
                                                    account.id,
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
