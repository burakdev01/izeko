import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

interface AdminDashboardProps {
    activityCount: number;
}

export default function AdminDashboard({ activityCount }: AdminDashboardProps) {
    return (
        <AdminLayout
            title="Dashboard"
            description="Yonetim paneline hos geldiniz."
        >
            <Head title="Admin Panel" />
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Faaliyetler
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                        {activityCount}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Toplam faaliyet kaydi
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
