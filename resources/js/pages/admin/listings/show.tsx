import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    Calendar,
    Check,
    Image as ImageIcon,
    MapPin,
    Tag,
    User,
    X,
} from 'lucide-react';

interface ListingShowProps {
    listing: {
        id: number;
        title: string;
        description: string;
        price: number;
        status: string;
        main_photo: string | null;
        category: { id: number; name: string; hierarchy?: string } | null;
        office: { id: number; name: string } | null;
        user: { id: number; name: string } | null;
        location: {
            city: string;
            district: string;
            neighborhood: string;
        };
        created_at: string;
        features?: Array<{
            name: string;
            items: Array<{
                name: string;
                value: string;
            }>;
        }>;
    };
}

export default function ListingShow({ listing }: ListingShowProps) {
    const formatPrice = (price: number) => {
        return (
            new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
                .format(price)
                .replace('₺', '') + ' TL'
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Aktif';
            case 'pending':
                return 'Onay Bekliyor';
            case 'inactive':
                return 'Pasif';
            default:
                return status;
        }
    };

    return (
        <AdminLayout>
            <Head title={`İlan Detayı: ${listing.title}`} />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.ilanlar.index')}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white py-2 text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="line-clamp-1 text-2xl font-bold text-gray-900">
                                {listing.title}
                            </h1>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                <span>İlan No: #{listing.id}</span>
                                <span>•</span>
                                <span>{listing.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(listing.status)}`}
                        >
                            {getStatusLabel(listing.status)}
                        </span>
                        <Link
                            href={route('admin.ilanlar.status', listing.id)}
                            method="patch"
                            data={{ status: 'active' }}
                            as="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                        >
                            <Check className="h-4 w-4" />
                            Onayla
                        </Link>

                        <Link
                            href={route('admin.ilanlar.status', listing.id)}
                            method="patch"
                            data={{ status: 'inactive' }}
                            as="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
                        >
                            <X className="h-4 w-4" />
                            Red et
                        </Link>
                    </div>
                </div>

                {/* Mobile Main Photo */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:hidden">
                    {listing.main_photo ? (
                        <img
                            src={listing.main_photo}
                            alt={listing.title}
                            className="aspect-[16/9] h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-50">
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <ImageIcon className="h-12 w-12" />
                                <span className="text-sm">
                                    Görsel bulunmuyor
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content (Left Column) */}
                    <div className="order-last space-y-8 lg:order-first lg:col-span-2">
                        {/* Desktop Main Photo */}
                        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
                            {listing.main_photo ? (
                                <img
                                    // src={listing.main_photo}
                                    src={
                                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600'
                                    }
                                    alt={listing.title}
                                    className="aspect-[16/9] h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-50">
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        <ImageIcon className="h-12 w-12" />
                                        <span className="text-sm">
                                            Görsel bulunmuyor
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            {/* <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Özellikler
                            </h2> */}
                            {listing.features && listing.features.length > 0 ? (
                                <div className="space-y-6">
                                    {listing.features.map((group, index) => (
                                        <div key={index}>
                                            <h3 className="mb-3 border-b border-gray-100 pb-2 text-sm font-medium text-gray-900">
                                                {group.name}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                                {group.items.map(
                                                    (item, itemIndex) => (
                                                        <div
                                                            key={itemIndex}
                                                            className="flex flex-col"
                                                        >
                                                            <span className="text-xs text-gray-500">
                                                                {item.name}
                                                            </span>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {item.value}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500 italic">
                                    Bu ilana ait özellik bulunmamaktadır.
                                </div>
                            )}
                        </div>
                        {/* Description */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Açıklama
                            </h2>
                            <div
                                className="prose prose-sm max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        listing.description ||
                                        'Açıklama girilmemiş.',
                                }}
                            />
                        </div>
                    </div>

                    {/* Sidebar (Right Column) */}
                    <div className="order-first space-y-8 lg:order-last">
                        {/* Price & Primary Info Card */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <span className="mb-1 block text-sm text-gray-500">
                                    Fiyat
                                </span>
                                <span className="block text-3xl font-bold text-[#da1f25]">
                                    {formatPrice(listing.price)}
                                </span>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div className="mt-2 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#da1f25]">
                                        <Tag className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500">
                                            Kategori
                                        </span>
                                        <span className="block text-sm font-medium text-gray-900">
                                            {listing.category?.hierarchy ||
                                                listing.category?.name ||
                                                '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500">
                                            Lokasyon
                                        </span>
                                        <span className="block text-sm font-medium text-gray-900">
                                            {[
                                                listing.location.neighborhood,
                                                listing.location.district,
                                                listing.location.city,
                                            ]
                                                .filter(Boolean)
                                                .join(' / ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <Building2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500">
                                            Ofis
                                        </span>
                                        <span className="block text-sm font-medium text-gray-900">
                                            {listing.office?.name || '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500">
                                            Danışman
                                        </span>
                                        <span className="block text-sm font-medium text-gray-900">
                                            {listing.user?.name || '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-gray-500">
                                            Eklenme Tarihi
                                        </span>
                                        <span className="block text-sm font-medium text-gray-900">
                                            {listing.created_at}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
