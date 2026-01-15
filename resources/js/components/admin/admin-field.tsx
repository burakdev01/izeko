import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AdminFieldProps {
    label?: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    className?: string;
    children: ReactNode;
}

export default function AdminField({
    label,
    htmlFor,
    error,
    hint,
    className,
    children,
}: AdminFieldProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
            {children}
            {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
            <InputError message={error} />
        </div>
    );
}
