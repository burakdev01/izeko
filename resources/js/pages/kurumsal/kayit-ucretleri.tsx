import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export default function KayitUcretleri() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Kayıt Ücretleri ve Aidat"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700 sm:text-3xl">
                            İZMİR ESNAF VE SANATKARLAR ODALARI BİRLİĞİ
                        </h2>

                        <div className="flex flex-col gap-3 text-base text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                <span className="font-semibold text-gray-700">
                                    Sayı:
                                </span>{' '}
                                93258777-TESK.İESOB.GSK.YAZI.2024/6-8
                            </p>
                            <p className="font-semibold text-gray-700">
                                01.01.2025 - 31.12.2025
                            </p>
                        </div>

                        <p className="text-lg font-semibold text-gray-700">
                            TARİHLERİ ARASINDA SİCİL TARAFINDAN TAHSİL EDİLECEK
                            ÜCRETLER
                        </p>
                    </div>

                    <div className="mt-10 overflow-x-auto">
                        <table className="w-full text-left text-gray-700">
                            <thead className="text-sm font-semibold text-gray-500">
                                <tr className="border-b-2 border-red-500">
                                    <th className="py-5 pr-6"> </th>
                                    <th className="py-5 pr-6">GAZETE</th>
                                    <th className="py-5 pr-6">MALİYE</th>
                                    <th className="py-5 pr-6">KAYIT ÜCRETİ</th>
                                    <th className="py-5 pr-6">HİZMET BEDELİ</th>
                                    <th className="py-5 text-right">TOPLAM</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-base font-medium">
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        YENİ KAYIT
                                    </td>
                                    <td className="py-6 pr-6">328,00</td>
                                    <td className="py-6 pr-6">1.858,05</td>
                                    <td className="py-6 pr-6">2.674,00</td>
                                    <td className="py-6 pr-6">266,00</td>
                                    <td className="py-6 text-right">
                                        6.063,05
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        SİCİL TERK
                                    </td>
                                    <td className="py-6 pr-6">76,00</td>
                                    <td className="py-6 pr-6">442,65</td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 text-right">518,65</td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        MESLEK TERK
                                    </td>
                                    <td className="py-6 pr-6">76,00</td>
                                    <td className="py-6 pr-6">442,65</td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 text-right">518,65</td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        TADİL
                                    </td>
                                    <td className="py-6 pr-6">115,00</td>
                                    <td className="py-6 pr-6">1.514,65</td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6">261,00</td>
                                    <td className="py-6 text-right">
                                        1.890,65
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        TASDİKNAME
                                    </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6">376,55</td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6">261,00</td>
                                    <td className="py-6 text-right">637,55</td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-6 font-semibold text-gray-600">
                                        İHALE
                                    </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6"> </td>
                                    <td className="py-6 pr-6">261,00</td>
                                    <td className="py-6 text-right">261,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
