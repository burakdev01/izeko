import { HeroOverlay } from './HeroOverlay';
import { HeroSlideData } from './types';

interface Props {
    slide: HeroSlideData;
}

const videoSourceRegex = /\.(mp4|webm|ogg)(\?.*)?$/i;

const isVideoSource = (src?: string) =>
    Boolean(src && videoSourceRegex.test(src));

export function HeroSlide({ slide }: Props) {
    const mediaSrc = slide.video ?? slide.image;
    const isVideo = Boolean(slide.video) || isVideoSource(slide.image);

    if (!mediaSrc) {
        return null;
    }

    return (
        <div className="relative h-[70vh] min-h-[480px] w-full">
            {/* Background */}
            {isVideo ? (
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={mediaSrc}
                    poster={slide.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                />
            ) : (
                <img
                    src={mediaSrc}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
                <HeroOverlay title={slide.title} subtitle={slide.subtitle} />
            </div>
        </div>
    );
}
