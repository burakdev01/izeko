import VideoContentForm from '@/components/admin/video-content-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type Activity = {
    id: number;
    title: string;
    date?: string | null;
    video_url: string;
    thumbnail?: string | null;
    active?: boolean;
};

type FaaliyetEditProps = {
    activity: Activity;
};

export default function FaaliyetEdit({ activity }: FaaliyetEditProps) {
    return (
        <AdminLayout title="Faaliyet Düzenle">
            <Head title="Faaliyet Düzenle" />
            <VideoContentForm
                title="Faaliyet Düzenle"
                description="Faaliyet bilgilerini güncelleyin."
                action={`/admin/faaliyetler/${activity.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/faaliyetler"
                content={activity}
                labels={{
                    title: 'Başlık',
                    video: 'Video URL',
                    image: 'Kapak Görseli',
                }}
            />
        </AdminLayout>
    );
}
