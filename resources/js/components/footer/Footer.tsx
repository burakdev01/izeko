import FooterColumn from './FooterColumn';
import { aboutText, contactInfo, infoLinks, quickLinks } from './footer.data';

const Footer = () => {
    return (
        <footer className="bg-[#0b1220] text-white">
            {/* Top */}
            <div className="mx-auto max-w-7xl px-6 py-16">
                {/* Logo */}
                <div className="mb-14 flex justify-center">
                    <img
                        src="https://izeko.org.tr/app/themes/default/assets/images/izeko-logo.png"
                        alt="İZEKO"
                        className="h-14"
                    />
                </div>

                {/* Columns */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <FooterColumn title="Hakkımızda">
                        <p>{aboutText}</p>
                    </FooterColumn>

                    {/* Quick Links */}
                    <FooterColumn title="Hızlı Bağlantılar">
                        {quickLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block transition hover:text-white"
                            >
                                {link}
                            </a>
                        ))}
                    </FooterColumn>

                    {/* Info */}
                    <FooterColumn title="Bilgilendirici">
                        {infoLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block transition hover:text-white"
                            >
                                {link}
                            </a>
                        ))}
                    </FooterColumn>

                    {/* Contact */}
                    <FooterColumn title="İletişim">
                        {contactInfo.map((info, index) => (
                            <p key={index}>{info}</p>
                        ))}
                    </FooterColumn>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row">
                    <span>
                        © 2025 İzmir Emlak Komisyoncuları Odası. Tüm Hakları
                        Saklıdır.
                    </span>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white">
                            Gizlilik Politikası
                        </a>
                        <a href="#" className="hover:text-white">
                            KVKK
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="bg-[#090f1b] py-4 text-center text-sm text-gray-400">
                Tüm Dijital Faaliyetleri{' '}
                <span className="font-medium text-red-500">
                    Deniz Web Ajans
                </span>{' '}
                tarafından yürütülmektedir.
            </div>
        </footer>
    );
};

export default Footer;
