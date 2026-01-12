import AnnouncementCard from './AnnouncementCard';
import { announcements } from './announcements.data';

const AnnouncementsSection = () => {
    return (
        <section className="bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Önemli Duyurular
                    </h2>

                    <a href="#" className="text-sm font-medium text-red-600">
                        Tüm Duyurular →
                    </a>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((item, index) => (
                        <AnnouncementCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnnouncementsSection;
