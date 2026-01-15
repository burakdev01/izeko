import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function HeroSlideCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: '',
        video: '',
        poster: '',
        sort_order: 0,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/admin/hero-slides');
    };

    return (
        <AdminLayout
            title="Hero Slide Ekle"
            description="Slider gorunumu icin yeni icerik ekleyin."
        >
            <Head title="Hero Slide Ekle" />
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
                            placeholder="Slide basligi"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subtitle">Alt Baslik</Label>
                        <Input
                            id="subtitle"
                            value={data.subtitle}
                            onChange={(event) =>
                                setData('subtitle', event.target.value)
                            }
                            placeholder="Opsiyonel alt baslik"
                        />
                        <InputError message={errors.subtitle} />
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
                        <p className="text-xs text-gray-400">
                            Gorsel veya video alanindan en az biri
                            doldurulmalidir.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="video">Video URL</Label>
                        <Input
                            id="video"
                            type="url"
                            value={data.video}
                            onChange={(event) =>
                                setData('video', event.target.value)
                            }
                            placeholder="https://..."
                        />
                        <InputError message={errors.video} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="poster">Video Poster URL</Label>
                        <Input
                            id="poster"
                            type="url"
                            value={data.poster}
                            onChange={(event) =>
                                setData('poster', event.target.value)
                            }
                            placeholder="https://..."
                        />
                        <InputError message={errors.poster} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="sort_order">Sira</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            value={data.sort_order}
                            onChange={(event) =>
                                setData(
                                    'sort_order',
                                    Number(event.target.value),
                                )
                            }
                        />
                        <InputError message={errors.sort_order} />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="submit" disabled={processing}>
                        Kaydet
                    </Button>
                    <Link
                        href="/admin/hero-slides"
                        className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
