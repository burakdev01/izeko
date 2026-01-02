interface Props {
    image: string;
}

export function MembershipImage({ image }: Props) {
    return (
        <div className="relative flex w-full items-center justify-center">
            {/* Büyük arka panel */}
            <div className="relative rounded-[32px] bg-[#EDEAF4] p-8">
                {/* dekoratif blur – sol alt */}
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-300/30 blur-3xl" />

                {/* dekoratif blur – sağ üst */}
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />

                {/* Fotoğraf çerçevesi */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
                    <img
                        src={image}
                        alt=""
                        className="h-[420px] w-[320px] rounded-md object-cover md:h-[460px] md:w-[360px]"
                    />
                </div>
            </div>
        </div>
    );
}
