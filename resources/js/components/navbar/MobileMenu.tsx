import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { iconMap } from './iconMap';
import { MobileSubmenu } from './MobileSubmenu';
import { NavItem } from './types';

interface Props {
    items: NavItem[];
    isOpen: boolean;
}

export function MobileMenu({ items, isOpen }: Props) {
    const [openId, setOpenId] = useState<string | null>(null);

    if (!isOpen) return null;

    return (
        <div
            className="overflow-y-auto overscroll-contain border-t bg-white pb-24 lg:hidden"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
            <ul className="divide-y">
                {items.map((item) => {
                    const opened = openId === item.id;

                    return (
                        <li key={item.id}>
                            {item.submenu ? (
                                <button
                                    onClick={() =>
                                        setOpenId(opened ? null : item.id)
                                    }
                                    className="flex w-full items-center justify-between px-5 py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        {iconMap[item.icon]}
                                        <span className="text-base font-medium text-gray-700">
                                            {item.label}
                                        </span>
                                    </div>

                                    <ChevronDown
                                        className={`h-5 w-5 transition-transform ${
                                            opened ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                            ) : (
                                <a
                                    href={item.path}
                                    className="flex w-full items-center justify-between px-5 py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        {iconMap[item.icon]}
                                        <span className="text-base font-medium text-gray-700">
                                            {item.label}
                                        </span>
                                    </div>
                                </a>
                            )}

                            {item.submenu && opened && (
                                <MobileSubmenu items={item.submenu} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
