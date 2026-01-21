import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export default function OdaKayitIslemleri() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Oda Kayıt İşlemleri"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="text-[#1f2937 space-y-6 p-3 text-base leading-relaxed font-medium">
                    <b className="text-sm font-bold">
                        ESNAF SİCİL MÜDÜRLÜĞÜNE KAYIT İÇİN GEREKLİ EVRAKLAR
                    </b>
                    <br />
                    <span>1) 1 ADET NÜFUS FOTOKOPİSİ</span> <br />
                    <span>2) 1 ADET FOTOĞRAF</span> <br />
                    <span>3) 1 ADET VERGİ LEVHASI FOTOKOPİSİ</span> <br />
                    <span>4) 4.245,05 TL KAYIT ÜCRETİ ALINMAKTADIR</span>
                    <br />
                    <br />
                    <b className="text-sm font-bold">
                        ESNAF SİCİL DİĞER İŞLEM ÜCRETLERİ
                    </b>
                    <br />
                    <span>
                        1) SİCİL TERK <b>348,55</b> TL
                    </span>{' '}
                    <br />
                    <span>
                        2) MESLEK TERK <b>348,55</b> TL
                    </span>{' '}
                    <br />
                    <span>
                        3) TADİL <b>1.315,40</b> TL
                    </span>{' '}
                    <br />
                    <span>
                        4 ) TASDİKNAME <b>462,65</b> TL
                    </span>{' '}
                    <br />
                    <br />
                    <b className="text-sm font-bold">
                        ADRES:ESNAF SİCİL MÜDÜRLÜĞÜ
                    </b>
                    <br />
                    <span>
                        ŞEHİT FETİBEY BLV. NO:49/1 BİRLİK PLAZA KAT:1 (TOPÇU
                        RESTORANT KARŞISI) PASAPORT ALSANCAK KONAK / İZMİR
                    </span>
                    <br />
                    <span>
                        <b>TEL:</b> 0232 482 02 62
                    </span>
                    <br />
                    <br />
                    <b className="text-sm font-bold">
                        ODA KAYDI İÇİN GEREKEN EVRAKLAR
                    </b>
                    <br />
                    <span>
                        1) 1 ADET ESNAF SİCİL TASDİKNAMESİ (SİCİL MÜDÜRLÜĞÜNDE
                        KAYITTA TARAFINIZA VERİLECEK)
                    </span>{' '}
                    <br />
                    <span>2) 1 ADET VERGİ LEVHASI FOTOKOPİSİ</span> <br />
                    <span>3) 3 ADET FOTOĞRAF</span>
                    <br />
                    <span>4) 1 ADET KİMLİK FOTOKOPİSİ</span>
                    <br />
                    <span>5) MESLEKİ YETERLİLİK BELGESİ FOTOKOPİSİ</span>
                    <br />
                    <span>
                        6) EN SON MEZUN OLUNAN OKULUN DİPLOMA FOTOKOPİSİ
                    </span>
                    <br />
                    <span>
                        EN AZ 100 SAATLİK ( ÜNİVERSİTE YA DA MİLLİ EĞİTİM
                        BAKANLIĞI ONAYLI)
                        <br />
                    </span>
                    <br />
                    <b>***KAYIT ÜCRETİ ALINMAMAKTADIR.***</b> <br />
                    <span>
                        FİYAT TARİFESİNİN ASILMA ZORUNLUĞU BULUNMAKTADIR. 400 TL
                    </span>{' '}
                    <br />
                    <span>
                        (MATBU EVRAKLARDAN İSTENİLEN KADAR ALINABİLMEKTEDİR.)
                    </span>
                    <br />
                    <br />
                    <b>
                        <span className="text-red-600">ÖNEMLİ:</span> TABELA,
                        FATURA, KARTVİZİT VS. YAPTIRMADAN ÖNCE KULLANMAK
                        İSTEDİĞİNİZ TİCARİ ÜNVANINIZIN KULLANIMDA OLUP OLMADIĞI
                        İLE İLGİLİ LÜTFEN ODAMIZDAN BİLGİ ALINIZ.
                    </b>
                    <br />
                    <br />
                    <p>
                        <i>
                            <b className="text-sm">
                                NOT: YUKARIDAKİ EVRAKLAR İLE BAŞVURDUĞUNUZ
                                TAKDİRDE KAYDINIZ İŞLEME ALINACAKTIR.
                            </b>
                        </i>
                    </p>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
