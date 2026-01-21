import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type Member = {
    name: string;
    title: string;
    image: string;
};

const members: Member[] = [
    {
        name: 'Ergun KÖSECİOĞULLARI',
        title: 'Denetim Kurulu Başkanı',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/supervisor-realtors/ergun-koseciogullari.png',
    },
    {
        name: 'Adem UÇAR',
        title: 'Denetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/supervisor-realtors/adem-ucar.jpg',
    },
    {
        name: 'Muhittin TOMAN',
        title: 'Denetim Kurulu Üyesi',
        image: 'https://izeko.org.tr/app/themes/default/assets/images/supervisor-realtors/muhittin-toman.jpg',
    },
];

const Card = ({ member }: { member: Member }) => (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
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
                <p className="pb-2 text-sm text-gray-600">{member.title}</p>
                <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
            </div>
        </div>
    </div>
);

export default function DenetimKurulu() {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Denetim Kurulu"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {members.map((member) => (
                                <Card key={member.name} member={member} />
                            ))}
                        </div>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
