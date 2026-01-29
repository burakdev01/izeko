import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Toaster } from '@/components/ui/sonner';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Banknote,
    BookOpen,
    Building,
    CalendarCheck,
    CheckCircle,
    ChevronDown,
    ClipboardList,
    HelpCircle,
    Home,
    List,
    LogOut,
    Mail,
    MapPin,
    Megaphone,
    Menu,
    MessageSquare,
    Radio,
    SlidersHorizontal,
    User,
    Users,
    X,
    XCircle,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

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

type NavGroup = {
    title: string;
    items: NavItem[];
};

const navGroups: NavGroup[] = [
    {
        title: 'CRM Yönetimi',
        items: [
            {
                href: '/admin/ofisler',
                label: 'Ofis Yönetimi',
                icon: Building,
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
                        href: '/admin/ilanlar?status=inactive',
                        label: 'Pasif İlanlar',
                        icon: XCircle,
                    },
                    {
                        href: '/admin/ilanlar',
                        label: 'Tüm İlanlar',
                        icon: List,
                    },
                ],
            },
            {
                label: 'Bildirim Sistemi',
                icon: Megaphone,
                children: [
                    {
                        href: '/admin/bildirimler/email',
                        label: 'Email Bildirimleri',
                        icon: Mail,
                    },
                    {
                        href: '/admin/bildirimler/sms',
                        label: 'SMS Bildirimleri',
                        icon: MessageSquare,
                    },
                    // {
                    //     href: '/admin/bildirimler/push',
                    //     label: 'Push Bildirim',
                    //     icon: Megaphone,
                    // },
                ],
            },
            {
                label: 'Kullanıcı Yönetimi',
                icon: Users,
                children: [
                    {
                        href: '/admin/kullanicilar?status=pending',
                        label: 'Onay Bekleyenler',
                        icon: ClipboardList,
                    },
                    {
                        href: '/admin/kullanicilar?status=active',
                        label: 'Aktif Kullanıcılar',
                        icon: CheckCircle,
                    },
                    {
                        href: '/admin/kullanicilar?status=passive',
                        label: 'Pasif Kullanıcılar',
                        icon: XCircle,
                    },
                    {
                        href: '/admin/kullanicilar',
                        label: 'Tüm Kullanıcılar',
                        icon: List,
                    },
                ],
            },
        ],
    },
    {
        title: 'Site Yönetimi',
        items: [
            {
                href: '/admin/spotlights',
                label: 'Manşet Yönetimi',
                icon: Megaphone,
            },
            {
                href: '/admin/hero-slides',
                label: 'Slider Yönetimi',
                icon: SlidersHorizontal,
            },
            {
                label: 'Kurumsal',
                icon: Building,
                children: [
                    {
                        href: '/admin/about-izeko/edit',
                        label: 'izeko.org.tr Nedir?',
                        icon: HelpCircle,
                    },
                    {
                        href: '/admin/why-choose-us/edit',
                        label: 'Neden Emlak Ofisi',
                        icon: HelpCircle,
                    },
                    {
                        href: '/admin/chairman-message',
                        label: 'Yön. Kur. Başkanımız',
                        icon: User,
                    },
                    {
                        href: '/admin/board-members',
                        label: 'Yönetim Kurulu',
                        icon: Users,
                    },
                    {
                        href: '/admin/supervisory-board',
                        label: 'Denetim Kurulu',
                        icon: Users,
                    },
                    {
                        href: '/admin/regional-managers',
                        label: 'Bölge Sorumlularımız',
                        icon: MapPin,
                    },
                    {
                        href: '/admin/bank-accounts',
                        label: 'Oda Hesap Numaraları',
                        icon: Banknote,
                    },
                    {
                        href: '/admin/registration-fees',
                        label: 'Kayıt Ücretleri',
                        icon: BookOpen,
                    },
                    {
                        href: '/admin/chamber-registration/edit',
                        label: 'Oda Kayıt İşlemleri',
                        icon: HelpCircle,
                    },
                    {
                        href: '/admin/chamber-teams',
                        label: 'Oda Ekibimiz',
                        icon: Users,
                    },
                ],
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
            {
                href: '/admin/iletisim',
                label: 'İletişim',
                icon: MessageSquare,
            },
        ],
    },
];

const SidebarItem = ({
    item,
    isActive,
    currentPath,
    onMobileClick,
    isOpen,
    onToggle,
}: {
    item: NavItem;
    isActive: (href: string) => boolean;
    currentPath: string;
    onMobileClick?: () => void;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const Icon = item.icon;

    if (item.children) {
        return (
            <Collapsible open={isOpen} onOpenChange={onToggle} className="mb-1">
                <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between rounded-lg px-4 py-2 transition hover:bg-[#FCE9EA] hover:text-[#da1f25]">
                        <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5" />
                            <span className="text-base">{item.label}</span>
                        </div>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
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
                </CollapsibleContent>
            </Collapsible>
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
    title = 'Anasayfa',
    children,
}: AdminLayoutProps) {
    const page = usePage<any>();
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = useMemo(() => page.url.split('?')[0] ?? '', [page.url]);

    useEffect(() => {
        if (page.props.flash?.success) {
            toast.success(page.props.flash.success);
        }
        if (page.props.flash?.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props.flash]);

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

        if (href === '/admin/kullanicilar' && page.url.includes('status=')) {
            return false;
        }

        return currentPath.startsWith(href);
    };

    // Initialize open menu state based on current path
    const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(() => {
        for (const group of navGroups) {
            const activeParent = group.items.find((item) =>
                item.children?.some(
                    (child) => child.href && isActive(child.href),
                ),
            );
            if (activeParent) return activeParent.label;
        }
        return null;
    });

    const handleMenuClick = (label: string) => {
        setOpenMenuLabel(openMenuLabel === label ? null : label);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">
            <Toaster position="top-right" richColors />
            <Head title={title} />
            <div className="flex min-h-screen overflow-hidden">
                <aside className="hidden border-r border-gray-200 bg-white lg:flex lg:w-64 lg:flex-col">
                    <div className="flex items-center justify-center border-b border-gray-200 px-6">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://izeko.deniz-web.com/public/themes/default/assets/images/izeko-logo.png"
                                alt=""
                                className="h-26"
                            />
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-3 py-4">
                        <SidebarItem
                            item={{
                                href: '/admin',
                                label: 'Ana Sayfa',
                                icon: Home,
                            }}
                            isActive={isActive}
                            currentPath={currentPath}
                            isOpen={false}
                            onToggle={() => {}}
                        />
                        <div className="my-2" />
                        {navGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="mb-6 last:mb-0">
                                <h3 className="mb-2 px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item, index) => (
                                        <SidebarItem
                                            key={index}
                                            item={item}
                                            isActive={isActive}
                                            currentPath={currentPath}
                                            isOpen={
                                                openMenuLabel === item.label
                                            }
                                            onToggle={() =>
                                                handleMenuClick(item.label)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
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
                    <div className="flex items-center justify-between border-b border-gray-200 px-6">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://izeko.deniz-web.com/public/themes/default/assets/images/izeko-logo.png"
                                alt=""
                                className="h-26"
                            />
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
                        <SidebarItem
                            item={{
                                href: '/admin',
                                label: 'Ana Sayfa',
                                icon: Home,
                            }}
                            isActive={isActive}
                            currentPath={currentPath}
                            onMobileClick={() => setMobileOpen(false)}
                            isOpen={false}
                            onToggle={() => {}}
                        />
                        <div className="my-2" />
                        {navGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="mb-6 last:mb-0">
                                <h3 className="mb-2 px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item, index) => (
                                        <SidebarItem
                                            key={index}
                                            item={item}
                                            isActive={isActive}
                                            currentPath={currentPath}
                                            onMobileClick={() =>
                                                setMobileOpen(false)
                                            }
                                            isOpen={
                                                openMenuLabel === item.label
                                            }
                                            onToggle={() =>
                                                handleMenuClick(item.label)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
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
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex items-center gap-2 rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                            >
                                Çıkış Yap <LogOut className="h-5 w-5" />
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
