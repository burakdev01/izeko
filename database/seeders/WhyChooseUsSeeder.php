<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WhyChooseUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $content = '
            <h3>Teknik Belgeler ve Anlaşmalar</h3>
            <p>Bir ev satın almak ya da satmak sayısız form, rapor, açıklama vb teknik belgeleri gerektirir. Nitelikli bir emlak danışmanlık şirketi veya tecrübeli bir emlakçı, güçlü bir anlaşma hazırlamanıza yardımcı olacak bilgileri taşır. Bu, sizin pahalı hatalar ve gecikmeler yaşamınızı önler.</p>

            <h3>Yerel Bilgi ve Deneyim</h3>
            <p>İnternetin büyülü alanı, çevrimiçi emlak sitelerini ve acentelerin portfoyönü sunuyor. Yerel, fiziksel gayrimenkul ajansları emlak listelerinin ötesinde bilgi ve deneyime sahiptir. Nasıl bir mahallede kimlerle komşu olacağınızı bilerek ev almak önemlidir. Dolayısıyla size en uygun evi de internette yer alan herhangi bir ilanda değil, güven ilişkisi kurduğunuz bir emlak danışmanı ile seçebilirsiniz.</p>

            <h3>Müzakere ve Anlaşma</h3>
            <p>Müzakere, emlak işinin en önemli parçasıdır. Satın alma veya satma işlemini sizler adına çok hızlı bir şekilde sonuçlandıracak deneyime sahip gayrimenkul danışmanları işinizi kolaylaştırır. Pazar rekabeti, alışılmadık stratejiler, karmaşık taktikler, teklif verme savaşları vb. durumlarda çoğu zaman yardıma ihtiyacınız olacaktır. Akıllı ve deneyimli bir müzakere uzmanı, iyi bir emlak şirketi veya gayrimenkul firması, tüm dinamikleri dikkate alarak sağlam bir anlaşma imzalamasına yardımcı olabilir.</p>

            <h3>İş Ağı ve İletişim</h3>
            <p>Gayrimenkul dünyasında iyi bir emlakçının yanında başka iş alanlarıyla da sağlıklı ilişki kurmanız gerekecektir. Bir ev satın alıp satma sürecini az veya sıfır sıkıntıyla etkili bir şekilde gerçekleştirmenize yardımcı olacak noter, tesisatçı, iç mimar, avukatlar vb. isimlere gayrimenkul danışmanları sayesinde kolayca ulaşabilirsiniz.</p>
        ';

        \App\Models\WhyChooseUs::truncate();

        \App\Models\WhyChooseUs::create([
            'content' => $content,
        ]);
    }
}
