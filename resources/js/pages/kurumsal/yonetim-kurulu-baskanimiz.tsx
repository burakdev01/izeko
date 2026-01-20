import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
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
                showSidebar={true}
            >
                <div className="text-[#1f2937 space-y-6 p-4 text-base leading-relaxed font-medium">
                    <p>
                        <b> İzmir Emlak Komisyoncuları Odası,</b> 10 Mart 1999
                        tarihinde Mesut Güleroğlu tarafından 216 emlakçı ile
                        kurulmuştur. Kuruluşundan itibaren İZEKO, çeşitli kanun
                        ve standartlar üzerinde çalışarak, mesleğe ve
                        meslektaşlara sorumluluk, itibar ve güven kazandırmayı
                        amaçlamaktadır. 5 Haziran 2018 tarihinde yürürlüğe giren
                        “Taşınmaz Ticareti Hakkında Yönetmelik”, uzun süredir
                        süren yasal düzenleme çalışmalarının önemli bir sonucu
                        olup, mesleğimizin yasal statüsünü netleştirmiş ve
                        kurumsal kimliğimizi resmileştirmiştir. İZEKO; Ticaret
                        Odası veya Esnaf Odası ayrımı yapmaksızın sektördeki tüm
                        bağımsız ya da franchise ofis profesyonellerinin bir
                        araya geldiği, güç birliği sağlayan önemli bir yapıdır.
                    </p>
                    <p>
                        <b>Pandemi Süreci ve Dijitalleşme</b>
                        <br />
                        Odamız, meslek içi eğitim çalışmalarına her zaman
                        öncelik vermiştir. Ancak 2020’de yaşanan pandemi
                        nedeniyle faaliyetlere geçici olarak ara verilmiştir. 65
                        yaş ve üzeri üyeler tek tek aranarak ihtiyaçları tespit
                        edilmiştir. İhtiyaç sahibi meslektaşlara farklı
                        ilçelerde doğrudan yardım ulaştırılmıştır. Yönetim ve
                        denetim kurulları üyelerin yanında olmaya devam
                        etmiştir. Pandemi sürecinde{' '}
                        <b>YouTube, Instagram ve Zoom</b>
                        üzerinden canlı yayınlarla bilgilendirici içerikler
                        sunulmuş; dijital pazarlama ve sosyal medya konusunda
                        farkındalık artırıcı çalışmalar gerçekleştirilmiştir. Bu
                        yayınlar halen düzenli olarak devam etmektedir.
                    </p>
                    <p>
                        <b>Kayıt Dışı ile Mücadele</b> <br /> Kayıt dışı
                        faaliyetlerin önlenmesi amacıyla, meslektaşlarımızın
                        sorunları bakanlık ve diğer resmi mercilere iletilmekte;
                        gelişmeler sosyal medya, canlı yayınlar ve toplantılar
                        yoluyla paylaşılmaktadır.
                    </p>
                    <p>
                        <b>Hizmet Kalitesi ve Eğitim</b> <br /> İZEKO, emlak
                        sektörünün daha nitelikli, şeffaf ve güvenilir bir
                        yapıya kavuşması için çalışmalarını sürdürmektedir.
                        Hedeflerimiz: Mesleğin belirli standartlara oturtulması
                        Hizmet kalitesinin artırılması Meslektaşların donanımlı
                        bireyler olarak yetiştirilmesi Eğitim içerikleri sürekli
                        güncellenmekte, teknolojiye ve mevzuata uyumlu hale
                        getirilmektedir. Emlakçılığın sadece bir ticaret değil,
                        aynı zamanda <b>güven ve uzmanlık</b> gerektiren bir
                        meslek olduğu bilinciyle hareket edilmektedir.
                    </p>
                    <p>
                        <b>Misyonumuz</b> <br /> Türkiye'de kurulan ilk emlak
                        odası olarak İZEKO: <br /> Sektöre öncülük etmeyi <br />{' '}
                        Örnek olmayı <br />
                        Sürekli gelişimi desteklemeyi <br />
                        Meslektaşların haklarını ve standartlarını korumayı{' '}
                        <br /> Tüm yenilikler yakından takip edilmekte ve
                        meslektaşlarla paylaşılmaktadır.
                    </p>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
