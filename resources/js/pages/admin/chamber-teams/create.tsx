import ChamberTeamForm from '@/components/admin/chamber-team-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function ChamberTeamCreate() {
    return (
        <AdminLayout title="Yeni Üye Ekle">
            <Head title="Yeni Üye Ekle" />
            <ChamberTeamForm
                title="Yeni Üye Ekle"
                description="Oda ekibine yeni bir üye ekleyin."
                action="/admin/chamber-teams"
                submitLabel="Oluştur"
                cancelHref="/admin/chamber-teams"
            />
        </AdminLayout>
    );
}
