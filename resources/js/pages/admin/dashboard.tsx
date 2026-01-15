import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <Head title="Admin Panel" />
            <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Admin Panel hey
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Burasi admin paneli icin baslangic alanidir.
                </p>
            </div>
        </div>
    );
}
