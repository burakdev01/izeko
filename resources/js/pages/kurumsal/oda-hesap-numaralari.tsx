import TopBar from '@/components/contact-header';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import Footer from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { Head } from '@inertiajs/react';

type Account = {
    bank_name: string;
    branch_name: string;
    branch_code: string;
    account_no: string;
    iban: string;
    account_name: string;
    description: string | null;
    image: string | null;
};

type Props = {
    accounts: Account[];
};

export default function OdaHesapNumaralari({ accounts }: Props) {
    return (
        <>
            <Head title="Oda Hesap Numaraları" />
            <TopBar />
            <Navbar />
            <ArticleLayout
                title="Oda Hesap Numaraları"
                heroImage="https://izeko.org.tr/app/themes/default/assets/images/izeko-banner.jpg"
                heroPosition="center 30%"
            >
                <div className="space-y-8 p-4 sm:p-0">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                        <img
                            src="https://izeko.org.tr/app/themes/default/assets/images/bank-numbers.png"
                            alt="Banka Hesap Numaraları"
                            className="h-64 w-full object-cover sm:h-96"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {accounts.length > 0 ? (
                            accounts.map((account, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-gray-200"
                                >
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="h-12 w-12 flex-shrink-0 sm:h-16 sm:w-16">
                                            {account.image ? (
                                                <img
                                                    src={account.image}
                                                    alt={account.bank_name}
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                                                    <span className="text-2xl font-bold">
                                                        {account.bank_name.charAt(
                                                            0,
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                                        {account.bank_name}
                                    </h3>

                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div>
                                            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                Şube
                                            </p>
                                            <p className="mt-0.5 font-medium text-gray-900">
                                                {account.branch_name}
                                            </p>
                                        </div>

                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Şube Kodu
                                                </p>
                                                <p className="mt-0.5 font-medium text-gray-900">
                                                    {account.branch_code}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Hesap No
                                                </p>
                                                <p className="mt-0.5 font-medium text-gray-900">
                                                    {account.account_no}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3 ring-1 ring-gray-100">
                                            <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                IBAN
                                            </p>
                                            <p className="font-mono text-base font-semibold break-all text-gray-900">
                                                {account.iban}
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                Hesap Sahibi
                                            </p>
                                            <p className="mt-0.5 font-medium text-gray-900">
                                                {account.account_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                Henüz banka hesabı eklenmemiş.
                            </div>
                        )}
                    </div>
                </div>
            </ArticleLayout>
            <Footer />
        </>
    );
}
