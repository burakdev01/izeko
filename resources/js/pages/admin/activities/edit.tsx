import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFilePreview } from '@/hooks/use-file-preview';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';

interface Activity {
    id: number;
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
}

interface ActivityFormData {
    title: string;
    date: string;
    video_url: string;
    thumbnail: string;
    thumbnail_file: File | null;
}

interface ActivityEditProps {
    activity: Activity;
}

export default function ActivityEdit({ activity }: ActivityEditProps) {
    const { data, setData, put, processing, errors } = useForm<ActivityFormData>(
        {
            title: activity.title ?? '',
            date: activity.date ?? '',
            video_url: activity.video_url ?? '',
            thumbnail: activity.thumbnail ?? '',
            thumbnail_file: null,
        },
    );

    const filePreview = useFilePreview(data.thumbnail_file);
    const thumbnailPreview = filePreview ?? (data.thumbnail || null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/faaliyetler/${activity.id}`, { forceFormData: true });
    };

    return (
        <AdminLayout
            title="Faaliyet Duzenle"
            description="Faaliyet kaydini guncelleyin."
        >
            <Head title="Faaliyet Duzenle" />
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
                                    placeholder="Faaliyet basligi"
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.title} />
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
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.video_url} />
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
                                <Label htmlFor="thumbnail">Gorsel URL</Label>
                                <Input
                                    id="thumbnail"
                                    type="url"
                                    value={data.thumbnail}
                                    onChange={(event) =>
                                        setData('thumbnail', event.target.value)
                                    }
                                    placeholder="https://img.youtube.com/..."
                                    className="h-10 rounded-lg bg-white shadow-sm"
                                />
                                <InputError message={errors.thumbnail} />
                            </div>

                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <Label
                                            htmlFor="thumbnail_file"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Gorsel Yukle
                                        </Label>
                                        <p className="text-xs text-slate-500">
                                            PNG/JPG, en fazla 5MB.
                                        </p>
                                        <Input
                                            id="thumbnail_file"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) =>
                                                setData(
                                                    'thumbnail_file',
                                                    event.target.files?.[0] ?? null,
                                                )
                                            }
                                            className="mt-3 h-10 rounded-lg bg-white"
                                        />
                                        {data.thumbnail_file ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData('thumbnail_file', null)
                                                }
                                                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                                Dosyayi temizle
                                            </button>
                                        ) : null}
                                        <InputError
                                            message={errors.thumbnail_file}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
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
                        Guncelle
                    </Button>
                    <Link
                        href="/admin/faaliyetler"
                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Iptal
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
