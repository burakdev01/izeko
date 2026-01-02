import { useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { newsItems } from '../data/newsItems';
import { NewsCard } from './NewsCard';

export function StackedNewsCarousel() {
    const swiperRef = useRef<any>(null);
    const [active, setActive] = useState(0);

    const prev = (active - 1 + newsItems.length) % newsItems.length;
    const next = (active + 1) % newsItems.length;

    return (
        <section className="relative flex justify-center py-32">
            {/* GÖRSEL STACK */}
            <div className="relative h-[420px] w-[520px]">
                {/* SOL */}
                <div className="absolute top-1/2 left-1/2 z-10 -translate-x-[120%] translate-y-10 scale-90 opacity-60">
                    <div className="w-[420px]">
                        <NewsCard item={newsItems[prev]} />
                    </div>
                </div>

                {/* SAĞ */}
                <div className="absolute top-1/2 left-1/2 z-10 translate-x-[20%] translate-y-10 scale-90 opacity-60">
                    <div className="w-[420px]">
                        <NewsCard item={newsItems[next]} />
                    </div>
                </div>

                {/* ORTA (EN ÜSTTE) */}
                <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[480px] shadow-2xl">
                        <NewsCard item={newsItems[active]} />
                    </div>
                </div>
            </div>

            {/* GİZLİ SWIPER (SADECE INDEX) */}
            <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => setActive(s.realIndex)}
                slidesPerView={1}
                loop
                className="pointer-events-auto absolute inset-0 opacity-0"
            >
                {newsItems.map((item) => (
                    <SwiperSlide key={item.id} />
                ))}
            </Swiper>
        </section>
    );
}
