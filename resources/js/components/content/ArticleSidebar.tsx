import { ArrowRight, Bell, Newspaper } from 'lucide-react';

export interface AnnouncementItem {
    id: number | string;
    title: string;
    subtitle?: string;
    description?: string;
    date: string;
}

export interface NewsItem {
    id: number | string;
    title: string;
    date: string;
    image: string;
}

interface ArticleSidebarProps {
    announcements?: AnnouncementItem[];
    news?: NewsItem[];
    announcementsTitle?: string;
    newsTitle?: string;
    announcementsActionLabel?: string;
    announcementsActionHref?: string;
    newsActionLabel?: string;
    newsActionHref?: string;
}

const ActionLink = ({ href, label }: { href?: string; label: string }) =>
    href ? (
        <a
            href={href}
            className="flex items-center gap-1 text-sm font-medium text-red-500 transition-all hover:gap-2"
        >
            {label}
            <ArrowRight className="h-4 w-4" />
        </a>
    ) : (
        <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-red-500 transition-all hover:gap-2"
        >
            {label}
            <ArrowRight className="h-4 w-4" />
        </button>
    );

const getNewsImageUrl = (filename: string): string => {
    if (!filename) return '';
    return `/uploads/blogs/${filename}`;
};

export function ArticleSidebar({
    announcements = [],
    news = [],
    announcementsTitle = 'Son Duyurular',
    newsTitle = 'Son Haberler',
    announcementsActionLabel = 'Tüm Duyurular',
    announcementsActionHref,
    newsActionLabel = 'Tüm Haberler',
    newsActionHref,
}: ArticleSidebarProps) {
    const showAnnouncements = announcements.length > 0;
    const showNews = news.length > 0;

    return (
        <div className="space-y-6 bg-white">
            {showAnnouncements ? (
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <Bell className="h-5 w-5 text-red-500" />
                            {announcementsTitle}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 p-4">
                        {announcements.map((announcement) => {
                            const [day, ...rest] = announcement.date.split(' ');
                            const month = rest.join(' ');

                            return (
                                <div
                                    key={announcement.id}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-red-500 pb-1 text-white">
                                            <div className="text-lg font-bold">
                                                {day}
                                            </div>
                                            {month ? (
                                                <div className="text-center text-xs">
                                                    {month}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="mb-1 text-sm font-semibold text-gray-800">
                                            {announcement.title}
                                        </h3>
                                        {announcement.subtitle ? (
                                            <p className="mb-1 text-xs font-medium text-red-600">
                                                {announcement.subtitle}
                                            </p>
                                        ) : null}
                                        {announcement.description ? (
                                            <p className="text-xs text-gray-600">
                                                {announcement.description}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <ActionLink
                                href={announcementsActionHref}
                                label={announcementsActionLabel}
                            />
                        </div>
                    </div>
                </div>
            ) : null}

            {showNews ? (
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <Newspaper className="h-5 w-5 text-red-500" />
                            {newsTitle}
                        </h2>
                    </div>

                    <div className="space-y-4 p-4">
                        {news.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                            >
                                <img
                                    src={getNewsImageUrl(item.image)}
                                    alt={item.title}
                                    className="h-20 w-24 flex-shrink-0 rounded object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {item.date}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="pt-2">
                            <ActionLink
                                href={newsActionHref}
                                label={newsActionLabel}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
