import VideoContentForm from '@/components/admin/video-content-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type LiveStream = {
    id: number;
    title: string;
    date?: string | null;
    video_url: string;
    thumbnail?: string | null;
    active?: boolean;
};

type CanliYayinEditProps = {
    stream: LiveStream;
};

export default function CanliYayinEdit({ stream }: CanliYayinEditProps) {
    return (
        <AdminLayout title="Canlı Yayın Düzenle">
            <Head title="Canlı Yayın Düzenle" />
            <VideoContentForm
                title="Canlı Yayın Düzenle"
                description="Canlı yayın bilgilerini güncelleyin."
                action={`/admin/canli-yayinlar/${stream.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/canli-yayinlar"
                content={stream}
                showThumbnail={false}
                labels={{
                    title: 'Başlık',
                    video: 'Video URL',
                }}
            />
        </AdminLayout>
    );
}
