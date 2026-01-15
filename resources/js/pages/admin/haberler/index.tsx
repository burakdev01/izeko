import {
    AdminActionButton,
    AdminActionLink,
} from '@/components/admin/admin-action';
import AdminEmptyState from '@/components/admin/admin-empty-state';
import AdminListHeader from '@/components/admin/admin-list-header';
import AdminMediaCard from '@/components/admin/admin-media-card';
import AdminMediaTitle from '@/components/admin/admin-media-title';
import AdminMetaPill from '@/components/admin/admin-meta-pill';
import AdminLayout from '@/layouts/admin-layout';
import { Head, router } from '@inertiajs/react';

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
            description="Haberleri ekleyin, düzenleyin ve yönetin."
        >
            <Head title="Blog & Haberler" />
            <div className="space-y-4">
                <AdminListHeader
                    count={posts.length}
                    label="haber"
                    actionLabel="Yeni haber"
                    actionHref="/admin/haberler/create"
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                        <AdminMediaCard
                            key={post.id}
                            image={post.image}
                            imageAlt={post.title}
                            overlay={
                                <AdminMetaPill>
                                    {formatDate(post.date)}
                                </AdminMetaPill>
                            }
                            footer={
                                <>
                                    <AdminActionLink
                                        href={`/admin/haberler/${post.id}/edit`}
                                    >
                                        Düzenle
                                    </AdminActionLink>
                                    <AdminActionButton
                                        type="button"
                                        onClick={() => handleDelete(post.id)}
                                        variant="danger"
                                    >
                                        Sil
                                    </AdminActionButton>
                                </>
                            }
                        >
                            <AdminMediaTitle>{post.title}</AdminMediaTitle>
                            <p className="line-clamp-2 text-xs text-slate-500">
                                {post.excerpt}
                            </p>
                        </AdminMediaCard>
                    ))}
                    {posts.length === 0 && (
                        <AdminEmptyState
                            message="Henüz haber eklenmedi."
                            className="md:col-span-2 xl:col-span-3"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
