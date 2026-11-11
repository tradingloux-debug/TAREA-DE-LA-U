import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../services/analytics';
import { GiaLogo } from '../components/common/GiaLogo';
import { ArrowRight, Compass, Sparkles, MapPin, Route, Heart, Wand2 } from 'lucide-react';

// Authentic representative imagery of El Salvador for the 3 main visual pillars
import routeImg from '../assets/images/route_costa_volcanes_1791259922631.jpg';
import expImg from '../assets/images/exp_nature_santa_ana_1791258129967.jpg';
import plannerImg from '../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    trackEvent('home_view');
  }, []);

  const content = {
    es: {
      slogan: 'Descubre El Salvador a tu manera',
      subtitle: 'Elige cómo deseas comenzar tu viaje',
      cards: [
        {
          id: 'rutas',
          path: '/rutas',
          title: 'RUTAS',
          description: 'Descubre El Salvador con itinerarios diseñados para ti.',
          buttonText: 'Explorar rutas',
          image: routeImg,
          tagline: 'Itinerarios de 2 a 5 días con transporte',
          theme: 'rutas',
          accentColor: '#00B8C8',
          secondaryColor: '#173B59',
          btnBg: 'bg-[#00B8C8] hover:bg-[#009FAE]',
          btnShadow: 'shadow-[#00B8C8]/25',
          tagBg: 'bg-[#00B8C8]/15 text-[#007C87] border-[#00B8C8]/30',
          hoverBorder: 'hover:border-[#00B8C8]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#00B8C8]',
          Icon: Route,
        },
        {
          id: 'experiencias',
          path: '/experiencias',
          title: 'EXPERIENCIAS',
          description: 'Vive la cultura, naturaleza y aventura de El Salvador.',
          buttonText: 'Explorar experiencias',
          image: expImg,
          tagline: 'Cultura, volcanes, gastronomía y surf',
          theme: 'experiencias',
          accentColor: '#FF6B57',
          secondaryColor: '#FFC857',
          btnBg: 'bg-[#FF6B57] hover:bg-[#E85541]',
          btnShadow: 'shadow-[#FF6B57]/25',
          tagBg: 'bg-[#FF6B57]/15 text-[#C93B28] border-[#FF6B57]/30',
          hoverBorder: 'hover:border-[#FF6B57]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#FFC857]',
          Icon: Sparkles,
        },
        {
          id: 'crea-con-gia',
          path: '/planea-con-gia',
          title: 'CREA CON GIA',
          description: 'Diseña tu viaje según tus gustos y preferencias.',
          buttonText: 'Crear mi viaje',
          image: plannerImg,
          tagline: 'Personalización a tu medida en pocos pasos',
          theme: 'crea-con-gia',
          accentColor: '#39B98A',
          secondaryColor: '#00B8C8',
          btnBg: 'bg-[#39B98A] hover:bg-[#2FA075]',
          btnShadow: 'shadow-[#39B98A]/25',
          tagBg: 'bg-[#39B98A]/15 text-[#1B6D4C] border-[#39B98A]/30',
          hoverBorder: 'hover:border-[#39B98A]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#39B98A]',
          Icon: Wand2,
        },
      ],
    },
    en: {
      slogan: 'Discover El Salvador your way',
      subtitle: 'Choose how you wish to begin your journey',
      cards: [
        {
          id: 'rutas',
          path: '/rutas',
          title: 'ROUTES',
          description: 'Discover El Salvador with itineraries designed for you.',
          buttonText: 'Explore routes',
          image: routeImg,
          tagline: '2 to 5-day itineraries with private transport',
          theme: 'rutas',
          accentColor: '#00B8C8',
          secondaryColor: '#173B59',
          btnBg: 'bg-[#00B8C8] hover:bg-[#009FAE]',
          btnShadow: 'shadow-[#00B8C8]/25',
          tagBg: 'bg-[#00B8C8]/15 text-[#007C87] border-[#00B8C8]/30',
          hoverBorder: 'hover:border-[#00B8C8]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#00B8C8]',
          Icon: Route,
        },
        {
          id: 'experiencias',
          path: '/experiencias',
          title: 'EXPERIENCES',
          description: 'Experience the culture, nature, and adventure of El Salvador.',
          buttonText: 'Explore experiences',
          image: expImg,
          tagline: 'Culture, volcanoes, cuisine, and surf',
          theme: 'experiencias',
          accentColor: '#FF6B57',
          secondaryColor: '#FFC857',
          btnBg: 'bg-[#FF6B57] hover:bg-[#E85541]',
          btnShadow: 'shadow-[#FF6B57]/25',
          tagBg: 'bg-[#FF6B57]/15 text-[#C93B28] border-[#FF6B57]/30',
          hoverBorder: 'hover:border-[#FF6B57]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#FFC857]',
          Icon: Sparkles,
        },
        {
          id: 'crea-con-gia',
          path: '/planea-con-gia',
          title: 'CREATE WITH GIA',
          description: 'Design your trip according to your tastes and preferences.',
          buttonText: 'Create my trip',
          image: plannerImg,
          tagline: 'Tailor-made personalization in a few simple steps',
          theme: 'crea-con-gia',
          accentColor: '#39B98A',
          secondaryColor: '#00B8C8',
          btnBg: 'bg-[#39B98A] hover:bg-[#2FA075]',
          btnShadow: 'shadow-[#39B98A]/25',
          tagBg: 'bg-[#39B98A]/15 text-[#1B6D4C] border-[#39B98A]/30',
          hoverBorder: 'hover:border-[#39B98A]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#39B98A]',
          Icon: Wand2,
        },
      ],
    },
    pt: {
      slogan: 'Descubra El Salvador do seu jeito',
      subtitle: 'Escolha como deseja começar sua viagem',
      cards: [
        {
          id: 'rutas',
          path: '/rutas',
          title: 'ROTAS',
          description: 'Descubra El Salvador com itinerários desenhados para você.',
          buttonText: 'Explorar rotas',
          image: routeImg,
          tagline: 'Roteiros de 2 a 5 dias com transporte privado',
          theme: 'rutas',
          accentColor: '#00B8C8',
          secondaryColor: '#173B59',
          btnBg: 'bg-[#00B8C8] hover:bg-[#009FAE]',
          btnShadow: 'shadow-[#00B8C8]/25',
          tagBg: 'bg-[#00B8C8]/15 text-[#007C87] border-[#00B8C8]/30',
          hoverBorder: 'hover:border-[#00B8C8]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#00B8C8]',
          Icon: Route,
        },
        {
          id: 'experiencias',
          path: '/experiencias',
          title: 'EXPERIÊNCIAS',
          description: 'Viva a cultura, natureza e aventura de El Salvador.',
          buttonText: 'Explorar experiências',
          image: expImg,
          tagline: 'Cultura, vulcões, gastronomia e surfe',
          theme: 'experiencias',
          accentColor: '#FF6B57',
          secondaryColor: '#FFC857',
          btnBg: 'bg-[#FF6B57] hover:bg-[#E85541]',
          btnShadow: 'shadow-[#FF6B57]/25',
          tagBg: 'bg-[#FF6B57]/15 text-[#C93B28] border-[#FF6B57]/30',
          hoverBorder: 'hover:border-[#FF6B57]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#FFC857]',
          Icon: Sparkles,
        },
        {
          id: 'crea-con-gia',
          path: '/planea-con-gia',
          title: 'CRIE COM GIA',
          description: 'Planeje sua viagem de acordo com seus gostos e preferências.',
          buttonText: 'Criar minha viagem',
          image: plannerImg,
          tagline: 'Personalização sob medida em poucos passos',
          theme: 'crea-con-gia',
          accentColor: '#39B98A',
          secondaryColor: '#00B8C8',
          btnBg: 'bg-[#39B98A] hover:bg-[#2FA075]',
          btnShadow: 'shadow-[#39B98A]/25',
          tagBg: 'bg-[#39B98A]/15 text-[#1B6D4C] border-[#39B98A]/30',
          hoverBorder: 'hover:border-[#39B98A]',
          topBadgeBg: 'bg-[#173B59]/75 text-[#39B98A]',
          Icon: Wand2,
        },
      ],
    },
  }[language] || {
    slogan: 'Descubre El Salvador a tu manera',
    subtitle: 'Elige cómo deseas comenzar tu viaje',
    cards: [],
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#FFFDF8] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative overflow-hidden">
      {/* Decorative tropical ambient warmth glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FFC857]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00B8C8]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full space-y-10 sm:space-y-12">
        {/* ============================================================ */}
        {/* 1. CABECERA LIMPIA: LOGO DE GIA EXPERIENCES Y ESLOGAN        */}
        {/* ============================================================ */}
        <header className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto animate-in fade-in duration-300">
          <div className="flex justify-center items-center">
            <GiaLogo size="xl" className="drop-shadow-xs" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#173B59] tracking-tight font-display">
              “{content.slogan}”
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-medium">
              {content.subtitle}
            </p>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. MENÚ PRINCIPAL: TRES TARJETAS VISUALES COLOR-CODED        */}
        {/* ============================================================ */}
        <section
          aria-label={language === 'es' ? 'Menú principal de opciones de viaje' : 'Main travel navigation menu'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
        >
          {content.cards.map((card) => {
            const { Icon } = card;
            return (
              <article
                key={card.id}
                onClick={() => navigate(card.path)}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-amber-100/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5 ${card.hoverBorder}`}
              >
                {/* Imagen representativa de alta calidad */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#173B59]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="eager"
                  />
                  {/* Degradado luminoso y legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173B59]/90 via-[#173B59]/30 to-transparent" />

                  {/* Subtítulo / etiqueta breve superior */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 ${card.topBadgeBg}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{card.tagline}</span>
                    </span>
                  </div>

                  {/* Título en la parte inferior de la imagen */}
                  <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight drop-shadow-md">
                      {card.title}
                    </h2>
                  </div>
                </div>

                {/* Contenido descriptivo breve y botón de acción */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6 bg-white">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(card.path);
                    }}
                    className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${card.btnShadow} ${card.btnBg} active:scale-98`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};
