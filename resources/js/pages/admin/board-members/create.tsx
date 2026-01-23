import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function BoardMemberCreate() {
    return (
        <AdminLayout title="Yeni Üye Ekle">
            <Head title="Yeni Üye Ekle" />
            <BoardMemberForm
                title="Yeni Üye Ekle"
                description="Yeni yönetim kurulu üyesi bilgilerini girin."
                action="/admin/board-members"
                cancelHref="/admin/board-members"
            />
        </AdminLayout>
    );
}
