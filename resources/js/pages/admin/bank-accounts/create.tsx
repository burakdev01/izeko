import BankAccountForm from '@/components/admin/bank-account-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function BankAccountsCreate() {
    return (
        <AdminLayout title="Yeni Banka Hesabı">
            <Head title="Yeni Banka Hesabı" />
            <BankAccountForm
                title="Yeni Hesap Ekle"
                description="Yeni bir banka hesabı ekleyin."
                action={route('admin.bank-accounts.store')}
                cancelHref={route('admin.bank-accounts.index')}
            />
        </AdminLayout>
    );
}
