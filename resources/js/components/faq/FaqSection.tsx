import { ChevronDown, HelpCircle } from 'lucide-react';
import { type CSSProperties, useState } from 'react';

export type FaqItem = {
    question: string;
    answer: string;
};

type FaqItemProps = FaqItem & {
    isOpen: boolean;
    onToggle: () => void;
};

type FaqSectionProps = {
    items?: FaqItem[];
};

type CssVarProperties = CSSProperties & {
    [key: `--${string}`]: string;
};

const FaqItemRow = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
    return (
        <div className="rounded-r-2xl border-l-4 border-[color:var(--faq-accent)] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-gray-50"
            >
                <div className="flex flex-1 items-center gap-4">
                    <HelpCircle className="h-6 w-6 flex-shrink-0 text-[color:var(--faq-accent)]" />
                    <h3 className="text-lg font-semibold text-gray-900 md:text-xl">
                        {question}
                    </h3>
                </div>
                <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 text-[color:var(--faq-accent)] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-6 pl-16">
                    <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function FaqSection({ items = [] }: FaqSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (items.length === 0) {
        return null;
    }

    const sectionStyle: CssVarProperties = {
        '--faq-accent': '#dc2626',
        '--faq-accent-soft': '#fee2e2',
    };

    return (
        <section
            className="bg-gradient-to-b from-white via-gray-50 to-red-50 py-16"
            style={sectionStyle}
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 md:px-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-4xl font-bold text-[color:var(--faq-accent)] md:text-5xl">
                        Sıkça Sorulan Sorular
                    </h2>
                    <div className="h-1 w-24 rounded-full bg-[color:var(--faq-accent)]" />
                    <p className="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-lg">
                        Gayrimenkul ile ilgili merak ettiğiniz tüm soruların
                        cevapları burada. Aşağıdaki soruları inceleyebilir veya
                        bize doğrudan ulaşabilirsiniz.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {items.map((faq, index) => (
                        <FaqItemRow
                            key={`${faq.question}-${index}`}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() =>
                                setOpenIndex(
                                    openIndex === index ? null : index,
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
