import AdminQuickLink from '@/components/admin/admin-quick-link';
import AdminStatCard from '@/components/admin/admin-stat-card';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, Image, PenTool, Video } from 'lucide-react';

interface AdminDashboardProps {
    activityCount: number;
    blogCount: number;
    liveStreamCount: number;
    announcementCount: number;
    heroSlideCount: number;
}

type CountKey =
    | 'activityCount'
    | 'blogCount'
    | 'liveStreamCount'
    | 'announcementCount'
    | 'heroSlideCount';

interface SummaryCard {
    label: string;
    description: string;
    href: string;
    countKey: CountKey;
    className?: string;
}

const quickLinks = [
    {
        label: 'Faaliyetler',
        href: '/admin/faaliyetler',
        description: 'Video ve etkinlikleri düzenleyin.',
        icon: Calendar,
    },
    {
        label: 'Blog & Haberler',
        href: '/admin/haberler',
        description: 'Haberleri güncel tutun.',
        icon: PenTool,
    },
    {
        label: 'Canlı Yayınlar',
        href: '/admin/canli-yayinlar',
        description: 'Yayın listelerini yönetin.',
        icon: Video,
    },
    {
        label: 'Duyurular',
        href: '/admin/duyurular',
        description: 'Özel duyuruları planlayın.',
        icon: Bell,
    },
    {
        label: 'Hero Slider',
        href: '/admin/hero-slides',
        description: 'Ana sayfa sliderını güncelleyin.',
        icon: Image,
    },
];

const summaryCards: SummaryCard[] = [
    {
        label: 'Faaliyetler',
        description: 'Kayıtlı toplam faaliyet',
        href: '/admin/faaliyetler',
        countKey: 'activityCount',
    },
    {
        label: 'Blog & Haberler',
        description: 'Yayında olan haber',
        href: '/admin/haberler',
        countKey: 'blogCount',
        className: 'from-slate-900 via-slate-800 to-slate-700',
    },
    {
        label: 'Canlı Yayınlar',
        description: 'Planlanan yayınlar',
        href: '/admin/canli-yayinlar',
        countKey: 'liveStreamCount',
        className: 'from-slate-900 via-slate-800 to-slate-700',
    },
    {
        label: 'Duyurular',
        description: 'Aktif duyuru',
        href: '/admin/duyurular',
        countKey: 'announcementCount',
        className: 'from-slate-900 via-slate-800 to-slate-700',
    },
    {
        label: 'Hero Slider',
        description: 'Slide sayısı',
        href: '/admin/hero-slides',
        countKey: 'heroSlideCount',
        className: 'from-slate-900 via-slate-800 to-slate-700',
    },
];

export default function AdminDashboard({
    activityCount,
    blogCount,
    liveStreamCount,
    announcementCount,
    heroSlideCount,
}: AdminDashboardProps) {
    const countMap: Record<CountKey, number> = {
        activityCount,
        blogCount,
        liveStreamCount,
        announcementCount,
        heroSlideCount,
    };

    return (
        <AdminLayout
            title="Dashboard"
            description="Yönetim paneline hoş geldiniz."
        >
            <Head title="Admin Panel" />
            <div className="space-y-6">
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {summaryCards.map((card) => (
                        <AdminStatCard
                            key={card.href}
                            label={card.label}
                            count={countMap[card.countKey]}
                            description={card.description}
                            href={card.href}
                            className={card.className}
                        />
                    ))}
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">
                            Hızlı Erişim
                        </h3>
                        <span className="text-xs font-medium text-slate-400">
                            Kısa yollar
                        </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {quickLinks.map((item) => (
                            <AdminQuickLink
                                key={item.href}
                                label={item.label}
                                description={item.description}
                                href={item.href}
                                icon={item.icon}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
