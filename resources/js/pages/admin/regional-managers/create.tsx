import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function RegionalManagersCreate() {
    return (
        <AdminLayout title="Yeni Bölge Sorumlusu">
            <Head title="Yeni Bölge Sorumlusu" />
            <BoardMemberForm
                title="Yeni Sorumlu Ekle"
                description="Yeni bir bölge sorumlusu ekleyin."
                action={route('admin.regional-managers.store')}
                cancelHref={route('admin.regional-managers.index')}
                showImage={false}
            />
        </AdminLayout>
    );
}
