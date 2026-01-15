import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface AdminSectionProps extends PropsWithChildren {
    title: string;
    className?: string;
}

export default function AdminSection({
    title,
    className,
    children,
}: AdminSectionProps) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm',
                className,
            )}
        >
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {title}
            </div>
            {children}
        </section>
    );
}
