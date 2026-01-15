import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface AdminListHeaderProps {
    count: number;
    label: string;
    actionLabel: string;
    actionHref: string;
    className?: string;
}

export default function AdminListHeader({
    count,
    label,
    actionLabel,
    actionHref,
    className,
}: AdminListHeaderProps) {
    return (
        <div
            className={cn(
                'flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm',
                className,
            )}
        >
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Toplam
                </p>
                <p className="text-sm font-medium text-slate-600">
                    {count} {label}
                </p>
            </div>
            <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <Link href={actionHref} className="inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {actionLabel}
                </Link>
            </Button>
        </div>
    );
}
