import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './spotlight.css';

interface SlideData {
    id: number;
    image: string;
    title: string;
    description?: string | null;
    date?: string;
}

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
                            className="!w-[80%] md:!w-[60%]"
                        >
                            <div className="group relative h-[430px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
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
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                    {/* Title */}
                                    <h2 className="mb-4 text-3xl leading-tight font-bold text-white drop-shadow-lg md:text-4xl">
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
                                        <p className="mb-6 max-w-3xl text-base leading-relaxed text-white/90 drop-shadow-md md:text-lg">
                                            {slide.description}
                                        </p>
                                    )}

                                    {/* CTA Button */}
                                    <div>
                                        <button className="inline-flex transform items-center gap-3 rounded-full bg-[#da1f25] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-800 hover:shadow-xl">
                                            Detaylı Bilgi
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
