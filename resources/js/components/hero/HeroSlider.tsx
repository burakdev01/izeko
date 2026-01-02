// components/hero/HeroSlider.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/heroSlides';
import { HeroSlide } from './HeroSlide';
import { useHeroSlider } from './useHeroSlider';

export function HeroSlider() {
    const { index, progress, next, prev } = useHeroSlider({
        length: heroSlides.length,
        interval: 8192,
    });

    const activeSlide = heroSlides[index];

    return (
        <section className="relative w-full overflow-hidden">
            <HeroSlide slide={activeSlide} />

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-black/30">
                <div
                    className="h-full bg-red-600 transition-none"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Controls */}
            <div className="absolute right-6 bottom-6 z-30 flex gap-3">
                <button
                    onClick={prev}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80"
                >
                    <ChevronLeft size={22} />
                </button>

                <button
                    onClick={next}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80"
                >
                    <ChevronRight size={22} />
                </button>
            </div>
        </section>
    );
}
