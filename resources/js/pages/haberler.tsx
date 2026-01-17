import BlogCard from '@/components/blog/BlogCard';
import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

type BlogPost = {
    id: number;
    image: string;
    title: string;
    date: string;
};

interface HaberlerProps {
    posts: BlogPost[];
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export default function Haberler({ posts }: HaberlerProps) {
    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Blog & Haberler"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Son Paylaşımlar
                        </h2>
                        <span className="text-sm text-gray-500">
                            Güncel haber ve blog yazıları
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                image={post.image}
                                title={post.title}
                                date={formatDate(post.date)}
                            />
                        ))}
                    </div>
                    {posts.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                            Henüz haber eklenmedi.
                        </div>
                    )}
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
