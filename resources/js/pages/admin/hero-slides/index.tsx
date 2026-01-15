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

interface HeroSlide {
    id: number;
    title: string;
    subtitle?: string | null;
    image?: string | null;
    video?: string | null;
    poster?: string | null;
    sort_order: number;
}

interface HeroSlideIndexProps {
    slides: HeroSlide[];
}

export default function HeroSlideIndex({ slides }: HeroSlideIndexProps) {
    const handleDelete = (slideId: number) => {
        if (!window.confirm('Slide silinsin mi?')) {
            return;
        }

        router.delete(`/admin/hero-slides/${slideId}`);
    };

    return (
        <AdminLayout
            title="Hero Slider"
            description="Ana sayfa slider verilerini yönetin."
        >
            <Head title="Hero Slider" />
            <div className="space-y-4">
                <AdminListHeader
                    count={slides.length}
                    label="slide"
                    actionLabel="Yeni slide"
                    actionHref="/admin/hero-slides/create"
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {slides.map((slide) => {
                        const preview = slide.image ?? slide.poster ?? null;
                        const hasVideo = Boolean(slide.video);

                        return (
                            <AdminMediaCard
                                key={slide.id}
                                image={preview}
                                imageAlt={slide.title}
                                overlay={
                                    <>
                                        <AdminMetaPill>
                                            Sıra {slide.sort_order ?? 0}
                                        </AdminMetaPill>
                                        <span
                                            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                                hasVideo
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-red-50 text-red-600'
                                            }`}
                                        >
                                            {hasVideo ? 'Video' : 'Görsel'}
                                        </span>
                                    </>
                                }
                                footer={
                                    <>
                                        <AdminActionLink
                                            href={`/admin/hero-slides/${slide.id}/edit`}
                                        >
                                            Düzenle
                                        </AdminActionLink>
                                        <AdminActionButton
                                            type="button"
                                            onClick={() => handleDelete(slide.id)}
                                            variant="danger"
                                        >
                                            Sil
                                        </AdminActionButton>
                                    </>
                                }
                            >
                                <AdminMediaTitle>{slide.title}</AdminMediaTitle>
                                <p className="line-clamp-2 text-xs text-slate-500">
                                    {slide.subtitle || 'Alt başlık eklenmedi.'}
                                </p>
                                {slide.video ? (
                                    <a
                                        href={slide.video}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Videoyu aç
                                    </a>
                                ) : null}
                            </AdminMediaCard>
                        );
                    })}
                    {slides.length === 0 && (
                        <AdminEmptyState
                            message="Henüz slide eklenmedi."
                            className="md:col-span-2 xl:col-span-3"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
