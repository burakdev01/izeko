import {
    Building2,
    ChevronDown,
    Home,
    Mail,
    Menu,
    Newspaper,
    PenTool,
    Scale,
    User,
    Video,
    X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

/* ---------------- TYPES ---------------- */

interface MenuItem {
    label: string;
    path: string;
    isHighlighted?: boolean;
}

interface NavItem {
    id: string;
    label: string;
    path?: string;
    icon: React.ReactNode;
    submenu?: MenuItem[];
}

/* ---------------- DATA ---------------- */

const navItems: NavItem[] = [
    {
        id: 'home',
        label: 'Anasayfa',
        path: '#anasayfa',
        icon: <Home className="h-5 w-5 text-red-600" />,
    },
    {
        id: 'corporate',
        label: 'Kurumsal',
        icon: <Building2 className="h-5 w-5 text-red-600" />,
        submenu: [
            {
                label: 'Yönetim Kurulu Başkanımız',
                path: '#yonetim-kurulu-baskanimiz',
            },
            { label: 'Yönetim Kurulu', path: '#yonetim-kurulu' },
            {
                label: 'Denetim Kurulu',
                path: '#denetim-kurulu',
                isHighlighted: true,
            },
            { label: 'Oda Ekibimiz', path: '#oda-ekibimiz' },
            { label: 'Bölge Sorumlularımız', path: '#bolge-sorumlularimiz' },
            { label: 'Oda Hesap Numaraları', path: '#oda-hesap-numaralari' },
            { label: 'Kayıt Ücretleri ve Aidat', path: '#kayit-ucretleri' },
            {
                label: 'Neden Emlak Ofisiyle Çalışmalısınız?',
                path: '#neden-emlak-ofisi',
            },
            { label: 'izeko.org.tr Nedir?', path: '#izeko-nedir' },
            { label: 'Oda Kayıt İşlemleri', path: '#oda-kayit-islemleri' },
        ],
    },
    {
        id: 'activities',
        label: 'Faaliyetler',
        path: '#faaliyetler',
        icon: <Newspaper className="h-5 w-5 text-red-600" />,
    },
    {
        id: 'blog',
        label: 'Blog & Haberler',
        path: '#blog',
        icon: <PenTool className="h-5 w-5 text-red-600" />,
    },
    {
        id: 'live',
        label: 'Canlı Yayınlar',
        path: '#canli-yayinlar',
        icon: <Video className="h-5 w-5 text-red-600" />,
    },
    {
        id: 'announcements',
        label: 'Duyurular',
        path: '#duyurular',
        icon: <Scale className="h-5 w-5 text-red-600" />,
    },
    {
        id: 'contact',
        label: 'İletişim',
        path: '#iletisim',
        icon: <Mail className="h-5 w-5 text-red-600" />,
    },
];

/* ---------------- COMPONENTS ---------------- */

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
}) => (
    <a
        href={href}
        className="text-xs font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-red-600 lg:text-sm xl:text-base"
    >
        {children}
    </a>
);

const DesktopDropdown: React.FC<{ submenu: MenuItem[] }> = ({ submenu }) => (
    <div className="invisible absolute top-full left-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {submenu.map((item, index) => (
            <a
                key={item.path}
                href={item.path}
                className={`block px-6 py-3 text-sm transition-colors ${
                    item.isHighlighted
                        ? 'border-l-4 border-l-red-600 bg-red-50 text-red-600 hover:bg-red-100'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                } ${index !== submenu.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
                {item.label}
            </a>
        ))}
    </div>
);

/* ---------------- MAIN ---------------- */

export default function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
        null,
    );

    const toggleMobileDropdown = (id: string) => {
        setMobileDropdownOpen((prev) => (prev === id ? null : id));
    };

    /* Body scroll lock */
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <img
                        src="https://izeko.org.tr/app/themes/default/assets/images/izeko-logo.png"
                        alt="IZEKO"
                        className="h-12 md:h-14 xl:h-16"
                    />

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-4 lg:flex xl:space-x-6">
                        {navItems.map((item) =>
                            item.submenu ? (
                                <div key={item.id} className="group relative">
                                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-600">
                                        {item.label}
                                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                    </button>
                                    <DesktopDropdown submenu={item.submenu} />
                                </div>
                            ) : (
                                <NavLink key={item.id} href={item.path!}>
                                    {item.label}
                                </NavLink>
                            ),
                        )}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-3">
                        {/* ODA CRM GİRİŞ – YERİ DEĞİŞMEDİ */}
                        <button className="flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700 lg:px-4 lg:text-sm xl:px-6 xl:text-base">
                            <User className="h-4 w-4" />
                            Oda CRM Giriş
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 lg:hidden"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ---------------- MOBILE MENU ---------------- */}
            {isMenuOpen && (
                <div
                    className="overflow-y-auto overscroll-contain border-t bg-white pb-24 lg:hidden"
                    style={{ maxHeight: 'calc(100vh - 80px)' }}
                >
                    <ul className="flex flex-col divide-y">
                        {navItems.map((item) => {
                            const isOpen = mobileDropdownOpen === item.id;

                            return (
                                <li key={item.id}>
                                    {/* Main row */}
                                    <button
                                        onClick={() =>
                                            item.submenu
                                                ? toggleMobileDropdown(item.id)
                                                : setIsMenuOpen(false)
                                        }
                                        className="flex w-full items-center justify-between px-5 py-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            {item.icon}
                                            <span className="text-base font-medium text-gray-700">
                                                {item.label}
                                            </span>
                                        </div>

                                        {item.submenu && (
                                            <ChevronDown
                                                className={`h-5 w-5 text-gray-500 transition-transform ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        )}
                                    </button>

                                    {/* SUBMENU */}
                                    {item.submenu && isOpen && (
                                        <div className="relative mt-2 mb-4 ml-10">
                                            <span className="absolute top-0 left-0 h-full border-l-2 border-dashed border-orange-200" />

                                            <div className="ml-6 space-y-2">
                                                {item.submenu.map((sub) => (
                                                    <a
                                                        key={sub.path}
                                                        href={sub.path}
                                                        className={`block rounded-xl px-4 py-3 text-[15px] transition-colors ${
                                                            sub.isHighlighted
                                                                ? 'bg-gray-100 font-medium text-red-600'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
}
