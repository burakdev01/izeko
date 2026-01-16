import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Announcement = {
    id: number;
    title: string;
    subtitle?: string | null;
    excerpt: string;
    image?: string | null;
    link?: string | null;
};

type DuyurularIndexProps = {
    announcements: Announcement[];
};

const placeholderImage = 'https://via.placeholder.com/96?text=Duyuru';

export default function DuyurularIndex({
    announcements,
}: DuyurularIndexProps) {
    return (
        <AdminLayout title="Duyurular">
            <Head title="Duyurular" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Duyuru Yönetimi"
                        description="Duyuru içeriklerini yönetin ve yeni duyuru ekleyin."
                        actionLabel="Yeni Duyuru"
                        actionHref="/admin/duyurular/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500" />
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Başlık
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                                        Link
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
                                {announcements.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz duyuru eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {announcements.map((announcement) => (
                                    <tr
                                        key={announcement.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center text-gray-400">
                                                <GripVertical className="h-4 w-4" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {announcement.title}
                                                </span>
                                                {announcement.subtitle && (
                                                    <span className="text-xs text-gray-500">
                                                        {announcement.subtitle}
                                                    </span>
                                                )}
                                                <span className="max-w-xs truncate text-xs text-gray-500">
                                                    {announcement.excerpt}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden px-6 py-4 text-xs text-gray-600 lg:table-cell">
                                            <span className="block max-w-xs truncate">
                                                {announcement.link || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={
                                                        announcement.image ||
                                                        placeholderImage
                                                    }
                                                    alt={announcement.title}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <AdminRowActions
                                                editHref={`/admin/duyurular/${announcement.id}/edit`}
                                                deleteHref={`/admin/duyurular/${announcement.id}`}
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
