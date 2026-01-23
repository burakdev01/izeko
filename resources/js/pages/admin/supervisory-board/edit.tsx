import BoardMemberForm from '@/components/admin/board-member-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type Member = {
    id: number;
    name: string;
    title: string;
    image: string | null;
    active: boolean;
};

type Props = {
    member: Member;
};

export default function SupervisoryBoardEdit({ member }: Props) {
    return (
        <AdminLayout title="Üye Düzenle">
            <Head title="Üye Düzenle" />
            <BoardMemberForm
                title="Üye Düzenle"
                description="Denetim kurulu üyesini düzenleyin."
                action={route('admin.supervisory-board.update', member.id)}
                method="put"
                submitLabel="Güncelle"
                cancelHref={route('admin.supervisory-board.index')}
                member={member}
            />
        </AdminLayout>
    );
}
