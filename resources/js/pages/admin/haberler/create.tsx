import BlogPostForm from '@/components/admin/blog-post-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function HaberlerCreate() {
    return (
        <AdminLayout title="Blog Yazısı Ekle">
            <Head title="Blog Yazısı Ekle" />
            <BlogPostForm
                title="Blog Yazısı Ekle"
                action="/admin/haberler"
                method="post"
            />
        </AdminLayout>
    );
}
