import { Link } from '@inertiajs/react';
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
                            <span className="text-sm font-bold">
                                +90 (232) 425 85 91
                            </span>
                        </a>
                        <a
                            href="mailto:info@izeko.org.tr"
                            className="hidden items-center gap-2 transition-opacity hover:opacity-80 lg:flex"
                        >
                            <Mail size={16} />
                            <span className="text-sm font-bold">
                                info@izeko.org.tr
                            </span>
                        </a>
                        <div className="hidden items-center gap-2 xl:flex">
                            <MapPin size={16} className="flex-shrink-0" />
                            <span className="text-sm font-bold">
                                Yenigün, Gazi Osman Paşa Blv. Koçaş İş Merkez
                                No:87 303-304, 35250 Konak/İzmir
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/iletisim"
                            className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        >
                            <MapPin size={16} />
                            <span className="text-base font-bold">
                                İletişim
                            </span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://www.facebook.com/izmiremlakcilarodasi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="h-6 w-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/izeko1999/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="h-6 w-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCVcCiUebz5iVbKhit--6xZg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110"
                                aria-label="YouTube"
                            >
                                <svg
                                    className="h-6 w-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
