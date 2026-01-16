import InputError from '@/components/input-error';
import { Image } from 'lucide-react';
import { type ChangeEvent, useEffect, useId, useRef, useState } from 'react';

type AdminMediaUploadProps = {
    label: string;
    name: string;
    initialPreview?: string | null;
    helperText?: string;
    error?: string;
};

export default function AdminMediaUpload({
    label,
    name,
    initialPreview = null,
    helperText = '',
    error,
}: AdminMediaUploadProps) {
    const inputId = useId();
    const [preview, setPreview] = useState<string | null>(initialPreview);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setPreview(initialPreview);
    }, [initialPreview]);

    useEffect(() => {
        if (!preview || !preview.startsWith('blob:')) {
            return undefined;
        }

        return () => {
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const nextPreview = URL.createObjectURL(file);
        setPreview(nextPreview);
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="h-full rounded-2xl bg-gray-50">
            <label className="mb-4 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition hover:border-blue-400">
                <input
                    ref={fileInputRef}
                    type="file"
                    name={name}
                    id={inputId}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <label htmlFor={inputId} className="block cursor-pointer">
                    <div className="mb-4 flex justify-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Seçilen görsel"
                                className="h-28 w-28 rounded-xl object-cover"
                            />
                        ) : (
                            <Image className="h-12 w-12 text-gray-400" />
                        )}
                    </div>
                    <p className="mb-1 text-sm font-medium text-blue-500">
                        Görsel Seça
                    </p>
                    <p className="text-xs text-gray-500">
                        veya sürükleyip bırakın
                    </p>
                    {helperText ? (
                        <p className="mt-2 text-xs text-gray-500">
                            {helperText}
                        </p>
                    ) : null}
                </label>
                <button
                    type="button"
                    onClick={handleRemove}
                    className={`mt-4 w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
                        preview ? '' : 'hidden'
                    }`}
                >
                    Görseli Kaldır
                </button>
            </div>

            {error && <InputError className="mt-3" message={error} />}
        </div>
    );
}
