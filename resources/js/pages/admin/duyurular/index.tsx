import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
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
            description="Duyurulari ekleyin, duzenleyin ve yonetin."
        >
            <Head title="Duyurular" />
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                            Toplam
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                            {announcements.length} duyuru
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        <Link href="/admin/duyurular/create">Yeni duyuru</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="relative aspect-[16/9] bg-slate-100">
                                {announcement.image ? (
                                    <img
                                        src={announcement.image}
                                        alt={announcement.title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                                        Gorsel yok
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow">
                                    {formatDate(announcement.date)}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-2 p-4">
                                {announcement.subtitle ? (
                                    <span className="text-[10px] font-semibold tracking-[0.2em] text-red-500 uppercase">
                                        {announcement.subtitle}
                                    </span>
                                ) : null}
                                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                    {announcement.title}
                                </h3>
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
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs">
                                <Link
                                    href={`/admin/duyurular/${announcement.id}/edit`}
                                    className="font-semibold text-slate-600 transition hover:text-slate-900"
                                >
                                    Düzenle
                                </Link>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(announcement.id)
                                    }
                                    className="font-semibold text-red-600 transition hover:text-red-700"
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    ))}
                    {announcements.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
                            Henuz duyuru eklenmedi.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
