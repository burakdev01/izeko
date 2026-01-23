import BankAccountForm from '@/components/admin/bank-account-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type BankAccount = {
    id: number;
    bank_name: string;
    branch_name: string;
    branch_code: string;
    account_no: string;
    iban: string;
    account_name: string;
    description?: string | null;
    image?: string | null;
    active: boolean;
};

type Props = {
    account: BankAccount;
};

export default function BankAccountsEdit({ account }: Props) {
    return (
        <AdminLayout title="Banka Hesabı Düzenle">
            <Head title="Banka Hesabı Düzenle" />
            <BankAccountForm
                title="Hesap Düzenle"
                description="Banka hesabı bilgilerini düzenleyin."
                action={route('admin.bank-accounts.update', account.id)}
                method="put"
                submitLabel="Güncelle"
                cancelHref={route('admin.bank-accounts.index')}
                account={account}
            />
        </AdminLayout>
    );
}
