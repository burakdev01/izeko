import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';

export default function KvkkAydinlatmaMetni() {
    return (
        <>
            <Head title="KVKK Aydınlatma Metni">
                <meta
                    name="description"
                    content="İZEKO KVKK Aydınlatma Metni"
                />
            </Head>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="KVKK Aydınlatma Metni"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                breadcrumbLabel="KVKK Aydınlatma Metni"
            >
                <div className="space-y-6 rounded-lg bg-white p-4 font-normal">
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: '<p>İçerik yakında eklenecektir.</p>',
                        }}
                    />
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
