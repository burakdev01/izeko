import {
    Clock,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';
import React from 'react';

interface FooterLinkProps {
    icon: React.ReactNode;
    text: string;
    href?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ icon, text, href = '#' }) => (
    <a
        href={href}
        className="group mb-3 flex items-center gap-3 text-gray-300 transition-colors hover:text-red-500"
    >
        <span className="text-red-500 transition-transform group-hover:scale-110">
            {icon}
        </span>
        <span className="text-sm md:text-base">{text}</span>
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0f1729] px-4 py-12 text-white md:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src="https://izeko.org.tr/app/themes/default/assets/images/izeko-logo.png"
                        alt="İZEKO Logo"
                        className="h-12 w-auto md:h-16"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    {/* Hakkımızda Section */}
                    <div>
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm">
                                i
                            </span>
                            Hakkımızda
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                            İzmir Emlak Komisyoncuları Odası, sektörde güvenin
                            ve profesyonelliğin adresi. Güncel bilgiler ve
                            kaliteli hizmet için doğru yerdesiniz.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="group flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a2332] transition-colors hover:bg-red-500"
                            >
                                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="group flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a2332] transition-colors hover:bg-red-500"
                            >
                                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a
                                href="#"
                                className="group flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a2332] transition-colors hover:bg-red-500"
                            >
                                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Hızlı Bağlantılar Section */}
                    <div>
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                            Hızlı Bağlantılar
                        </h3>
                        <nav className="space-y-1">
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                }
                                text="Anasayfa"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Ofisler"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                    </svg>
                                }
                                text="Haberler"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Blog & Makale"
                            />
                            <FooterLink
                                icon={<Mail className="h-5 w-5" />}
                                text="İletişim"
                            />
                        </nav>
                    </div>

                    {/* Bilgilendirici Section */}
                    <div>
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                            <svg
                                className="h-6 w-6 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                            Bilgilendirici
                        </h3>
                        <nav className="space-y-1">
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Mevzuat"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Kullanım Koşulları"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Hukuki Şartlar"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="Gizlilik Sözleşmesi"
                            />
                            <FooterLink
                                icon={
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                                text="SSS"
                            />
                        </nav>
                    </div>

                    {/* İletişim Section */}
                    <div>
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                            <MapPin className="h-6 w-6 text-red-500" />
                            İletişim
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-gray-300">
                                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                                <p className="text-sm md:text-base">
                                    Yenigün, Gazi Osman Paşa Blv. Koçaş İş
                                    Merkez No:87 303-304, 35250, 35250
                                    Konak/İzmir
                                </p>
                            </div>

                            <a
                                href="tel:+902324258591"
                                className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-red-500"
                            >
                                <Phone className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
                                <span className="text-sm md:text-base">
                                    +90 (232) 425 85 91
                                </span>
                            </a>

                            <a
                                href="tel:+902324258592"
                                className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-red-500"
                            >
                                <Phone className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
                                <span className="text-sm md:text-base">
                                    +90 (232) 425 85 92
                                </span>
                            </a>

                            <a
                                href="mailto:info@izeko.org.tr"
                                className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-red-500"
                            >
                                <Mail className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
                                <span className="text-sm md:text-base">
                                    info@izeko.org.tr
                                </span>
                            </a>

                            <div className="flex items-center gap-3 text-gray-300">
                                <Clock className="h-5 w-5 flex-shrink-0 text-red-500" />
                                <span className="text-sm md:text-base">
                                    Pazartesi - Cuma: 08:30 - 17:30
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
