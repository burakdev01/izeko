import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Building2, Filter, Search } from 'lucide-react';
export default function Ofisler() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Ofisler"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4">
                        {/* Filters */}
                        <aside className="rounded-xl bg-white shadow md:col-span-1">
                            {/* Header */}
                            <div className="flex items-center gap-2 rounded-t-xl bg-red-600 px-4 py-3 text-white">
                                <Filter size={18} />
                                <span className="font-semibold">Filtreler</span>
                            </div>

                            <div className="space-y-4 p-4">
                                {/* Ofis Adı */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Ofis Adı
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ofis Adı"
                                            className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        <Search
                                            size={16}
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* İl */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Adres
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
                                        <option>İl Seçin</option>
                                    </select>
                                </div>

                                {/* İlçe */}
                                <div>
                                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
                                        <option>İlçe Seçin</option>
                                    </select>
                                </div>

                                {/* Button */}
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
                                    <Filter size={18} />
                                    Filtreleri Uygula
                                </button>
                            </div>
                        </aside>

                        {/* Content */}
                        <main className="space-y-6 md:col-span-3">
                            {/* Top Bar */}
                            <div className="rounded-xl bg-white px-6 py-4 font-medium text-gray-700 shadow">
                                Toplam Ofis :{' '}
                                <span className="font-semibold">**</span>
                            </div>

                            {/* Empty State */}
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white px-6 py-16 text-center shadow">
                                <Building2
                                    size={64}
                                    className="mb-4 text-gray-400"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Ofis Bulunamadı
                                </h3>
                                <p className="mt-2 max-w-md text-gray-500">
                                    Aradığınız kriterlere uygun ofis bulunamadı.
                                    Lütfen farklı filtreler deneyiniz.
                                </p>
                            </div>
                        </main>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
