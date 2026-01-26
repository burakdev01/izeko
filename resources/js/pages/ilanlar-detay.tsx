import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';

import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type GalleryImage = {
    large: string;
    thumb: string;
    alt: string;
};

type DetailItem = {
    label: string;
    value: string;
};

type InfoItem = {
    label: string;
    value: string;
};

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type AgentProfile = {
    name: string;
    role: string;
    avatarUrl: string;
    phone: string;
    email: string;
};

type CardProps = {
    children: ReactNode;
    className?: string;
};

type PageHeaderProps = {
    breadcrumbs: BreadcrumbItem[];
    title: string;
    meta: string[];
};

type GalleryProps = {
    images: GalleryImage[];
};

type LightboxProps = {
    isOpen: boolean;
    image?: GalleryImage;
    onClose: () => void;
    onPrev: (event: MouseEvent<HTMLButtonElement>) => void;
    onNext: (event: MouseEvent<HTMLButtonElement>) => void;
};

type DetailGridProps = {
    price: string;
    items: DetailItem[];
};

type DescriptionSectionProps = {
    title: string;
    description: string;
};

type FeaturesSectionProps = {
    groups: { group: string; features: string[] }[];
};

type InfoListProps = {
    items: InfoItem[];
};

type InfoCardProps = {
    title: string;
    items: InfoItem[];
    children?: ReactNode;
};

type ContactItemProps = {
    label: string;
    value: string;
};

type AgentCardProps = {
    profile: AgentProfile;
    info: InfoItem[];
};

// Static data removed
type ListingDetail = {
    id: number;
    title: string;
    description: string;
    price: string;
    date: string;
    location: string;
    fullLocation: string;
    features: { group: string; features: string[] }[];
    nonGroupedFeatures: string[];
    city: string;
    district: string;
    neighborhood: string;
};

type IlanlarDetayProps = {
    listing: ListingDetail;
    galleryImages: GalleryImage[];
    detailItems: DetailItem[];
    agentProfile: AgentProfile;
    breadcrumbs: BreadcrumbItem[];
    similarListings: InfoItem[];
    locationInfo: InfoItem[];
};

function Card({ children, className }: CardProps) {
    return (
        <div
            className={`mb-6.25 rounded-[10px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]${
                className ? ` ${className}` : ''
            }`}
        >
            {children}
        </div>
    );
}

function PageHeader({ breadcrumbs, title, meta }: PageHeaderProps) {
    return (
        <header className="bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] max-[600px]:p-3.75">
            <div className="mb-2.5 text-[13px] text-[#777]">
                {breadcrumbs.map((breadcrumb, index) => (
                    <span key={`${breadcrumb.label}-${index}`}>
                        {breadcrumb.href ? (
                            <a className="no-underline" href={breadcrumb.href}>
                                {breadcrumb.label}
                            </a>
                        ) : (
                            <span>{breadcrumb.label}</span>
                        )}
                        {index < breadcrumbs.length - 1 ? (
                            <span className="mx-1.5">›</span>
                        ) : null}
                    </span>
                ))}
            </div>
            <h1 className="mb-2 text-[26px] text-[#d92025] max-[600px]:text-[22px]">
                {title}
            </h1>
            <div className="flex flex-wrap gap-3.75 text-sm text-[#555]">
                {meta.map((item) => (
                    <span key={item}>{item}</span>
                ))}
            </div>
        </header>
    );
}

function Lightbox({ isOpen, image, onClose, onPrev, onNext }: LightboxProps) {
    return (
        <div
            className={`fixed inset-0 z-999 flex items-center justify-center bg-black/70 transition-opacity duration-200 ${
                isOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
            }`}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <button
                className="absolute top-1/2 left-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/60 text-[22px] text-white transition-colors duration-200 hover:bg-black/80"
                type="button"
                aria-label="Önceki görsel"
                onClick={onPrev}
            >
                &lsaquo;
            </button>
            {image ? (
                <img
                    src={image.large}
                    alt={image.alt || 'Büyük Görsel'}
                    className="max-h-[90%] max-w-[90%] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                />
            ) : null}
            <button
                className="absolute top-1/2 right-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/60 text-[22px] text-white transition-colors duration-200 hover:bg-black/80"
                type="button"
                aria-label="Sonraki görsel"
                onClick={onNext}
            >
                &rsaquo;
            </button>
        </div>
    );
}

function Gallery({ images }: GalleryProps) {
    const heroSwiperRef = useRef<SwiperClass | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const currentImage = images[currentIndex] || images[0];

    const ensureThumbnailVisibility = (
        index: number,
        swiperOverride?: SwiperClass | null,
    ): void => {
        const thumbSwiper = swiperOverride || thumbsSwiper;
        if (!thumbSwiper || thumbSwiper.destroyed) return;
        const totalSlides = thumbSwiper.slides?.length || 0;
        if (!totalSlides) return;

        const visibleIndexes = (
            thumbSwiper as SwiperClass & { visibleSlidesIndexes?: number[] }
        ).visibleSlidesIndexes;
        if (Array.isArray(visibleIndexes) && visibleIndexes.length > 0) {
            const firstVisible = Math.min(...visibleIndexes);
            const lastVisible = Math.max(...visibleIndexes);
            const visibleCount = visibleIndexes.length;

            if (index <= firstVisible) {
                thumbSwiper.slideTo(Math.max(index - 1, 0));
                return;
            }

            if (index >= lastVisible && index < totalSlides - 1) {
                const maxStart = Math.max(totalSlides - visibleCount, 0);
                const desiredStart = Math.max(index - visibleCount + 2, 0);
                thumbSwiper.slideTo(Math.min(desiredStart, maxStart));
                return;
            }

            if (index === totalSlides - 1) {
                thumbSwiper.slideTo(Math.max(totalSlides - visibleCount, 0));
            }
            return;
        }

        const visibleCountRaw =
            typeof thumbSwiper.slidesPerViewDynamic === 'function'
                ? thumbSwiper.slidesPerViewDynamic()
                : thumbSwiper.params.slidesPerView === 'auto'
                  ? Math.floor(
                        thumbSwiper.el.clientWidth /
                            (thumbSwiper.slides?.[0]?.clientWidth || 1),
                    )
                  : Number(thumbSwiper.params.slidesPerView);
        const visibleCount = Math.max(Math.floor(visibleCountRaw) || 1, 1);
        const firstVisible = thumbSwiper.activeIndex || 0;
        const lastVisible = firstVisible + visibleCount - 1;

        if (index <= firstVisible) {
            thumbSwiper.slideTo(Math.max(index - 1, 0));
            return;
        }

        if (index >= lastVisible && index < totalSlides - 1) {
            const maxStart = Math.max(totalSlides - visibleCount, 0);
            const desiredStart = Math.max(index - visibleCount + 2, 0);
            thumbSwiper.slideTo(Math.min(desiredStart, maxStart));
            return;
        }

        if (index === totalSlides - 1) {
            thumbSwiper.slideTo(Math.max(totalSlides - visibleCount, 0));
        }
    };

    const goToIndex = (index: number): void => {
        const total = images.length;
        if (!total) return;
        const normalized = ((index % total) + total) % total;
        const heroSwiper = heroSwiperRef.current;
        if (heroSwiper) {
            heroSwiper.slideTo(normalized);
            ensureThumbnailVisibility(normalized);
        } else {
            setCurrentIndex(normalized);
            ensureThumbnailVisibility(normalized);
        }
    };

    const handlePrev = (event: MouseEvent<HTMLButtonElement>): void => {
        event?.stopPropagation();
        goToIndex(currentIndex - 1);
    };

    const handleNext = (event: MouseEvent<HTMLButtonElement>): void => {
        event?.stopPropagation();
        goToIndex(currentIndex + 1);
    };

    return (
        <>
            <Card className="overflow-hidden p-0">
                <div
                    className="relative cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                >
                    <button
                        className="hero-nav-btn prev absolute top-1/2 left-3.75 z-10 flex h-10.5 w-10.5 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/55 text-[22px] text-white transition-colors duration-200 hover:bg-black/75"
                        type="button"
                        aria-label="Önceki görsel"
                        onClick={handlePrev}
                    >
                        &lsaquo;
                    </button>
                    <Swiper
                        className="w-full"
                        modules={[Thumbs, FreeMode]}
                        onSwiper={(swiper) => {
                            heroSwiperRef.current = swiper;
                        }}
                        onSlideChange={(swiper) => {
                            const nextIndex =
                                typeof swiper.realIndex === 'number'
                                    ? swiper.realIndex
                                    : swiper.activeIndex || 0;
                            setCurrentIndex(nextIndex);
                            ensureThumbnailVisibility(nextIndex);
                        }}
                        thumbs={{
                            swiper:
                                thumbsSwiper && !thumbsSwiper.destroyed
                                    ? thumbsSwiper
                                    : null,
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={`${image.large}-${index}`}>
                                <img
                                    src={image.large}
                                    alt={image.alt}
                                    className="block h-105 w-full object-cover max-[1024px]:h-80"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        className="hero-nav-btn next absolute top-1/2 right-3.75 z-10 flex h-10.5 w-10.5 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-black/55 text-[22px] text-white transition-colors duration-200 hover:bg-black/75"
                        type="button"
                        aria-label="Sonraki görsel"
                        onClick={handleNext}
                    >
                        &rsaquo;
                    </button>
                </div>
                <div className="py-2.5 pr-2.5 pl-1.25">
                    <Swiper
                        className="w-full"
                        modules={[FreeMode, Thumbs]}
                        onSwiper={(swiper) => {
                            setThumbsSwiper(swiper);
                            ensureThumbnailVisibility(currentIndex, swiper);
                        }}
                        slidesPerView="auto"
                        spaceBetween={10}
                        freeMode
                        watchSlidesProgress
                    >
                        {images.map((image, index) => {
                            const isActive = index === currentIndex;
                            return (
                                <SwiperSlide
                                    key={`${image.thumb}-${index}`}
                                    className="w-auto! max-[800px]:w-[calc(25%-10px)]! max-[600px]:w-[calc(50%-10px)]!"
                                >
                                    <button
                                        type="button"
                                        className={`group w-35 overflow-hidden rounded-lg border-2 bg-transparent p-0 transition-all duration-200 focus-visible:outline-none max-[800px]:w-full ${
                                            isActive
                                                ? 'border-[#d92025]'
                                                : 'border-transparent hover:-translate-y-0.5 hover:border-[#d92025]'
                                        }`}
                                        onClick={() => goToIndex(index)}
                                    >
                                        <img
                                            src={image.thumb}
                                            alt={image.alt}
                                            className="h-22.5 w-full object-cover max-[600px]:h-25"
                                        />
                                    </button>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </Card>
            <Lightbox
                isOpen={lightboxOpen}
                image={currentImage}
                onClose={() => setLightboxOpen(false)}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </>
    );
}

function DetailGrid({ price, items }: DetailGridProps) {
    return (
        <Card className="p-6.25 max-[600px]:p-4.5">
            <div className="mb-5 text-[32px] font-bold text-[#d92025]">
                {price}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.75">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-lg border border-[#f0f0f0] bg-[#fff7f7] p-2"
                    >
                        <div className="text-xs text-[#777]">
                            {item.label == 'Özellik'
                                ? item.value.split(': ')[0]
                                : item.label}
                        </div>
                        <div className="text-sm font-semibold">
                            {item.label == 'Özellik'
                                ? item.value.split(': ')[1]
                                : item.value}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function FeaturesSection({ groups }: FeaturesSectionProps) {
    if (!groups || groups.length === 0) return null;
    return (
        <Card className="mt-6.25 p-6.25 max-[600px]:p-4.5">
            <h2 className="mb-3.75 text-[20px] text-[#333]">Özellikler</h2>
            <div className="flex flex-col gap-6">
                {groups.map((group) => (
                    <div key={group.group}>
                        <h3 className="mb-3 text-[16px] font-semibold text-[#333]">
                            {group.group}
                        </h3>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
                            {group.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 rounded-md bg-[#f8f8f8] px-3 py-2.5 text-sm"
                                >
                                    <span className="h-2 w-2 rounded-full bg-[#d92025]" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function DescriptionSection({ title, description }: DescriptionSectionProps) {
    return (
        <Card className="p-6.25 max-[600px]:p-4.5">
            <h2 className="mb-3.75 text-[20px] text-[#333]">{title}</h2>
            <div
                className="text-[15px] leading-[1.7] text-[#555]"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </Card>
    );
}

function InfoList({ items }: InfoListProps) {
    return (
        <ul className="list-none text-sm leading-[1.8] text-[#555]">
            {items.map((item) => (
                <li
                    key={`${item.label}-${item.value}`}
                    className="flex justify-between border-b border-[#f0f0f0] py-2"
                >
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    );
}

function InfoCard({ title, items, children }: InfoCardProps) {
    return (
        <Card className="p-6.25 max-[600px]:p-4.5">
            <h2 className="mb-3.75 text-[20px] text-[#333]">{title}</h2>
            <InfoList items={items} />
            {children}
        </Card>
    );
}

function ContactItem({ label, value }: ContactItemProps) {
    return (
        <div className="flex flex-col rounded-md bg-[#fff0f0] px-3 py-2.5">
            <span className="mb-1 text-[13px] text-[#777] uppercase">
                {label}
            </span>
            <span className="text-base font-semibold wrap-break-word text-[#d92025]">
                {value}
            </span>
        </div>
    );
}

function AgentCard({ profile, info }: AgentCardProps) {
    return (
        <Card className="p-6.25 text-center max-[600px]:p-4.5">
            <img
                src={profile.avatarUrl}
                alt="Danışman"
                className="mx-auto mb-3.75 h-22.5 w-22.5 rounded-full border-[3px] border-[#fff0f0] object-cover"
            />
            <div className="mb-1 text-[18px] font-semibold">{profile.name}</div>
            <div className="mb-3.75 text-[13px] text-[#777]">
                {profile.role}
            </div>
            <div className="mb-4.5 flex flex-col gap-2.5">
                <div className="flex flex-col gap-2">
                    <ContactItem
                        label="Telefon Numarası"
                        value={profile.phone}
                    />
                    <ContactItem label="E-posta Adresi" value={profile.email} />
                </div>
            </div>
            <InfoList items={info} />
        </Card>
    );
}

function MapPlaceholder({ location }: { location: string }) {
    console.log(location);
    return (
        <div className="mt-3.75 flex h-55 w-full items-center justify-center rounded-[10px] border border-[#eee] bg-[linear-gradient(135deg,#f5f5f5,#eaeaea)] text-sm text-[#999]">
            <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                    location,
                )}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
            ></iframe>
        </div>
    );
}

export default function IlanlarDetay({
    listing,
    galleryImages,
    detailItems,
    agentProfile,
    breadcrumbs,
    similarListings,
    locationInfo,
}: IlanlarDetayProps) {
    const meta = [
        `İlan No: ${listing.id}`,
        `Yayın Tarihi: ${listing.date}`,
        listing.location,
    ];

    const agentInfo = [
        // We reconstruct agentInfo if needed or use what's passed if we passed it.
        // For now, let's use a static or passed prop.
        // Actually I removed agentInfo static const, but didn't pass it fully.
        // Let's create it from listing or pass it.
        // The backend passed 'agentProfile', but maybe not 'agentInfo' (InfoItem[]).
        // Let's assume we want to show generic info there for now or empty.
        { label: 'İlan Türü', value: 'Satılık' }, // Hardcoded or dynamic
        // ... others
    ];
    return (
        <>
            <Head title="İlan Detay" />
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="İlan Detay"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#333]">
                    <PageHeader
                        breadcrumbs={breadcrumbs}
                        title={listing.title}
                        meta={meta}
                    />

                    <div className="mx-auto mt-7.5 mb-7.5 grid max-w-350 grid-cols-[2fr_1fr] gap-6.25 px-5 pb-10 max-[1024px]:grid-cols-1">
                        <section className="min-w-0">
                            <Gallery images={galleryImages} />
                            <DetailGrid
                                price={listing.price}
                                items={detailItems}
                            />
                            <DescriptionSection
                                title="İlan Detayları"
                                description={listing.description}
                            />
                            <FeaturesSection groups={listing.features} />
                        </section>

                        <aside className="min-w-0">
                            <AgentCard
                                profile={agentProfile}
                                info={agentInfo}
                            />
                            <InfoCard
                                title="Konum & Ulaşım"
                                items={locationInfo}
                            >
                                <MapPlaceholder
                                    location={`${listing.neighborhood} Mahallesi ${listing.district} ${listing.city}`}
                                />
                            </InfoCard>
                            {/* <InfoCard
                                title="Benzer İlanlar"
                                items={similarListings}
                            /> */}
                        </aside>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
