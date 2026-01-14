import BlogCard from '@/components/blog/BlogCard';
import { blogPosts } from '@/components/blog/blog.data';
import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export default function Haberler() {
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
                        {blogPosts.map((post, index) => (
                            <BlogCard key={index} {...post} />
                        ))}
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
