import { MenuItem } from './types';

interface Props {
    items: MenuItem[];
}

export function MobileSubmenu({ items }: Props) {
    return (
        <div className="relative mt-2 mb-4 ml-10">
            <span className="absolute top-0 left-0 h-full border-l-2 border-dashed border-orange-200" />

            <div className="ml-6 space-y-2">
                {items.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`block rounded-xl px-4 py-2 text-[15px] font-medium transition-colors ${
                            item.isHighlighted
                                ? 'bg-gray-100 font-medium text-red-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                        }`}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
