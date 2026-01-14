import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export default function OdaHesapNumaralari() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Oda Hesap Numaraları"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <>
                    <h2 className="text-3xl text-red-600">
                        İZMİR EMLAK KOMİSYONCULARI ODASI BANKA HESAPLARI
                    </h2>
                    <br />
                    <h2 className="text-2xl text-red-600">
                        Denizbank (Masrafsızlık Tanımlı)
                    </h2>
                    <p>Şube Adı: ŞAİR EŞREF BULVARI ŞUBESİ</p>
                    <p>Şube Kodu: 2860</p>
                    <p>
                        Hesap No: 4555314 IBAN: TR 8200 1340 0000 4555 3140 0001
                    </p>
                    <p>HESAP İSMİ : İZMİR EMLAK KOMİSYONCULARI ODASI</p>
                    <br />
                    <h2 className="text-2xl text-red-600">Akbank</h2>
                    <p>Şube Adı: ÜÇYOL ŞUBE</p> <p>Şube Kodu: 291</p>{' '}
                    <p>Hesap No: 229627</p>{' '}
                    <p>IBAN: TR 80 0004 6002 9188 8000 2296 57</p>{' '}
                    <p>HESAP İSMİ : İZMİR EMLAK KOMİSYONCULARI ODASI</p>
                    <br />
                    <h2 className="text-2xl text-red-600">Halkbank</h2>
                    <p>Şube Adı: ÇANKAYA ŞUBESİ</p> <p>Şube Kodu: 739</p>{' '}
                    <p>Hesap No: 16000019</p>{' '}
                    <p>IBAN: TR 7200 0120 0973 9000 1600 0019</p>{' '}
                    <p>HESAP İSMİ : İZMİR EMLAK KOMİSYONCULARI ODASI</p>
                    <br />
                    <h2 className="text-2xl text-red-600">
                        Yapı Kredi Bankası
                    </h2>
                    <p>Şube Adı: GAZİ BULVARI ŞUBESİ</p> <p>Şube Kodu: 642</p>{' '}
                    <p>Hesap No: 82129066</p>{' '}
                    <p>IBAN: TR 4100 0670 1000 0000 8212 9066</p>{' '}
                    <p>HESAP İSMİ : İZMİR EMLAK KOMİSYONCULARI ODASI</p>
                </>
            </ArticleLayout>
            <Footer />
        </>
    );
}
