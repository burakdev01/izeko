import AdminFormHeader from '@/components/admin/admin-form-header';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
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
        <AdminLayout title="Ofis Düzenle">
            <Head title="Ofis Düzenle" />

            <form onSubmit={submit} className="space-y-6">
                <AdminFormHeader
                    title="Ofis Düzenle"
                    description="Ofis bilgilerini güncelleyin."
                    submitLabel="Güncelle"
                    cancelHref="/admin/ofisler"
                    processing={processing}
                />

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-6 p-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Ofis Adı
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition outline-none focus:border-transparent focus:ring-2 focus:ring-[#da1f25]"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label>İl</Label>
                                <Select
                                    value={String(data.address.province_id)}
                                    onValueChange={(val) => {
                                        setData('address', {
                                            ...data.address,
                                            province_id: val,
                                            district_id: '',
                                            neighborhood_id: '',
                                        });
                                        setDistricts([]);
                                        setNeighborhoods([]);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="İl seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provinces.map((province) => (
                                            <SelectItem
                                                key={province.id}
                                                value={String(province.id)}
                                            >
                                                {province.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>İlçe</Label>
                                <Select
                                    value={String(data.address.district_id)}
                                    onValueChange={(val) => {
                                        setData('address', {
                                            ...data.address,
                                            district_id: val,
                                            neighborhood_id: '',
                                        });
                                        setNeighborhoods([]);
                                    }}
                                    disabled={!data.address.province_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="İlçe seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((district) => (
                                            <SelectItem
                                                key={district.id}
                                                value={String(district.id)}
                                            >
                                                {district.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Mahalle</Label>
                                <Select
                                    value={String(data.address.neighborhood_id)}
                                    onValueChange={(val) =>
                                        setData('address', {
                                            ...data.address,
                                            neighborhood_id: val,
                                        })
                                    }
                                    disabled={!data.address.district_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Mahalle seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {neighborhoods.map((neighborhood) => (
                                            <SelectItem
                                                key={neighborhood.id}
                                                value={String(neighborhood.id)}
                                            >
                                                {neighborhood.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2 block">Açık Adres</Label>
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
                            {/* Display errors for nested address fields if any, checking for flat keys if returned by Laravel validation */}
                            {/* @ts-ignore */}
                            <InputError
                                className="mt-2"
                                message={errors['address.description']}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Durum
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === true}
                                        onChange={() =>
                                            setData('is_active', true)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Aktif
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="is_active"
                                        checked={data.is_active === false}
                                        onChange={() =>
                                            setData('is_active', false)
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#da1f25] focus:ring-[#da1f25]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Pasif
                                    </span>
                                </label>
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.is_active}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
