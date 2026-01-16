import VideoContentForm from '@/components/admin/video-content-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function FaaliyetCreate() {
    return (
        <AdminLayout title="Faaliyet Ekle">
            <Head title="Faaliyet Ekle" />
            <VideoContentForm
                title="Faaliyet Ekle"
                description="Yeni faaliyet bilgilerini girin."
                action="/admin/faaliyetler"
                cancelHref="/admin/faaliyetler"
                labels={{
                    title: 'Başlık',
                    video: 'Video URL',
                    image: 'Kapak Görseli',
                }}
            />
        </AdminLayout>
    );
}
