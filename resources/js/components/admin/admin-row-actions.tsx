import { Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

type AdminRowActionsProps = {
    editHref: string;
    deleteHref: string;
};

export default function AdminRowActions({
    editHref,
    deleteHref,
}: AdminRowActionsProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <Link
                href={editHref}
                className="text-[#da1f25] transition hover:text-[#b0181d]"
            >
                <Pencil className="h-4 w-4" />
            </Link>
            <Link
                href={deleteHref}
                method="delete"
                as="button"
                onClick={(event) => {
                    if (
                        !window.confirm(
                            'Silmek istedi\u{011F}inize emin misiniz?',
                        )
                    ) {
                        event.preventDefault();
                    }
                }}
                className="text-red-600 transition hover:text-red-800"
            >
                <Trash2 className="h-4 w-4" />
            </Link>
        </div>
    );
}
