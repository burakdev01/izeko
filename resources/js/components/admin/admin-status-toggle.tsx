type AdminStatusToggleProps = {
    label?: string;
    name?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    activeLabel?: string;
    inactiveLabel?: string;
};

export default function AdminStatusToggle({
    label = 'Durum',
    name = 'active',
    checked,
    onChange,
    activeLabel = 'Aktif',
    inactiveLabel = 'Pasif',
}: AdminStatusToggleProps) {
    return (
        <div className="rounded-2xl bg-gray-50 p-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="hidden" name={name} value="0" />
                <input
                    type="checkbox"
                    name={name}
                    value="1"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                    className="peer sr-only"
                />
                <div className="h-7 w-14 rounded-full bg-gray-300 peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 after:absolute after:left-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
                <span className="ml-3 text-sm font-medium text-gray-700">
                    {checked ? activeLabel : inactiveLabel}
                </span>
            </label>
        </div>
    );
}
