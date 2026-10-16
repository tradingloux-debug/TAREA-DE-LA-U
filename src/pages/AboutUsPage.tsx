import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Award,
  Lightbulb,
  HeartHandshake,
  CheckCircle,
  Gem,
  ArrowRight,
  MapPin,
  Users,
  Mountain,
} from 'lucide-react';

import heroCoatepeque from '../assets/images/hero_coatepeque_el_salvador_1791258093926.jpg';
import expSuchitoto from '../assets/images/exp_culture_suchitoto_1791258103725.jpg';
import expCoffee from '../assets/images/exp_coffee_apaneca_1791258112096.jpg';
import fotoFundadoras from '../assets/images/foto_fundadoras_gia.png';

export const AboutUsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language, loc } = useLanguage();
  const l = (es: string, en: string, pt?: string) => loc(es, en, pt);

  const values = [
    {
      titleEs: 'RESPONSABILIDAD',
      titleEn: 'RESPONSIBILITY',
      titlePt: 'RESPONSABILIDADE',
      descEs: 'Actuar de manera responsable con los clientes, aliados y destinos turísticos.',
      descEn: 'Act responsibly with travelers, local partners, and travel destinations.',
      descPt: 'Atuar com responsabilidade com clientes, parceiros e destinos turísticos.',
      icon: ShieldCheck,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      titleEs: 'CALIDAD',
      titleEn: 'QUALITY',
      titlePt: 'QUALIDADE',
      descEs: 'Ofrecer experiencias que cumplan con las expectativas de los clientes.',
      descEn: 'Deliver curated travel experiences that meet and exceed traveler expectations.',
      descPt: 'Oferecer experiências que atendam e superem as expectativas dos clientes.',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      titleEs: 'INNOVACIÓN',
      titleEn: 'INNOVATION',
      titlePt: 'INOVAÇÃO',
      descEs: 'Buscar nuevas formas de crear y presentar experiencias turísticas.',
      descEn: 'Pioneer creative ways to design, present, and personalize authentic tourism.',
      descPt: 'Buscar novas formas de criar e apresentar experiências turísticas.',
      icon: Lightbulb,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
    {
      titleEs: 'RESPETO',
      titleEn: 'RESPECT',
      titlePt: 'RESPEITO',
      descEs: 'Valorar a las personas, comunidades, culturas y espacios naturales.',
      descEn: 'Deeply value host communities, culture, traditions, and natural environments.',
      descPt: 'Valorizar as pessoas, comunidades, culturas e espaços naturais.',
      icon: HeartHandshake,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      titleEs: 'COMPROMISO',
      titleEn: 'COMMITMENT',
      titlePt: 'COMPROMISSO',
      descEs: 'Cumplir con lo ofrecido y brindar una atención adecuada al cliente.',
      descEn: 'Deliver faithfully on promises with responsive, dedicated customer support.',
      descPt: 'Cumprir com o oferecido e oferecer um atendimento dedicado ao cliente.',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      titleEs: 'AUTENTICIDAD',
      titleEn: 'AUTHENTICITY',
      titlePt: 'AUTENTICIDADE',
      descEs: 'Promover experiencias que permitan conocer la esencia y diversidad de El Salvador.',
      descEn: 'Promote true encounters that unveil the authentic soul and diversity of El Salvador.',
      descPt: 'Promover experiências que revelem a essência e diversidade de El Salvador.',
      icon: Gem,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
  ];

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: l('Quiénes somos', 'About us', 'Quem somos') },
            ]}
            backAction={{
              label: l('← Volver al inicio', '← Back to Home', '← Voltar ao início'),
              path: '/',
            }}
          />
        </div>
      </div>

      {/* Hero Visual Section */}
      <section className="relative bg-[#063A5B] text-white overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src={heroCoatepeque}
            alt="El Salvador paisajes"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#063A5B] via-[#063A5B]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FDBA2D] text-xs font-mono font-bold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{l('El Salvador diseñado para ti', 'El Salvador, designed for you', 'El Salvador desenhado para você')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight max-w-3xl leading-tight">
            {l('Conoce GIA Experiences', 'About GIA Experiences', 'Conheça a GIA Experiences')}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl leading-relaxed font-light">
            {l(
              'GIA Experiences es una tour operadora salvadoreña enfocada en diseñar experiencias que permitan descubrir El Salvador de una manera personalizada, cercana y diferente.',
              'GIA Experiences is a Salvadoran tour operator dedicated to crafting travel experiences that reveal El Salvador in a personalized, immersive, and distinctive way.',
              'A GIA Experiences é uma operadora de turismo salvadorenha focada em criar experiências que permitam descobrir El Salvador de forma personalizada, autêntica e diferenciada.'
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Misión y Visión */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misión */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#00A6A6] text-xs font-mono font-extrabold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>{l('Nuestra Misión', 'Our Mission', 'Nossa Missão')}</span>
            </div>
            <h2 className="text-2xl font-black text-[#063A5B] font-display">
              {l('MISIÓN', 'MISSION', 'MISSÃO')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
              "{l(
                'Brindar experiencias turísticas personalizadas que permitan a las personas descubrir, disfrutar y conectar con los diferentes destinos y atractivos de El Salvador, ofreciendo opciones adaptadas a sus intereses.',
                'To provide personalized tourism experiences that enable travelers to discover, enjoy, and connect with the diverse destinations and attractions of El Salvador, offering options tailored to their interests.',
                'Proporcionar experiências turísticas personalizadas que permitam aos viajantes descobrir, desfrutar e se conectar com os diferentes destinos e atrativos de El Salvador, com opções adaptadas aos seus interesses.'
              )}"
            </p>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#F47B3A] text-xs font-mono font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{l('Nuestra Visión', 'Our Vision', 'Nossa Visão')}</span>
            </div>
            <h2 className="text-2xl font-black text-[#063A5B] font-display">
              {l('VISIÓN', 'VISION', 'VISÃO')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
              "{l(
                'Ser una marca turística reconocida en El Salvador por ofrecer experiencias innovadoras, personalizadas y de calidad, que motiven a las personas a descubrir y disfrutar el país de una manera diferente.',
                'To be a renowned tourism brand in El Salvador recognized for delivering innovative, personalized, and high-quality experiences that inspire people to discover and enjoy the country in a truly unique way.',
                'Ser uma marca de turismo reconhecida em El Salvador por oferecer experiências inovadoras, personalizadas e de qualidade, que motivem as pessoas a descobrir e desfrutar do país de uma maneira diferente.'
              )}"
            </p>
          </div>
        </section>

        {/* Sección destacada: Nuestras Fundadoras (Foto de las fundadoras de GIA) */}
        <section className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs hover:shadow-md transition-all relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Foto de las fundadoras de GIA - Encuadre limpio, completo y sin recortes */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 sm:border-8 border-white bg-white group ring-1 ring-neutral-200/80">
                <img
                  src={fotoFundadoras}
                  alt={l('Foto de las fundadoras de GIA Experiences', 'Founders of GIA Experiences', 'Foto das fundadoras da GIA Experiences')}
                  className="w-full h-auto aspect-[4/3] object-contain sm:object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>

              {/* Pie de foto limpio debajo de la imagen (sin obstruir nada de la fotografía) */}
              <div className="mt-3.5 flex items-center justify-between px-2 text-xs text-neutral-500">
                <span className="font-semibold text-[#063A5B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
                  {l('Fundadoras de GIA Experiences', 'Founders of GIA Experiences', 'Fundadoras da GIA Experiences')}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  El Salvador
                </span>
              </div>
            </div>

            {/* Texto de las fundadoras y visión */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#F47B3A] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
                <span>{l('Liderazgo & Emprendimiento', 'Leadership & Vision', 'Liderança & Empreendedorismo')}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight leading-tight">
                {l('Fundadoras de GIA Experiences', 'Founders of GIA Experiences', 'Fundadoras da GIA Experiences')}
              </h2>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                {l(
                  'GIA Experiences nace de una convicción compartida: El Salvador posee una riqueza natural, cultural y humana incomparable que merece ser vivida de forma auténtica, cercana y con los más altos estándares de calidad y servicio.',
                  'GIA Experiences was born from a shared conviction: El Salvador holds unmatched natural, cultural, and human richness that deserves to be experienced authentically, closely, and with the highest quality standards.',
                  'A GIA Experiences nasce de uma convicção compartilhada: El Salvador possui uma riqueza natural, cultural e humana incomparável que merece ser vivida de forma autêntica, próxima e com os mais altos padrões de qualidade e serviço.'
                )}
              </p>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                {l(
                  'Como fundadoras salvadoreñas, diseñamos cada experiencia con la mirada de quienes aman profundamente a su país y desean conectar a cada viajero con la esencia de nuestras comunidades, nuestros artesanos y nuestros paisajes más impresionantes.',
                  'As Salvadoran founders, we design every journey with the passion of those who deeply love their country, connecting each traveler with the authentic spirit of our communities, artisans, and breathtaking landscapes.',
                  'Como fundadoras salvadorenhas, desenhamos cada experiência com o olhar de quem ama profundamente seu país e deseja conectar cada viajante com a essência de nossas comunidades, nossos artesãos e nossas paisagens mais impressionantes.'
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#063A5B] font-bold text-xs">
                    <Award className="w-4 h-4 text-[#FDBA2D] shrink-0" />
                    <span>{l('Excelencia & Atención', 'Excellence & Care', 'Excelência & Cuidado')}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {l(
                      'Diseño meticuloso de itinerarios con atención personalizada antes, durante y después del recorrido.',
                      'Meticulous itinerary planning with dedicated support before, during, and after each journey.',
                      'Planejamento meticuloso de itinerários com suporte personalizado antes, durante e após a viagem.'
                    )}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#00A6A6] font-bold text-xs">
                    <HeartHandshake className="w-4 h-4 shrink-0" />
                    <span>{l('Impacto Positivo Local', 'Positive Local Impact', 'Impacto Positivo Local')}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {l(
                      'Alianzas justas y directas con familias anfitrionas, cooperativas de café y comunidades locales.',
                      'Fair, direct partnerships with host families, coffee cooperatives, and local communities.',
                      'Parcerias justas e diretas com famílias anfitriãs, cooperativas de café e comunidades locais.'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/experiencias')}
                  className="px-6 py-3 bg-[#063A5B] hover:bg-[#00A6A6] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>{l('Explorar experiencias', 'Explore experiences', 'Explorar experiências')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/contacto')}
                  className="px-5 py-3 border border-neutral-300 hover:border-[#00A6A6] text-[#063A5B] hover:text-[#00A6A6] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  <span>{l('Hablar con un asesor', 'Talk with an advisor', 'Falar com um consultor')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Valores */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-mono font-bold uppercase tracking-wider">
              <Gem className="w-3.5 h-3.5" />
              <span>{l('Principios que nos guían', 'Core Principles', 'Princípios que nos guiam')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight">
              {l('Nuestros valores', 'Our Values', 'Nossos valores')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              {l(
                'Pilares que sustentan cada ruta, encuentro comunitario y momento que diseñamos.',
                'Foundational pillars supporting every tour route, community connection, and experience we design.',
                'Pilares que sustentam cada rota, encontro comunitário e momento que planejamos.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md transition-all space-y-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#063A5B] font-display tracking-wide">
                    {l(val.titleEs, val.titleEn, val.titlePt)}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    "{l(val.descEs, val.descEn, val.descPt)}"
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cómo queremos que descubras El Salvador */}
        <section className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#00A6A6] text-xs font-mono font-bold uppercase">
                <Mountain className="w-3.5 h-3.5" />
                <span>{l('Turismo Auténtico y Responsable', 'Authentic & Responsible Tourism', 'Turismo Autêntico e Responsável')}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight leading-tight">
                {l(
                  'Cómo queremos que descubras El Salvador',
                  'How we want you to experience El Salvador',
                  'Como queremos que você descubra El Salvador'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {l(
                  'En GIA Experiences no creemos en itinerarios masivos ni rígidos. Creemos en el valor de los encuentros humanos, el respeto profundo por las comunidades anfitrionas y la riqueza inagotable de nuestra geografía: desde el pacífico oleaje de la costa hasta las cumbres de los volcanes y los pueblos con tradición viva.',
                  'At GIA Experiences, we do not believe in cookie-cutter mass tourism. We celebrate real human connections, deep respect for host communities, and the boundless beauty of our land—from Pacific waves to volcano rims and heritage mountain towns.',
                  'Na GIA Experiences não acreditamos em itinerários massivos ou rígidos. Acreditamos no valor das conexões humanas, no respeito profundo pelas comunidades anfitriãs e na riqueza inesgotável da nossa geografia: das ondas do Pacífico aos picos dos vulcões e cidades com tradições vivas.'
                )}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {l(
                  'Como tour operadora, coordinamos cada detalle logístico, de transporte, seguridad y acompañamiento local para que tu única preocupación sea disfrutar, aprender y conectar.',
                  'As an authorized tour operator, we coordinate all logistics, transport, security, and local guidance so your only task is to enjoy, explore, and connect.',
                  'Como operadora de turismo, coordenamos cada detalhe logístico, transporte, segurança e acompanhamento local para que sua única preocupação seja aproveitar, aprender e se conectar.'
                )}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src={expSuchitoto}
                alt="Suchitoto colonial"
                className="w-full h-44 object-cover rounded-2xl shadow-xs"
              />
              <img
                src={expCoffee}
                alt="Cafetales de Apaneca"
                className="w-full h-44 object-cover rounded-2xl shadow-xs mt-4"
              />
            </div>
          </div>
        </section>

        {/* Dual CTAs Final */}
        <section className="bg-gradient-to-r from-[#063A5B] via-[#04283f] to-[#063A5B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              {l('¿Listo para descubrir El Salvador?', 'Ready to discover El Salvador?', 'Pronto para descobrir El Salvador?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {l(
                'Elige entre nuestras experiencias individuales curadas o utiliza nuestra herramienta inteligente para diseñar tu viaje a medida.',
                'Choose from our curated individual experiences or use our smart trip planner to design your custom itinerary.',
                'Escolha entre nossas experiências individuais selecionadas ou use nossa ferramenta inteligente para planejar sua viagem sob medida.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => navigate('/experiencias')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{l('Descubre nuestras experiencias', 'Explore our experiences', 'Descubra nossas experiências')}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/planea-con-gia')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FDBA2D] hover:bg-[#f5b124] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{l('Planea tu viaje', 'Plan your trip', 'Planeje sua viagem')}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
