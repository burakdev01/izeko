// components/navbar/iconMap.tsx

import {
    Building2,
    Home,
    Mail,
    Newspaper,
    PenTool,
    Scale,
    Video,
} from 'lucide-react';
import React from 'react';
import { NavIcon } from './types';

export const iconMap: Record<NavIcon, React.ReactNode> = {
    home: <Home className="h-5 w-5 text-red-600" />,
    corporate: <Building2 className="h-5 w-5 text-red-600" />,
    activities: <Newspaper className="h-5 w-5 text-red-600" />,
    blog: <PenTool className="h-5 w-5 text-red-600" />,
    live: <Video className="h-5 w-5 text-red-600" />,
    announcements: <Scale className="h-5 w-5 text-red-600" />,
    contact: <Mail className="h-5 w-5 text-red-600" />,
};
