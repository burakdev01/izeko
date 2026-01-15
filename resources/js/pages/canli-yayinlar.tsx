import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Calendar } from 'lucide-react';

type LiveStream = {
    id: number;
    title: string;
    date: string;
    videoUrl: string;
    thumbnail: string;
};

interface CanliYayinlarProps {
    streams: LiveStream[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function CanliYayinlar({ streams }: CanliYayinlarProps) {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Canlı Yayınlar"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {streams.map((stream) => (
                        <article
                            key={stream.id}
                            className="rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                        >
                            <h2 className="line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-snug text-gray-800">
                                {stream.title}
                            </h2>

                            <a
                                href={stream.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="relative mt-6 block aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-[0_14px_30px_rgba(15,23,42,0.12)]"
                            >
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-red-500 shadow-lg">
                                        <span className="ml-1 block h-0 w-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-white" />
                                    </div>
                                </div>
                            </a>

                            <div className="mt-5 flex items-center gap-3 text-sm font-medium text-gray-500">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{formatDate(stream.date)}</span>
                            </div>
                        </article>
                    ))}
                    {streams.length === 0 && (
                        <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                            Henüz canlı yayın eklenmedi.
                        </div>
                    )}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
