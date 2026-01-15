import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type AdminInputProps = ComponentProps<typeof Input>;

export default function AdminInput({ className, ...props }: AdminInputProps) {
    return (
        <Input
            {...props}
            className={cn('h-12 rounded-lg bg-white shadow-sm', className)}
        />
    );
}
