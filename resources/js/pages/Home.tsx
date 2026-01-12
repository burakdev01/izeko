import AnnouncementsSection from '@/components/announcements/AnnouncementsSection';
import BlogSection from '@/components/blog/BlogSection';
import TopBar from '@/components/contact-header';
import Footer from '@/components/footer/Footer';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { Navbar } from '@/components/navbar/Navbar';
import { SectionHeader } from '@/components/section-header/SectionHeader';
import { SpotlightCarousel } from '@/components/spotlight-carousel/SpotlightCarousel';

export default function HomeComponent() {
    return (
        <>
            <TopBar />
            <Navbar />
            <HeroSlider />
            <SectionHeader
                data={{
                    eyebrow: 'İZMİR KOMİSYONCULAR ODASI HABERLERİ',
                    title: 'Haberler',
                    buttonLabel: 'Tüm Haberler',
                    buttonHref: '/haberler',
                }}
            />
            <SpotlightCarousel />
            {/* <MembershipSection /> */}
            <AnnouncementsSection />
            <BlogSection />
            <Footer />
        </>
    );
}
