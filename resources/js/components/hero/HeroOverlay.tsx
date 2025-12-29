interface Props {
    title: string;
    subtitle: string;
}

export function HeroOverlay({ title, subtitle }: Props) {
    return (
        <div className="max-w-2xl rounded-3xl bg-gradient-to-br from-black/70 via-black/60 to-black/50 p-10 shadow-2xl backdrop-blur-2xl">
            <h1 className="text-4xl leading-tight font-semibold text-white md:text-5xl">
                {title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/90">
                {subtitle}
            </p>
        </div>
    );
}
