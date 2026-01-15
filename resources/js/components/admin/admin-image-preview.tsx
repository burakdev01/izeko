import { cn } from '@/lib/utils';

interface AdminImagePreviewProps {
    src?: string | null;
    alt?: string;
    emptyLabel?: string;
    className?: string;
}

export default function AdminImagePreview({
    src,
    alt = 'Önizleme',
    emptyLabel = 'Görsel Seçilmedi',
    className,
}: AdminImagePreviewProps) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-2xl border border-slate-200 bg-white p-4',
                className,
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full rounded-2xl object-cover"
                />
            ) : (
                <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                    {emptyLabel}
                </div>
            )}
        </div>
    );
}
