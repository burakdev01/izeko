import FaqForm from '@/components/admin/faq-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function SssCreate() {
    return (
        <AdminLayout title="Soru Ekle">
            <Head title="Soru Ekle" />
            <FaqForm
                title="Soru Ekle"
                description={`Soru ve cevaplar\u0131 buradan ekleyebilirsiniz.`}
                action="/admin/sss"
                method="post"
            />
        </AdminLayout>
    );
}
