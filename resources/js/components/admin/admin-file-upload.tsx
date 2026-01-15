import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import { type ComponentType } from 'react';

interface AdminFileUploadProps {
    id: string;
    label?: string;
    hint?: string;
    accept?: string;
    file: File | null;
    onChange: (file: File | null) => void;
    onClear?: () => void;
    error?: string;
    icon?: ComponentType<{ className?: string }>;
    className?: string;
}

export default function AdminFileUpload({
    id,
    label = 'Görsel Yükle',
    hint = 'PNG/JPG, en fazla 5MB.',
    accept = 'image/*',
    file,
    onChange,
    onClear,
    error,
    icon: Icon = UploadCloud,
    className,
}: AdminFileUploadProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4',
                className,
            )}
        >
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <Label
                        htmlFor={id}
                        className="text-sm font-semibold text-slate-700"
                    >
                        {label}
                    </Label>
                    {hint ? (
                        <p className="text-xs text-slate-500">{hint}</p>
                    ) : null}
                    <Input
                        id={id}
                        type="file"
                        accept={accept}
                        onChange={(event) =>
                            onChange(event.target.files?.[0] ?? null)
                        }
                        className="mt-3 h-10 rounded-lg bg-white"
                    />
                    {file && onClear ? (
                        <button
                            type="button"
                            onClick={onClear}
                            className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                        >
                            <ImageIcon className="h-4 w-4" />
                            Dosyayı temizle
                        </button>
                    ) : null}
                    <InputError message={error} />
                </div>
            </div>
        </div>
    );
}
