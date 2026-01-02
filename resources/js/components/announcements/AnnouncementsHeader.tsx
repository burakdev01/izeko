interface Props {
    title: string;
    logo: string;
}

export function AnnouncementCardHeader({ title, logo }: Props) {
    return (
        <div className="relative flex h-56 flex-col items-center justify-center rounded-t-2xl bg-gradient-to-b from-gray-200 via-gray-100 to-white">
            <h3 className="mb-4 text-center text-xl font-semibold text-red-600">
                {title}
            </h3>

            <img src={logo} alt="" className="h-24 w-auto" />

            {/* Alt yumuşak gölge */}
            <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-black/10 to-transparent" />
        </div>
    );
}
