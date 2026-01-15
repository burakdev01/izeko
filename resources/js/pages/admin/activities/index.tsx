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
import { ExternalLink } from 'lucide-react';

interface Activity {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface ActivityIndexProps {
    activities: Activity[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function ActivityIndex({ activities }: ActivityIndexProps) {
    const handleDelete = (activityId: number) => {
        if (!window.confirm('Faaliyet silinsin mi?')) {
            return;
        }

        router.delete(`/admin/faaliyetler/${activityId}`);
    };

    return (
        <AdminLayout
            title="Faaliyetler"
            description="Faaliyetleri ekleyin, düzenleyin ve yönetin."
        >
            <Head title="Faaliyetler" />
            <div className="space-y-4">
                <AdminListHeader
                    count={activities.length}
                    label="faaliyet"
                    actionLabel="Yeni faaliyet"
                    actionHref="/admin/faaliyetler/create"
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {activities.map((activity) => (
                        <AdminMediaCard
                            key={activity.id}
                            image={activity.thumbnail}
                            imageAlt={activity.title}
                            overlay={
                                <AdminMetaPill>
                                    {formatDate(activity.date)}
                                </AdminMetaPill>
                            }
                            footer={
                                <>
                                    <AdminActionLink
                                        href={`/admin/faaliyetler/${activity.id}/edit`}
                                    >
                                        Düzenle
                                    </AdminActionLink>
                                    <AdminActionButton
                                        type="button"
                                        onClick={() =>
                                            handleDelete(activity.id)
                                        }
                                        variant="danger"
                                    >
                                        Sil
                                    </AdminActionButton>
                                </>
                            }
                        >
                            <AdminMediaTitle>{activity.title}</AdminMediaTitle>
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                <a
                                    href={activity.video_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Videoyu aç
                                </a>
                                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold uppercase text-red-600">
                                    Video
                                </span>
                            </div>
                        </AdminMediaCard>
                    ))}
                    {activities.length === 0 && (
                        <AdminEmptyState
                            message="Henüz faaliyet eklenmedi."
                            className="md:col-span-2 xl:col-span-3"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
