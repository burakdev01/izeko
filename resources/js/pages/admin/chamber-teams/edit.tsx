import ChamberTeamForm from '@/components/admin/chamber-team-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type ChamberTeamMember = {
    id: number;
    name: string;
    title: string;
    image?: string | null;
    active: boolean;
};

type ChamberTeamEditProps = {
    member: ChamberTeamMember;
};

export default function ChamberTeamEdit({ member }: ChamberTeamEditProps) {
    return (
        <AdminLayout title="Üye Düzenle">
            <Head title="Üye Düzenle" />
            <ChamberTeamForm
                title="Üye Düzenle"
                description="Ekip üyesi bilgilerini güncelleyin."
                action={`/admin/chamber-teams/${member.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/chamber-teams"
                member={member}
            />
        </AdminLayout>
    );
}
