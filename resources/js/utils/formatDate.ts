// utils/formatDate.ts
export function formatDate(date: string) {
    const d = new Date(date);

    return {
        day: d.getDate(),
        month: d.toLocaleString('tr-TR', { month: 'long' }),
        year: d.getFullYear(),
    };
}
