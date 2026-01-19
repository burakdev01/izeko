import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type HeroSlide = {
    id: number;
    title: string;
    subtitle?: string | null;
    image?: string | null;
    video?: string | null;
    poster?: string | null;
    sort_order?: number | null;
};

type HeroSlidesIndexProps = {
    slides: HeroSlide[];
};

const placeholderImage = 'https://via.placeholder.com/96?text=Slide';

const getSlidePreview = (slide: HeroSlide) =>
    slide.image || slide.poster || placeholderImage;

export default function HeroSlidesIndex({ slides }: HeroSlidesIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: slides,
        reorderUrl: '/admin/hero-slides/reorder',
    });

    return (
        <AdminLayout title="Slider Yönetimi">
            <Head title="Slider Yönetimi" />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title="Slider Yönetimi"
                        description="Anasayfa slider alanındaki içerikleri buradan yönetebilirsiniz."
                        actionLabel="Yeni Slayt"
                        actionHref="/admin/hero-slides/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500" />
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Tür
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Önizleme
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Henüz slider içeriği eklenmemiş.
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((slide) => {
                                    const preview = getSlidePreview(slide);
                                    const hasVideo = Boolean(slide.video);

                                    return (
                                        <tr
                                            key={slide.id}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop(slide.id)}
                                            className={`transition ${
                                                draggedId === slide.id
                                                    ? 'bg-blue-50'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <td className="px-4 py-4">
                                                <div
                                                    className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                    draggable
                                                    onDragStart={handleDragStart(
                                                        slide.id,
                                                    )}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <GripVertical className="h-4 w-4" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {slide.title}
                                                    </span>
                                                    {slide.subtitle ? (
                                                        <span className="text-xs text-gray-500">
                                                            {slide.subtitle}
                                                        </span>
                                                    ) : null}
                                                    {slide.video ? (
                                                        <span className="max-w-xs truncate text-xs text-gray-400">
                                                            {slide.video}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        hasVideo
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}
                                                >
                                                    {hasVideo
                                                        ? 'Video'
                                                        : 'Görsel'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        src={preview}
                                                        alt={slide.title}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <AdminRowActions
                                                    editHref={`/admin/hero-slides/${slide.id}/edit`}
                                                    deleteHref={`/admin/hero-slides/${slide.id}`}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
