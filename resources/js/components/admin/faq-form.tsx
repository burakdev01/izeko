import AdminFormHeader from '@/components/admin/admin-form-header';
import AdminStatusToggle from '@/components/admin/admin-status-toggle';
import InputError from '@/components/input-error';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type Faq = {
    id?: number;
    question: string;
    answer: string;
    active?: boolean;
};

type FaqFormProps = {
    title: string;
    description: string;
    action: string;
    method?: 'post' | 'put';
    submitLabel?: string;
    cancelHref?: string;
    faq?: Faq;
};

export default function FaqForm({
    title,
    description,
    action,
    method = 'post',
    submitLabel = 'Kaydet',
    cancelHref = '/admin/sss',
    faq,
}: FaqFormProps) {
    const [question, setQuestion] = useState(faq?.question ?? '');
    const [answer, setAnswer] = useState(faq?.answer ?? '');
    const [active, setActive] = useState(faq?.active ?? true);

    return (
        <Form action={action} method={method} className="space-y-6">
            {({ processing, errors }) => (
                <>
                    <AdminFormHeader
                        title={title}
                        description={description}
                        submitLabel={submitLabel}
                        cancelHref={cancelHref}
                        processing={processing}
                    />

                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="space-y-4 p-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Soru
                                        </label>
                                        <input
                                            type="text"
                                            name="question"
                                            value={question}
                                            onChange={(event) =>
                                                setQuestion(event.target.value)
                                            }
                                            placeholder="Soru metni"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.question}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Cevap
                                        </label>
                                        <textarea
                                            name="answer"
                                            rows={5}
                                            value={answer}
                                            onChange={(event) =>
                                                setAnswer(event.target.value)
                                            }
                                            placeholder="Cevap metni"
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.answer}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl space-y-6">
                            <AdminStatusToggle
                                checked={active}
                                onChange={setActive}
                            />
                        </div>
                    </div>
                </>
            )}
        </Form>
    );
}
