import { ArrowRight } from 'lucide-react';
import { SlideData } from './types';

interface Props {
    slide: SlideData;
}

export const SpotlightSlide = ({ slide }: Props) => {
    return (
        <div className="group relative h-[500px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${slide.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Date */}
            <div className="absolute top-6 right-6 z-10 rounded-full bg-white px-6 py-3">
                <span className="text-sm font-bold text-red-600">
                    {slide.date}
                </span>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                    {slide.title}
                </h2>

                <p className="mb-6 max-w-3xl text-white/90">
                    {slide.description}
                </p>

                <button className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-3 font-semibold text-white">
                    Detaylı Bilgi
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};
