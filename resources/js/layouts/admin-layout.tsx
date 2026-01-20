import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    CalendarCheck,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    ClipboardList,
    HelpCircle,
    Home,
    List,
    LogOut,
    Megaphone,
    Menu,
    Radio,
    Settings,
    SlidersHorizontal,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';

type AdminLayoutProps = {
    title?: string;
    children: ReactNode;
};

type NavItem = {
    href?: string;
    label: string;
    icon: LucideIcon;
    children?: NavItem[];
};

const navItems: NavItem[] = [
    {
        href: '/admin',
        label: 'Ana Sayfa',
        icon: Home,
    },
    {
        label: 'İlan Yönetimi',
        icon: List,
        children: [
            {
                href: '/admin/ilanlar?status=pending',
                label: 'Onay Bekleyenler',
                icon: ClipboardList,
            },
            {
                href: '/admin/ilanlar?status=active',
                label: 'Aktif İlanlar',
                icon: CheckCircle,
            },
            {
                href: '/admin/ilanlar',
                label: 'Tüm İlanlar',
                icon: List,
            },
        ],
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

const SidebarItem = ({
    item,
    isActive,
    currentPath,
    onMobileClick,
}: {
    item: NavItem;
    isActive: (href: string) => boolean;
    currentPath: string;
    onMobileClick?: () => void;
}) => {
    // Check if any child is active to auto-expand
    const isChildActive =
        item.children?.some((child) => child.href && isActive(child.href)) ??
        false;

    const [isOpen, setIsOpen] = useState(isChildActive);
    const Icon = item.icon;

    if (item.children) {
        return (
            <div className="mb-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-2 transition hover:bg-[#FCE9EA] hover:text-[#da1f25]"
                >
                    <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="text-base">{item.label}</span>
                    </div>
                    {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </button>
                {isOpen && (
                    <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                        {item.children.map((child) => (
                            <Link
                                key={child.href}
                                href={child.href!}
                                className={`flex items-center space-x-3 rounded-lg px-4 py-2 text-sm transition ${
                                    isActive(child.href!)
                                        ? 'bg-[#FCE9EA] text-[#da1f25]'
                                        : 'hover:bg-[#FCE9EA] hover:text-[#da1f25]'
                                }`}
                                onClick={onMobileClick}
                            >
                                {child.icon && (
                                    <child.icon className="h-4 w-4" />
                                )}
                                <span className="text-base">{child.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const active = item.href ? isActive(item.href) : false;

    return (
        <Link
            href={item.href!}
            className={`mb-1 flex items-center space-x-3 rounded-lg px-4 py-2 transition ${
                active
                    ? 'bg-[#FCE9EA] text-[#da1f25]'
                    : 'hover:bg-[#FCE9EA] hover:text-[#da1f25]'
            }`}
            onClick={onMobileClick}
        >
            <Icon className="h-5 w-5" />
            <span className="text-base">{item.label}</span>
        </Link>
    );
};

export default function AdminLayout({
    title = 'Dashboard',
    children,
}: AdminLayoutProps) {
    const page = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = useMemo(() => page.url.split('?')[0] ?? '', [page.url]);

    const isActive = (href: string) => {
        const [hrefPath, hrefQuery] = href.split('?');
        const [currentUrlPath, currentUrlQuery] = page.url.split('?');

        if (href === '/admin') return currentUrlPath === href;

        // If the item has query params (like status=pending)
        if (hrefQuery) {
            return page.url.includes(hrefQuery) && currentUrlPath === hrefPath;
        }

        // Special handling for "Tüm İlanlar" (listings)
        // If we are on listings page BUT have a status param, "All" should not be active
        if (href === '/admin/ilanlar' && page.url.includes('status=')) {
            return false;
        }

        return currentPath.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">
            <div className="flex min-h-screen overflow-hidden">
                <aside className="hidden border-r border-gray-200 bg-white lg:flex lg:w-64 lg:flex-col">
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
                        {navItems.map((item, index) => (
                            <SidebarItem
                                key={index}
                                item={item}
                                isActive={isActive}
                                currentPath={currentPath}
                            />
                        ))}
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
                        {navItems.map((item, index) => (
                            <SidebarItem
                                key={index}
                                item={item}
                                isActive={isActive}
                                currentPath={currentPath}
                                onMobileClick={() => setMobileOpen(false)}
                            />
                        ))}
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
