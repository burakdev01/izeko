import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type Member = {
    name: string;
    title: string;
    image: string;
};

type YonetimKuruluProps = {
    members: Member[];
};

export default function YonetimKurulu({ members }: YonetimKuruluProps) {
    // Separate first two members if they exist, or handle empty state
    const firstMember = members[0];
    const secondMember = members[1];
    const otherMembers = members.slice(2);

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
                        {members.length === 0 && (
                            <div className="py-10 text-center text-gray-500">
                                Henüz yönetim kurulu üyesi eklenmemiş.
                            </div>
                        )}

                        {/* First Member - Centered */}
                        {firstMember && (
                            <div className="mb-6 flex justify-center">
                                <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                                    <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div className="relative mb-4">
                                            <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                                {firstMember.image && (
                                                    <img
                                                        src={firstMember.image}
                                                        alt={firstMember.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {firstMember.name}
                                        </h3>
                                        <div className="relative inline-block">
                                            <p className="pb-2 text-sm text-gray-600">
                                                {firstMember.title}
                                            </p>
                                            <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Second Member - Centered */}
                        {secondMember && (
                            <div className="mb-6 flex justify-center">
                                <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                                    <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div className="relative mb-4">
                                            <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                                {secondMember.image && (
                                                    <img
                                                        src={secondMember.image}
                                                        alt={secondMember.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            {secondMember.name}
                                        </h3>
                                        <div className="relative inline-block">
                                            <p className="pb-2 text-sm text-gray-600">
                                                {secondMember.title}
                                            </p>
                                            <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 transform bg-yellow-400"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rest of Members - Grid */}
                        {otherMembers.length > 0 && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {otherMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                                    >
                                        <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-800"></div>
                                        <div className="flex flex-col items-center p-6 text-center">
                                            <div className="relative mb-4">
                                                <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200 ring-4 ring-gray-100">
                                                    {member.image && (
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
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
                        )}
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
