import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { useForm } from '@inertiajs/react';
import { Mail, MapPin, Phone, Users } from 'lucide-react';
import { FormEventHandler } from 'react';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export default function Iletisim() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        kvkk_consent: false,
        'g-recaptcha-response': '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('iletisim.store'), {
            onSuccess: () => {
                reset();
                alert('Mesajınız başarıyla gönderildi.');
            },
            onError: (err) => {
                console.error(err);
                if (err.message) {
                    alert(err.message);
                } else {
                    alert(
                        'Form gönderilemedi. Lütfen bilgilerinizi kontrol ediniz.',
                    );
                }
            },
        });
    };

    return (
        <>
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="İletişim"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
                showSidebar={false}
            >
                <div className="min-h-screen">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* LEFT – CONTACT INFO */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2">
                                {/* Adres - Spans 2 cols */}
                                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                                Adres
                                            </h4>
                                            <p className="mt-2 text-base leading-relaxed font-medium text-gray-800">
                                                Yenigün, Gazi Osman Paşa Blv.
                                                Koçaş İş Merkez No:87 303-304
                                                <br />
                                                35250 Konak / İzmir
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Telefon */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                                Telefon
                                            </h4>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-base font-medium text-gray-800">
                                                    +90 (232) 425 85 91
                                                </p>
                                                <p className="text-base font-medium text-gray-800">
                                                    +90 (232) 425 85 92
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* E-posta */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                                E-posta
                                            </h4>
                                            <p className="mt-2 text-base font-medium text-gray-800">
                                                info@izeko.org.tr
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sosyal Medya */}
                                <div className="col-span-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md sm:col-span-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                                <Users size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                                    Sosyal Medya
                                                </h4>
                                                <p className="text-sm font-medium text-gray-600">
                                                    Bizi takip edin
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href="https://www.facebook.com/izmiremlakcilarodasi"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition-all hover:scale-110 hover:text-red-500"
                                                aria-label="Facebook"
                                            >
                                                <svg
                                                    className="h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://www.instagram.com/izeko1999/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition-all hover:scale-110 hover:text-red-500"
                                                aria-label="Instagram"
                                            >
                                                <svg
                                                    className="h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://www.youtube.com/channel/UCVcCiUebz5iVbKhit--6xZg"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition-all hover:scale-110 hover:text-red-500"
                                                aria-label="YouTube"
                                            >
                                                <svg
                                                    className="h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MAP */}
                            <div className="h-[300px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12503.55755994515!2d27.137323!3d38.420921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd8faa98c91e5%3A0x29cea2dd9f2a22f7!2s%C4%B0zmir%20Emlak%20Komisyoncular%C4%B1%20Odas%C4%B1!5e0!3m2!1sen!2str!4v1768855278766!5m2!1sen!2str"
                                    className="h-full w-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* RIGHT – FORM */}
                        <div className="relative mt-2 mr-2 overflow-hidden rounded-xl bg-white p-6 shadow md:p-8">
                            {/* Decorative background */}
                            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-100" />
                            <div className="absolute bottom-0 -left-32 h-72 w-72 rounded-full bg-red-100" />

                            <div className="relative">
                                <h2 className="mb-6 text-2xl font-semibold text-red-600">
                                    Bize Ulaşın
                                </h2>

                                <form
                                    onSubmit={submit}
                                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                                >
                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        {errors.name && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            E-posta
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        {errors.email && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        {errors.phone && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-700">
                                            Konu
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Konu başlığı"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    'subject',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        {errors.subject && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.subject}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm text-gray-700">
                                            Mesajınız
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                        {errors.message && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={data.kvkk_consent}
                                                onChange={(e) =>
                                                    setData(
                                                        'kvkk_consent',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-600">
                                                Kişisel verilerimin{' '}
                                                <a
                                                    href="/acik-riza-metni"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-red-600 hover:underline"
                                                >
                                                    Açık Rıza Metni
                                                </a>
                                                'nde belirlenen şartlarda
                                                işlenmesine izin verdiğimi ve{' '}
                                                <a
                                                    href="/kvkk-aydinlatma-metni"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-medium text-red-600 hover:underline"
                                                >
                                                    KVKK Aydınlatma Metni
                                                </a>
                                                'ni okuduğumu ve kabul ettiğimi
                                                onaylıyorum.
                                            </span>
                                        </label>
                                        {errors.kvkk_consent && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.kvkk_consent}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <div
                                            ref={(el) => {
                                                if (el && window.grecaptcha) {
                                                    try {
                                                        window.grecaptcha.render(
                                                            el,
                                                            {
                                                                sitekey:
                                                                    '6Ld_jFIsAAAAAHE1UCcc3hpFR1ZfBMUKmmbXttvA',
                                                                callback: (
                                                                    token: string,
                                                                ) => {
                                                                    setData(
                                                                        'g-recaptcha-response',
                                                                        token,
                                                                    );
                                                                },
                                                            },
                                                        );
                                                    } catch (e) {
                                                        // Already rendered or error
                                                    }
                                                }
                                            }}
                                            className="g-recaptcha"
                                        ></div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Gönderiliyor...'
                                                : 'Gönder'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
