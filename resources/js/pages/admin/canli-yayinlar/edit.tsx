import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface LiveStream {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface LiveStreamEditProps {
    stream: LiveStream;
}

export default function LiveStreamEdit({ stream }: LiveStreamEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: stream.title ?? '',
        date: stream.date ?? '',
        video_url: stream.video_url ?? '',
        thumbnail: stream.thumbnail ?? '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/canli-yayinlar/${stream.id}`);
    };

    return (
        <AdminLayout
            title="Canli Yayin Duzenle"
            description="Canli yayin kaydini guncelleyin."
        >
            <Head title="Canli Yayin Duzenle" />
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
                        Guncelle
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
