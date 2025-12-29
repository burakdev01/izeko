import { HeroOverlay } from './HeroOverlay';
import { HeroSlideData } from './types';

interface Props {
    slide: HeroSlideData;
}

export function HeroSlide({ slide }: Props) {
    return (
        <div className="relative h-[70vh] min-h-[480px] w-full">
            {/* Background */}
            <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
                <HeroOverlay title={slide.title} subtitle={slide.subtitle} />
            </div>
        </div>
    );
}
