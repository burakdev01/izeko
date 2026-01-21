import AnnouncementsSection from '@/components/announcements/AnnouncementsSection';
import BlogSection from '@/components/blog/BlogSection';
import TopBar from '@/components/contact-header';
import FaqSection, { type FaqItem } from '@/components/faq/FaqSection';
import Footer from '@/components/footer/Footer';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { type HeroSlideData } from '@/components/hero/types';
import { MembershipSection } from '@/components/membership/MembershipSection';
import { Navbar } from '@/components/navbar/Navbar';
import QuickAccessSection, {
    type QuickAccessItem,
} from '@/components/quick-access/QuickAccessSection';
import { SectionHeader } from '@/components/section-header/SectionHeader';
import { SpotlightCarousel } from '@/components/spotlight-carousel/SpotlightCarousel';

interface HomeProps {
    heroSlides?: HeroSlideData[];
    blogPosts?: {
        id: number;
        image?: string | null;
        title: string;
        slug: string;
        date: string;
    }[];
    announcements?: {
        id: number;
        title: string;
        image: string;
        link?: string | null;
        detail_url: string;
        date: string;
    }[];
    quickAccessItems?: QuickAccessItem[];
    faqItems?: FaqItem[];
    spotlights?: any[]; // Using any[] for now to match structure passed from backend, can refine type later
}

export default function HomeComponent({
    heroSlides = [],
    blogPosts = [],
    announcements = [],
    quickAccessItems = [],
    faqItems = [],
    spotlights = [],
}: HomeProps) {
    return (
        <>
            <TopBar />
            <Navbar />
            <HeroSlider slides={heroSlides} />
            <SectionHeader
                data={{
                    eyebrow: 'İZMİR KOMİSYONCULAR ODASI HABERLERİ',
                    title: 'Haberler',
                    buttonLabel: 'Tüm Haberler',
                    buttonHref: '/haberler',
                }}
            />
            <SpotlightCarousel slides={spotlights} />
            <MembershipSection />
            <AnnouncementsSection announcements={announcements} />
            <BlogSection posts={blogPosts} />
            <QuickAccessSection items={quickAccessItems} />
            <FaqSection items={faqItems} />
            <Footer />
        </>
    );
}
