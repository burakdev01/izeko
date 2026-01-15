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
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                            Toplam
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                            {posts.length} haber
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        <Link href="/admin/haberler/create">Yeni haber</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="relative aspect-[16/9] bg-slate-100">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                                        Gorsel yok
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow">
                                    {formatDate(post.date)}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-2 p-4">
                                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                    {post.title}
                                </h3>
                                <p className="line-clamp-2 text-xs text-slate-500">
                                    {post.excerpt}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs">
                                <Link
                                    href={`/admin/haberler/${post.id}/edit`}
                                    className="font-semibold text-slate-600 transition hover:text-slate-900"
                                >
                                    Düzenle
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(post.id)}
                                    className="font-semibold text-red-600 transition hover:text-red-700"
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
                            Henuz haber eklenmedi.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
