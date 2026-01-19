import FaqForm from '@/components/admin/faq-form';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

type Faq = {
    id: number;
    question: string;
    answer: string;
    active?: boolean;
};

type SssEditProps = {
    faq: Faq;
};

export default function SssEdit({ faq }: SssEditProps) {
    return (
        <AdminLayout title={`Soru D\u00FCzenle`}>
            <Head title={`Soru D\u00FCzenle`} />
            <FaqForm
                title={`Soru D\u00FCzenle`}
                description={`Soru ve cevaplar\u0131 g\u00FCncelleyebilirsiniz.`}
                action={`/admin/sss/${faq.id}`}
                method="put"
                submitLabel={`G\u00FCncelle`}
                faq={faq}
            />
        </AdminLayout>
    );
}
