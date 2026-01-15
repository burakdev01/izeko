import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type AdminTextareaProps = ComponentProps<typeof Textarea>;

export default function AdminTextarea({
    className,
    ...props
}: AdminTextareaProps) {
    return (
        <Textarea
            {...props}
            className={cn(
                'rounded-lg border-slate-200 bg-white/90 shadow-sm focus:border-red-300 focus:ring-red-100',
                className,
            )}
        />
    );
}
