import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedData<T = any> extends PaginationMeta {
    data: T[];
}

interface PaginationProps {
    links: PaginationLink[];
}

export function Pagination({ links }: PaginationProps) {
    const processedLinks = links.map(link => {
        let label = link.label;
        if (label.includes('Previous') || label.includes('&laquo;')) {
            label = 'Previous';
        } else if (label.includes('Next') || label.includes('&raquo;')) {
            label = 'Next';
        }
        return { ...link, label };
    });

    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 py-8">
            {processedLinks.map((link, key) => {
                if (link.url === null) {
                    if (link.label === 'Previous') {
                         return (
                            <Button key={key} variant="outline" size="icon" disabled className="h-9 w-9 opacity-50">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        );
                    }
                    if (link.label === 'Next') {
                         return (
                            <Button key={key} variant="outline" size="icon" disabled className="h-9 w-9 opacity-50">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        );
                    }
                    if (link.label === '...') {
                        return (
                            <span key={key} className="flex h-9 w-9 items-center justify-center">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </span>
                        );
                    }
                    return null;
                }

                if (link.label === 'Previous') {
                    return (
                        <Link key={key} href={link.url} preserveScroll>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                    );
                }

                if (link.label === 'Next') {
                     return (
                        <Link key={key} href={link.url} preserveScroll>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    );
                }

                return (
                    <Link key={key} href={link.url} preserveScroll>
                        <Button
                            variant={link.active ? "default" : "outline"}
                            size="icon"
                            className={cn("h-9 w-9", link.active && "pointer-events-none")}
                        >
                            {link.label}
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
}
