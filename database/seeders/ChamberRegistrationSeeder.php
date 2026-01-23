<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ChamberRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $content = '
            <b style="font-size: 0.875rem; font-weight: 700;">
                ESNAF SİCİL MÜDÜRLÜĞÜNE KAYIT İÇİN GEREKLİ EVRAKLAR
            </b>
            <br />
            <span>1) 1 ADET NÜFUS FOTOKOPİSİ</span> <br />
            <span>2) 1 ADET FOTOĞRAF</span> <br />
            <span>3) 1 ADET VERGİ LEVHASI FOTOKOPİSİ</span> <br />
            <span>4) 4.245,05 TL KAYIT ÜCRETİ ALINMAKTADIR</span>
            <br />
            <br />
            <b style="font-size: 0.875rem; font-weight: 700;">
                ESNAF SİCİL DİĞER İŞLEM ÜCRETLERİ
            </b>
            <br />
            <span>
                1) SİCİL TERK <b>348,55</b> TL
            </span>
            <br />
            <span>
                2) MESLEK TERK <b>348,55</b> TL
            </span>
            <br />
            <span>
                3) TADİL <b>1.315,40</b> TL
            </span>
            <br />
            <span>
                4 ) TASDİKNAME <b>462,65</b> TL
            </span>
            <br />
            <br />
            <b style="font-size: 0.875rem; font-weight: 700;">
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
            <b style="font-size: 0.875rem; font-weight: 700;">
                ODA KAYDI İÇİN GEREKEN EVRAKLAR
            </b>
            <br />
            <span>
                1) 1 ADET ESNAF SİCİL TASDİKNAMESİ (SİCİL MÜDÜRLÜĞÜNDE
                KAYITTA TARAFINIZA VERİLECEK)
            </span>
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
            </span>
            <br />
            <span>
                (MATBU EVRAKLARDAN İSTENİLEN KADAR ALINABİLMEKTEDİR.)
            </span>
            <br />
            <br />
            <b>
                <span class="text-red-600">ÖNEMLİ:</span> TABELA,
                FATURA, KARTVİZİT VS. YAPTIRMADAN ÖNCE KULLANMAK
                İSTEDİĞİNİZ TİCARİ ÜNVANINIZIN KULLANIMDA OLUP OLMADIĞI
                İLE İLGİLİ LÜTFEN ODAMIZDAN BİLGİ ALINIZ.
            </b>
            <br />
            <br />
            <p>
                <i>
                    <b style="font-size: 0.875rem;">
                        NOT: YUKARIDAKİ EVRAKLAR İLE BAŞVURDUĞUNUZ
                        TAKDİRDE KAYDINIZ İŞLEME ALINACAKTIR.
                    </b>
                </i>
            </p>
        ';

        \App\Models\ChamberRegistration::truncate();

        \App\Models\ChamberRegistration::create([
            'content' => $content,
        ]);
    }
}
