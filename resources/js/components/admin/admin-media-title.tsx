import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

interface AdminMediaTitleProps {
    as?: ElementType;
    className?: string;
    children: ReactNode;
}

export default function AdminMediaTitle({
    as: Component = 'h3',
    className,
    children,
}: AdminMediaTitleProps) {
    return (
        <Component
            className={cn(
                'line-clamp-2 text-sm font-semibold text-slate-900',
                className,
            )}
        >
            {children}
        </Component>
    );
}
