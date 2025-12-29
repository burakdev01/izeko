import { Head } from '@inertiajs/react';
import { FirstComponent } from '../components/FirstComponent';

export default function DenemePage() {
    return (
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center bg-slate-50 p-8">
            <Head title="Deneme" />
            <FirstComponent />
        </div>
    );
}
