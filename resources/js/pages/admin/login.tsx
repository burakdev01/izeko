import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface AdminLoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function AdminLogin({
    status,
    canResetPassword,
}: AdminLoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Girişi" />
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <img
                            src="https://izeko.deniz-web.com/public/themes/default/assets/images/izeko-logo.png"
                            alt="İZEKO"
                            className="h-32"
                        />
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Giriş Yap
                            </h1>
                            {/* <p className="mt-2 text-sm text-gray-600">
                                Henüz hesabın yok mu?{' '}
                                <a
                                    href="/register"
                                    className="font-medium text-red-600 hover:text-red-700"
                                >
                                    Hemen oluşturalım
                                </a>
                            </p> */}
                        </div>

                        {status && (
                            <div className="mb-4 rounded-lg bg-green-50 p-3 text-center text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-red-600"
                                >
                                    E-Posta:{' '}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                                    placeholder="E-Posta"
                                    required
                                    autoFocus
                                />
                                {errors.email && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-red-600"
                                    >
                                        Şifre:{' '}
                                        <span className="text-red-600">*</span>
                                    </label>
                                    {/* {canResetPassword && (
                                        <a
                                            href="/forgot-password"
                                            className="text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Şifremi Unuttum
                                        </a>
                                    )} */}
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        placeholder="Şifre"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Beni Hatırla
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Giriş yapılıyor...'
                                    : 'Giriş Yap'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
