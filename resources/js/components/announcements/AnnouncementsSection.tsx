import { Link } from '@inertiajs/react';
import AnnouncementCard from './AnnouncementCard';

type AnnouncementSummary = {
    id: number;
    title: string;
    image: string;
    link?: string | null;
    detail_url: string;
    date: string;
};

type AnnouncementsSectionProps = {
    announcements: AnnouncementSummary[];
};

const formatDateParts = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            day: '',
            month: '',
            year: '',
        };
    }

    const parts = new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).formatToParts(date);

    return {
        day: parts.find((part) => part.type === 'day')?.value ?? '',
        month: parts.find((part) => part.type === 'month')?.value ?? '',
        year: parts.find((part) => part.type === 'year')?.value ?? '',
    };
};

const AnnouncementsSection = ({ announcements }: AnnouncementsSectionProps) => {
    return (
        <section className="bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Önemli Duyurular
                    </h2>

                    <Link
                        href="/duyurular"
                        className="text-sm font-medium text-red-600"
                    >
                        Tüm Duyurular →
                    </Link>
                </div>

                {/* GRID */}
                {announcements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {announcements.map((item) => (
                            <AnnouncementCard
                                key={item.id}
                                image={item.image}
                                date={formatDateParts(item.date)}
                                title={item.title}
                                href={item.detail_url}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                        Henüz duyuru eklenmedi.
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnnouncementsSection;
