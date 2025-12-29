// components/navbar/types.ts

export interface MenuItem {
    label: string;
    path: string;
    isHighlighted?: boolean;
}

export type NavIcon =
    | 'home'
    | 'corporate'
    | 'activities'
    | 'blog'
    | 'live'
    | 'announcements'
    | 'contact';

export interface NavItem {
    id: string;
    label: string;
    path?: string;
    icon: NavIcon;
    submenu?: MenuItem[];
}
