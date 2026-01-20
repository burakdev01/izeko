import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

type AdminFormHeaderProps = {
    title: string;
    description: string;
    submitLabel: string;
    cancelHref: string;
    processing?: boolean;
};

export default function AdminFormHeader({
    title,
    description,
    submitLabel,
    cancelHref,
    processing = false,
}: AdminFormHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-black">{title}</h1>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex items-center gap-3">
                <Link
                    href={cancelHref}
                    className="text-sm font-medium text-gray-500 transition hover:text-gray-700"
                >
                    İptal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#da1f25] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b0181d] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {submitLabel}
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
