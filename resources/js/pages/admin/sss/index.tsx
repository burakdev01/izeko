import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminRowActions from '@/components/admin/admin-row-actions';
import { useAdminSortableList } from '@/hooks/use-admin-sortable-list';
import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';

type Faq = {
    id: number;
    question: string;
    answer: string;
    active?: boolean;
};

type SssIndexProps = {
    faqs: Faq[];
};

const buildAnswerPreview = (answer: string) => {
    if (!answer) {
        return '-';
    }

    if (answer.length <= 120) {
        return answer;
    }

    return `${answer.slice(0, 117)}...`;
};

export default function SssIndex({ faqs }: SssIndexProps) {
    const {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    } = useAdminSortableList({
        items: faqs,
        reorderUrl: '/admin/sss/reorder',
    });

    return (
        <AdminLayout title={`SSS Y\u00F6netimi`}>
            <Head title={`SSS Y\u00F6netimi`} />

            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <AdminPageHeader
                        title={`SSS Y\u00F6netimi`}
                        description={`S\u0131k\u00E7a sorulan sorular\u0131 buradan d\u00FCzenleyebilir veya yeni soru ekleyebilirsiniz.`}
                        actionLabel="Yeni Soru"
                        actionHref="/admin/sss/create"
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500" />
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Soru
                                    </th>
                                    <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                                        Cevap
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Durum
                                    </th>
                                    <th className="w-24 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                                        {'\u0130\u015Flemler'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orderedItems.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            {'Hen\u00FCz soru eklenmemi\u015F'}
                                        </td>
                                    </tr>
                                )}
                                {orderedItems.map((faq) => {
                                    const isActive = faq.active ?? true;
                                    const answerPreview = buildAnswerPreview(
                                        faq.answer,
                                    );

                                    return (
                                        <tr
                                            key={faq.id}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop(faq.id)}
                                            className={`transition ${
                                                draggedId === faq.id
                                                    ? 'bg-blue-50'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <td className="px-4 py-4">
                                                <div
                                                    className="flex cursor-grab items-center justify-center text-gray-400 active:cursor-grabbing"
                                                    draggable
                                                    onDragStart={handleDragStart(
                                                        faq.id,
                                                    )}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <GripVertical className="h-4 w-4" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <span className="font-medium">
                                                    {faq.question}
                                                </span>
                                            </td>
                                            <td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">
                                                {answerPreview}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        isActive
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {isActive
                                                        ? 'Aktif'
                                                        : 'Pasif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <AdminRowActions
                                                    editHref={`/admin/sss/${faq.id}/edit`}
                                                    deleteHref={`/admin/sss/${faq.id}`}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
