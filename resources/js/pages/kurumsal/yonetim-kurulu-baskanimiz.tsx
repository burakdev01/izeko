import { ArticleLayout } from '@/components/content/ArticleLayout';
import TopBar from '@/components/contact-header';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export default function YonetimKuruluBaskanimiz() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Yönetim Kurulu Başkanımız"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <p className="leading-relaxed text-gray-700">
                    <span className="font-semibold">
                        İzmir Emlak Komisyoncuları Odası
                    </span>
                    , 10 Mart 1999 tarihinde Mesut Güleroğlu tarafından 216
                    emlakçı ile kurulmuştur. Kuruluşundan itibaren İZEKO,
                    çeşitli kanun ve standartlar üzerinde çalışarak, mesleğe ve
                    meslektaşlara sorumluluk, itibar ve güven kazandırmayı
                    amaçlamaktadır. 5 Haziran 2018 tarihinde yürürlüğe giren
                    "Ticaret Hakkında Yönetmelik", uzun süredir sürdüğümüz usul
                    düzenleme çalışmalarının önemli bir sonucu olup,
                    mesleğimizin yasal statüsünü netleştirmiş ve kurumsal
                    kimliğimizi resmileştirmiştir. İZEKO; Ticaret Odası veya
                    Esnaf Odası ayırımı yapmaksızın sektördeki tüm bağımsız ya
                    da franchise ofis profesyonellerinin bir araya geldiği, güç
                    birliği sağlayan önemli bir yapıdır.
                </p>
            </ArticleLayout>
            <Footer />
        </>
    );
}
