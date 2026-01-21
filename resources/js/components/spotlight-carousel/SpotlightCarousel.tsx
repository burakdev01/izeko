import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './spotlight.css';

import { Link } from '@inertiajs/react';

interface SlideData {
    id: number;
    image: string;
    title: string;
    description?: string | null;
    slug?: string;
    date?: string;
}

// ... existing code ...

interface SpotlightCarouselProps {
    slides?: SlideData[];
}

export const SpotlightCarousel = ({ slides = [] }: SpotlightCarouselProps) => {
    if (!slides || slides.length === 0) return null;

    return (
        <div className="w-full px-4">
            <div className="mx-auto max-w-6xl">
                <Swiper
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    pagination={false}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="news-swiper"
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className="!w-[90%] md:!w-[60%]"
                        >
                            <Link
                                href={route('manset.show', slide.slug || '')}
                                className="group relative block h-[430px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url('${slide.image}')`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                </div>

                                {/* Date Badge */}
                                {slide.date && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <div className="rounded-full bg-white px-6 py-3 shadow-lg">
                                            <span className="text-sm font-bold text-red-600">
                                                {slide.date}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
                                    {/* Title */}
                                    <h2 className="mb-2 text-xl leading-tight font-bold text-white drop-shadow-lg md:mb-3 md:text-2xl lg:mb-4 lg:text-3xl">
                                        {slide.title
                                            .split(' ')
                                            .map((word, index) => (
                                                <span
                                                    key={index}
                                                    className={
                                                        index < 2
                                                            ? 'text-[#da1f25]'
                                                            : 'text-white'
                                                    }
                                                >
                                                    {word}{' '}
                                                </span>
                                            ))}
                                    </h2>

                                    {/* Description */}
                                    {slide.description && (
                                        <div className="mb-4 inline-block max-w-3xl rounded-xl bg-gradient-to-t from-black/80 to-transparent p-4 md:mb-5 md:p-5 lg:mb-6 lg:p-6">
                                            <p className="line-clamp-2 text-xs leading-relaxed text-white drop-shadow-md md:line-clamp-3 md:text-sm lg:line-clamp-none lg:text-base">
                                                {slide.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <div className="relative z-20">
                                        <span className="inline-flex transform items-center gap-2 rounded-full bg-[#da1f25] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-800 hover:shadow-xl md:gap-3 md:px-6 md:py-2.5 md:text-base lg:px-8 lg:py-3">
                                            Detaylı Bilgi
                                            <ArrowRight
                                                size={16}
                                                className="md:h-5 md:w-5"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
