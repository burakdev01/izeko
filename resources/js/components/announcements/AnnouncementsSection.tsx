import { AnnouncementCard } from './AnnouncementCard';
import { AnnouncementsHeader } from './AnnouncementsHeader';
import { Announcement } from './types';

const announcements: Announcement[] = [
    {
        id: '1',
        title: 'İZMİR YARDIMA KOŞUYOR',
        excerpt: 'İzmir Valiliği izniyle başlatılan yardım kampanyası...',
        image: 'https://izeko.org.tr/files/system//uErw4RPJaT4X9wEWQUHs1BYnZzL5pvc9AbRhDebk%20(1).png',
        date: '2025-11-25',
    },
    {
        id: '2',
        title: 'İzmir Büyükşehir Belediyesi Çiğli İlçesi Gayrimenkul Satış İhalesi',
        excerpt:
            'Mülkiyeti İzmir Büyükşehir Belediyesine ait taşınmazların ihalesi...',
        image: 'https://izeko.org.tr/files/system//uErw4RPJaT4X9wEWQUHs1BYnZzL5pvc9AbRhDebk%20(1).png',
        date: '2025-11-25',
    },
    {
        id: '3',
        title: 'Elektronik Tebligat Adresi Alma Zorunluluğu Süresi Uzatıldı',
        excerpt:
            'Elektronik tebligat adresi alma zorunluluğuna ilişkin süre...',
        image: 'https://izeko.org.tr/files/system//uErw4RPJaT4X9wEWQUHs1BYnZzL5pvc9AbRhDebk%20(1).png',
        date: '2025-11-25',
    },
];

export function AnnouncementsSection() {
    return (
        <section className="bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <AnnouncementsHeader />

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((a) => (
                        <AnnouncementCard key={a.id} announcement={a} />
                    ))}
                </div>
            </div>
        </section>
    );
}
