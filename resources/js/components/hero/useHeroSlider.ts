import { useEffect, useState } from 'react';

interface Options {
    length: number;
    interval?: number;
}

export function useHeroSlider({ length, interval = 3000 }: Options) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % length);
        }, interval);

        return () => clearInterval(timer);
    }, [length, interval]);

    return index;
}
