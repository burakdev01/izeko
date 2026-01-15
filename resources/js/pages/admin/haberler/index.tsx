import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
}

interface BlogIndexProps {
    posts: BlogPost[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function BlogIndex({ posts }: BlogIndexProps) {
    const handleDelete = (postId: number) => {
        if (!window.confirm('Haber silinsin mi?')) {
            return;
        }

        router.delete(`/admin/haberler/${postId}`);
    };

    return (
        <AdminLayout
            title="Blog & Haberler"
            description="Haberleri ekleyin, duzenleyin ve yonetin."
        >
            <Head title="Blog & Haberler" />
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Toplam {posts.length} haber
                </div>
                <Button asChild>
                    <Link href="/admin/haberler/create">Yeni haber</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                        <tr>
                            <th className="px-5 py-3">Baslik</th>
                            <th className="px-5 py-3">Ozet</th>
                            <th className="px-5 py-3">Tarih</th>
                            <th className="px-5 py-3">Gorsel</th>
                            <th className="px-5 py-3 text-right">Islem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.map((post) => (
                            <tr key={post.id} className="text-gray-700">
                                <td className="px-5 py-4">
                                    <div className="font-medium text-gray-900">
                                        {post.title}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <p className="line-clamp-2 text-sm text-gray-500">
                                        {post.excerpt}
                                    </p>
                                </td>
                                <td className="px-5 py-4">
                                    {formatDate(post.date)}
                                </td>
                                <td className="px-5 py-4">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-12 w-20 rounded-lg object-cover"
                                    />
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/haberler/${post.id}/edit`}
                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                                        >
                                            Duzenle
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(post.id)}
                                            className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-10 text-center text-sm text-gray-500"
                                >
                                    Henuz haber eklenmedi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
