import { cn } from '@/lib/utils';
import { type PropsWithChildren, type ReactNode } from 'react';

interface AdminMediaCardProps extends PropsWithChildren {
    image?: string | null;
    imageAlt?: string;
    overlay?: ReactNode;
    footer?: ReactNode;
    emptyLabel?: string;
    className?: string;
}

export default function AdminMediaCard({
    image,
    imageAlt = 'Görsel',
    overlay,
    footer,
    emptyLabel = 'Görsel yok',
    className,
    children,
}: AdminMediaCardProps) {
    return (
        <div
            className={cn(
                'group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
        >
            <div className="relative aspect-[16/9] bg-slate-100">
                {image ? (
                    <img
                        src={image}
                        alt={imageAlt}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                        {emptyLabel}
                    </div>
                )}
                {overlay ? (
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                        {overlay}
                    </div>
                ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                {children}
            </div>
            {footer ? (
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs">
                    {footer}
                </div>
            ) : null}
        </div>
    );
}
