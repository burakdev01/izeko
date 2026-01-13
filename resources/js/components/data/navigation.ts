import { NavItem } from '@/components/navbar/types';

export const navItems: NavItem[] = [
    {
        id: 'home',
        label: 'Anasayfa',
        path: '#anasayfa',
        icon: 'home',
    },
    {
        id: 'corporate',
        label: 'Kurumsal',
        icon: 'corporate',
        submenu: [
            {
                label: 'Yönetim Kurulu Başkanımız',
                path: '/kurumsal/yonetim-kurulu-baskanimiz',
                isHighlighted: true,
            },
            { label: 'Yönetim Kurulu', path: '#yonetim-kurulu' },
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
        icon: 'activities',
    },
    {
        id: 'blog',
        label: 'Blog & Haberler',
        path: '#blog',
        icon: 'blog',
    },
    {
        id: 'live',
        label: 'Canlı Yayınlar',
        path: '#canli-yayinlar',
        icon: 'live',
    },
    {
        id: 'announcements',
        label: 'Duyurular',
        path: '#duyurular',
        icon: 'announcements',
    },
    {
        id: 'contact',
        label: 'İletişim',
        path: '#iletisim',
        icon: 'contact',
    },
];
