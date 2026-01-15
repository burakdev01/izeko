import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type ButtonHTMLAttributes, type ComponentProps } from 'react';

type Variant = 'default' | 'danger';

const baseStyles = 'font-semibold transition';
const variantStyles: Record<Variant, string> = {
    default: 'text-slate-600 hover:text-slate-900',
    danger: 'text-red-600 hover:text-red-700',
};

type AdminActionLinkProps = ComponentProps<typeof Link> & {
    variant?: Variant;
    className?: string;
};

export function AdminActionLink({
    variant = 'default',
    className,
    ...props
}: AdminActionLinkProps) {
    return (
        <Link
            {...props}
            className={cn(baseStyles, variantStyles[variant], className)}
        />
    );
}

type AdminActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};

export function AdminActionButton({
    variant = 'default',
    className,
    ...props
}: AdminActionButtonProps) {
    return (
        <button
            {...props}
            className={cn(baseStyles, variantStyles[variant], className)}
        />
    );
}
