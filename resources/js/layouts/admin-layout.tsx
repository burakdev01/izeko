import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    CalendarCheck,
    HelpCircle,
    Home,
    LogOut,
    Megaphone,
    Menu,
    Radio,
    Settings,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';

type AdminLayoutProps = {
    title?: string;
    children: ReactNode;
};

const navItems = [
    {
        href: '/admin',
        label: 'Ana Sayfa',
        icon: Home,
    },
    {
        href: '/admin/hero-slides',
        label: 'Slider Yönetimi',
        icon: SlidersHorizontal,
    },
    {
        href: '/admin/haberler',
        label: 'Blog Yönetimi',
        icon: BookOpen,
    },
    {
        href: '/admin/faaliyetler',
        label: 'Faaliyetler',
        icon: CalendarCheck,
    },
    {
        href: '/admin/canli-yayinlar',
        label: 'Canlı Yayınlar',
        icon: Radio,
    },
    {
        href: '/admin/duyurular',
        label: 'Duyurular',
        icon: Megaphone,
    },
    {
        href: '/admin/sss',
        label: 'SSS',
        icon: HelpCircle,
    },
];

export default function AdminLayout({
    title = 'Dashboard',
    children,
}: AdminLayoutProps) {
    const page = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = useMemo(
        () => page.url.split('?')[0] ?? '',
        [page.url],
    );

    const isActive = (href: string) =>
        href === '/admin' ? currentPath === href : currentPath.startsWith(href);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">
            <div className="flex min-h-screen overflow-hidden">
                <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-gray-200 bg-white">
                    <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600">
                                <span className="text-xl font-bold text-white">
                                    İZ
                                </span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-black">
                                    İZEKO
                                </h1>
                                <p className="text-xs text-gray-500">Yönetim</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-3 py-4">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`mb-1 flex items-center space-x-3 rounded-lg px-4 py-3 transition ${
                                        active
                                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div
                    className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${
                        mobileOpen ? 'block' : 'hidden'
                    }`}
                    onClick={() => setMobileOpen(false)}
                />

                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 lg:hidden ${
                        mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600">
                                <span className="text-xl font-bold text-white">
                                    İZ
                                </span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-black">
                                    İZEKO
                                </h1>
                                <p className="text-xs text-gray-500">Yönetim</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="sr-only">Menüyü kapat</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-3 py-4">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`mb-1 flex items-center space-x-3 rounded-lg px-4 py-3 transition ${
                                        active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div className="flex flex-1 flex-col overflow-hidden">
                    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
                        <div className="flex items-center space-x-4">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-gray-800 lg:hidden"
                                onClick={() => setMobileOpen(true)}
                            >
                                <span className="sr-only">Menüyü aç</span>
                                <Menu className="h-5 w-5" />
                            </button>
                            <h2 className="hidden text-xl font-semibold text-black sm:block">
                                {title}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <button
                                type="button"
                                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <Bell className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <Settings className="h-5 w-5" />
                            </button>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                            >
                                <LogOut className="h-5 w-5" />
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
