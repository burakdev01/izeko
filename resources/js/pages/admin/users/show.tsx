import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CalendarRange,
    CheckCircle2,
    FileText,
    Mail,
    Phone,
} from 'lucide-react';

interface Props {
    user: User & {
        profile_photo_path?: string;
        cover_photo_path?: string;
        surname?: string;
        phone_number?: string;
        address?: {
            province_id?: number;
            district_id?: number;
            neighborhood_id?: number;
            description?: string;
        };
        staff_details?: {
            license_number?: string;
            chamber_registration_number?: string;
            tax_number?: string;
            tax_office?: string;
            national_id_number?: string;
            title?: string;
        };
        files?: {
            id: number;
            name: string;
            file_path: string;
            file_type: string;
            created_at: string;
        }[];
    };
}

export default function ShowUser({ user }: Props) {
    const defaultCover =
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000&h=400';
    const defaultProfile =
        'https://ui-avatars.com/api/?name=' +
        user.name +
        '+' +
        (user.surname || '') +
        '&background=random&color=fff&size=128';

    return (
        <AdminLayout>
            <Head title={`${user.name} ${user.surname || ''} - Profil`} />

            <div className="container mx-auto max-w-5xl py-8">
                {/* Header Profile Section */}
                <div className="relative mb-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                    {/* Cover Photo */}
                    <div className="h-48 w-full bg-gray-200">
                        <img
                            src={user.cover_photo_path || defaultCover}
                            alt="Cover"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="px-6 pb-6 md:px-10">
                        <div className="relative flex flex-col items-start md:flex-row md:items-end md:gap-6">
                            {/* Profile Photo */}
                            <div className="-mt-16 mb-4 flex-shrink-0 md:mb-0">
                                <div className="h-32 w-32 overflow-hidden rounded-xl border-4 border-white bg-white shadow-md">
                                    <img
                                        src={
                                            user.profile_photo_path ||
                                            defaultProfile
                                        }
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="flex-1 space-y-3 pt-2">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase md:text-3xl">
                                        {user.name} {user.surname}
                                    </h1>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-3">
                                    {user.staff_details
                                        ?.chamber_registration_number && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-800"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Oda Kayıt Numarası:{' '}
                                            {
                                                user.staff_details
                                                    .chamber_registration_number
                                            }
                                        </Badge>
                                    )}

                                    {user.staff_details?.license_number && (
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Yetki Belgesi No:{' '}
                                            {user.staff_details.license_number}
                                        </Badge>
                                    )}
                                </div>

                                {/* Contact & Meta */}
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                    {user.phone_number && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>{user.phone_number}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarRange className="h-4 w-4 text-gray-400" />
                                        <span>
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5 text-gray-500" />
                            Belgeler
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {/* Oda Yetki Belgesi Example if specific types needed, otherwise listing generic files */}
                                    {user.files && user.files.length > 0 ? (
                                        user.files.map((file) => (
                                            <tr key={file.id}>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                                    {file.name}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    <a
                                                        href={
                                                            '/storage/' +
                                                            file.file_path
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                        >
                                                            Görüntüle
                                                        </Button>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="px-6 py-8 text-center text-sm text-gray-500"
                                            >
                                                Henüz belge yüklenmemiş.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
