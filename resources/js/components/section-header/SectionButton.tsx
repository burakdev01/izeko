import { ArrowRight } from 'lucide-react';

interface Props {
    label: string;
    href: string;
}

export function SectionButton({ label, href }: Props) {
    return (
        <a
            href={href}
            className="inline-flex items-center gap-3 rounded-full border-2 border-red-500 px-10 py-4 text-lg font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
        >
            {label}
            <ArrowRight size={20} />
        </a>
    );
}
