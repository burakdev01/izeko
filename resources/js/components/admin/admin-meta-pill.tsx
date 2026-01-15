import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AdminMetaPillProps {
    children: ReactNode;
    className?: string;
}

export default function AdminMetaPill({
    children,
    className,
}: AdminMetaPillProps) {
    return (
        <span
            className={cn(
                'rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow',
                className,
            )}
        >
            {children}
        </span>
    );
}
