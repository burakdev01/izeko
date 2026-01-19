import HeroSlideForm from '@/components/admin/hero-slide-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function HeroSlidesCreate() {
    return (
        <AdminLayout title="Slider Ekle">
            <Head title="Slider Ekle" />
            <HeroSlideForm
                title="Slider Ekle"
                description="Anasayfa slider alanına yeni bir slayt ekleyin."
                action="/admin/hero-slides"
                cancelHref="/admin/hero-slides"
            />
        </AdminLayout>
    );
}
