import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';

interface AnnouncementFormData {
    title: string;
    subtitle: string;
    excerpt: string;
    content: string;
    image: string;
    image_file: File | null;
    link: string;
    date: string;
}

export default function AnnouncementCreate() {
    const { data, setData, post, processing, errors } = useForm<AnnouncementFormData>(
        {
            title: '',
            subtitle: '',
            excerpt: '',
            content: '',
            image: '',
            image_file: null,
            link: '',
            date: '',
        },
    );

    const filePreview = useFilePreview(data.image_file);
    const imagePreview = filePreview ?? (data.image || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/admin/duyurular', { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Duyuru Ekle"
            description="Yeni duyuru kaydi olusturun."
        >
            <Head title="Duyuru Ekle" />
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
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
                                    placeholder="Duyuru basligi"
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
                                <Label htmlFor="date">Tarih</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(event) =>
                                        setData('date', event.target.value)
                                    }
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="link">Detay Linki</Label>
                        <Input
                            id="link"
                            type="url"
                            value={data.link}
                            onChange={(event) =>
                                setData('link', event.target.value)
                            }
                            placeholder="https://... (opsiyonel)"
                            className="h-10 rounded-lg bg-white shadow-sm"
                        />
                                <InputError message={errors.link} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Ozet</Label>
                                <textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(event) =>
                                        setData('excerpt', event.target.value)
                                    }
                                    className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
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
                                    className="min-h-[220px] w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100"
                                    placeholder="Duyuru icerigi"
                                />
                                <InputError message={errors.content} />
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
                                        className="h-40 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 items-center justify-center text-xs font-medium text-slate-400">
                                        Onizleme yok
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
                        href="/admin/duyurular"
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
