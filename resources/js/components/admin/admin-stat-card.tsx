import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface AdminStatCardProps {
    label: string;
    count: number;
    description: string;
    href: string;
    linkLabel?: string;
    className?: string;
}

export default function AdminStatCard({
    label,
    count,
    description,
    href,
    linkLabel = 'Listeyi gor',
    className,
}: AdminStatCardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 text-white shadow-lg',
                className,
            )}
        >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {label}
            </p>
            <p className="mt-3 text-3xl font-semibold">{count}</p>
            <p className="mt-1 text-sm text-white/70">{description}</p>
            <Link
                href={href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200"
            >
                {linkLabel}
            </Link>
        </div>
    );
}
