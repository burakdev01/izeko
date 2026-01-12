type AnnouncementCardProps = {
    image: string;
    date: {
        day: string;
        month: string;
        year: string;
    };
    title: string;
    description: string;
};

const AnnouncementCard = ({
    image,
    date,
    title,
    description,
}: AnnouncementCardProps) => {
    return (
        <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white">
            <div className="h-48 overflow-hidden rounded-t-xl">
                <img
                    src={image}
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

                <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                    {description}
                </p>

                <a
                    href="#"
                    className="mt-auto text-sm font-medium text-gray-700 transition hover:text-red-600"
                >
                    Detayları Oku →
                </a>
            </div>
        </div>
    );
};

export default AnnouncementCard;
