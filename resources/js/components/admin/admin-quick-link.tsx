import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { type ComponentType } from 'react';

interface AdminQuickLinkProps {
    label: string;
    description: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    className?: string;
}

export default function AdminQuickLink({
    label,
    description,
    href,
    icon: Icon,
    className,
}: AdminQuickLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md',
                className,
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="mt-1 text-xs text-slate-500">{description}</p>
            </div>
        </Link>
    );
}
