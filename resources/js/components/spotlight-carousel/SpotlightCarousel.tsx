import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './spotlight.css';

export const SpotlightCarousel = () => {
    const slides: SlideData[] = [
        {
            id: 1,
            date: '26 Kasım 2025',
            title: "EMEN BELEDİYESİ'NE 25 ADET TAŞINMAZ HİBE",
            description:
                "Emen Belediyesi'ne toplam 25 adet taşınmaz hibe edildi. Bu taşınmazlar belediyenin sosyal ve kültürel projelerine destek olmak amacıyla kullanılacaktır.",
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop',
        },
        {
            id: 2,
            date: '26 Kasım 2025',
            title: 'İZEKO Emlak Sektörünün ETİK Kurallarını Yazıyor',
            description:
                "İzmir emlakçılar odası olarak, gayrimenkul sektöründe mesleki standartları yükseltecek önemli bir adım atıyoruz: mesleki etik kuralları'nı yazmaya başladık. bu önemli çalışmayı yalnızca yerel düzeyde değil, ülke genelinde ortak akılla şekillendirmek amacıyla",
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop',
        },
        {
            id: 3,
            date: '25 Kasım 2025',
            title: 'YENİ SOSYAL TESİS PROJESİ BAŞLADI',
            description:
                'Şehrimizin gelişimi için önemli adımlar atmaya devam ediyoruz. Yeni sosyal tesis projemiz kapsamında modern spor alanları ve kültür merkezleri oluşturulacak.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
        },
        {
            id: 4,
            date: '26 Kasım 2025',
            title: 'İZEKO Emlak Sektörünün ETİK Kurallarını Yazıyor',
            description:
                "İzmir emlakçılar odası olarak, gayrimenkul sektöründe mesleki standartları yükseltecek önemli bir adım atıyoruz: mesleki etik kuralları'nı yazmaya başladık. bu önemli çalışmayı yalnızca yerel düzeyde değil, ülke genelinde ortak akılla şekillendirmek amacıyla",
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop',
        },
    ];

    return (
        <div className="w-full px-4">
            <div className="mx-auto max-w-6xl">
                <Swiper
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    pagination={false}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="news-swiper"
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className="!w-[80%] md:!w-[60%]"
                        >
                            <div className="group relative h-[430px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                </div>

                                {/* Date Badge */}
                                <div className="absolute top-6 right-6 z-10">
                                    <div className="rounded-full bg-white px-6 py-3 shadow-lg">
                                        <span className="text-sm font-bold text-red-600">
                                            {slide.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                    {/* Title */}
                                    <h2 className="mb-4 text-3xl leading-tight font-bold text-white drop-shadow-lg md:text-4xl">
                                        <span className="text-red-600">
                                            {slide.title.split(' ')[0]}
                                        </span>{' '}
                                        <span className="text-red-600">
                                            {slide.title.split(' ')[1]}
                                        </span>{' '}
                                        {slide.title
                                            .split(' ')
                                            .slice(2)
                                            .join(' ')}
                                    </h2>

                                    {/* Description */}
                                    <p className="mb-6 max-w-3xl text-base leading-relaxed text-white/90 drop-shadow-md md:text-lg">
                                        {slide.description}
                                    </p>

                                    {/* CTA Button */}
                                    <div>
                                        <button className="inline-flex transform items-center gap-3 rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl">
                                            Detaylı Bilgi
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
