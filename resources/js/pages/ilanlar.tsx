import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { useMemo, useState } from 'react';

type ListingBadge = 'premium' | 'sahibinden' | 'emlak' | 'insaat' | 'bankadan';

type Listing = {
    id: number;
    title: string;
    price: number;
    date: Date;
    area: number;
    netArea?: number;
    rooms: string;
    location: string;
    city: string;
    image: string;
    badges: ListingBadge[];
};

type Category = {
    id: string;
    label: string;
    count: string;
};

type LocationOption = {
    id: string;
    label: string;
    count: string;
};

type RoomOption = {
    id: string;
    label: string;
    value: string;
};

type Tab = {
    id: 'all' | ListingBadge;
    label: string;
};

type ViewType = 'list' | 'grid' | 'gallery';

type ViewOption = {
    id: ViewType;
    label: string;
};

type SortType =
    | 'default'
    | 'price-asc'
    | 'price-desc'
    | 'date-desc'
    | 'date-asc';

type PendingFilters = {
    grossMin: string;
    grossMax: string;
    netMin: string;
    netMax: string;
    rooms: string[];
};

type AppliedFilters = {
    grossMin: number | null;
    grossMax: number | null;
    netMin: number | null;
    netMax: number | null;
    rooms: string[];
    location: string | null;
};

const listingsData: Listing[] = [
    {
        id: 1,
        title: "🏠 LEYALGRUP'TAN ŞAH İBİNDEN, RESMİ HAVUZLU, LÜX TASARIMLI MÜSTAKİL ⭐",
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
        title: "🏠 AY EMLAKTAN AKÇAY'DA AYRI MUTFAK SATILIK 2+1 GENİŞ LÜKS DAİRE ⭐",
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
        title: 'ESENYURT CUMHURİYET MAH BUTİK SİTE İÇİNDE SIFIR SATILIK 3+1DAİRE 🏠',
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

const categories: Category[] = [
    { id: 'konut', label: 'Konut', count: '(245.763)' },
    { id: 'satilik-daire', label: 'Satılık Daire', count: '(545.763)' },
    { id: 'rezidans', label: 'Rezidans', count: '(6.582)' },
    { id: 'mustakil-ev', label: 'Müstakil Ev', count: '(27.557)' },
    { id: 'villa', label: 'Villa', count: '(61.037)' },
    { id: 'ciftlik-ev', label: 'Çiftlik Evi', count: '(1.051)' },
];

const locations: LocationOption[] = [
    { id: 'istanbul', label: 'İstanbul', count: '(125.430)' },
    { id: 'ankara', label: 'Ankara', count: '(45.280)' },
    { id: 'izmir', label: 'İzmir', count: '(38.920)' },
    { id: 'antalya', label: 'Antalya', count: '(28.450)' },
];

const roomOptions: RoomOption[] = [
    { id: 'room-studio', label: 'Stüdyo (1+0)', value: '1+0' },
    { id: 'room-1-1', label: '1+1', value: '1+1' },
    { id: 'room-1-5-1', label: '1.5+1', value: '1.5+1' },
    { id: 'room-2-0', label: '2+0', value: '2+0' },
    { id: 'room-2-1', label: '2+1', value: '2+1' },
    { id: 'room-2-5-1', label: '2.5+1', value: '2.5+1' },
    { id: 'room-3-0', label: '3+0', value: '3+0' },
    { id: 'room-3-1', label: '3+1', value: '3+1' },
    { id: 'room-3-5-1', label: '3.5+1', value: '3.5+1' },
    { id: 'room-4-1', label: '4+1', value: '4+1' },
    { id: 'room-4-5-1', label: '4.5+1', value: '4.5+1' },
    { id: 'room-5-1', label: '5+1', value: '5+1' },
    { id: 'room-5-2', label: '5+2', value: '5+2' },
    { id: 'room-6-plus', label: '6+1 ve üzeri', value: '6+1' },
];

const tabs: Tab[] = [
    { id: 'all', label: 'Tümü' },
    { id: 'sahibinden', label: 'Sahibinden' },
    { id: 'emlak', label: 'Emlak Ofisinden' },
    { id: 'insaat', label: 'İnşaat Firmasından' },
    { id: 'bankadan', label: 'Bankadan' },
];

const viewOptions: ViewOption[] = [
    { id: 'list', label: 'Liste' },
    { id: 'grid', label: 'Izgara' },
    // { id: 'gallery', label: 'Galeri' },
];

const badgeLabels: Record<ListingBadge, string> = {
    premium: 'Premium',
    sahibinden: 'Sahibinden',
    emlak: 'Emlak Ofisi',
    insaat: 'İnşaat Firması',
    bankadan: 'Bankadan',
};

type ListingClasses = {
    layout: string;
    card: string;
    image: string;
    content: string;
    title: string;
    details: string;
    detailItem: string;
    detailLabel: string;
    detailValue: string;
    detailPrice: string;
};

type CategoryListProps = {
    categories: Category[];
    activeCategory: string;
    onSelect: (id: string) => void;
};

type RangeFilterProps = {
    label: string;
    minValue: string;
    maxValue: string;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
};

type RoomFilterProps = {
    options: RoomOption[];
    selected: string[];
    onToggle: (value: string) => void;
};

type LocationListProps = {
    locations: LocationOption[];
    activeLocation: string | null;
    onToggle: (label: string) => void;
};

type SidebarProps = {
    categories: Category[];
    activeCategory: string;
    onCategorySelect: (id: string) => void;
    pendingFilters: PendingFilters;
    onPendingChange: (next: Partial<PendingFilters>) => void;
    roomOptions: RoomOption[];
    onRoomToggle: (value: string) => void;
    locations: LocationOption[];
    activeLocation: string | null;
    onLocationToggle: (label: string) => void;
    onApply: () => void;
};

type ListingsHeaderProps = {
    title: string;
    tabs: Tab[];
    activeTab: Tab['id'];
    onSelect: (id: Tab['id']) => void;
};

type ListingControlsProps = {
    viewOptions: ViewOption[];
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
    sortValue: SortType;
    onSortChange: (value: SortType) => void;
};

type ListingsGridProps = {
    listings: Listing[];
    classes: ListingClasses;
};

type ListingCardProps = {
    listing: Listing;
    classes: ListingClasses;
};

const formatPrice = (price: number): string =>
    new Intl.NumberFormat('tr-TR').format(price) + ' TL';

const formatDate = (date: Date): string =>
    date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

const listingMatchesFilters = (
    listing: Listing,
    appliedFilters: AppliedFilters | null,
): boolean => {
    if (!appliedFilters) return true;

    const { grossMin, grossMax, netMin, netMax, rooms, location } =
        appliedFilters;

    if (grossMin !== null && listing.area < grossMin) return false;
    if (grossMax !== null && listing.area > grossMax) return false;

    const netArea = listing.netArea ?? listing.area;
    if (netMin !== null && netArea < netMin) return false;
    if (netMax !== null && netArea > netMax) return false;

    if (rooms.length > 0 && !rooms.includes(listing.rooms)) return false;

    if (location) {
        const listingCity = listing.city || listing.location || '';
        if (!listingCity.toLowerCase().includes(location)) return false;
    }

    return true;
};

const getListingClasses = (viewType: ViewType): ListingClasses => ({
    layout:
        viewType === 'list'
            ? 'flex flex-col gap-[15px]'
            : viewType === 'grid'
              ? 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 max-[768px]:grid-cols-1'
              : 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[15px] max-[1024px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-[768px]:grid-cols-2 max-[480px]:grid-cols-1',
    card:
        viewType === 'list'
            ? 'flex flex-row max-[768px]:flex-col'
            : 'flex flex-col',
    image:
        viewType === 'list'
            ? 'w-[280px] h-[200px] max-[768px]:w-full max-[768px]:h-[220px]'
            : viewType === 'grid'
              ? 'w-full h-[220px]'
              : 'w-full h-[200px]',
    content:
        viewType === 'gallery'
            ? 'p-[15px] flex flex-1 flex-col'
            : 'p-5 flex flex-1 flex-col max-[480px]:p-[15px]',
    title:
        viewType === 'gallery'
            ? 'text-sm text-[#d92025] font-semibold mb-2 leading-[1.4] overflow-hidden'
            : 'text-base text-[#d92025] font-semibold mb-2.5 leading-[1.4]',
    details:
        viewType === 'list'
            ? 'grid gap-[15px] mt-auto grid-cols-[repeat(auto-fit,minmax(120px,1fr))]'
            : viewType === 'grid'
              ? 'grid gap-[15px] mt-auto grid-cols-2'
              : 'grid gap-2 mt-auto grid-cols-1',
    detailItem:
        viewType === 'gallery'
            ? 'flex flex-row items-center justify-between'
            : 'flex flex-col',
    detailLabel:
        viewType === 'gallery'
            ? 'text-[11px] text-[#666] mb-1'
            : 'text-xs text-[#666] mb-1',
    detailValue:
        viewType === 'gallery'
            ? 'text-[13px] font-medium text-[#333]'
            : 'text-sm font-medium text-[#333]',
    detailPrice:
        viewType === 'gallery'
            ? 'text-[16px] font-semibold text-[#d92025]'
            : 'text-lg font-semibold text-[#d92025] max-[480px]:text-[16px]',
});

function CategoryList({
    categories,
    activeCategory,
    onSelect,
}: CategoryListProps) {
    return (
        <div className="mb-6 pb-5">
            <h3 className="mb-3.75 text-[18px] text-[#d92025]">Emlak</h3>
            <div className="flex flex-col">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                        <div
                            key={category.id}
                            className={`flex cursor-pointer items-center rounded px-2.5 py-2.5 transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#fff0f0] font-medium text-[#d92025]'
                                    : 'hover:bg-[#f8f8f8]'
                            }`}
                            onClick={() => onSelect(category.id)}
                        >
                            <span>{category.label}</span>
                            <span className="ml-auto text-sm text-[#999]">
                                {category.count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function RangeFilter({
    label,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
}: RangeFilterProps) {
    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <div className="mb-4 text-base font-semibold text-[#333]">
                {label}
            </div>
            <div className="flex items-center gap-2.5">
                <input
                    type="number"
                    placeholder="min"
                    value={minValue}
                    onChange={(event) => onMinChange(event.target.value)}
                    className="w-0 min-w-0 flex-1 rounded border border-[#ddd] px-2.5 py-2.5 text-sm placeholder:text-[#999]"
                />
                <span className="text-sm text-[#999]">-</span>
                <input
                    type="number"
                    placeholder="max"
                    value={maxValue}
                    onChange={(event) => onMaxChange(event.target.value)}
                    className="w-0 min-w-0 flex-1 rounded border border-[#ddd] px-2.5 py-2.5 text-sm placeholder:text-[#999]"
                />
            </div>
        </div>
    );
}

function RoomFilter({ options, selected, onToggle }: RoomFilterProps) {
    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <div className="mb-4 text-base font-semibold text-[#333]">
                Oda Sayısı
            </div>
            <div className="checkbox-list max-h-62.5 overflow-y-auto">
                {options.map((option) => (
                    <label
                        key={option.id}
                        htmlFor={option.id}
                        className="group flex cursor-pointer items-center py-2"
                    >
                        <input
                            id={option.id}
                            type="checkbox"
                            value={option.value}
                            checked={selected.includes(option.value)}
                            onChange={() => onToggle(option.value)}
                            className="mr-2.5 h-4.5 w-4.5 cursor-pointer accent-[#d92025]"
                        />
                        <span className="flex-1 text-sm text-[#333] group-hover:text-[#d92025]">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

function LocationList({
    locations,
    activeLocation,
    onToggle,
}: LocationListProps) {
    return (
        <div className="mb-6 pb-5">
            <h3 className="mb-3.75 text-[18px] text-[#d92025]">Konum</h3>
            <div className="flex flex-col">
                {locations.map((location) => {
                    const isActive = activeLocation === location.label;
                    return (
                        <div
                            key={location.id}
                            className={`flex cursor-pointer items-center rounded px-2.5 py-2.5 transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#fff0f0] font-medium text-[#d92025]'
                                    : 'hover:bg-[#f8f8f8]'
                            }`}
                            onClick={() => onToggle(location.label)}
                        >
                            <span>{location.label}</span>
                            <span className="ml-auto text-sm text-[#999]">
                                {location.count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Sidebar({
    categories,
    activeCategory,
    onCategorySelect,
    pendingFilters,
    onPendingChange,
    roomOptions,
    onRoomToggle,
    locations,
    activeLocation,
    onLocationToggle,
    onApply,
}: SidebarProps) {
    return (
        <aside className="sticky flex h-fit w-70 flex-col rounded-lg bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-[1024px]:w-full">
            <CategoryList
                categories={categories}
                activeCategory={activeCategory}
                onSelect={onCategorySelect}
            />
            <RangeFilter
                label="m² (Brüt)"
                minValue={pendingFilters.grossMin}
                maxValue={pendingFilters.grossMax}
                onMinChange={(value) => onPendingChange({ grossMin: value })}
                onMaxChange={(value) => onPendingChange({ grossMax: value })}
            />
            <RangeFilter
                label="m² (Net)"
                minValue={pendingFilters.netMin}
                maxValue={pendingFilters.netMax}
                onMinChange={(value) => onPendingChange({ netMin: value })}
                onMaxChange={(value) => onPendingChange({ netMax: value })}
            />
            <RoomFilter
                options={roomOptions}
                selected={pendingFilters.rooms}
                onToggle={onRoomToggle}
            />
            <LocationList
                locations={locations}
                activeLocation={activeLocation}
                onToggle={onLocationToggle}
            />
            <div className="sticky bottom-5 mt-auto border-t border-[#e8e8e8] bg-white pt-5">
                <button
                    className="w-full rounded-md bg-[#d92025] px-5 py-3 text-base text-white shadow-[0_4px_10px_rgba(217,32,37,0.3)] transition-all duration-200 hover:-translate-y-px hover:bg-[#bb1c1f]"
                    onClick={onApply}
                >
                    Uygula
                </button>
            </div>
        </aside>
    );
}

function ListingsHeader({
    title,
    tabs,
    activeTab,
    onSelect,
}: ListingsHeaderProps) {
    return (
        <div className="mb-5 rounded-lg bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <h1 className="mb-3.75 text-[24px] text-[#d92025] max-[480px]:text-[20px]">
                {title}
            </h1>
            <div className="flex flex-wrap gap-2.5 max-[768px]:justify-center">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            className={`rounded px-5 py-2.5 text-sm transition-colors duration-200 ${
                                isActive
                                    ? 'bg-[#d92025] text-white'
                                    : 'bg-[#f5f5f5] text-[#333] hover:bg-[#e8e8e8]'
                            }`}
                            data-filter={tab.id}
                            onClick={() => onSelect(tab.id)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ListingControls({
    viewOptions,
    activeView,
    onViewChange,
    sortValue,
    onSortChange,
}: ListingControlsProps) {
    return (
        <div className="mb-5 flex items-center justify-between rounded-lg bg-white px-5 py-3.75 shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-3.75">
            <div className="hidden gap-2.5 max-[768px]:justify-center md:flex">
                {viewOptions.map((option) => {
                    const isActive = activeView === option.id;
                    return (
                        <button
                            key={option.id}
                            className={`rounded border px-3 py-2 text-sm transition-colors duration-200 ${
                                isActive
                                    ? 'border-[#d92025] bg-[#d92025] text-white'
                                    : 'border-[#ddd] bg-white hover:bg-[#f5f5f5]'
                            }`}
                            data-view={option.id}
                            onClick={() => onViewChange(option.id)}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
            <select
                className="rounded border border-[#ddd] px-3 py-2 text-sm"
                value={sortValue}
                onChange={(event) =>
                    onSortChange(event.target.value as SortType)
                }
            >
                <option value="default">Gelişmiş sıralama</option>
                <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
                <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
                <option value="date-desc">Tarih (Yeniden Eskiye)</option>
                <option value="date-asc">Tarih (Eskiden Yeniye)</option>
            </select>
        </div>
    );
}

function ListingCard({ listing, classes }: ListingCardProps) {
    return (
        <div
            className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${classes.card}`}
        >
            <img
                src={listing.image}
                alt="Emlak"
                className={`shrink-0 object-cover ${classes.image}`}
            />
            <div className={classes.content}>
                <div className={classes.title}>{listing.title}</div>
                <div className="mb-3.75 flex flex-wrap gap-2">
                    {listing.badges.map((badge) => {
                        const isPremium = badge === 'premium';
                        return (
                            <span
                                key={badge}
                                className={`rounded-[3px] px-2 py-1 text-[11px] font-medium ${
                                    isPremium
                                        ? 'bg-[#d92025] text-white'
                                        : 'bg-[#ffeaa7]'
                                }`}
                            >
                                {badgeLabels[badge] || badge}
                            </span>
                        );
                    })}
                </div>
                <div className={classes.details}>
                    <div className={classes.detailItem}>
                        <span className={classes.detailLabel}>m² (Brüt)</span>
                        <span className={classes.detailValue}>
                            {listing.area}
                        </span>
                    </div>
                    <div className={classes.detailItem}>
                        <span className={classes.detailLabel}>Oda Sayısı</span>
                        <span className={classes.detailValue}>
                            {listing.rooms}
                        </span>
                    </div>
                    <div className={classes.detailItem}>
                        <span className={classes.detailLabel}>Fiyat</span>
                        <span className={classes.detailPrice}>
                            {formatPrice(listing.price)}
                        </span>
                    </div>
                    <div className={classes.detailItem}>
                        <span className={classes.detailLabel}>İlan Tarihi</span>
                        <span className={classes.detailValue}>
                            {formatDate(listing.date)}
                        </span>
                    </div>
                    <div className={classes.detailItem}>
                        <span className={classes.detailLabel}>İl / İlçe</span>
                        <span className="text-[13px] text-[#666]">
                            {listing.location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListingsGrid({ listings, classes }: ListingsGridProps) {
    return (
        <div
            id="listingsContainer"
            className={`transition-all duration-300 ease-in-out ${classes.layout}`}
        >
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    listing={listing}
                    classes={classes}
                />
            ))}
        </div>
    );
}

export default function Ilanlar() {
    const [viewType, setViewType] = useState<ViewType>('list');
    const [currentFilter, setCurrentFilter] = useState<Tab['id']>('all');
    const [currentSort, setCurrentSort] = useState<SortType>('default');
    const [activeCategory, setActiveCategory] =
        useState<string>('satilik-daire');
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [pendingFilters, setPendingFilters] = useState<PendingFilters>({
        grossMin: '',
        grossMax: '',
        netMin: '',
        netMax: '',
        rooms: [],
    });
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(
        null,
    );

    const filteredListings = useMemo<Listing[]>(() => {
        let filtered =
            currentFilter === 'all'
                ? [...listingsData]
                : listingsData.filter((listing) =>
                      listing.badges.includes(currentFilter),
                  );

        filtered = filtered.filter((listing) =>
            listingMatchesFilters(listing, appliedFilters),
        );

        switch (currentSort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'date-desc':
                filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
                break;
            case 'date-asc':
                filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
                break;
            default:
                break;
        }

        return filtered;
    }, [currentFilter, currentSort, appliedFilters]);

    const handleRoomToggle = (value: string): void => {
        setPendingFilters((prev) => {
            const nextRooms = prev.rooms.includes(value)
                ? prev.rooms.filter((room) => room !== value)
                : [...prev.rooms, value];
            return { ...prev, rooms: nextRooms };
        });
    };

    const applySidebarFilters = () => {
        const parseNumber = (value: string): number | null => {
            if (!value) return null;
            const number = Number(value);
            return Number.isFinite(number) ? number : null;
        };

        setAppliedFilters({
            grossMin: parseNumber(pendingFilters.grossMin),
            grossMax: parseNumber(pendingFilters.grossMax),
            netMin: parseNumber(pendingFilters.netMin),
            netMax: parseNumber(pendingFilters.netMax),
            rooms: [...pendingFilters.rooms],
            location: activeLocation ? activeLocation.toLowerCase() : null,
        });
    };

    const updatePendingFilters = (next: Partial<PendingFilters>): void => {
        setPendingFilters((prev) => ({ ...prev, ...next }));
    };

    const handleLocationToggle = (label: string): void => {
        setActiveLocation((prev) => (prev === label ? null : label));
    };

    const listingClasses = getListingClasses(viewType);

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
                <div className="min-h-screen pb-4 font-sans text-[#333]">
                    <div className="mx-auto flex max-w-350 gap-5 max-[1024px]:flex-col max-[480px]:p-2.5">
                        <Sidebar
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategorySelect={setActiveCategory}
                            pendingFilters={pendingFilters}
                            onPendingChange={updatePendingFilters}
                            roomOptions={roomOptions}
                            onRoomToggle={handleRoomToggle}
                            locations={locations}
                            activeLocation={activeLocation}
                            onLocationToggle={handleLocationToggle}
                            onApply={applySidebarFilters}
                        />

                        <main className="flex-1">
                            <ListingsHeader
                                title='"Satılık Ev" aramanızda 649.241 ilan bulundu.'
                                tabs={tabs}
                                activeTab={currentFilter}
                                onSelect={setCurrentFilter}
                            />
                            <ListingControls
                                viewOptions={viewOptions}
                                activeView={viewType}
                                onViewChange={setViewType}
                                sortValue={currentSort}
                                onSortChange={setCurrentSort}
                            />
                            <ListingsGrid
                                listings={filteredListings}
                                classes={listingClasses}
                            />
                        </main>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
