import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { useMemo, useState } from 'react';

type Badge = 'premium' | 'sahibinden' | 'emlak' | 'insaat';

interface Listing {
    id: number;
    title: string;
    price: number;
    date: Date;
    area: number;
    netArea: number;
    rooms: string;
    location: string;
    city: string;
    image: string;
    badges: Badge[];
}

const listingsData: Listing[] = [
    {
        id: 1,
        title:
            "🏠 LEYALGRUP'TAN ŞAH İBİNDEN, RESMİ HAVUZLU, LÜX TASARIMLI MÜSTAKİL ⭐",
        price: 8900000,
        date: new Date('2025-12-09'),
        area: 200,
        netArea: 180,
        rooms: '4+1',
        location: 'Tekirdağ Marmara',
        city: 'Tekirdağ',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        badges: ['premium', 'sahibinden'],
    },
    {
        id: 2,
        title:
            "🏠 AY EMLAKTAN AKÇAY'DA AYRI MUTFAK SATILIK 2+1 GENİŞ LÜKS DAİRE ⭐",
        price: 4050000,
        date: new Date('2025-12-04'),
        area: 110,
        netArea: 95,
        rooms: '2+1',
        location: 'Balıkesir Edremit',
        city: 'Balıkesir',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
        badges: ['emlak'],
    },
    {
        id: 3,
        title: "⭐ Kağıthane Meydan'a 1dk. 1+1 Full Tadilatlı Satılık Daire 🏠",
        price: 2750000,
        date: new Date('2025-12-08'),
        area: 45,
        netArea: 38,
        rooms: '1+1',
        location: 'İstanbul Kağıthane',
        city: 'İstanbul',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        badges: ['premium', 'sahibinden'],
    },
    {
        id: 4,
        title:
            'ESENYURT CUMHURİYET MAH BUTİK SİTE İÇİNDE SIFIR SATILIK 3+1DAİRE 🏠',
        price: 6450000,
        date: new Date('2025-12-09'),
        area: 150,
        netArea: 130,
        rooms: '3+1',
        location: 'İstanbul Esenyurt',
        city: 'İstanbul',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        badges: ['premium', 'insaat'],
    },
    {
        id: 5,
        title: '🏠 DENİZ MANZARALI LÜKS VİLLA FULL EŞYALI SATILIK ⭐',
        price: 15500000,
        date: new Date('2025-12-07'),
        area: 320,
        netArea: 280,
        rooms: '5+2',
        location: 'Antalya Alanya',
        city: 'Antalya',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
        badges: ['emlak'],
    },
    {
        id: 6,
        title: '⭐ ŞEHİR MERKEZİNDE YATIRIMLIK FIRSAT DAİRE 🏠',
        price: 3200000,
        date: new Date('2025-12-06'),
        area: 85,
        netArea: 70,
        rooms: '2+1',
        location: 'Ankara Çankaya',
        city: 'Ankara',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
        badges: ['premium', 'sahibinden'],
    },
];

const formatPrice = (price: number) =>
    new Intl.NumberFormat('tr-TR').format(price) + ' TL';

const formatDate = (date: Date) =>
    date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function Ilanlar() {
    const [view, setView] = useState<'list' | 'grid' | 'gallery'>('list');
    const [tab, setTab] = useState<'all' | Badge>('all');
    const [sort, setSort] = useState('default');

    const [grossMin, setGrossMin] = useState<number | null>(null);
    const [grossMax, setGrossMax] = useState<number | null>(null);
    const [netMin, setNetMin] = useState<number | null>(null);
    const [netMax, setNetMax] = useState<number | null>(null);
    const [rooms, setRooms] = useState<string[]>([]);
    const [location, setLocation] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let data =
            tab === 'all'
                ? [...listingsData]
                : listingsData.filter((listing) => listing.badges.includes(tab));

        data = data.filter((listing) => {
            if (grossMin !== null && listing.area < grossMin) return false;
            if (grossMax !== null && listing.area > grossMax) return false;

            const net = listing.netArea ?? listing.area;
            if (netMin !== null && net < netMin) return false;
            if (netMax !== null && net > netMax) return false;

            if (rooms.length && !rooms.includes(listing.rooms)) return false;

            if (location) {
                const city = (listing.city || listing.location).toLowerCase();
                if (!city.includes(location.toLowerCase())) return false;
            }

            return true;
        });

        switch (sort) {
            case 'price-asc':
                data.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                data.sort((a, b) => b.price - a.price);
                break;
            case 'date-asc':
                data.sort((a, b) => +a.date - +b.date);
                break;
            case 'date-desc':
                data.sort((a, b) => +b.date - +a.date);
                break;
        }

        return data;
    }, [tab, sort, grossMin, grossMax, netMin, netMax, rooms, location]);

    const toggleRoom = (room: string) =>
        setRooms((prev) =>
            prev.includes(room)
                ? prev.filter((item) => item !== room)
                : [...prev, room],
        );

    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="İlanlar"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="mx-auto flex max-w-[1400px] flex-col gap-5 p-5 lg:flex-row">
                    <aside className="flex w-full flex-col rounded-lg bg-white p-5 shadow lg:w-[280px]">
                        <h3 className="mb-4 text-lg text-red-600">Emlak</h3>

                        {['İstanbul', 'Ankara', 'İzmir', 'Antalya'].map(
                            (city) => (
                                <div
                                    key={city}
                                    onClick={() => setLocation(city)}
                                    className={`cursor-pointer rounded p-2 ${
                                        location === city
                                            ? 'bg-red-50 text-red-600'
                                            : ''
                                    }`}
                                >
                                    {city}
                                </div>
                            ),
                        )}

                        <div className="mt-6">
                            <div className="mb-2 font-semibold">
                                m² (Brüt)
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="min"
                                    className="w-full rounded border p-2"
                                    onChange={(event) =>
                                        setGrossMin(
                                            event.target.value
                                                ? +event.target.value
                                                : null,
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="max"
                                    className="w-full rounded border p-2"
                                    onChange={(event) =>
                                        setGrossMax(
                                            event.target.value
                                                ? +event.target.value
                                                : null,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="mb-2 font-semibold">m² (Net)</div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="min"
                                    className="w-full rounded border p-2"
                                    onChange={(event) =>
                                        setNetMin(
                                            event.target.value
                                                ? +event.target.value
                                                : null,
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="max"
                                    className="w-full rounded border p-2"
                                    onChange={(event) =>
                                        setNetMax(
                                            event.target.value
                                                ? +event.target.value
                                                : null,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="mb-2 font-semibold">Oda Sayısı</div>
                            {[
                                '1+0',
                                '1+1',
                                '2+0',
                                '2+1',
                                '3+1',
                                '4+1',
                                '5+2',
                            ].map((room) => (
                                <label
                                    key={room}
                                    className="mb-2 flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={rooms.includes(room)}
                                        onChange={() => toggleRoom(room)}
                                        className="accent-red-600"
                                    />
                                    {room}
                                </label>
                            ))}
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="mb-5 rounded-lg bg-white p-5 shadow">
                            <h1 className="mb-4 text-xl text-red-600">
                                "Satılık Ev" aramanızda {filtered.length} ilan
                                bulundu.
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {['all', 'sahibinden', 'emlak', 'insaat'].map(
                                    (tabItem) => (
                                        <button
                                            key={tabItem}
                                            onClick={() =>
                                                setTab(tabItem as 'all' | Badge)
                                            }
                                            className={`rounded px-4 py-2 ${
                                                tab === tabItem
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-100'
                                            }`}
                                        >
                                            {tabItem}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="mb-5 flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row md:justify-between">
                            <div className="flex gap-2">
                                {(
                                    [
                                        'list',
                                        'grid',
                                        'gallery',
                                    ] as const
                                ).map((viewType) => (
                                    <button
                                        key={viewType}
                                        onClick={() => setView(viewType)}
                                        className={`rounded border px-3 py-2 ${
                                            view === viewType
                                                ? 'border-red-600 bg-red-600 text-white'
                                                : ''
                                        }`}
                                    >
                                        {viewType}
                                    </button>
                                ))}
                            </div>

                            <select
                                className="rounded border p-2"
                                onChange={(event) =>
                                    setSort(event.target.value)
                                }
                            >
                                <option value="default">
                                    Gelişmiş sıralama
                                </option>
                                <option value="price-asc">
                                    Fiyat (Artan)
                                </option>
                                <option value="price-desc">
                                    Fiyat (Azalan)
                                </option>
                                <option value="date-desc">
                                    Tarih (Yeni)
                                </option>
                                <option value="date-asc">
                                    Tarih (Eski)
                                </option>
                            </select>
                        </div>

                        <div
                            className={
                                view === 'list'
                                    ? 'flex flex-col gap-4'
                                    : view === 'grid'
                                      ? 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'
                                      : 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
                            }
                        >
                            {filtered.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
                                >
                                    <img
                                        src={listing.image}
                                        alt={listing.title}
                                        className="h-[200px] w-full object-cover"
                                    />
                                    <div className="flex flex-1 flex-col p-4">
                                        <div className="mb-2 font-semibold text-red-600">
                                            {listing.title}
                                        </div>

                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {listing.badges.map((badge) => (
                                                <span
                                                    key={badge}
                                                    className={`rounded px-2 py-1 text-xs ${
                                                        badge === 'premium'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-yellow-200'
                                                    }`}
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    m²
                                                </div>
                                                {listing.area}
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">
                                                    Oda
                                                </div>
                                                {listing.rooms}
                                            </div>
                                            <div className="col-span-2 font-semibold text-red-600">
                                                {formatPrice(listing.price)}
                                            </div>
                                            <div className="col-span-2 text-xs text-gray-500">
                                                {formatDate(listing.date)} ·{' '}
                                                {listing.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
