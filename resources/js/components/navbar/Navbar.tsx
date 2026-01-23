import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Link } from '@inertiajs/react';
import { Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../data/navigation';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useLockBodyScroll(isMenuOpen);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-1">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" aria-label="Ana sayfa">
                        <img
                            src="https://izeko.org.tr/app/themes/default/assets/images/izeko-logo.png"
                            alt="IZEKO"
                            className="h-22"
                        />
                    </Link>

                    <DesktopMenu items={navItems} />

                    <div className="flex items-center gap-3">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://izeko-crm.vercel.app/"
                            className="flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 lg:px-4 lg:text-sm xl:px-6 xl:text-base"
                        >
                            <User size={16} />
                            Oda CRM Giriş
                        </a>

                        <button
                            onClick={() => setIsMenuOpen((v) => !v)}
                            className="lg:hidden"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <MobileMenu items={navItems} isOpen={isMenuOpen} />
        </nav>
    );
}
