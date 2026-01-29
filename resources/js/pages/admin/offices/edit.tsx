// import AdminFormHeader from '@/components/admin/admin-form-header'; // Removed layout changes

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Combobox from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

type Office = {
    id: number;
    name: string;
    is_active: boolean;
    address_text?: string; // The old simple address
    address?: {
        province_id?: string | number;
        district_id?: string | number;
        neighborhood_id?: string | number;
        description?: string;
    };
};

type OfficeEditProps = {
    office: Office;
    provinces: { id: number; name: string }[];
};

export default function OfficeEdit({ office, provinces }: OfficeEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: office.name,
        is_active: office.is_active,
        address: {
            province_id: office.address?.province_id || '',
            district_id: office.address?.district_id || '',
            neighborhood_id: office.address?.neighborhood_id || '',
            description: office.address?.description || '',
        },
    });

    const [districts, setDistricts] = useState<{ id: number; name: string }[]>(
        [],
    );
    const [neighborhoods, setNeighborhoods] = useState<
        { id: number; name: string }[]
    >([]);

    useEffect(() => {
        if (data.address.province_id) {
            axios
                .get<{ id: number; name: string }[]>(
                    route('admin.locations.districts', {
                        province: data.address.province_id,
                    }),
                )
                .then((res) => {
                    setDistricts(res.data);
                });
        }
    }, [data.address.province_id]);

    useEffect(() => {
        if (data.address.district_id) {
            axios
                .get<{ id: number; name: string }[]>(
                    route('admin.locations.neighborhoods', {
                        district: data.address.district_id,
                    }),
                )
                .then((res) => {
                    setNeighborhoods(res.data);
                });
        }
    }, [data.address.district_id]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.ofisler.update', office.id));
    };

    return (
        <AdminLayout>
            <Head title="Ofis Düzenle" />

            <div className="container mx-auto space-y-8 py-8 md:py-10">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link
                                href={route('admin.ofisler.index')}
                                className="flex items-center hover:text-foreground"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Ofisler
                            </Link>
                            <span>/</span>
                            <span>Düzenle</span>
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">
                            Ofis Düzenle
                        </h1>
                        <p className="text-muted-foreground">
                            Ofis bilgilerini ve durumunu güncelleyin.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            İptal
                        </Button>
                        <Button
                            onClick={submit}
                            disabled={processing}
                            className="bg-[#da1f25] hover:bg-[#b0181d]"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Kaydet
                        </Button>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="grid min-h-[500px] gap-8 py-6 lg:grid-cols-12">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Ofis Bilgileri
                                    </CardTitle>
                                    <CardDescription>
                                        Ofisin temel bilgileri ve adres
                                        detayları.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Office Name */}
                                    <div>
                                        <Label className="mb-2 block">
                                            Ofis Adı
                                        </Label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                                            placeholder="Örn: Merkez Ofis"
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>

                                    {/* Address Fields */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label>İl</Label>
                                            <Combobox
                                                options={provinces}
                                                value={String(
                                                    data.address.province_id,
                                                )}
                                                onChange={(val) => {
                                                    setData('address', {
                                                        ...data.address,
                                                        province_id: val,
                                                        district_id: '',
                                                        neighborhood_id: '',
                                                    });
                                                    setDistricts([]);
                                                    setNeighborhoods([]);
                                                }}
                                                placeholder="İl seçiniz"
                                                searchPlaceholder="İl ara..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>İlçe</Label>
                                            <Combobox
                                                options={districts}
                                                value={String(
                                                    data.address.district_id,
                                                )}
                                                onChange={(val) => {
                                                    setData('address', {
                                                        ...data.address,
                                                        district_id: val,
                                                        neighborhood_id: '',
                                                    });
                                                    setNeighborhoods([]);
                                                }}
                                                disabled={
                                                    !data.address.province_id
                                                }
                                                placeholder="İlçe seçiniz"
                                                searchPlaceholder="İlçe ara..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mahalle</Label>
                                            <Combobox
                                                options={neighborhoods}
                                                value={String(
                                                    data.address
                                                        .neighborhood_id,
                                                )}
                                                onChange={(val) =>
                                                    setData('address', {
                                                        ...data.address,
                                                        neighborhood_id: val,
                                                    })
                                                }
                                                disabled={
                                                    !data.address.district_id
                                                }
                                                placeholder="Mahalle seçiniz"
                                                searchPlaceholder="Mahalle ara..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2 block">
                                            Açık Adres
                                        </Label>
                                        <Textarea
                                            value={data.address.description}
                                            onChange={(e) =>
                                                setData('address', {
                                                    ...data.address,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full resize-none"
                                            placeholder="Cadde, sokak, bina ve kapı no..."
                                        />
                                        {/* @ts-ignore */}
                                        <InputError
                                            className="mt-2"
                                            message={
                                                errors['address.description']
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Side Panel - Right Column */}
                        <div className="space-y-6 lg:col-span-4">
                            {/* Status Card */}
                            <Card
                                className={
                                    data.is_active
                                        ? 'border-l-4 border-l-green-500'
                                        : 'border-l-4 border-l-gray-400'
                                }
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base text-muted-foreground">
                                            Ofis Durumu
                                        </CardTitle>
                                        {data.is_active ? (
                                            <Badge className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                                                Aktif
                                            </Badge>
                                        ) : (
                                            <Badge className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-100">
                                                Pasif
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="text-xs">
                                        Ofisin sistem üzerindeki görünürlüğünü
                                        yönetin.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Durum Değiştir</Label>
                                        <Combobox
                                            value={data.is_active ? '1' : '0'}
                                            onChange={(val) =>
                                                setData(
                                                    'is_active',
                                                    val === '1',
                                                )
                                            }
                                            options={[
                                                { id: '1', name: 'Aktif' },
                                                { id: '0', name: 'Pasif' },
                                            ]}
                                            placeholder="Durum Seçiniz"
                                            searchPlaceholder="Ara..."
                                            hideSearch={true}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.is_active}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
