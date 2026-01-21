import { type LucideIcon } from 'lucide-react';

interface DashboardStatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'red' | 'blue' | 'green' | 'orange' | 'purple';
}

export default function DashboardStatsCard({
    title,
    value,
    icon: Icon,
    change,
    description,
    trend = 'neutral',
    color = 'red',
}: DashboardStatsCardProps) {
    const colorStyles = {
        red: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-100',
            iconBg: 'bg-red-100',
        },
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-100',
            iconBg: 'bg-blue-100',
        },
        green: {
            bg: 'bg-green-50',
            text: 'text-green-600',
            border: 'border-green-100',
            iconBg: 'bg-green-100',
        },
        orange: {
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            border: 'border-orange-100',
            iconBg: 'bg-orange-100',
        },
        purple: {
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            border: 'border-purple-100',
            iconBg: 'bg-purple-100',
        },
    };

    const styles = colorStyles[color];

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border bg-white p-6 transition-all hover:shadow-lg ${styles.border}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </h3>
                </div>
                <div
                    className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${styles.iconBg} ${styles.text}`}
                >
                    <Icon size={24} />
                </div>
            </div>

            {(change || description) && (
                <div className="mt-4 flex items-center gap-2">
                    {change && (
                        <span
                            className={`flex items-center text-sm font-medium ${
                                trend === 'up'
                                    ? 'text-green-600'
                                    : trend === 'down'
                                      ? 'text-red-600'
                                      : 'text-gray-600'
                            }`}
                        >
                            {change}
                        </span>
                    )}
                    {description && (
                        <span className="text-sm text-gray-400">
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
