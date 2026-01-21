import { Link } from '@inertiajs/react';

type AnnouncementCardProps = {
    image: string;
    date: {
        day: string;
        month: string;
        year: string;
    };
    title: string;
    href?: string;
};

const getImageUrl = (filename: string): string => {
    if (!filename) return '';
    return `/uploads/announcements/${filename}`;
};

const AnnouncementCard = ({
    image,
    date,
    title,
    href,
}: AnnouncementCardProps) => {
    const imageUrl = getImageUrl(image);
    const isExternal = href?.startsWith('http');
    const actionLabel = 'Detayları Oku →';
    const cardClasses =
        'flex h-full flex-col rounded-xl border border-gray-200 bg-white transition hover:border-gray-300';

    const content = (
        <>
            <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">
                        {date.day}
                    </span>
                    <span className="text-sm text-gray-500">
                        {date.month} {date.year}
                    </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900">
                    {title}
                </h3>

                <span className="mt-auto text-sm font-medium text-gray-700 transition group-hover:text-red-600">
                    {actionLabel}
                </span>
            </div>
        </>
    );

    if (href && isExternal) {
        return (
            <a
                href={href}
                className={`${cardClasses} group`}
                target="_blank"
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={`${cardClasses} group`}>
                {content}
            </Link>
        );
    }

    return <div className={cardClasses}>{content}</div>;
};

export default AnnouncementCard;
