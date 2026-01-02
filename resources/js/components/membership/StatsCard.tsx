import { Stat } from './types';

interface Props {
    stat: Stat;
}

export function StatsCard({ stat }: Props) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xl font-semibold text-red-500">
                {stat.value}
            </div>
            <div className="mt-1 font-medium text-gray-900">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.description}</div>
        </div>
    );
}
