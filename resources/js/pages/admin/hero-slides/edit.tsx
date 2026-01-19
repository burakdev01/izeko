import HeroSlideForm from '@/components/admin/hero-slide-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type HeroSlide = {
    id: number;
    title: string;
    subtitle?: string | null;
    image?: string | null;
    video?: string | null;
    poster?: string | null;
    sort_order?: number | null;
};

type HeroSlidesEditProps = {
    slide: HeroSlide;
};

export default function HeroSlidesEdit({ slide }: HeroSlidesEditProps) {
    return (
        <AdminLayout title="Slider Düzenle">
            <Head title="Slider Düzenle" />
            <HeroSlideForm
                title="Slider Düzenle"
                description="Slider içeriğini buradan güncelleyebilirsiniz."
                action={`/admin/hero-slides/${slide.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/hero-slides"
                slide={slide}
            />
        </AdminLayout>
    );
}
