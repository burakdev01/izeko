import { useCallback, useEffect } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

export function initializeTheme() {
    // Force light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
}

export function useAppearance() {
    // Always return light
    const appearance: Appearance = 'light';

    const updateAppearance = useCallback((mode: Appearance) => {
        // Do nothing, enforce light
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    useEffect(() => {
        // Enforce light on mount
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    return { appearance, updateAppearance } as const;
}
