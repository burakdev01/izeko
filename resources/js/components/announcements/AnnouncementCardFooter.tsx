import { Calendar } from 'lucide-react';

interface Props {
    heading: string;
    description: string;
    date: string;
}

export function AnnouncementCardFooter({ heading, description, date }: Props) {
    return (
        <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900">{heading}</h4>

            <p className="mt-3 text-gray-600">{description}</p>

            <div className="mt-6 flex items-center justify-between">
                <button className="rounded-full border border-red-500 px-6 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white">
                    Devamını Oku →
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    {date}
                </div>
            </div>
        </div>
    );
}
