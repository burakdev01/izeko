import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';

export default function TopBar() {
    return (
        <div className="bg-red-600 py-3 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6">
                        <a
                            href="tel:+902324258591"
                            className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        >
                            <Phone size={16} />
                            <span className="text-sm font-medium">
                                +90 (232) 425 85 91
                            </span>
                        </a>
                        <a
                            href="mailto:info@izeko.org.tr"
                            className="hidden items-center gap-2 transition-opacity hover:opacity-80 lg:flex"
                        >
                            <Mail size={16} />
                            <span className="text-sm font-medium">
                                info@izeko.org.tr
                            </span>
                        </a>
                        <div className="hidden items-center gap-2 xl:flex">
                            <MapPin size={16} className="flex-shrink-0" />
                            <span className="text-sm font-medium">
                                Yenigün, Gazi Osman Paşa Blv. Koçaş İş Merkez
                                No:87 303-304, 35250 Konak/İzmir
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="#iletisim"
                            className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        >
                            <MapPin size={16} />
                            <span className="text-sm font-medium">
                                İletişim
                            </span>
                        </a>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <Facebook size={16} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <Youtube size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
