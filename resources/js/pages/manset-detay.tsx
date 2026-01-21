import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

type Spotlight = {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    image: string;
    slug?: string;
    date: string;
};

type SpotlightDetailProps = {
    spotlight: Spotlight;
};

export default function MansetDetay({ spotlight }: SpotlightDetailProps) {
    return (
        <>
            <Head title={spotlight.title} />
            <TopBar />
            <Navbar />
            <ArticleLayout
                title={spotlight.title}
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                breadcrumbLabel={spotlight.title}
            >
                <div className="space-y-6 rounded-lg bg-white p-4 font-normal">
                    {spotlight.image ? (
                        <img
                            src={spotlight.image}
                            alt={spotlight.title}
                            className="h-96 w-full rounded-2xl object-cover shadow-sm"
                        />
                    ) : null}

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{spotlight.date}</span>
                    </div>

                    <div
                        className="prose prose-sm max-w-none text-gray-700 sm:prose-base prose-strong:font-bold"
                        dangerouslySetInnerHTML={{
                            __html:
                                spotlight.content ||
                                spotlight.description ||
                                '',
                        }}
                    />
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
