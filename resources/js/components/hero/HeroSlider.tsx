// components/hero/HeroSlider.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';
import { HeroSlide } from './HeroSlide';
import { useHeroSlider } from './useHeroSlider';

export function HeroSlider() {
    const { index, next, prev } = useHeroSlider({
        length: heroSlides.length,
        interval: 3000,
    });

    const activeSlide = heroSlides[index];

    return (
        <section className="relative w-full overflow-hidden">
            <HeroSlide slide={activeSlide} />

            {/* Controls */}
            <div className="absolute right-6 bottom-6 z-20 flex gap-3">
                <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
                >
                    <ChevronLeft size={22} />
                </button>

                <button
                    onClick={next}
                    aria-label="Next slide"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
}
