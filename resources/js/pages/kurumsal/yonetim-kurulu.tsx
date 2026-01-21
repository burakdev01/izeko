import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type Member = {
    name: string;
    role: string;
    image: string;
};

const members = [
    {
        name: 'Mesut GÜLEROĞLU',
        title: 'Yönetim Kurulu Başkanı',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/mesut-guleroglu.jpg',
        size: 'large',
    },
    {
        name: 'Gönül VURAL',
        title: 'Başkan Vekili',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/gonul-vural.jpg',
        size: 'large',
    },
    {
        name: 'Bedi YAZICIOĞLU',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/bedi-yazicioglu.jpg',
        size: 'normal',
    },
    {
        name: 'Ali KAVAKLI',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/ali-kavakli.jpg',
        size: 'normal',
    },
    {
        name: 'Şenay GÜNDOĞAN',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/senay-gundogan.jpg',
        size: 'normal',
    },
    {
        name: 'Emre GÜLŞEN',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/emre-gulsen.jpg',
        size: 'normal',
    },
    {
        name: 'Aytekin DELİBAŞ',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/aytekin-delibas.jpg',
        size: 'normal',
    },
    {
        name: 'İbrahim GÜDÜCÜ',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/ibrahim-guducu.jpg',
        size: 'normal',
    },
    {
        name: 'Serkan ÇELİK',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/serkan-celik.png',
        size: 'normal',
    },
    {
        name: 'Ahmet ARSLAN',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/ahmet-arslan.png',
        size: 'normal',
    },
    {
        name: 'Ebru YAZICI',
        title: 'Yönetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/room-directors/ebru-yazici.png',
        size: 'normal',
    },
];

export default function YonetimKurulu() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Yönetim Kurulu"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        {/* First Member - Centered */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                                <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                <div className="flex flex-col items-center p-6 text-center">
                                    <div className="relative mb-4">
                                        <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                            <img
                                                src={members[0].image}
                                                alt={members[0].name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                        {members[0].name}
                                    </h3>
                                    <div className="relative inline-block">
                                        <p className="pb-2 text-sm text-gray-600">
                                            {members[0].title}
                                        </p>
                                        <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second Member - Centered */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                                <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                <div className="flex flex-col items-center p-6 text-center">
                                    <div className="relative mb-4">
                                        <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                            <img
                                                src={members[1].image}
                                                alt={members[1].name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                        {members[1].name}
                                    </h3>
                                    <div className="relative inline-block">
                                        <p className="pb-2 text-sm text-gray-600">
                                            {members[1].title}
                                        </p>
                                        <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rest of Members - Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {members.slice(2).map((member, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                                >
                                    <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div className="relative mb-4">
                                            <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {member.name}
                                        </h3>
                                        <div className="relative inline-block">
                                            <p className="pb-2 text-sm text-gray-600">
                                                {member.title}
                                            </p>
                                            <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
