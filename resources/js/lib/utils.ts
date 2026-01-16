import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

const turkishMap: Record<string, string> = {
    '\u00e7': 'c',
    '\u00c7': 'c',
    '\u011f': 'g',
    '\u011e': 'g',
    '\u0131': 'i',
    '\u0130': 'i',
    '\u00f6': 'o',
    '\u00d6': 'o',
    '\u015f': 's',
    '\u015e': 's',
    '\u00fc': 'u',
    '\u00dc': 'u',
};

export function slugify(value: string): string {
    const normalized = value
        .split('')
        .map((char) => turkishMap[char] ?? char)
        .join('')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    return normalized
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-+|-+$)/g, '');
}
