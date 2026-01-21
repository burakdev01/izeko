import { Link } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

interface FooterLinkProps {
    icon: React.ReactNode;
    text: string;
    href?: string;
}

const isInternalHref = (href: string) =>
    href.startsWith('/') && !href.startsWith('//');

const FooterLink: React.FC<FooterLinkProps> = ({ icon, text, href = '#' }) => {
    const className =
        'group mb-3 flex items-center gap-3 text-gray-300 transition-colors hover:text-red-500';
    const content = (
        <>
            <span className="text-red-500 transition-transform group-hover:scale-110">
                {icon}
            </span>
            <span className="text-sm md:text-base">{text}</span>
        </>
    );

    if (isInternalHref(href)) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <a href={href} className={className}>
            {content}
        </a>
    );
};

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
                                href="https://www.facebook.com/izmiremlakcilarodasi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110 hover:text-red-500"
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
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110 hover:text-red-500"
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
                                className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-all hover:scale-110 hover:text-red-500"
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
                                href="/"
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
                                href="/ofisler"
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
                                href="/haberler"
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
                                href="/haberler"
                            />
                            <FooterLink
                                icon={<Mail className="h-5 w-5" />}
                                text="İletişim"
                                href="/iletisim"
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
                                href="/duyurular"
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
                                href="/kullanim-kosullari"
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
                                href="/hukuki-sartlar"
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
                                href="/gizlilik-sozlesmesi"
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
                                href="/sss"
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
