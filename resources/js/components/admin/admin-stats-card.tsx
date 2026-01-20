import { LucideIcon } from 'lucide-react';

type AdminStatsCardProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        direction: 'up' | 'down' | 'neutral';
    };
    color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray';
};

export default function AdminStatsCard({
    title,
    value,
    icon: Icon,
    trend,
    color = 'red',
}: AdminStatsCardProps) {
    const getColorClasses = () => {
        switch (color) {
            case 'blue':
                return 'bg-blue-50 text-blue-600';
            case 'green':
                return 'bg-green-50 text-green-600';
            case 'yellow':
                return 'bg-yellow-50 text-yellow-600';
            case 'gray':
                return 'bg-gray-50 text-gray-600';
            case 'red':
            default:
                return 'bg-[#FCE9EA] text-[#da1f25]';
        }
    };

    const getTrendColor = () => {
        if (!trend) return '';
        switch (trend.direction) {
            case 'up':
                return 'text-green-600';
            case 'down':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>
                <div className={`rounded-lg p-3 ${getColorClasses()}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={`font-medium ${getTrendColor()} flex items-center`}
                    >
                        {trend.value}
                    </span>
                    <span className="ml-2 text-gray-500">geçen aya göre</span>
                </div>
            )}
        </div>
    );
}
