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

interface LiveStream {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface LiveStreamIndexProps {
    streams: LiveStream[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function LiveStreamIndex({ streams }: LiveStreamIndexProps) {
    const handleDelete = (streamId: number) => {
        if (!window.confirm('Canlı yayın silinsin mi?')) {
            return;
        }

        router.delete(`/admin/canli-yayinlar/${streamId}`);
    };

    return (
        <AdminLayout
            title="Canlı Yayınlar"
            description="Canlı yayınları ekleyin, düzenleyin ve yönetin."
        >
            <Head title="Canlı Yayınlar" />
            <div className="space-y-4">
                <AdminListHeader
                    count={streams.length}
                    label="canlı yayın"
                    actionLabel="Yeni yayın"
                    actionHref="/admin/canli-yayinlar/create"
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {streams.map((stream) => (
                        <AdminMediaCard
                            key={stream.id}
                            image={stream.thumbnail}
                            imageAlt={stream.title}
                            overlay={
                                <AdminMetaPill>
                                    {formatDate(stream.date)}
                                </AdminMetaPill>
                            }
                            footer={
                                <>
                                    <AdminActionLink
                                        href={`/admin/canli-yayinlar/${stream.id}/edit`}
                                    >
                                        Düzenle
                                    </AdminActionLink>
                                    <AdminActionButton
                                        type="button"
                                        onClick={() => handleDelete(stream.id)}
                                        variant="danger"
                                    >
                                        Sil
                                    </AdminActionButton>
                                </>
                            }
                        >
                            <AdminMediaTitle>{stream.title}</AdminMediaTitle>
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                <a
                                    href={stream.video_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Yayını aç
                                </a>
                                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600 uppercase">
                                    Video
                                </span>
                            </div>
                        </AdminMediaCard>
                    ))}
                    {streams.length === 0 && (
                        <AdminEmptyState
                            message="Henüz canlı yayın eklenmedi."
                            className="md:col-span-2 xl:col-span-3"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
