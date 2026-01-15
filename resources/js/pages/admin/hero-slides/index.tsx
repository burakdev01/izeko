import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';

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
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Toplam {slides.length} slide
                </div>
                <Button asChild>
                    <Link href="/admin/hero-slides/create">Yeni slide</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                        <tr>
                            <th className="px-5 py-3">Baslik</th>
                            <th className="px-5 py-3">Alt Baslik</th>
                            <th className="px-5 py-3">Sira</th>
                            <th className="px-5 py-3">Gorsel</th>
                            <th className="px-5 py-3">Video</th>
                            <th className="px-5 py-3 text-right">Islem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {slides.map((slide) => {
                            const preview =
                                slide.image ?? slide.poster ?? null;

                            return (
                                <tr key={slide.id} className="text-gray-700">
                                    <td className="px-5 py-4">
                                        <div className="font-medium text-gray-900">
                                            {slide.title}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {slide.subtitle || '-'}
                                    </td>
                                    <td className="px-5 py-4">
                                        {slide.sort_order ?? 0}
                                    </td>
                                    <td className="px-5 py-4">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt={slide.title}
                                                className="h-12 w-20 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        {slide.video ? (
                                            <a
                                                href={slide.video}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs font-semibold text-red-600 hover:text-red-700"
                                            >
                                                Videoyu ac
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/hero-slides/${slide.id}/edit`}
                                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                                            >
                                                Duzenle
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(slide.id)
                                                }
                                                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {slides.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-5 py-10 text-center text-sm text-gray-500"
                                >
                                    Henuz slide eklenmedi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
