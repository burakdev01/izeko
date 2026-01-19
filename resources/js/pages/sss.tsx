import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import FaqSection, { type FaqItem } from '@/components/faq/FaqSection';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type SssProps = {
    faqItems?: FaqItem[];
};

export default function Sss({ faqItems = [] }: SssProps) {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="SSS"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={true}
            >
                <FaqSection items={faqItems} />
            </ArticleLayout>
            <Footer />
        </>
    );
}
