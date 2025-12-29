import { SectionButton } from './SectionButton';
import { SectionDivider } from './SectionDivider';
import { SectionHeaderData } from './types';

interface Props {
    data: SectionHeaderData;
}

export function SectionHeader({ data }: Props) {
    return (
        <section className="py-24 text-center">
            {/* Eyebrow */}
            <p className="mb-6 text-sm font-medium tracking-[0.25em] text-black">
                {data.eyebrow}
            </p>

            {/* Title */}
            <h2 className="text-4xl font-bold text-red-500">{data.title}</h2>

            <SectionDivider />

            {/* Button */}
            {data.buttonLabel && data.buttonHref && (
                <div className="mt-6">
                    <SectionButton
                        label={data.buttonLabel}
                        href={data.buttonHref}
                    />
                </div>
            )}
        </section>
    );
}
