import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverButton,
    PopoverPanel
} from '@headlessui/react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface ComboboxOption {
    id: string | number;
    name: string;
}

interface ComboboxProps {
    options: ComboboxOption[];
    value?: string | number;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    className?: string;
    hideSearch?: boolean;
}

export default function Combobox({
    options,
    value,
    onChange,
    label,
    placeholder = 'Seçiniz...',
    searchPlaceholder = 'Arama...',
    disabled,
    className,
    hideSearch = false,
}: ComboboxProps) {
    const safeOptions = options || [];
    const [query, setQuery] = useState('');

    const selectedOption = useMemo(() => 
        safeOptions.find((option) => String(option.id) === String(value)) || null
    , [safeOptions, value]);

    const filteredOptions = useMemo(() => {
        if (!query) return safeOptions;
        const lowerQuery = query.toLocaleLowerCase('tr').replace(/\s+/g, '');
        return safeOptions.filter((option) =>
            option.name
                .toLocaleLowerCase('tr')
                .replace(/\s+/g, '')
                .includes(lowerQuery)
        );
    }, [safeOptions, query]);

    return (
        <div className={className}>
            {label && (
                <label className="mb-2 block text-sm font-medium text-foreground">
                    {label}
                </label>
            )}
            <Popover className="relative">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className={cn(
                                "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                disabled && "cursor-not-allowed opacity-50 bg-muted"
                            )}
                            disabled={disabled}
                        >
                            <span className={cn("block truncate", !selectedOption && "text-muted-foreground")}>
                                {selectedOption ? selectedOption.name : placeholder}
                            </span>
                            <ChevronDown
                                className="h-4 w-4 opacity-50 shrink-0"
                                aria-hidden="true"
                            />
                        </PopoverButton>

                        <PopoverPanel
                             anchor="bottom start"
                             className="z-50 mt-1 max-h-64 w-[var(--button-width)] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none focus:outline-none"
                        >
                            {!hideSearch && (
                                <div className="flex items-center border-b px-3">
                                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                    <input
                                        ref={(input) => {
                                            if (input) {
                                                setTimeout(() => input.focus(), 50);
                                            }
                                        }}
                                        className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={searchPlaceholder}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                            
                            <div className="max-h-[200px] overflow-y-auto overflow-x-hidden p-1">
                                {filteredOptions.length === 0 ? (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        Sonuç bulunamadı.
                                    </div>
                                ) : (
                                    filteredOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            className={cn(
                                                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                                String(option.id) === String(value) && "bg-accent text-accent-foreground"
                                            )}
                                            onClick={() => {
                                                onChange(String(option.id));
                                                setQuery('');
                                                close();
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    String(option.id) === String(value) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.name}
                                        </div>
                                    ))
                                )}
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </div>
    );
}
