import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Calendar } from 'lucide-react';

type Activity = {
    id: number;
    title: string;
    date: string;
    videoUrl: string;
    thumbnail: string;
};

interface FaaliyetlerProps {
    activities: Activity[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function Faaliyetler({ activities }: FaaliyetlerProps) {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Faaliyetler"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {activities.map((activity) => (
                        <article
                            key={activity.id}
                            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                        >
                            <h2 className="line-clamp-2 min-h-[3.25rem] text-xl leading-snug font-semibold text-gray-800">
                                {activity.title}
                            </h2>
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
                                <iframe
                                    className="h-full w-full"
                                    src={`https://www.youtube.com/embed/${activity.videoUrl}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>

                            <div className="mt-5 flex items-center gap-3 text-sm font-medium text-gray-500">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{formatDate(activity.date)}</span>
                            </div>
                        </article>
                    ))}
                    {activities.length === 0 && (
                        <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                            Henüz faaliyet eklenmedi.
                        </div>
                    )}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
