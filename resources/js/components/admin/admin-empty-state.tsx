import { cn } from '@/lib/utils';

interface AdminEmptyStateProps {
    message: string;
    className?: string;
}

export default function AdminEmptyState({
    message,
    className,
}: AdminEmptyStateProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-500',
                className,
            )}
        >
            {message}
        </div>
    );
}
