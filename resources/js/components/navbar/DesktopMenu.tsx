import { ChevronDown } from 'lucide-react';
import { NavItem } from './types';

interface Props {
    items: NavItem[];
}

export function DesktopMenu({ items }: Props) {
    return (
        <div className="hidden items-center space-x-4 lg:flex xl:space-x-6">
            {items.map((item) =>
                item.submenu ? (
                    <div key={item.id} className="group relative">
                        <button className="flex items-center gap-1 text-lg font-bold text-gray-700 hover:text-red-600">
                            {item.label}
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>

                        <div className="invisible absolute top-full left-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                            {item.submenu.map((sub, i) => (
                                <a
                                    key={sub.path}
                                    href={sub.path}
                                    className={`block px-6 py-3 text-lg ${
                                        sub.isHighlighted
                                            ? 'border-l-4 border-l-red-600 bg-red-50 text-red-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                    } ${
                                        i !== item.submenu!.length - 1
                                            ? 'border-b border-gray-100'
                                            : ''
                                    }`}
                                >
                                    {sub.label}
                                </a>
                            ))}
                        </div>
                    </div>
                ) : (
                    <a
                        key={item.id}
                        href={item.path}
                        className="text-lg font-bold text-gray-700 hover:text-red-600"
                    >
                        {item.label}
                    </a>
                ),
            )}
        </div>
    );
}
