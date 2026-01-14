import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Calendar } from 'lucide-react';

type LiveStream = {
    title: string;
    date: string;
    videoUrl: string;
    thumbnail: string;
};

const liveStreams: LiveStream[] = [
    {
        title: 'İZEKO Canlı Yayın - Piyasa Değerlendirmesi',
        date: '25 Kasım 2025',
        videoUrl: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg',
    },
    {
        title: 'Gayrimenkul Sektörü Canlı Yayını 2025',
        date: '25 Kasım 2025',
        videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
    },
    {
        title: 'İZEKO Bölge Temsilcileri Canlı Toplantı',
        date: '25 Kasım 2025',
        videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
        thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg',
    },
];

export default function CanliYayinlar() {
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
                    {liveStreams.map((stream) => (
                        <article
                            key={stream.title}
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
                                <span>{stream.date}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
