interface Props {
    date: string;
}

export function NewsDateBadge({ date }: Props) {
    return (
        <span className="absolute top-6 right-6 rounded-full bg-white px-5 py-2 text-sm font-medium text-red-500">
            {date}
        </span>
    );
}
