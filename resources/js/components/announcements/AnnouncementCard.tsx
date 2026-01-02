import { Calendar } from 'lucide-react';
import { Announcement } from './types';

interface Props {
    announcement: Announcement;
}

export function AnnouncementCard({ announcement }: Props) {
    return (
        <article className="overflow-hidden rounded-2xl bg-white shadow-md">
            {/* ÜST ALAN */}
            <div className="relative flex h-56 flex-col items-center justify-center rounded-t-2xl bg-gradient-to-b from-gray-200 via-gray-100 to-white">
                <h3 className="mb-4 text-center text-xl font-semibold text-red-600">
                    {announcement.title}
                </h3>

                <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="h-24 w-auto"
                />

                {/* alt yumuşak geçiş */}
                <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* ALT ALAN */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900">
                    {announcement.subtitle}
                </h4>

                <p className="mt-3 line-clamp-2 text-gray-600">
                    {announcement.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                    <a
                        href={`/duyurular/${announcement.id}`}
                        className="rounded-full border border-red-500 px-6 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                        Devamını Oku →
                    </a>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        {announcement.date}
                    </div>
                </div>
            </div>
        </article>
    );
}
