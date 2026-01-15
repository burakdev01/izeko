import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
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
            description="Ana sayfa slider verilerini yonetin."
        >
            <Head title="Hero Slider" />
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                            Toplam
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                            {slides.length} slide
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        <Link href="/admin/hero-slides/create">Yeni slide</Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {slides.map((slide) => {
                        const preview = slide.image ?? slide.poster ?? null;
                        const hasVideo = Boolean(slide.video);

                        return (
                            <div
                                key={slide.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="relative aspect-[16/9] bg-slate-100">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt={slide.title}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                                            Gorsel yok
                                        </div>
                                    )}
                                    <div className="absolute left-3 top-3 flex items-center gap-2">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow">
                                            Sira {slide.sort_order ?? 0}
                                        </span>
                                        <span
                                            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                                hasVideo
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-red-50 text-red-600'
                                            }`}
                                        >
                                            {hasVideo ? 'Video' : 'Gorsel'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-4">
                                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                                        {slide.title}
                                    </h3>
                                    <p className="line-clamp-2 text-xs text-slate-500">
                                        {slide.subtitle || 'Alt baslik eklenmedi.'}
                                    </p>
                                    {slide.video ? (
                                        <a
                                            href={slide.video}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            Videoyu ac
                                        </a>
                                    ) : null}
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs">
                                    <Link
                                        href={`/admin/hero-slides/${slide.id}/edit`}
                                        className="font-semibold text-slate-600 transition hover:text-slate-900"
                                    >
                                        Duzenle
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(slide.id)}
                                        className="font-semibold text-red-600 transition hover:text-red-700"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {slides.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-500 md:col-span-2 xl:col-span-3">
                            Henuz slide eklenmedi.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
