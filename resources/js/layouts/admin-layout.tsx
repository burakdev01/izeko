import { useInitials } from '@/hooks/use-initials';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    Image,
    LayoutGrid,
    LogOut,
    PenTool,
    Video,
} from 'lucide-react';
import { type PropsWithChildren } from 'react';

type AdminLayoutProps = PropsWithChildren<{
    title: string;
    description?: string;
}>;

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { label: 'Faaliyetler', href: '/admin/faaliyetler', icon: Calendar },
    { label: 'Blog & Haberler', href: '/admin/haberler', icon: PenTool },
    { label: 'Canli Yayinlar', href: '/admin/canli-yayinlar', icon: Video },
    { label: 'Duyurular', href: '/admin/duyurular', icon: Bell },
    { label: 'Slider', href: '/admin/hero-slides', icon: Image },
];

export default function AdminLayout({
    title,
    description,
    children,
}: AdminLayoutProps) {
    const page = usePage<SharedData>();
    const currentUrl = page.url;
    const user = page.props.auth?.user;
    const getInitials = useInitials();
    const initials = user?.name ? getInitials(user.name) : 'AD';

    return (
        <div className="relative min-h-screen bg-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.12),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(15,23,42,0.08),_transparent_50%)]" />
            <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:py-10">
                <aside className="flex flex-col gap-6 rounded-3xl bg-slate-950/95 p-5 text-slate-200 shadow-xl ring-1 ring-slate-800/60 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-72">
                    <div className="rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-rose-600 p-4 text-white shadow-lg">
                        <div className="text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
                            IZEKO
                        </div>
                        <div className="mt-2 text-lg font-semibold">
                            Yönetici Paneli
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80 uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            Aktif Oturum
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive =
                                currentUrl === item.href ||
                                currentUrl.startsWith(`${item.href}/`);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10 before:absolute before:top-1/2 before:left-0 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-red-400'
                                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto rounded-2xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white uppercase">
                                {initials}
                            </div>
                            <div>
                                <div className="text-xs tracking-wide text-slate-400 uppercase">
                                    Giriş yapan kullanıcı
                                </div>
                                <div className="text-sm font-semibold text-white">
                                    {user?.name ?? 'Admin'}
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Çıkış yap
                        </Link>
                    </div>
                </aside>

                <main className="flex-1 space-y-6">
                    <header className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
                                    Yonetim
                                </p>
                                <h1 className="mt-2 text-2xl font-semibold text-slate-900">
                                    {title}
                                </h1>
                                {description ? (
                                    <p className="mt-2 text-sm text-slate-500">
                                        {description}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </header>

                    {children}
                </main>
            </div>
        </div>
    );
}
