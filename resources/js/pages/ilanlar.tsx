import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Combobox from '@/components/ui/combobox';
import { PaginatedData, Pagination } from '@/components/ui/pagination-custom';
import { Link, router } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
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
    categoryId: string;
    locationIds: {
        province: string;
        district: string;
        neighborhood: string;
    };
    buildingAge: string;
    floorLocation: string;
    floorCount: string;
};

type FilterItem = {
    id: string;
    label: string;
    count: string;
    children?: FilterItem[];
};

// Reusable recursive list component
type RecursiveFilterListProps = {
    title: string;
    items: FilterItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
};

type RoomOption = {
    id: string;
    label: string;
    value: string;
};

type BuildingAgeOption = {
    id: string;
    label: string;
    value: string;
};

type FloorLocationOption = {
    id: string;
    label: string;
    value: string;
};

type FloorCountOption = {
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
    buildingAges: string[];
    floorLocations: string[];
    floorCounts: string[];
};

type AppliedFilters = {
    grossMin: number | null;
    grossMax: number | null;
    netMin: number | null;
    netMax: number | null;
    rooms: string[];
    buildingAges: string[];
    floorLocations: string[];
    floorCounts: string[];
    location: string | null;
    category: string | null;
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
// Static data removed in favor of props

const tabs: Tab[] = [
    // { id: 'all', label: 'Tümü' },
    // { id: 'sahibinden', label: 'Sahibinden' },
    // { id: 'emlak', label: 'Emlak Ofisinden' },
    // { id: 'insaat', label: 'İnşaat Firmasından' },
    // { id: 'bankadan', label: 'Bankadan' },
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

function RecursiveFilterList({
    title,
    items,
    activeId,
    onSelect,
}: RecursiveFilterListProps) {
    const hasActiveDescendant = (
        item: FilterItem,
        activeId: string | null,
    ): boolean => {
        if (!activeId || !item.children) return false;
        return item.children.some(
            (child) =>
                child.id === activeId || hasActiveDescendant(child, activeId),
        );
    };

    const renderItem = (item: FilterItem) => {
        const isActive = activeId === item.id;
        const isExpanded = isActive || hasActiveDescendant(item, activeId);

        return (
            <div key={item.id} className="flex flex-col">
                <div
                    className={`flex cursor-pointer items-center rounded px-2.5 py-2.5 transition-colors duration-200 ${
                        isActive
                            ? 'bg-[#fff0f0] font-medium text-[#d92025]'
                            : 'hover:bg-[#f8f8f8]'
                    }`}
                    onClick={() => onSelect(item.id)}
                >
                    <span>{item.label}</span>
                    <span className="ml-auto text-sm text-[#999]">
                        {item.count}
                    </span>
                </div>
                {isExpanded && item.children && item.children.length > 0 && (
                    <div className="ml-4 border-l border-gray-100 pl-2">
                        {item.children.map(renderItem)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="mb-6 pb-5">
            <h3 className="mb-3.75 text-[18px] text-[#d92025]">{title}</h3>
            <div className="flex flex-col gap-1">{items.map(renderItem)}</div>
        </div>
    );
}

type ListingsHeaderProps = {
    title: string;
    tabs: Tab[];
    activeTab: Tab['id'];
    onSelect: (id: Tab['id']) => void;
    count: number;
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

    // Use netArea if available, otherwise fallback to gross area for net filters
    const validNetArea = listing.netArea ?? listing.area;
    if (netMin !== null && validNetArea < netMin) return false;
    if (netMax !== null && validNetArea > netMax) return false;

    if (rooms.length > 0 && !rooms.includes(listing.rooms)) return false;
    if (
        appliedFilters.buildingAges &&
        appliedFilters.buildingAges.length > 0 &&
        !appliedFilters.buildingAges.includes(listing.buildingAge)
    )
        return false;

    if (
        appliedFilters.floorLocations &&
        appliedFilters.floorLocations.length > 0 &&
        !appliedFilters.floorLocations.includes(listing.floorLocation)
    )
        return false;

    if (
        appliedFilters.floorCounts &&
        appliedFilters.floorCounts.length > 0 &&
        !appliedFilters.floorCounts.includes(listing.floorCount)
    )
        return false;

    if (location) {
        if (location.startsWith('province-')) {
            const id = location.replace('province-', '');
            if (String(listing.locationIds.province) !== id) return false;
        } else if (location.startsWith('district-')) {
            const id = location.replace('district-', '');
            if (String(listing.locationIds.district) !== id) return false;
        } else if (location.startsWith('neighborhood-')) {
            const id = location.replace('neighborhood-', '');
            if (String(listing.locationIds.neighborhood) !== id) return false;
        }
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
            : 'flex flex-1 flex-col max-[480px]:p-[15px]',
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

// CategoryList removed (replaced by RecursiveFilterList)

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
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between">
                    <div className="text-base font-semibold text-[#333]">
                        Oda Sayısı
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                    <div className="checkbox-list max-h-62.5 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                htmlFor={option.id}
                                className="group/item flex cursor-pointer items-center py-2"
                            >
                                <input
                                    id={option.id}
                                    type="checkbox"
                                    value={option.value}
                                    checked={selected.includes(option.value)}
                                    onChange={() => onToggle(option.value)}
                                    className="mr-2.5 h-4.5 w-4.5 cursor-pointer accent-[#d92025]"
                                />
                                <span className="flex-1 text-sm text-[#333] group-hover/item:text-[#d92025]">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

// LocationList replaced by RecursiveFilterList

type SidebarProps = {
    categories: FilterItem[];
    activeCategory: string;
    onCategorySelect: (id: string) => void;
    pendingFilters: PendingFilters;
    onPendingChange: (next: Partial<PendingFilters>) => void;
    roomOptions: RoomOption[];
    onRoomToggle: (value: string) => void;
    buildingAgeOptions: BuildingAgeOption[];
    onBuildingAgeToggle: (value: string) => void;
    floorLocationOptions: FloorLocationOption[];
    onFloorLocationToggle: (value: string) => void;
    floorCountOptions: FloorCountOption[];
    onFloorCountToggle: (value: string) => void;
    locations: FilterItem[];
    activeLocation: string | null;
    onLocationToggle: (id: string) => void;
    onApply: () => void;
    searchTerm: string;
    onSearch: (term: string) => void;
};

function BuildingAgeFilter({
    options,
    selected,
    onToggle,
}: {
    options: BuildingAgeOption[];
    selected: string[];
    onToggle: (val: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between">
                    <div className="text-base font-semibold text-[#333]">
                        Bina Yaşı
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                    <div className="checkbox-list max-h-62.5 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                htmlFor={option.id}
                                className="group/item flex cursor-pointer items-center py-2"
                            >
                                <input
                                    id={option.id}
                                    type="checkbox"
                                    value={option.value}
                                    checked={selected.includes(option.value)}
                                    onChange={() => onToggle(option.value)}
                                    className="mr-2.5 h-4.5 w-4.5 cursor-pointer accent-[#d92025]"
                                />
                                <span className="flex-1 text-sm text-[#333] group-hover/item:text-[#d92025]">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

function FloorLocationFilter({
    options,
    selected,
    onToggle,
}: {
    options: FloorLocationOption[];
    selected: string[];
    onToggle: (val: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between">
                    <div className="text-base font-semibold text-[#333]">
                        Bulunduğu Kat
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                    <div className="checkbox-list max-h-62.5 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                htmlFor={option.id}
                                className="group/item flex cursor-pointer items-center py-2"
                            >
                                <input
                                    id={option.id}
                                    type="checkbox"
                                    value={option.value}
                                    checked={selected.includes(option.value)}
                                    onChange={() => onToggle(option.value)}
                                    className="mr-2.5 h-4.5 w-4.5 cursor-pointer accent-[#d92025]"
                                />
                                <span className="flex-1 text-sm text-[#333] group-hover/item:text-[#d92025]">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

function FloorCountFilter({
    options,
    selected,
    onToggle,
}: {
    options: FloorCountOption[];
    selected: string[];
    onToggle: (val: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border-b border-[#e8e8e8] pb-5">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between">
                    <div className="text-base font-semibold text-[#333]">
                        Kat Sayısı
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                    <div className="checkbox-list max-h-62.5 overflow-y-auto">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                htmlFor={option.id}
                                className="group/item flex cursor-pointer items-center py-2"
                            >
                                <input
                                    id={option.id}
                                    type="checkbox"
                                    value={option.value}
                                    checked={selected.includes(option.value)}
                                    onChange={() => onToggle(option.value)}
                                    className="mr-2.5 h-4.5 w-4.5 cursor-pointer accent-[#d92025]"
                                />
                                <span className="flex-1 text-sm text-[#333] group-hover/item:text-[#d92025]">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

const LocationSelects = ({
    locations,
    activeLocation,
    onToggle,
}: {
    locations: FilterItem[];
    activeLocation: string | null;
    onToggle: (id: string) => void;
}) => {
    // Helper to find path from tree
    const getPath = () => {
        if (!activeLocation) return { p: '', d: '', n: '' };

        const type = activeLocation.split('-')[0];
        const id = activeLocation.replace(`${type}-`, '');

        if (type === 'province') return { p: id, d: '', n: '' };

        // For district, find province
        if (type === 'district') {
            for (const p of locations) {
                const dist = p.children?.find((d) => d.id === `district-${id}`);
                if (dist)
                    return { p: p.id.replace('province-', ''), d: id, n: '' };
            }
        }

        // For neighborhood, find district and province
        if (type === 'neighborhood') {
            for (const p of locations) {
                if (p.children) {
                    for (const d of p.children) {
                        const neigh = d.children?.find(
                            (n) => n.id === `neighborhood-${id}`,
                        );
                        if (neigh) {
                            return {
                                p: p.id.replace('province-', ''),
                                d: d.id.replace('district-', ''),
                                n: id,
                            };
                        }
                    }
                }
            }
        }
        return { p: '', d: '', n: '' };
    };

    const { p: provId, d: distId, n: neighId } = getPath();

    const selectedProvince = locations.find(
        (l) => l.id === `province-${provId}`,
    );
    const districts = selectedProvince?.children || [];
    const selectedDistrict = districts.find(
        (d) => d.id === `district-${distId}`,
    );
    const neighborhoods = selectedDistrict?.children || [];

    return (
        <div className="mb-6 flex flex-col gap-3 pb-5">
            <h3 className="mb-1 text-[18px] text-[#d92025]">Konum</h3>

            <Combobox
                value={provId}
                onChange={(val) => onToggle(`province-${val}`)}
                options={locations.map((loc) => ({
                    id: loc.id.replace('province-', ''),
                    name: loc.label,
                }))}
                placeholder="İl Seçiniz"
                searchPlaceholder="İl Ara..."
                className="w-full"
            />

            <Combobox
                value={distId}
                onChange={(val) => onToggle(`district-${val}`)}
                options={districts.map((dist) => ({
                    id: dist.id.replace('district-', ''),
                    name: dist.label,
                }))}
                placeholder="İlçe Seçiniz"
                searchPlaceholder="İlçe Ara..."
                disabled={!provId}
                className="w-full"
            />

            <Combobox
                value={neighId}
                onChange={(val) => onToggle(`neighborhood-${val}`)}
                options={neighborhoods.map((neigh) => ({
                    id: neigh.id.replace('neighborhood-', ''),
                    name: neigh.label,
                }))}
                placeholder="Mahalle Seçiniz"
                searchPlaceholder="Mahalle Ara..."
                disabled={!distId}
                className="w-full"
            />
        </div>
    );
};

function Sidebar({
    categories,
    activeCategory,
    onCategorySelect,
    pendingFilters,
    onPendingChange,
    roomOptions,
    onRoomToggle,
    buildingAgeOptions,
    onBuildingAgeToggle,
    floorLocationOptions,
    onFloorLocationToggle,
    floorCountOptions,
    onFloorCountToggle,
    locations,
    activeLocation,
    onLocationToggle,
    onApply,
    searchTerm,
    onSearch,
}: SidebarProps) {
    return (
        <aside className="sticky flex h-fit w-70 flex-col rounded-lg bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-[1024px]:w-full">
            <div className="mb-6 border-b border-[#e8e8e8] pb-5">
                <h3 className="mb-3.75 text-[18px] text-[#d92025]">Arama</h3>
                <input
                    type="text"
                    placeholder="İlan ara..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onApply();
                        }
                    }}
                    className="w-full rounded border border-[#ddd] px-3 py-2.5 text-sm placeholder:text-[#999] focus:border-[#d92025] focus:outline-none"
                />
            </div>

            <RecursiveFilterList
                title="Kategoriler"
                items={categories}
                activeId={activeCategory}
                onSelect={onCategorySelect}
            />

            <LocationSelects
                locations={locations}
                activeLocation={activeLocation}
                onToggle={onLocationToggle}
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
            <BuildingAgeFilter
                options={buildingAgeOptions}
                selected={pendingFilters.buildingAges}
                onToggle={onBuildingAgeToggle}
            />
            <FloorLocationFilter
                options={floorLocationOptions}
                selected={pendingFilters.floorLocations}
                onToggle={onFloorLocationToggle}
            />
            <FloorCountFilter
                options={floorCountOptions}
                selected={pendingFilters.floorCounts}
                onToggle={onFloorCountToggle}
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
    count,
}: ListingsHeaderProps) {
    return (
        <div className="mb-5 rounded-lg bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-[24px] text-[#d92025] max-[480px]:text-[20px]">
                    {title || 'Tüm İlanlar'}
                    <span className="ml-3 text-base font-normal text-gray-500">
                        {count} ilan bulundu
                    </span>
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
        <Link
            href={`/ilanlar/${listing.id}`}
            className={`cursor-pointer gap-3 overflow-hidden rounded-lg bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${classes.card}`}
        >
            <img
                src={listing.image}
                // src={
                //     'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600'
                // }
                alt="Emlak"
                className={`shrink-0 rounded-md object-cover ${classes.image}`}
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
                        <span className="text-[13px] text-[#666]">
                            {listing.location}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
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

export default function Ilanlar({
    listings,
    categories,
    locations,
    roomOptions,
    buildingAgeOptions,
    floorLocationOptions,
    floorCountOptions,
    filters,
}: {
    listings: PaginatedData<any>;
    categories: FilterItem[];
    locations: FilterItem[];
    roomOptions: RoomOption[];
    buildingAgeOptions: BuildingAgeOption[];
    floorLocationOptions: FloorLocationOption[];
    floorCountOptions: FloorCountOption[];
    filters?: { search?: string };
}) {
    const [viewType, setViewType] = useState<ViewType>('list');
    const [currentFilter, setCurrentFilter] = useState<Tab['id']>('all');
    const [currentSort, setCurrentSort] = useState<SortType>('default');
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [pendingFilters, setPendingFilters] = useState<PendingFilters>({
        grossMin: '',
        grossMax: '',
        netMin: '',
        netMax: '',
        rooms: [],
        buildingAges: [],
        floorLocations: [],
        floorCounts: [],
    });
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters | null>(
        null,
    );

    const formattedListings = useMemo<Listing[]>(() => {
        return listings.data.map((l: any) => ({
            ...l,
            date: new Date(l.date),
            area: Number(l.area),
            netArea: l.netArea ? Number(l.netArea) : undefined,
        }));
    }, [listings]);

    const filteredListings = useMemo<Listing[]>(() => {
        let filtered =
            currentFilter === 'all'
                ? [...formattedListings]
                : formattedListings.filter((listing) =>
                      listing.badges.includes(currentFilter),
                  );

        // Filter by Category (Recursive)
        if (appliedFilters?.category) {
            const getCategoryIds = (cat: FilterItem): string[] => {
                let ids = [cat.id];
                if (cat.children) {
                    cat.children.forEach((child) => {
                        ids = [...ids, ...getCategoryIds(child)];
                    });
                }
                return ids;
            };

            const findCategoryById = (
                cats: FilterItem[],
                id: string,
            ): FilterItem | null => {
                for (const cat of cats) {
                    if (cat.id === id) return cat;
                    if (cat.children) {
                        const found = findCategoryById(cat.children, id);
                        if (found) return found;
                    }
                }
                return null;
            };

            const selectedCategory = findCategoryById(
                categories,
                appliedFilters.category,
            );
            if (selectedCategory) {
                const allowedIds = getCategoryIds(selectedCategory);
                filtered = filtered.filter((l) =>
                    allowedIds.includes(l.categoryId),
                );
            }
        }

        // Location filtering is handled in listingMatchesFilters via appliedFilters,
        // not immediately via activeLocation anymore.

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
    }, [
        currentFilter,
        currentSort,
        appliedFilters,
        activeCategory,
        formattedListings,
        categories,
    ]);

    const handleRoomToggle = (value: string): void => {
        setPendingFilters((prev) => {
            const nextRooms = prev.rooms.includes(value)
                ? prev.rooms.filter((room) => room !== value)
                : [...prev.rooms, value];
            return { ...prev, rooms: nextRooms };
        });
    };

    const handleBuildingAgeToggle = (value: string): void => {
        setPendingFilters((prev) => {
            const nextAges = prev.buildingAges.includes(value)
                ? prev.buildingAges.filter((age) => age !== value)
                : [...prev.buildingAges, value];
            return { ...prev, buildingAges: nextAges };
        });
    };

    const handleFloorLocationToggle = (value: string): void => {
        setPendingFilters((prev) => {
            const nextFloors = prev.floorLocations.includes(value)
                ? prev.floorLocations.filter((floor) => floor !== value)
                : [...prev.floorLocations, value];
            return { ...prev, floorLocations: nextFloors };
        });
    };

    const handleFloorCountToggle = (value: string): void => {
        setPendingFilters((prev) => {
            const nextCounts = prev.floorCounts.includes(value)
                ? prev.floorCounts.filter((count) => count !== value)
                : [...prev.floorCounts, value];
            return { ...prev, floorCounts: nextCounts };
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
            buildingAges: [...pendingFilters.buildingAges],
            floorLocations: [...pendingFilters.floorLocations],
            floorCounts: [...pendingFilters.floorCounts],
            location: activeLocation ? activeLocation.toLowerCase() : null,
            category: activeCategory || null,
        });

        // Apply Search via Router
        router.get(
            '/ilanlar',
            { search: searchTerm },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const updatePendingFilters = (next: Partial<PendingFilters>): void => {
        setPendingFilters((prev) => ({ ...prev, ...next }));
    };

    const handleLocationToggle = (id: string): void => {
        setActiveLocation((prev) => (prev === id ? null : id));
    };

    const listingClasses = getListingClasses(viewType);

    const handleCategorySelect = (id: string) => {
        setActiveCategory((prev) => (prev === id ? '' : id));
    };

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
                            onCategorySelect={handleCategorySelect}
                            pendingFilters={pendingFilters}
                            onPendingChange={updatePendingFilters}
                            roomOptions={roomOptions}
                            onRoomToggle={handleRoomToggle}
                            buildingAgeOptions={buildingAgeOptions}
                            onBuildingAgeToggle={handleBuildingAgeToggle}
                            floorLocationOptions={floorLocationOptions}
                            onFloorLocationToggle={handleFloorLocationToggle}
                            floorCountOptions={floorCountOptions}
                            onFloorCountToggle={handleFloorCountToggle}
                            locations={locations}
                            activeLocation={activeLocation}
                            onLocationToggle={handleLocationToggle}
                            onApply={applySidebarFilters}
                            searchTerm={searchTerm}
                            onSearch={setSearchTerm}
                        />

                        <main className="flex-1">
                            <ListingsHeader
                                title=""
                                tabs={tabs}
                                activeTab={currentFilter}
                                onSelect={setCurrentFilter}
                                count={filteredListings.length}
                            />
                            <ListingControls
                                viewOptions={viewOptions}
                                activeView={viewType}
                                onViewChange={setViewType}
                                sortValue={currentSort}
                                onSortChange={setCurrentSort}
                            />
                            {filteredListings.length === 0 ? (
                                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
                                    <div className="mb-4 rounded-full bg-gray-50 p-4">
                                        <svg
                                            className="h-8 w-8 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-1 text-lg font-medium text-gray-900">
                                        Sonuç Bulunamadı
                                    </h3>
                                    <p className="text-gray-500">
                                        Arama kriterlerinize uygun ilan
                                        bulunmamaktadır. Filtreleri temizleyip
                                        tekrar deneyebilirsiniz.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <ListingsGrid
                                        listings={filteredListings}
                                        classes={listingClasses}
                                    />
                                    <Pagination links={listings.links} />
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
