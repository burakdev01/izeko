import { Feature } from './types';

interface Props {
    feature: Feature;
}

export function FeatureItem({ feature }: Props) {
    const Icon = feature.icon;

    return (
        <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                <Icon size={20} />
            </div>

            <div>
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
        </div>
    );
}
