import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Users,
    Youtube,
} from 'lucide-react';
export default function Iletisim() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="İletişim"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="min-h-screen">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* LEFT – CONTACT INFO */}
                        <div className="rounded-xl bg-white p-6 shadow md:p-8">
                            <h2 className="mb-6 text-2xl font-semibold text-red-600">
                                İletişim Bilgileri
                            </h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Adres */}
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Adres
                                        </h4>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                            Yenigün, Gazi Osman Paşa Blv.
                                            <br />
                                            Koçaş İş Merkez No:87 303-304
                                            <br />
                                            35250 Konak / İzmir
                                        </p>
                                    </div>
                                </div>

                                {/* Telefon 1 */}
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Telefon
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-600">
                                            +90 (232) 425 85 91
                                        </p>
                                    </div>
                                </div>

                                {/* Telefon 2 */}
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            Telefon
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-600">
                                            +90 (232) 425 85 92
                                        </p>
                                    </div>
                                </div>

                                {/* E-posta */}
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            E-posta
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-600">
                                            info@izeko.org.tr
                                        </p>
                                    </div>
                                </div>

                                {/* Sosyal Medya */}
                                <div className="flex gap-4 md:col-span-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="mb-2 font-semibold text-gray-800">
                                            Sosyal Medya
                                        </h4>
                                        <div className="flex gap-3">
                                            <a className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-600 transition hover:bg-red-600 hover:text-white">
                                                <Facebook size={16} />
                                            </a>
                                            <a className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-600 transition hover:bg-red-600 hover:text-white">
                                                <Instagram size={16} />
                                            </a>
                                            <a className="flex h-9 w-9 items-center justify-center rounded-full border text-gray-600 transition hover:bg-red-600 hover:text-white">
                                                <Youtube size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MAP */}
                            <div className="mt-6 h-[260px] overflow-hidden rounded-lg border">
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12503.55755994515!2d27.137323!3d38.420921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd8faa98c91e5%3A0x29cea2dd9f2a22f7!2s%C4%B0zmir%20Emlak%20Komisyoncular%C4%B1%20Odas%C4%B1!5e0!3m2!1sen!2str!4v1768855278766!5m2!1sen!2str"
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* RIGHT – FORM */}
                        <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow md:p-8">
                            {/* Decorative background */}
                            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-100" />
                            <div className="absolute bottom-0 -left-32 h-72 w-72 rounded-full bg-red-100" />

                            <div className="relative">
                                <h2 className="mb-6 text-2xl font-semibold text-red-600">
                                    Bize Ulaşın
                                </h2>

                                <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            E-posta
                                        </label>
                                        <input
                                            type="email"
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Konu
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Konu başlığı"
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm text-gray-700">
                                            Mesajınız
                                        </label>
                                        <textarea
                                            rows={5}
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
                                        >
                                            Gönder
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
