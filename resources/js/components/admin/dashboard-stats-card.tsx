import { Link } from '@inertiajs/react';
import { type LucideIcon } from 'lucide-react';

interface DashboardStatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'red' | 'blue' | 'green' | 'orange' | 'purple';
    href?: string;
}

export default function DashboardStatsCard({
    title,
    value,
    icon: Icon,
    change,
    description,
    color = 'red',
    href,
}: DashboardStatsCardProps) {
    const colorStyles = {
        red: {
            bg: 'bg-gradient-to-br from-orange-400 to-red-500',
            pill: 'bg-white/20',
        },
        blue: {
            bg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
            pill: 'bg-white/20',
        },
        green: {
            bg: 'bg-gradient-to-br from-green-400 to-emerald-600',
            pill: 'bg-white/20',
        },
        orange: {
            bg: 'bg-gradient-to-br from-orange-400 to-red-500',
            pill: 'bg-white/20',
        },
        purple: {
            bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
            pill: 'bg-white/20',
        },
    };

    const styles = colorStyles[color] || colorStyles.red;
    const Component = href ? Link : 'div';

    return (
        <Component
            href={href || ''}
            className={`group flex cursor-pointer flex-col items-center justify-between rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02] ${styles.bg}`}
        >
            <div className="mb-4 rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <Icon size={32} className="text-white" />
            </div>

            <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
            <p className="mt-1 text-sm font-medium text-white/90">{title}</p>

            {change && (
                <div
                    className={`mt-6 rounded-lg px-4 py-1.5 text-xs font-semibold backdrop-blur-md ${styles.pill}`}
                >
                    {change}
                </div>
            )}
        </Component>
    );
}
