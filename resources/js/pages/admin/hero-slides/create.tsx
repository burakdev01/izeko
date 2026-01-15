import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image as ImageIcon, UploadCloud, Video } from 'lucide-react';

interface HeroSlideFormData {
    title: string;
    subtitle: string;
    image: string;
    image_file: File | null;
    video: string;
    poster: string;
    poster_file: File | null;
    sort_order: number;
}

export default function HeroSlideCreate() {
    const { data, setData, post, processing, errors } = useForm<HeroSlideFormData>(
        {
            title: '',
            subtitle: '',
            image: '',
            image_file: null,
            video: '',
            poster: '',
            poster_file: null,
            sort_order: 0,
        },
    );

    const imageFilePreview = useFilePreview(data.image_file);
    const posterFilePreview = useFilePreview(data.poster_file);
    const imagePreview = imageFilePreview ?? (data.image || null);
    const posterPreview = posterFilePreview ?? (data.poster || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/admin/hero-slides', { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Hero Slide Ekle"
            description="Slider gorunumu icin yeni icerik ekleyin."
        >
            <Head title="Hero Slide Ekle" />
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
                    <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Icerik
                        </div>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Baslik</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    placeholder="Slide basligi"
                                    className="h-10 rounded-lg bg-white shadow-sm"
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
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.subtitle} />
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
                                            Number(event.target.value || 0),
                                        )
                                    }
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.sort_order} />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Medya
                        </div>
                        <div className="grid gap-5">
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
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.image} />
                                <p className="text-xs text-slate-400">
                                    Gorsel, video veya yukleme alanindan en az biri
                                    doldurulmalidir.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="image_file"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Gorsel Yukle
                                        </Label>
                                        <p className="text-xs text-slate-500">
                                            PNG/JPG, en fazla 5MB.
                                        </p>
                                        <Input
                                            id="image_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) =>
                                                setData(
                                                    'image_file',
                                                    event.target.files?.[0] ?? null,
                                                )
                                            }
                                            className="mt-3 h-10 rounded-lg bg-white"
                                        />
                                        {data.image_file ? (
                                            <button
                                                type="button"
                                                onClick={() => setData('image_file', null)}
                                                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                Dosyayi temizle
                                            </button>
                                        ) : null}
                                        <InputError message={errors.image_file} />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Onizleme"
                                        className="h-36 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-36 items-center justify-center text-xs font-medium text-slate-400">
                                        Gorsel onizleme yok
                                    </div>
                                )}
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
                                    className="h-10 rounded-lg bg-white shadow-sm"
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
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.poster} />
                            </div>

                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="poster_file"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Poster Yukle
                                        </Label>
                                        <p className="text-xs text-slate-500">
                                            Videolar icin poster gorseli ekleyin.
                                        </p>
                                        <Input
                                            id="poster_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) =>
                                                setData(
                                                    'poster_file',
                                                    event.target.files?.[0] ?? null,
                                                )
                                            }
                                            className="mt-3 h-10 rounded-lg bg-white"
                                        />
                                        {data.poster_file ? (
                                            <button
                                                type="button"
                                                onClick={() => setData('poster_file', null)}
                                                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                Dosyayi temizle
                                            </button>
                                        ) : null}
                                        <InputError message={errors.poster_file} />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                {posterPreview ? (
                                    <img
                                        src={posterPreview}
                                        alt="Poster onizleme"
                                        className="h-36 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-36 items-center justify-center text-xs font-medium text-slate-400">
                                        Poster onizleme yok
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Kaydet
                    </Button>
                    <Link
                        href="/admin/hero-slides"
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
