import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
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
    tone: string;
}

const quickLinks = [
    {
        label: 'Faaliyetler',
        href: '/admin/faaliyetler',
        description: 'Video ve etkinlikleri duzenleyin.',
        icon: Calendar,
    },
    {
        label: 'Blog & Haberler',
        href: '/admin/haberler',
        description: 'Haberleri guncel tutun.',
        icon: PenTool,
    },
    {
        label: 'Canli Yayinlar',
        href: '/admin/canli-yayinlar',
        description: 'Yayin listelerini yonetin.',
        icon: Video,
    },
    {
        label: 'Duyurular',
        href: '/admin/duyurular',
        description: 'Ozel duyurulari planlayin.',
        icon: Bell,
    },
    {
        label: 'Hero Slider',
        href: '/admin/hero-slides',
        description: 'Ana sayfa sliderini guncelleyin.',
        icon: Image,
    },
];

const summaryCards: SummaryCard[] = [
    {
        label: 'Faaliyetler',
        description: 'Kayıtlı toplam faaliyet',
        href: '/admin/faaliyetler',
        countKey: 'activityCount',
        tone: 'from-slate-900 via-slate-900 to-slate-800',
    },
    {
        label: 'Blog & Haberler',
        description: 'Yayında olan haber',
        href: '/admin/haberler',
        countKey: 'blogCount',
        tone: 'from-slate-900 via-slate-800 to-slate-700',
    },
    {
        label: 'Canli Yayinlar',
        description: 'Planlanan yayınlar',
        href: '/admin/canli-yayinlar',
        countKey: 'liveStreamCount',
        tone: 'from-slate-900 via-slate-800 to-slate-700',
    },
    // {
    //     label: 'Duyurular',
    //     description: 'Aktif duyuru',
    //     href: '/admin/duyurular',
    //     countKey: 'announcementCount',
    //     tone: 'from-slate-900 via-slate-800 to-slate-700',
    // },
    // {
    //     label: 'Hero Slider',
    //     description: 'Slide sayisi',
    //     href: '/admin/hero-slides',
    //     countKey: 'heroSlideCount',
    //     tone: 'from-slate-900 via-slate-800 to-slate-700',
    // },
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
            description="Yonetim paneline hos geldiniz."
        >
            <Head title="Admin Panel" />
            <div className="space-y-6">
                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {summaryCards.map((card) => (
                        <div
                            key={card.href}
                            className={`rounded-2xl bg-gradient-to-br ${card.tone} p-6 text-white shadow-lg`}
                        >
                            <p className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                                {card.label}
                            </p>
                            <p className="mt-3 text-3xl font-semibold">
                                {countMap[card.countKey]}
                            </p>
                            <p className="mt-1 text-sm text-white/70">
                                {card.description}
                            </p>
                            {/* <Link
                                href={card.href}
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200"
                            >
                                Listeyi gor
                            </Link> */}
                        </div>
                    ))}
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">
                            Hizli Erisim
                        </h3>
                        <span className="text-xs font-medium text-slate-400">
                            Kisa yollar
                        </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {quickLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
