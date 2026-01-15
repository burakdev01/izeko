import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, LayoutGrid, LogOut } from 'lucide-react';
import { type PropsWithChildren } from 'react';

type AdminLayoutProps = PropsWithChildren<{
    title: string;
    description?: string;
}>;

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { label: 'Faaliyetler', href: '/admin/faaliyetler', icon: Calendar },
];

export default function AdminLayout({
    title,
    description,
    children,
}: AdminLayoutProps) {
    const page = usePage<SharedData>();
    const currentUrl = page.url;
    const user = page.props.auth?.user;

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row">
                <aside className="rounded-2xl bg-white p-5 shadow lg:w-64">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Admin Panel
                    </div>
                    <nav className="mt-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = currentUrl.startsWith(item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-red-50 text-red-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 border-t pt-4">
                        <div className="text-xs text-gray-500">
                            Giris yapan
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            {user?.name ?? 'Admin'}
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Cikis yap
                        </Link>
                    </div>
                </aside>

                <main className="flex-1 space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {title}
                        </h1>
                        {description ? (
                            <p className="mt-1 text-sm text-gray-500">
                                {description}
                            </p>
                        ) : null}
                    </div>

                    {children}
                </main>
            </div>
        </div>
    );
}
