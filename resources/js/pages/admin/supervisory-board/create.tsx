import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function SupervisoryBoardCreate() {
    return (
        <AdminLayout title="Yeni Denetim Kurulu Üyesi">
            <Head title="Yeni Denetim Kurulu Üyesi" />
            <BoardMemberForm
                title="Yeni Üye Ekle"
                description="Denetim kuruluna yeni bir üye ekleyin."
                action={route('admin.supervisory-board.store')}
                cancelHref={route('admin.supervisory-board.index')}
            />
        </AdminLayout>
    );
}
