import AnnouncementForm from '@/components/admin/announcement-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type Announcement = {
    id: number;
    title: string;
    subtitle?: string | null;
    excerpt: string;
    content: string;
    image?: string | null;
    link?: string | null;
    date?: string | null;
    active?: boolean;
};

type DuyuruEditProps = {
    announcement: Announcement;
};

export default function DuyuruEdit({ announcement }: DuyuruEditProps) {
    return (
        <AdminLayout title="Duyuru Düzenle">
            <Head title="Duyuru Düzenle" />
            <AnnouncementForm
                title="Duyuru Düzenle"
                description="Duyuru bilgilerini güncelleyin."
                action={`/admin/duyurular/${announcement.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/duyurular"
                announcement={announcement}
            />
        </AdminLayout>
    );
}
