import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CheckSquare,
    Globe,
    Info,
    MapPin,
    UserPlus,
    type LucideIcon,
} from 'lucide-react';
import { type CSSProperties } from 'react';

type QuickAccessIconName =
    | 'info'
    | 'globe'
    | 'user-plus'
    | 'building'
    | 'check-square'
    | 'map-pin';

export type QuickAccessItem = {
    id: number | string;
    icon: QuickAccessIconName;
    title: string;
    description: string;
    href: string;
    external?: boolean;
};

type QuickAccessSectionProps = {
    items?: QuickAccessItem[];
};

const iconMap: Record<QuickAccessIconName, LucideIcon> = {
    info: Info,
    globe: Globe,
    'user-plus': UserPlus,
    building: Building2,
    'check-square': CheckSquare,
    'map-pin': MapPin,
};

const actionClassName =
    'inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--faq-accent)] transition-all duration-300 group-hover:gap-3';

const ActionLink = ({
    href,
    external,
}: {
    href: string;
    external?: boolean;
}) => {
    const isExternal = Boolean(external);
    const isHttp = href.startsWith('http');

    if (isExternal) {
        return (
            <a
                href={href}
                className={actionClassName}
                target={isHttp ? '_blank' : undefined}
                rel={isHttp ? 'noreferrer' : undefined}
            >
                Detaylı Bilgi
                <ArrowRight className="h-4 w-4" />
            </a>
        );
    }

    return (
        <Link href={href} className={actionClassName}>
            Detaylı Bilgi
            <ArrowRight className="h-4 w-4" />
        </Link>
    );
};

export default function QuickAccessSection({
    items = [],
}: QuickAccessSectionProps) {
    if (items.length === 0) {
        return null;
    }

    const sectionStyle: CSSProperties = {
        '--faq-accent': '#dc2626',
        '--faq-accent-soft': '#fee2e2',
        '--faq-glow-1': 'rgba(254, 226, 226, 0.75)',
        '--faq-glow-2': 'rgba(254, 215, 170, 0.65)',
    };

    return (
        <section
            className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-red-50 py-6"
            style={sectionStyle}
        >
            <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[color:var(--faq-glow-1)] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-[color:var(--faq-glow-2)] blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4">
                <div className="flex flex-col gap-10">
                    <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Hızlı Bağlantılar
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => {
                            const Icon = iconMap[item.icon];

                            return (
                                <div
                                    key={item.id}
                                    className="group flex h-full flex-col rounded-2xl border border-white/80 bg-white/90 p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_rgba(15,23,42,0.14)]"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--faq-accent-soft)] text-[color:var(--faq-accent)] transition duration-300 group-hover:bg-[color:var(--faq-accent)] group-hover:text-white">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-gray-600">
                                                {item.description}
                                            </p>
                                            <ActionLink
                                                href={item.href}
                                                external={item.external}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
