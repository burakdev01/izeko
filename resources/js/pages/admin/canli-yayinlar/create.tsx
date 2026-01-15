import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function LiveStreamCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        date: '',
        video_url: '',
        thumbnail: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/admin/canli-yayinlar');
    };

    return (
        <AdminLayout
            title="Canli Yayin Ekle"
            description="Yeni canli yayin kaydi olusturun."
        >
            <Head title="Canli Yayin Ekle" />
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
                            placeholder="Canli yayin basligi"
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
                        <Label htmlFor="video_url">Video URL</Label>
                        <Input
                            id="video_url"
                            type="url"
                            value={data.video_url}
                            onChange={(event) =>
                                setData('video_url', event.target.value)
                            }
                            placeholder="https://www.youtube.com/..."
                        />
                        <InputError message={errors.video_url} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="thumbnail">Gorsel URL</Label>
                        <Input
                            id="thumbnail"
                            type="url"
                            value={data.thumbnail}
                            onChange={(event) =>
                                setData('thumbnail', event.target.value)
                            }
                            placeholder="https://img.youtube.com/..."
                        />
                        <InputError message={errors.thumbnail} />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="submit" disabled={processing}>
                        Kaydet
                    </Button>
                    <Link
                        href="/admin/canli-yayinlar"
                        className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
