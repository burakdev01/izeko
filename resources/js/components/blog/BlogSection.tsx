import BlogCard from './BlogCard';
import { blogPosts } from './blog.data';

const BlogSection = () => {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Blog & Makaleler
                    </h2>

                    <a
                        href="#"
                        className="flex items-center gap-1 text-sm font-medium text-red-600"
                    >
                        Tüm Yazılar →
                    </a>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post, index) => (
                        <BlogCard key={index} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
