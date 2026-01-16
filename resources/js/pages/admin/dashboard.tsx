import AdminLayout from '@/layouts/admin-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, CalendarCheck, PlusCircle, Radio } from 'lucide-react';

type DashboardProps = {
    stats: {
        activities: number;
        streams: number;
        posts: number;
    };
};

const statStyles = {
    blue: {
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
    },
    purple: {
        icon: 'text-purple-600',
        iconBg: 'bg-purple-100',
    },
    orange: {
        icon: 'text-orange-600',
        iconBg: 'bg-orange-100',
    },
};

export default function AdminDashboard({ stats }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const userName = auth?.user?.name || 'Admin';

    const cards = [
        {
            label: 'Toplam Faaliyetler',
            value: stats.activities,
            change: '+12%',
            icon: CalendarCheck,
            tone: 'blue' as const,
        },
        {
            label: 'Toplam Canlı Yayınlar',
            value: stats.streams,
            change: '+8%',
            icon: Radio,
            tone: 'purple' as const,
        },
        {
            label: 'Blog Yazısı',
            value: stats.posts,
            change: '+15%',
            icon: BookOpen,
            tone: 'orange' as const,
        },
    ];

    const quickActions = [
        {
            href: '/admin/haberler/create',
            label: 'Yeni Blog Yazısı',
        },
        {
            href: '/admin/faaliyetler/create',
            label: 'Yeni Faaliyet',
        },
        {
            href: '/admin/canli-yayinlar/create',
            label: 'Yeni Canlı Yayın',
        },
        {
            href: '/admin/duyurular/create',
            label: 'Yeni Duyuru',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <h1 className="mb-2 text-2xl font-bold md:text-3xl">
                        Hoş Geldiniz, {userName}!
                    </h1>
                    <p className="text-blue-100">
                        Yönetim paneline hoş geldiniz. Güncel durumu buradan
                        takip edebilirsiniz.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        const styles = statStyles[card.tone];
                        return (
                            <div
                                key={card.label}
                                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${styles.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${styles.icon}`}
                                        />
                                    </div>
                                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                                        {card.change}
                                    </span>
                                </div>
                                <h3 className="mb-1 text-2xl font-bold text-black">
                                    {card.value}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {card.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-semibold text-black">
                            Hızlı İşlemler
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {quickActions.map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className="group flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-blue-500 hover:bg-blue-50"
                                >
                                    <PlusCircle className="mb-2 h-8 w-8 text-gray-400 transition group-hover:text-blue-500" />
                                    <span className="text-sm font-medium text-gray-700 transition group-hover:text-blue-600">
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
