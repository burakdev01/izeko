<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'question' => 'Gayrimenkul Danışmanımı nasıl seçmeliyim?',
                'answer' => 'Gayrimenkul danışmanı seçerken, danışmanın deneyimini, referanslarını ve profesyonel sertifikalarını kontrol etmelisiniz. Ayrıca, güvenilir bir emlak ofisine bağlı olması ve iyi iletişim becerilerine sahip olması önemlidir.',
            ],
            [
                'question' => 'Veraset intikal ilişiği kestirilmeden miras intikali gerçekleştirebilir miyim?',
                'answer' => 'Hayır, veraset intikal ilişiği kestirilmeden miras intikali gerçekleştirilemez. Öncelikle veraset ilamı alınmalı ve ardından tapu işlemleri yapılmalıdır. Bu yasal bir zorunluluktur.',
            ],
            [
                'question' => 'Hangi nitelikli taşınmazlarda DASK aranır?',
                'answer' => 'DASK (Doğal Afet Sigortaları Kurumu) zorunlu deprem sigortası, bağımsız bölüm niteliğindeki konut ve işyerlerinde aranır. Yapı kullanma izni alınmış veya yapı kayıt belgesi olan tüm binalarda DASK zorunludur.',
            ],
            [
                'question' => 'Vekâletnamede fotoğraf gerekli midir?',
                'answer' => 'Evet, tapu işlemleri için düzenlenen vekâletnamelerde noter tasdikli fotoğraf bulunması zorunludur. Bu, vekâlet verenin kimlik tespiti ve güvenlik açısından önemlidir.',
            ],
        ];

        foreach ($items as $index => $item) {
            Faq::firstOrCreate(
                ['question' => $item['question']],
                [
                    'answer' => $item['answer'],
                    'sort_order' => $index + 1,
                    'active' => true,
                ],
            );
        }
    }
}
