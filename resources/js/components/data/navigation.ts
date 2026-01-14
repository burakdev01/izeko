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
            { label: 'Yönetim Kurulu', path: '/kurumsal/yonetim-kurulu' },
            { label: 'Denetim Kurulu', path: '/kurumsal/denetim-kurulu' },
            { label: 'Oda Ekibimiz', path: '/kurumsal/oda-ekibimiz' },
            {
                label: 'Bölge Sorumlularımız',
                path: '/kurumsal/bolge-sorumlularimiz',
            },
            {
                label: 'Oda Hesap Numaraları',
                path: '/kurumsal/oda-hesap-numaralari',
            },
            { label: 'Kayıt Ücretleri ve Aidat', path: '/kurumsal/kayit-ucretleri' },
            {
                label: 'Neden Emlak Ofisiyle Çalışmalısınız?',
                path: '/kurumsal/neden-emlak-ofisi',
            },
            { label: 'izeko.org.tr Nedir?', path: '/kurumsal/izeko-nedir' },
            { label: 'Oda Kayıt İşlemleri', path: '/kurumsal/oda-kayit-islemleri' },
        ],
    },
    {
        id: 'activities',
        label: 'Faaliyetler',
        path: '/faaliyetler',
        icon: 'activities',
    },
    {
        id: 'blog',
        label: 'Blog & Haberler',
        path: '/haberler',
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
