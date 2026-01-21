import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

type Announcement = {
    id: number;
    title: string;
    image: string;
    link?: string | null;
    detail_url: string;
    date: string;
};

interface DuyurularProps {
    announcements: Announcement[];
}

const formatDay = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', { day: '2-digit' });

const formatMonthYear = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        month: 'long',
        year: 'numeric',
    });

const getImageUrl = (filename: string): string => {
    if (!filename) return '';
    return `/uploads/announcements/${filename}`;
};

export default function Duyurular({ announcements }: DuyurularProps) {
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
                            <Link
                                key={announcement.id}
                                href={announcement.detail_url}
                                className="group mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:mx-0 sm:max-w-none"
                            >
                                <article>
                                    <div className="h-56 w-full overflow-hidden bg-gray-200">
                                        <img
                                            src={getImageUrl(
                                                announcement.image,
                                            )}
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
                                                {formatDay(announcement.date)}
                                            </span>
                                            <span className="text-lg font-semibold text-gray-500">
                                                {formatMonthYear(
                                                    announcement.date,
                                                )}
                                            </span>
                                        </div>

                                        <h2 className="line-clamp-3 text-2xl leading-tight font-semibold text-gray-800">
                                            {announcement.title}
                                        </h2>

                                        <span className="inline-flex items-center gap-2 text-base font-semibold text-red-600 transition-colors group-hover:text-red-700">
                                            Detayları Oku
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                    {announcements.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                            Henüz duyuru eklenmedi.
                        </div>
                    )}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
