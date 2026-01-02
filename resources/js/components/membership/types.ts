import { LucideIcon } from 'lucide-react';

export interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface Stat {
    value: string;
    label: string;
    description: string;
}
