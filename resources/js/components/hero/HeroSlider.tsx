import { heroSlides } from '../data/heroSlides';
import { HeroSlide } from './HeroSlide';
import { useHeroSlider } from './useHeroSlider';

export function HeroSlider() {
    const activeIndex = useHeroSlider({
        length: heroSlides.length,
        interval: 3000,
    });

    const activeSlide = heroSlides[activeIndex];

    return (
        <section className="relative w-full overflow-hidden">
            <HeroSlide slide={activeSlide} />
        </section>
    );
}
