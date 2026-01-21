import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

type BlogPost = {
    id: number;
    title: string;
    image?: string | null;
    content: string;
    seo_title?: string | null;
    seo_description?: string | null;
    slug: string;
    date: string;
};

type BlogDetailProps = {
    post: BlogPost;
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

const getImageUrl = (filename: string | null | undefined): string | null => {
    if (!filename) return null;
    return `/uploads/blogs/${filename}`;
};

export default function HaberlerDetay({ post }: BlogDetailProps) {
    const imageUrl = getImageUrl(post.image);
    return (
        <>
            <Head title={post.seo_title || post.title}>
                {post.seo_description ? (
                    <meta name="description" content={post.seo_description} />
                ) : null}
            </Head>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title={post.title}
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                breadcrumbLabel={post.title}
            >
                <div className="space-y-6 rounded-lg bg-white p-4 font-normal">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="h-96 w-full rounded-2xl object-cover shadow-sm"
                        />
                    ) : null}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(post.date)}</span>
                    </div>

                    <div
                        className="prose prose-sm max-w-none text-gray-700 sm:prose-base prose-strong:font-bold"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
