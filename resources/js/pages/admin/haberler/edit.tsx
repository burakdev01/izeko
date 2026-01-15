import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
}

interface BlogEditProps {
    post: BlogPost;
}

export default function BlogEdit({ post }: BlogEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title ?? '',
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        image: post.image ?? '',
        date: post.date ?? '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/haberler/${post.id}`);
    };

    return (
        <AdminLayout
            title="Haber Duzenle"
            description="Haber kaydini guncelleyin."
        >
            <Head title="Haber Duzenle" />
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-6 shadow"
            >
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Baslik</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(event) =>
                                setData('title', event.target.value)
                            }
                            placeholder="Haber basligi"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">Tarih</Label>
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(event) =>
                                setData('date', event.target.value)
                            }
                        />
                        <InputError message={errors.date} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Gorsel URL</Label>
                        <Input
                            id="image"
                            type="url"
                            value={data.image}
                            onChange={(event) =>
                                setData('image', event.target.value)
                            }
                            placeholder="https://..."
                        />
                        <InputError message={errors.image} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">Ozet</Label>
                        <textarea
                            id="excerpt"
                            value={data.excerpt}
                            onChange={(event) =>
                                setData('excerpt', event.target.value)
                            }
                            className="min-h-[120px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                            placeholder="Kisa ozet"
                        />
                        <InputError message={errors.excerpt} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Icerik</Label>
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(event) =>
                                setData('content', event.target.value)
                            }
                            className="min-h-[220px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
                            placeholder="Haber icerigi"
                        />
                        <InputError message={errors.content} />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="submit" disabled={processing}>
                        Guncelle
                    </Button>
                    <Link
                        href="/admin/haberler"
                        className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
