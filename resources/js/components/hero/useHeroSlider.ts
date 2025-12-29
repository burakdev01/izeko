// components/hero/useHeroSlider.ts
import { useEffect, useState } from 'react';

interface Options {
    length: number;
    interval?: number;
}

export function useHeroSlider({ length, interval = 3000 }: Options) {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + length) % length);
    };

    useEffect(() => {
        if (length <= 1) return;

        const timer = setInterval(next, interval);
        return () => clearInterval(timer);
    }, [length, interval]);

    return {
        index,
        next,
        prev,
    };
}
