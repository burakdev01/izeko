import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Globe, Mail, Phone, Trash2 } from 'lucide-react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    created_at: string;
    ip_address: string | null;
}

interface PageProps {
    message: ContactMessage;
}

export default function ContactMessageShow({ message }: PageProps) {
    const handleDelete = () => {
        if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
            router.delete(route('admin.iletisim.destroy', message.id));
        }
    };

    return (
        <AdminLayout title="Mesaj Detayı">
            <Head title={`Mesaj: ${message.subject || 'Konusuz'}`} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <Link
                        href={route('admin.iletisim.index')}
                        className="flex items-center gap-2 text-gray-500 transition hover:text-gray-800"
                    >
                        <ArrowLeft size={20} />
                        <span>Listeye Dön</span>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    >
                        <Trash2 size={18} />
                        Mesajı Sil
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Gönderen Bilgisi Header */}
                    <div className="bg-gray-50 p-6 md:p-8">
                        <div className="flex flex-col justify-between gap-6 md:flex-row">
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold text-red-600 shadow-sm">
                                    {message.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                                        {message.name}
                                    </h1>
                                    <div className="mt-2 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={16} />
                                            {message.email}
                                        </div>
                                        {message.phone && (
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={16} />
                                                {message.phone}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 text-right text-sm text-gray-500">
                                <div className="flex items-center justify-end gap-1.5">
                                    <Calendar size={16} />
                                    {new Date(
                                        message.created_at,
                                    ).toLocaleString('tr-TR', {
                                        dateStyle: 'long',
                                        timeStyle: 'short',
                                    })}
                                </div>
                                {message.ip_address && (
                                    <div className="flex items-center justify-end gap-1.5">
                                        <Globe size={16} />
                                        IP: {message.ip_address}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mesaj İçeriği */}
                    <div className="p-6 md:p-8">
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                            Konu: {message.subject || 'Belirtilmemiş'}
                        </h3>
                        <div className="prose max-w-none whitespace-pre-line text-gray-800">
                            {message.message}
                        </div>
                    </div>

                    {/* Footer Actions (Mailto) */}
                    <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
                        <a
                            href={`mailto:${message.email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            <Mail size={18} />
                            Yanıtla
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
