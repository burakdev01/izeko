import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import { type ReactNode } from 'react';
import {
    ArticleSidebar,
    type AnnouncementItem,
    type NewsItem,
} from './ArticleSidebar';

type ArticleSidebarData = {
    announcements?: AnnouncementItem[];
    news?: NewsItem[];
    announcementsActionHref?: string;
    newsActionHref?: string;
};

interface ArticleLayoutProps {
    title: string;
    subtitle?: string;
    heroImage?: string;
    heroPosition?: string;
    breadcrumbLabel?: string;
    homeHref?: string;
    showSidebar?: boolean;
    backgroundColor?: string;
    children: ReactNode;
}

export function ArticleLayout({
    title,
    subtitle,
    heroImage,
    heroPosition = 'center',
    breadcrumbLabel,
    homeHref = '/',
    showSidebar = true,
    backgroundColor = 'bg-[#F3F4F6]',
    children,
}: ArticleLayoutProps) {
    const { articleSidebar } = usePage<SharedData>().props;
    const sidebarData = articleSidebar as ArticleSidebarData | undefined;
    const sidebarAnnouncements = sidebarData?.announcements ?? [];
    const sidebarNews = sidebarData?.news ?? [];
    const announcementsActionHref =
        sidebarData?.announcementsActionHref ?? '/duyurular';
    const newsActionHref = sidebarData?.newsActionHref ?? '/haberler';
    const breadcrumbText = breadcrumbLabel ?? title;
    const hasSidebar =
        showSidebar &&
        (sidebarAnnouncements.length > 0 || sidebarNews.length > 0);

    return (
        <main className={backgroundColor}>
            <header className="relative h-64 overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    {heroImage ? (
                        <img
                            src={heroImage}
                            alt=""
                            className="h-full w-full object-cover"
                            style={{ objectPosition: heroPosition }}
                            aria-hidden="true"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
                    <h1 className="mb-3 text-4xl font-bold md:text-5xl">
                        {title}
                    </h1>

                    {subtitle ? (
                        <p className="mb-4 max-w-2xl text-base text-white/90 md:text-lg">
                            {subtitle}
                        </p>
                    ) : null}

                    <div className="flex items-center gap-2 text-sm text-white/90">
                        <Home className="h-4 w-4" />
                        {homeHref ? (
                            <a
                                href={homeHref}
                                className="transition-opacity hover:opacity-80"
                            >
                                Ana Sayfa
                            </a>
                        ) : (
                            <span>Ana Sayfa</span>
                        )}
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium">{breadcrumbText}</span>
                    </div>
                </div>
            </header>

            <section className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div
                            className={
                                hasSidebar ? 'lg:col-span-2' : 'lg:col-span-3'
                            }
                        >
                            <div className="rounded-lg bg-white">
                                <article className="">{children}</article>
                            </div>
                        </div>

                        {hasSidebar ? (
                            <aside className="space-y-6">
                                <ArticleSidebar
                                    announcements={sidebarAnnouncements}
                                    news={sidebarNews}
                                    announcementsActionHref={
                                        announcementsActionHref
                                    }
                                    newsActionHref={newsActionHref}
                                />
                            </aside>
                        ) : null}
                    </div>
                </div>
            </section>
        </main>
    );
}
