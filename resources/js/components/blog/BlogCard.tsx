type BlogCardProps = {
    image: string;
    title: string;
    date: string;
};

const BlogCard = ({ image, title, date }: BlogCardProps) => {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Image */}
            <div className="h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-900">
                    {title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                    <button className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50">
                        Devamını Oku →
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
