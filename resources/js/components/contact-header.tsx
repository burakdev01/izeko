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
                                className="bg-opacity-20 hover:bg-opacity-30 text-whit flex h-6 w-6 items-center justify-center rounded-full bg-transparent fill-white"
                            >
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Facebook</title>
                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                </svg>
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
