<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AboutIzekoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $content = '
            <p>
                Kurallara ve yönetmeliklere aykırı hareket eden
                kişilerin mesleğimiz üzerinde yarattığı olumsuz algıyı
                ortadan kaldırmak ve yerine saygın, güvenilir bir meslek
                imajı inşa etmek amacıyla, Emlak Odamızın faaliyetlerini
                dijital ortama taşıdık. Bu dönüşüm sürecinde, sadece
                üyelerimizin yer aldığı güçlü ve nitelikli bir iş
                birliği platformu oluşturduk.
            </p>

            <p>
                İzeko.org.tr web sitesi, yalnızca İZEKO’ya kayıtlı emlak
                ofislerinin ve danışmanlarının yer aldığı, mesleğe dair
                doğru bilgi ve haberlerin paylaşıldığı güvenilir bir
                dijital alan olarak yapılandırıldı. Bu platform
                sayesinde meslektaşlarımız, odamıza üye olan ofislere
                ait gayrimenkullere güvenli bir ticaret ortamında
                ulaşabilecek. Böylece, yasalara uygun ve mesleğe yakışır
                biçimde çalışan üyelerimizi, kayıt dışı çalışan
                kişilerden ayırmak çok daha kolay hale gelecek.
            </p>

            <p>
                Zamanla düzenlenecek mesleki eğitimlerle birlikte,
                sektörümüzün bilgi seviyesi yüksek, nitelikli ve bu
                alanı kariyer tercihi olarak benimseyen kişiler
                tarafından daha fazla tercih edilmesi hedeflenmektedir.
            </p>

            <p>
                İçinde bulunduğunuz web sitesinin teknik altyapısı,
                Deniz Web Ajans iş birliğiyle geliştirdiğimiz Odamıza
                ait İzeko CRM sistemiyle desteklenmektedir. Bu sayede
                üyelerimiz; portföylerini, müşteri taleplerini,
                alım-satım süreçlerini, otomatik portföy eşleşmelerini
                ve tüm işlemlerini tek bir sistem üzerinden kolaylıkla
                yönetebilmektedir. Ayrıca sistemimiz mevcut ilan
                portalları ile ve üyelerimizin kendi ofis sistemleriyle
                tam entegre çalışmakta, zaman tasarrufu ve iş
                verimliliği sağlamaktadır. Gayrimenkul
                profesyonellerinin ihtiyaç duyduğu her şey sistemimiz
                üzerinden meslektaşlarımıza sunulmaktadır.
            </p>
        ';

        \App\Models\AboutIzeko::truncate();

        \App\Models\AboutIzeko::create([
            'content' => $content,
        ]);
    }
}
