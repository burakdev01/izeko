import { NewsDateBadge } from './NewsDateBadge';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

export function NewsCard({ item }: Props) {
    return (
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
            <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            <NewsDateBadge date={item.date} />

            {/* Content */}
            <div className="absolute bottom-0 z-10 w-full p-8 text-white">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white/90">{item.excerpt}</p>

                <button className="mt-5 rounded-full bg-red-600 px-6 py-2 text-sm font-medium text-white">
                    Detaylı Bilgi →
                </button>
            </div>
        </div>
    );
}
