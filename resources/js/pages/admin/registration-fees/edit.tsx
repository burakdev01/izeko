import RegistrationFeeForm from '@/components/admin/registration-fee-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type RegistrationFee = {
    id?: number;
    category: string;
    newspaper_fee?: string | null;
    tax_fee?: string | null;
    registration_fee?: string | null;
    service_fee?: string | null;
    total?: string | null;
    active?: boolean;
};

type Props = {
    fee: RegistrationFee;
};

export default function Edit({ fee }: Props) {
    return (
        <AdminLayout title="Kayıt Ücreti Düzenle">
            <Head title="Kayıt Ücreti Düzenle" />

            <RegistrationFeeForm
                title="Kayıt Ücreti Düzenle"
                action={route('admin.registration-fees.update', fee.id)}
                method="put"
                submitLabel="Güncelle"
                fee={fee}
            />
        </AdminLayout>
    );
}
