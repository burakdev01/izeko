import { Link } from '@inertiajs/react';

export function FirstComponent() {
    return (
        <section className="bg-red-400">
            asda
            <Link
                href="/"
                className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
                Ana Sayfaya Git
            </Link>
        </section>
    );
}
