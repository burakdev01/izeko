import { Link } from '@inertiajs/react';
import BlogCard from './BlogCard';

type BlogPostSummary = {
    id: number;
    image?: string | null;
    title: string;
    slug: string;
    date: string;
};

type BlogSectionProps = {
    posts: BlogPostSummary[];
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

const BlogSection = ({ posts }: BlogSectionProps) => {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Blog & Makaleler
                    </h2>

                    <Link
                        href="/haberler"
                        className="flex items-center gap-1 text-sm font-medium text-red-600"
                    >
                        Tüm Yazılar →
                    </Link>
                </div>

                {/* GRID */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                image={post.image}
                                title={post.title}
                                date={formatDate(post.date)}
                                href={`/haberler/${post.slug}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                        Henüz makale eklenmedi.
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
