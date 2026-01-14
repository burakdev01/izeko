import { Mail, MapPin, Phone } from 'lucide-react';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

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
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <img
                                    src={`${publicUrl}/images/facebook.png`}
                                    className="h-4 w-4"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <img
                                    src={`${publicUrl}/images/twitter.png`}
                                    className="h-3 w-3"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-opacity-20 hover:bg-opacity-30 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all"
                            >
                                <img
                                    src={`${publicUrl}/images/youtube.png`}
                                    className="h-4 w-4"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
