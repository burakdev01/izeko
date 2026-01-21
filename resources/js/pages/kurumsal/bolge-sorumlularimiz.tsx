import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { useState } from 'react';

export default function BolgeSorumlularimiz() {
    const [searchTerm, setSearchTerm] = useState('');

    const regions = [
        { region: 'Alsancak Bölge Sorumlusu', name: 'Nezih DİNDAR' },
        { region: 'Balçova Bölge Sorumlusu', name: 'Yusuf ÇOKYAŞAR' },
        { region: 'Bayraklı Bölge Sorumlusu', name: 'Aytekin DELİBAŞ' },
        { region: 'Bornova Bölge Sorumlusu', name: 'Serkan ÇELİK' },
        { region: 'Buca Bölge Sorumlusu', name: 'Ebru YAZICI' },
        { region: 'Çiğli Bölge Sorumlusu', name: 'Ayhan DEMİRCİ' },
        { region: 'Dikili Bölge Sorumlusu', name: 'Belgin ÇİFTLER' },
        { region: 'Foça Bölge Sorumlusu', name: 'Kenan DÜZGÜN' },
        { region: 'Gaziemir Bölge Sorumlusu', name: 'Ahmet ARSLAN' },
        { region: 'Hatay Bölge Sorumlusu', name: 'Şükran ŞAHİN' },
        { region: 'Karşıyaka Bölge Sorumlusu', name: 'Münir ÖNDER' },
        { region: 'Kemalpaşa Bölge Sorumlusu', name: 'Kenan SEMET' },
        { region: 'Kemalpaşa Bölge Temsilcisi', name: 'Kenan Semet' },
        { region: 'Menderes Bölge Sorumlusu', name: 'Furkan ÖZER' },
        { region: 'Menderes Bölge Temsilcisi', name: 'Deniz Budak' },
        { region: 'Menemen Bölge Sorumlusu', name: 'Gül AKMAN' },
        { region: 'Narlıdere Bölge Sorumlusu', name: 'İbrahim GÜDÜCÜ' },
        { region: 'Seferihisar Bölge Sorumlusu', name: 'Atilla AKGÜN' },
        { region: 'Urla Bölge Sorumlusu', name: 'Süleyman ALKAN' },
    ];

    const filteredRegions = regions.filter(
        (item) =>
            item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Bölge Sorumlularımız"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 rounded-full border-2 border-gray-200 bg-white p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Bölge sorumlusu ara..."
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    className="w-full rounded-full border-0 bg-transparent py-1 pr-6 [text-indent:18px] text-xl font-medium text-gray-500 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                            <div className="grid grid-cols-1 border-b-2 border-red-500 bg-gray-100 shadow-md sm:grid-cols-2">
                                <div className="px-8 py-6">
                                    <h2 className="text-base font-semibold text-red-500 sm:text-2xl">
                                        Görevli Olduğu Bölge
                                    </h2>
                                </div>
                                <div className="px-8 py-6 sm:text-start">
                                    <h2 className="text-lg font-semibold text-red-500 sm:text-2xl">
                                        Ad Soyad
                                    </h2>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {filteredRegions.length > 0 ? (
                                    filteredRegions.map((item, index) => (
                                        <div
                                            key={`${item.name}-${index}`}
                                            className="grid grid-cols-1 transition-colors hover:bg-gray-50 sm:grid-cols-2"
                                        >
                                            <div className="border-gray-200 px-8 py-6 sm:border-b-0">
                                                <p className="text-base font-medium text-gray-800 sm:text-lg">
                                                    {item.region}
                                                </p>
                                            </div>
                                            <div className="px-8 py-6 sm:text-start">
                                                <p className="text-base font-medium text-gray-800 sm:text-lg">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center">
                                        <p className="py-12 text-lg text-gray-500">
                                            Sonuç bulunamadı
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
