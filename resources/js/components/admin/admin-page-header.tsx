import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

type AdminPageHeaderProps = {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
};

export default function AdminPageHeader({
    title,
    description,
    actionLabel,
    actionHref,
}: AdminPageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-black">{title}</h1>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-[#da1f25] transition hover:bg-[#FCE9EA]"
                >
                    <PlusCircle className="h-4 w-4" />
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
