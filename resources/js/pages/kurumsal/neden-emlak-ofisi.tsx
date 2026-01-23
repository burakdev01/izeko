import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type Props = {
    item?: {
        content: string;
    } | null;
};

export default function NedenEmlakOfisi({ item }: Props) {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Neden Emlak Ofisiyle Çalışmalısınız?"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="space-y-6 p-3 text-base leading-relaxed font-medium text-[#1f2937]">
                    {item?.content ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                            className="prose max-w-none"
                        />
                    ) : (
                        <p>İçerik hazırlanıyor...</p>
                    )}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
