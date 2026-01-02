export function duplicateForInfinite<T>(items: T[], min = 6): T[] {
    if (items.length >= min) return items;

    const result: T[] = [];
    while (result.length < min) {
        result.push(...items);
    }

    return result;
}
