// components/hero/useHeroSlider.ts
import { useEffect, useRef, useState } from 'react';

interface Options {
    length: number;
    interval?: number;
}

export function useHeroSlider({ length, interval = 3000 }: Options) {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(100);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    const resetProgress = () => {
        startTimeRef.current = Date.now();
        setProgress(100);
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % length);
        resetProgress();
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + length) % length);
        resetProgress();
    };

    useEffect(() => {
        if (length <= 1) return;

        const tick = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const percent = Math.max(100 - (elapsed / interval) * 100, 0);

            setProgress(percent);

            if (elapsed >= interval) {
                next();
            } else {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [index, interval, length]);

    return {
        index,
        progress,
        next,
        prev,
    };
}
