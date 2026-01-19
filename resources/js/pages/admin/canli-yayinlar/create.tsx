import VideoContentForm from '@/components/admin/video-content-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function CanliYayinCreate() {
    return (
        <AdminLayout title="Canlı Yayın Ekle">
            <Head title="Canlı Yayın Ekle" />
            <VideoContentForm
                title="Canlı Yayın Ekle"
                description="Yeni canlı yayın bilgilerini girin."
                action="/admin/canli-yayinlar"
                cancelHref="/admin/canli-yayinlar"
                showThumbnail={false}
                labels={{
                    title: 'Başlık',
                    video: 'Video URL',
                }}
            />
        </AdminLayout>
    );
}
