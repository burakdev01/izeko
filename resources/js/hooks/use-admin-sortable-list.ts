import { router } from '@inertiajs/react';
import { type DragEvent, useEffect, useState } from 'react';

type SortableItem = {
    id: number;
};

type UseAdminSortableListOptions<T extends SortableItem> = {
    items: T[];
    reorderUrl: string;
};

const moveItem = <T extends SortableItem>(
    items: T[],
    fromId: number,
    toId: number,
): T[] => {
    const fromIndex = items.findIndex((item) => item.id === fromId);
    const toIndex = items.findIndex((item) => item.id === toId);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return items;
    }

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
};

export const useAdminSortableList = <T extends SortableItem>({
    items,
    reorderUrl,
}: UseAdminSortableListOptions<T>) => {
    const [orderedItems, setOrderedItems] = useState(items);
    const [draggedId, setDraggedId] = useState<number | null>(null);

    useEffect(() => {
        setOrderedItems(items);
    }, [items]);

    const handleDragStart =
        (id: number) => (event: DragEvent<HTMLDivElement>) => {
            setDraggedId(id);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(id));

            const row = event.currentTarget.closest('tr');
            if (row) {
                const rect = row.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const offsetY = event.clientY - rect.top;
                event.dataTransfer.setDragImage(row, offsetX, offsetY);
            }
        };

    const handleDragEnd = () => {
        setDraggedId(null);
    };

    const handleDragOver = (event: DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop =
        (overId: number) => (event: DragEvent<HTMLTableRowElement>) => {
            event.preventDefault();
            const payload = event.dataTransfer.getData('text/plain');
            const dragged = draggedId ?? Number(payload);

            if (!dragged || dragged === overId) {
                return;
            }

            const next = moveItem(orderedItems, dragged, overId);
            if (next === orderedItems) {
                return;
            }

            setOrderedItems(next);
            setDraggedId(null);
            router.patch(
                reorderUrl,
                { order: next.map((item) => item.id) },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        };

    return {
        orderedItems,
        draggedId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    };
};
