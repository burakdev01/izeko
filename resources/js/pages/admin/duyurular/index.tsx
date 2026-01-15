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

interface Announcement {
    id: number;
    title: string;
    subtitle?: string | null;
    excerpt: string;
    image: string;
    link?: string | null;
    date: string;
}

interface AnnouncementIndexProps {
    announcements: Announcement[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function AnnouncementIndex({
    announcements,
}: AnnouncementIndexProps) {
    const handleDelete = (announcementId: number) => {
        if (!window.confirm('Duyuru silinsin mi?')) {
            return;
        }

        router.delete(`/admin/duyurular/${announcementId}`);
    };

    return (
        <AdminLayout
            title="Duyurular"
            description="Duyuruları ekleyin, düzenleyin ve yönetin."
        >
            <Head title="Duyurular" />
            <div className="space-y-4">
                <AdminListHeader
                    count={announcements.length}
                    label="duyuru"
                    actionLabel="Yeni duyuru"
                    actionHref="/admin/duyurular/create"
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {announcements.map((announcement) => (
                        <AdminMediaCard
                            key={announcement.id}
                            image={announcement.image}
                            imageAlt={announcement.title}
                            overlay={
                                <AdminMetaPill>
                                    {formatDate(announcement.date)}
                                </AdminMetaPill>
                            }
                            footer={
                                <>
                                    <AdminActionLink
                                        href={`/admin/duyurular/${announcement.id}/edit`}
                                    >
                                        Düzenle
                                    </AdminActionLink>
                                    <AdminActionButton
                                        type="button"
                                        onClick={() =>
                                            handleDelete(announcement.id)
                                        }
                                        variant="danger"
                                    >
                                        Sil
                                    </AdminActionButton>
                                </>
                            }
                        >
                            {announcement.subtitle ? (
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-red-500 uppercase">
                                    {announcement.subtitle}
                                </span>
                            ) : null}
                            <AdminMediaTitle>
                                {announcement.title}
                            </AdminMediaTitle>
                            <p className="line-clamp-2 text-xs text-slate-500">
                                {announcement.excerpt}
                            </p>
                            {announcement.link ? (
                                <a
                                    href={announcement.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Detaya git
                                </a>
                            ) : null}
                        </AdminMediaCard>
                    ))}
                    {announcements.length === 0 && (
                        <AdminEmptyState
                            message="Henüz duyuru eklenmedi."
                            className="md:col-span-2 xl:col-span-3"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
