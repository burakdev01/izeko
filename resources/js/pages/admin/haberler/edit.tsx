import BlogPostForm from '@/components/admin/blog-post-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type BlogPost = {
    id: number;
    title: string;
    content: string;
    image?: string | null;
    active?: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_url?: string | null;
};

type HaberlerEditProps = {
    post: BlogPost;
};

export default function HaberlerEdit({ post }: HaberlerEditProps) {
    return (
        <AdminLayout title="Blog Yazısı Düzenle">
            <Head title="Blog Yazısı Düzenle" />
            <BlogPostForm
                title="Blog Yazısı Düzenle"
                action={`/admin/haberler/${post.id}`}
                method="put"
                submitLabel="Güncelle"
                post={post}
            />
        </AdminLayout>
    );
}
