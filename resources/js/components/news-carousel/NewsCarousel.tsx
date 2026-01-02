// components/CardCarousel.tsx
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

type Card = {
    id: number;
    title: string;
    image: string;
};

const cards: Card[] = [
    {
        id: 1,
        title: '1111',
        image: 'https://picsum.photos/400/500?1',
    },
    {
        id: 2,
        title: '2222',
        image: 'https://picsum.photos/400/500?2',
    },
    {
        id: 3,
        title: '3333',
        image: 'https://picsum.photos/400/500?3',
    },
    {
        id: 4,
        title: '4444',
        image: 'https://picsum.photos/400/500?3',
    },
];

export function NewsCarousel() {
    return (
        <div className="mx-auto w-full max-w-5xl py-20">
            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                centeredSlides
                slidesPerView={3}
                grabCursor
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
                className="!overflow-visible"
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id}>
                        {({ isActive }) => (
                            <div
                                className={`overflow-hidden rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? 'z-20 scale-100'
                                        : 'z-10 translate-y-10 scale-75'
                                } `}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="h-[420px] w-full object-cover"
                                />
                                <div className="bg-white p-4 text-center">
                                    <h3 className="font-semibold">
                                        {card.title}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
