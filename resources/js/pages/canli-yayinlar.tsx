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

const getYouTubeId = (value: string) => {
    if (!value) {
        return null;
    }

    if (/^[A-Za-z0-9_-]{11}$/.test(value)) {
        return value;
    }

    const pattern =
        /(?:youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    const match = value.match(pattern);

    return match?.[1] ?? null;
};

const getEmbedUrl = (value: string) => {
    const videoId = getYouTubeId(value);

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return value;
};

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
                    {streams.map((stream) => {
                        const embedUrl = getEmbedUrl(stream.videoUrl);

                        return (
                            <article
                                key={stream.id}
                                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                            >
                                <h2 className="line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-snug text-gray-800">
                                    {stream.title}
                                </h2>
                                <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
                                    <iframe
                                        className="h-full w-full"
                                        src={embedUrl}
                                        title={stream.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>

                                <div className="mt-5 flex items-center gap-3 text-sm font-medium text-gray-500">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{formatDate(stream.date)}</span>
                                </div>
                            </article>
                        );
                    })}
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
