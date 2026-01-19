import { GraduationCap, Lock, ShieldCheck, Users } from 'lucide-react';

import { Feature, Stat } from './types';

import { FeatureItem } from './FeatureItem';
import { MembershipHeader } from './MembershipHeader';
import { MembershipImage } from './MembershipImage';
import { StatsCard } from './StatsCard';

const features: Feature[] = [
    {
        icon: ShieldCheck,
        title: 'Resmi Yetki Belgesi',
        description: 'Profesyonel kimliğinizi belgeleyin',
    },
    {
        icon: Users,
        title: 'Geniş Ağ',
        description: 'Sektör profesyonelleriyle bağlantı kurun',
    },
    {
        icon: GraduationCap,
        title: 'Eğitim Fırsatları',
        description: 'Sürekli gelişim ve sertifikasyon',
    },
    {
        icon: Lock,
        title: 'Güvenilirlik',
        description: 'Müşterilerinize güven verin',
    },
];

const stats: Stat[] = [
    {
        value: '5000+',
        label: 'Aktif Üye',
        description: 'Geniş ve güçlü bir topluluk',
    },
    {
        value: '25+',
        label: 'Yıllık Deneyim',
        description: 'Sektörde köklü geçmiş',
    },
    {
        value: '1000+',
        label: 'Başarılı İşlem',
        description: 'Güvenilir ve şeffaf hizmet',
    },
    {
        value: '50+',
        label: 'Eğitim & Seminer',
        description: 'Yıllık eğitim ve seminer',
    },
];

export function MembershipSection() {
    return (
        <section className="relative mb-4 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-8">
            <div className="container mx-auto grid gap-16 px-4 lg:grid-cols-2">
                {/* Sol */}
                <div className="rounded-3xl bg-white p-10 shadow-lg">
                    <MembershipHeader />

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {features.map((f) => (
                            <FeatureItem key={f.title} feature={f} />
                        ))}
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {stats.map((s) => (
                            <StatsCard key={s.label} stat={s} />
                        ))}
                    </div>
                </div>

                {/* Sağ */}
                <div className="flex items-center justify-center">
                    <MembershipImage image="https://izeko.org.tr/app/themes/default/assets/images/oda-uyelerimiz.jpg" />
                </div>
            </div>
        </section>
    );
}
