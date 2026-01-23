import RegistrationFeeForm from '@/components/admin/registration-fee-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AdminLayout title="Yeni Kayıt Ücreti Ekle">
            <Head title="Yeni Kayıt Ücreti Ekle" />

            <RegistrationFeeForm
                title="Yeni Kayıt Ücreti Ekle"
                action={route('admin.registration-fees.store')}
            />
        </AdminLayout>
    );
}
