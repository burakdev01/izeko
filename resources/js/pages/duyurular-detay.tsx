import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

type Announcement = {
    id: number;
    title: string;
    content: string;
    image?: string | null;
    link?: string | null;
    slug: string;
    date: string;
};

type DuyuruDetayProps = {
    announcement: Announcement;
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function DuyurularDetay({ announcement }: DuyuruDetayProps) {
    return (
        <>
            <Head title={announcement.title} />
            <TopBar />
            <Navbar />
            <ArticleLayout
                title={announcement.title}
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                breadcrumbLabel={announcement.title}
            >
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{formatDate(announcement.date)}</span>
                        </div>
                        {announcement.link ? (
                            <a
                                href={announcement.link}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-red-600 transition hover:text-red-700"
                            >
                                Kaynağa Git →
                            </a>
                        ) : null}
                    </div>

                    {announcement.image ? (
                        <img
                            src={announcement.image}
                            alt={announcement.title}
                            className="h-96 w-full rounded-2xl object-cover shadow-sm"
                        />
                    ) : null}

                    <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">
                        {announcement.content}
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
