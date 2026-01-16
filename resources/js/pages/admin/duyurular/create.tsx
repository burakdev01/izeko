import AnnouncementForm from '@/components/admin/announcement-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function DuyuruCreate() {
    return (
        <AdminLayout title="Duyuru Ekle">
            <Head title="Duyuru Ekle" />
            <AnnouncementForm
                title="Duyuru Ekle"
                description="Yeni duyuru bilgilerini girin."
                action="/admin/duyurular"
                cancelHref="/admin/duyurular"
            />
        </AdminLayout>
    );
}
