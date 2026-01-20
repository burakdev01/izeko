import { Link } from '@inertiajs/react';

type BlogCardProps = {
    image?: string | null;
    title: string;
    date: string;
    href?: string;
};

const BlogCard = ({ image, title, date, href }: BlogCardProps) => {
    const content = (
        <>
            <div className="h-56 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-gray-100" />
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900">
                    {title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                    <span className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600 transition group-hover:bg-red-50">
                        Devamını Oku →
                    </span>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow"
            >
                {content}
            </Link>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
            {content}
        </div>
    );
};

export default BlogCard;
