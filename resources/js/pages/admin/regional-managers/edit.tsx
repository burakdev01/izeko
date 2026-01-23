import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type Manager = {
    id: number;
    name: string;
    title: string;
    image: string | null;
    active: boolean;
};

type Props = {
    manager: Manager;
};

export default function RegionalManagersEdit({ manager }: Props) {
    return (
        <AdminLayout title="Bölge Sorumlusu Düzenle">
            <Head title="Bölge Sorumlusu Düzenle" />
            <BoardMemberForm
                title="Sorumlu Düzenle"
                description="Bölge sorumlusu bilgilerini düzenleyin."
                action={route('admin.regional-managers.update', manager.id)}
                method="put"
                submitLabel="Güncelle"
                cancelHref={route('admin.regional-managers.index')}
                member={manager}
                showImage={false}
            />
        </AdminLayout>
    );
}
