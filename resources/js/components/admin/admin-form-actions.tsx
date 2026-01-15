import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Save } from 'lucide-react';

interface AdminFormActionsProps {
    submitLabel: string;
    cancelHref: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
    className?: string;
}

export default function AdminFormActions({
    submitLabel,
    cancelHref,
    cancelLabel = 'İptal',
    isSubmitting = false,
    className,
}: AdminFormActionsProps) {
    const showSaveIcon = submitLabel.toLowerCase().includes('kaydet');

    return (
        <div className={cn('flex flex-wrap gap-3', className)}>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white hover:bg-red-700"
            >
                {showSaveIcon ? <Save className="h-4 w-4" /> : null}
                {submitLabel}
            </Button>
            <Link
                href={cancelHref}
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
                {cancelLabel}
            </Link>
        </div>
    );
}
