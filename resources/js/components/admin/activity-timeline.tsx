import {
    Activity,
    Building2,
    Edit,
    FileText,
    HelpCircle,
    Home,
    Image,
    Megaphone,
    MessageSquare,
    Plus,
    Trash,
    User,
    Video,
} from 'lucide-react';

type ActivityLog = {
    id: number;
    description: string;
    subject_type: string;
    subject_id: number;
    subject_name?: string;
    causer_name: string;
    created_at: string;
    event: string;
    properties: any;
};

const getIcon = (type: string) => {
    switch (type) {
        case 'User':
            return User;
        case 'Office':
            return Building2;
        case 'Listing':
            return Home;
        case 'BlogPost':
            return FileText;
        case 'HeroSlide':
            return Image;
        case 'Activity':
            return Activity;
        case 'LiveStream':
            return Video;
        case 'Announcement':
            return Megaphone;
        case 'Spotlight':
            return Megaphone;
        case 'Faq':
            return HelpCircle;
        case 'ContactMessage':
            return MessageSquare;
        case 'BoardMember':
        case 'SupervisoryBoardMember':
        case 'ChamberTeam':
        case 'RegionalManager':
            return User;
        case 'BankAccount':
        case 'RegistrationFee':
        case 'ChairmanMessage':
        case 'WhyChooseUs':
        case 'AboutIzeko':
        case 'ChamberRegistration':
            return FileText;
        default:
            return Activity;
    }
};

const getColor = (event: string) => {
    switch (event) {
        case 'created':
            return 'bg-green-100 text-green-600';
        case 'updated':
            return 'bg-blue-100 text-blue-600';
        case 'deleted':
            return 'bg-red-100 text-red-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

const getActionIcon = (event: string) => {
    switch (event) {
        case 'created':
            return Plus;
        case 'updated':
            return Edit;
        case 'deleted':
            return Trash;
        default:
            return Activity;
    }
};

const getMessage = (log: ActivityLog) => {
    const subjectName =
        {
            User: 'Kullanıcı',
            Office: 'Ofis',
            Listing: 'İlan',
            BlogPost: 'Blog Yazısı',
            HeroSlide: 'Slider',
            Activity: 'Faaliyet',
            LiveStream: 'Canlı Yayın',
            Announcement: 'Duyuru',
            Faq: 'SSS',
            ContactMessage: 'İletişim Mesajı',
            Spotlight: 'Manşet',
            BoardMember: 'Yönetim Kurulu Üyesi',
            ChairmanMessage: 'Başkan Mesajı',
            SupervisoryBoardMember: 'Denetim Kurulu Üyesi',
            ChamberTeam: 'Oda Ekibi Üyesi',
            RegionalManager: 'Bölge Sorumlusu',
            BankAccount: 'Banka Hesabı',
            RegistrationFee: 'Kayıt Ücreti',
            WhyChooseUs: 'Neden Emlak Ofisi',
            AboutIzeko: 'İzeko Hakkında',
            ChamberRegistration: 'Oda Kayıt Bilgisi',
        }[log.subject_type] || log.subject_type;

    const nameSuffix = log.subject_name ? `: ${log.subject_name}` : '';

    if (log.description === 'created') {
        if (log.subject_type === 'ContactMessage') {
            return 'Yeni iletişim mesajı geldi';
        }
        return `Yeni ${subjectName} eklendi${nameSuffix}`;
    }
    if (log.description === 'updated') {
        // Special check for status changes if tracked in properties
        if (
            log.properties?.attributes?.status === 'active' &&
            log.properties?.old?.status === 'pending'
        ) {
            return `${subjectName} onaylandı${nameSuffix}`;
        }
        if (
            log.properties?.attributes?.listing_status === 'active' &&
            log.properties?.old?.listing_status === 'pending'
        ) {
            return `${subjectName} onaylandı${nameSuffix}`;
        }

        // Check for User status changes
        if (
            log.subject_type === 'User' &&
            log.properties?.attributes?.status === 'active' &&
            log.properties?.old?.status !== 'active'
        ) {
            return `${subjectName} aktif edildi${nameSuffix}`;
        }
        if (
            log.subject_type === 'User' &&
            log.properties?.attributes?.status === 'passive' &&
            log.properties?.old?.status === 'active'
        ) {
            return `${subjectName} pasife alındı${nameSuffix}`;
        }
        if (
            log.subject_type === 'User' &&
            log.properties?.attributes?.status === 'pending'
        ) {
            return `${subjectName} durumu güncellendi: Onay bekliyor${nameSuffix}`;
        }

        // Check for is_active changes (e.g. Offices)
        if (
            log.properties?.attributes?.is_active === true &&
            log.properties?.old?.is_active === false
        ) {
            return `${subjectName} aktif edildi${nameSuffix}`;
        }
        if (
            log.properties?.attributes?.is_active === false &&
            log.properties?.old?.is_active === true
        ) {
            return `${subjectName} pasife alındı${nameSuffix}`;
        }

        // Generic check for 'active' changes (Spotlight, Board Members, etc.)
        if (
            log.properties?.attributes?.active === true &&
            log.properties?.old?.active === false
        ) {
            return `${subjectName} aktif edildi${nameSuffix}`;
        }
        if (
            log.properties?.attributes?.active === false &&
            log.properties?.old?.active === true
        ) {
            return `${subjectName} pasife alındı${nameSuffix}`;
        }

        // Special handling for single-page corporate models
        const singlePageModels = [
            'AboutIzeko',
            'WhyChooseUs',
            'ChamberRegistration',
            'ChairmanMessage',
        ];
        if (singlePageModels.includes(log.subject_type)) {
            return `${log.subject_name} sayfası güncellendi`;
        }

        return `${subjectName} güncellendi${nameSuffix}`;
    }
    if (log.description === 'deleted') {
        if (log.subject_type === 'RegistrationFee') {
            return `${subjectName} sayfası düzenlendi`;
        }
        return `${subjectName} silindi`;
    }

    return log.description;
};

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function ActivityTimeline({
    logs: initialLogs,
}: {
    logs: ActivityLog[];
}) {
    const [logs, setLogs] = useState<ActivityLog[]>(initialLogs);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Update logs if initialLogs changes (e.g. real-time updates or page reload)
    useEffect(() => {
        setLogs(initialLogs);
    }, [initialLogs]);

    const loadMoreLogs = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(route('admin.api.activities'), {
                params: {
                    offset: logs.length,
                    limit: 10,
                },
            });

            const newLogs = response.data.activities;
            setLogs((prev) => [...prev, ...newLogs]);
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.error('Failed to load more activities', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                scrollContainerRef.current;
            // Trigger load when close to bottom (e.g., 50px threshold)
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                loadMoreLogs();
            }
        }
    };

    if (logs.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-gray-500">
                <Activity className="mb-2 h-8 w-8 text-gray-300" />
                <p>Henüz işlem geçmişi yok.</p>
            </div>
        );
    }

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flow-root max-h-[250px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent"
        >
            <ul role="list" className="-mb-8">
                {logs.map((log, logIdx) => {
                    const Icon = getIcon(log.subject_type);
                    const ActionIcon = getActionIcon(log.event);
                    const isLast = logIdx === logs.length - 1;

                    return (
                        <li key={`${log.id}-${logIdx}`}>
                            <div className="relative pb-8">
                                {!isLast ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span
                                            className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${getColor(
                                                log.event,
                                            )}`}
                                        >
                                            <Icon
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">
                                                    {getMessage(log)}
                                                </span>{' '}
                                                {log.subject_type !==
                                                    'ContactMessage' && (
                                                    <span className="text-xs font-normal text-gray-500 italic">
                                                        ({log.causer_name})
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="text-right text-xs whitespace-nowrap text-gray-500">
                                            {log.created_at}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {loading && (
                <div className="mt-4 flex justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                </div>
            )}
        </div>
    );
}
