import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AnnouncementsSection } from './components/announcements/AnnouncementsSection';
import TopBar from './components/contact-header';
import { MembershipSection } from './components/membership/MembershipSection';
import { Navbar } from './components/navbar/Navbar';
import { NewsCarousel } from './components/news-carousel/NewsCarousel';
import { SectionHeader } from './components/section-header/SectionHeader';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <TopBar />
                <Navbar />
                <App {...props} />
                <SectionHeader
                    data={{
                        eyebrow: 'İZMİR KOMİSYONCULAR ODASI HABERLERİ',
                        title: 'Haberler',
                        buttonLabel: 'Tüm Haberler',
                        buttonHref: '/haberler',
                    }}
                />
                <NewsCarousel />
                <MembershipSection />
                <AnnouncementsSection />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
