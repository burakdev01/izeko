import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import AdminLayout from '@/layouts/admin-layout';
import { slugify } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type BlogPost = {
    id: number;
    title: string;
    image?: string | null;
    seo_url?: string | null;
    active?: boolean;
};

type HaberlerIndexProps = {
    posts: BlogPost[];
};

const placeholderImage = 'https://via.placeholder.com/96?text=Blog';

export default function HaberlerIndex({ posts }: HaberlerIndexProps) {
    return (
        <AdminLayout title="Blog Yönetimi">
            <Head title="Blog Yönetimi" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Blog Yönetimi"
                        description="Mevcut blog yazılarını düzenleyebilir veya yeni yazılar ekleyebilirsiniz."
                        actionLabel="Yeni Blog Yazısı"
                        actionHref="/admin/haberler/create"
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
                                        Dil
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                                        SEO URL
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Durum
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {posts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz blog yazısı eklenmemiş
                                        </td>
                                    </tr>
                                )}
                                {posts.map((post) => {
                                    const imageSrc =
                                        post.image || placeholderImage;
                                    const seoUrl =
                                        post.seo_url ||
                                        slugify(post.title) ||
                                        '-';
                                    const isActive = post.active ?? true;

                                    return (
                                        <tr
                                            key={post.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center text-gray-400">
                                                    <GripVertical className="h-4 w-4" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3 text-sm font-medium text-gray-900">
                                                    <img
                                                        src={imageSrc}
                                                        alt={post.title}
                                                        className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                                                    />
                                                    <span>{post.title}</span>
                                                </div>
                                            </td>
                                            <td className="hidden px-6 py-4 md:table-cell">
                                                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                                                    Türkçe
                                                </span>
                                            </td>
                                            <td className="hidden px-6 py-4 lg:table-cell">
                                                <span className="text-xs text-gray-600">
                                                    {seoUrl}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        isActive
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {isActive
                                                        ? 'Aktif'
                                                        : 'Pasif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <AdminRowActions
                                                    editHref={`/admin/haberler/${post.id}/edit`}
                                                    deleteHref={`/admin/haberler/${post.id}`}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
