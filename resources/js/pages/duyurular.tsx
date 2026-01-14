import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { ArrowRight } from 'lucide-react';

type Announcement = {
    title: string;
    subtitle: string;
    excerpt: string;
    day: string;
    monthYear: string;
    image: string;
    href: string;
};

export default function Duyurular() {
    const announcements: Announcement[] = [
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
        {
            title: 'ODAMIZA YAPILACAK TÜM ÖDEMELER İÇİN SİSTEMDE GERÇEKLEŞEN DEĞİŞİKLİK',
            subtitle: 'DİKKAT! Önemli Duyuru',
            excerpt: 'Sayın Üyelerimiz,',
            day: '25',
            monthYear: 'Kasım 2025',
            image: 'https://izeko.org.tr/files/system//r5rmkQB7SatE4V5XwIPYv28307USz5Qz8NFgbtmX%20(1).png',
            href: '#',
        },
    ];

    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Duyurular"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="-m-8 rounded-2xl bg-gray-100 p-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {announcements.map((announcement) => (
                            <article
                                key={announcement.title}
                                className="mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:mx-0 sm:max-w-none"
                            >
                                <div className="h-56 w-full overflow-hidden bg-gray-200">
                                    <img
                                        src={announcement.image}
                                        alt={announcement.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div
                                    className="space-y-5 px-8 py-8 text-gray-700"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(#f3f4f6 1px, transparent 1px), linear-gradient(90deg, #f3f4f6 1px, transparent 1px)',
                                        backgroundSize: '28px 28px',
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-bold text-red-500">
                                            {announcement.day}
                                        </span>
                                        <span className="text-lg font-semibold text-gray-500">
                                            {announcement.monthYear}
                                        </span>
                                    </div>

                                    <h2 className="line-clamp-3 text-2xl leading-tight font-semibold text-gray-800">
                                        {announcement.title}
                                    </h2>

                                    <p className="text-lg text-gray-500">
                                        <span className="font-semibold text-gray-700">
                                            {announcement.subtitle}
                                        </span>{' '}
                                        {announcement.excerpt}
                                    </p>

                                    <a
                                        href={announcement.href}
                                        className="inline-flex items-center gap-2 text-base font-semibold text-red-600 transition-colors hover:text-red-700"
                                    >
                                        Detayları Oku
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
