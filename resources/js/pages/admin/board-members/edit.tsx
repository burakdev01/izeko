import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type BoardMember = {
    id: number;
    name: string;
    title: string;
    image?: string | null;
    active: boolean;
};

type BoardMemberEditProps = {
    member: BoardMember;
};

export default function BoardMemberEdit({ member }: BoardMemberEditProps) {
    return (
        <AdminLayout title="Üye Düzenle">
            <Head title="Üye Düzenle" />
            <BoardMemberForm
                title="Üye Düzenle"
                description="Yönetim kurulu üyesi bilgilerini güncelleyin."
                action={`/admin/board-members/${member.id}`}
                method="put"
                submitLabel="Güncelle"
                cancelHref="/admin/board-members"
                member={member}
            />
        </AdminLayout>
    );
}
