import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Sparkles, Calendar, Users, Compass, DollarSign, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HomeTripPlannerSection: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();

  const previewQuestions = [
    {
      icon: <Calendar className="w-4 h-4 text-[#FDBA2D]" />,
      qEs: '¿Cuántos días estarás en El Salvador?',
      qEn: 'How many days will you spend in El Salvador?',
      hintEs: '1 a 15 días',
      hintEn: '1 to 15 days',
    },
    {
      icon: <Users className="w-4 h-4 text-[#00A6A6]" />,
      qEs: '¿Con quién viajas?',
      qEn: 'Who are you traveling with?',
      hintEs: 'Solo, pareja, familia o amigos',
      hintEn: 'Solo, couple, family or friends',
    },
    {
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      qEs: '¿Qué tipo de experiencias te interesan?',
      qEn: 'What type of experiences interest you?',
      hintEs: 'Volcanes, surf, café, cultura...',
      hintEn: 'Volcanoes, surf, coffee, culture...',
    },
    {
      icon: <DollarSign className="w-4 h-4 text-amber-400" />,
      qEs: '¿Cuál es tu presupuesto aproximado?',
      qEn: 'What is your approximate budget?',
      hintEs: 'Económico, equilibrado o boutique',
      hintEn: 'Budget, balanced or boutique',
    },
    {
      icon: <MapPin className="w-4 h-4 text-cyan-400" />,
      qEs: '¿Qué zonas quieres conocer?',
      qEn: 'Which areas do you want to explore?',
      hintEs: 'Occidente, Costa Pacífico, Oriente...',
      hintEn: 'West, Pacific Coast, East...',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#F7F4ED] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#063A5B] via-[#054970] to-[#04283f] rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          {/* Decorative ambient lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A6A6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDBA2D]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, intro & Main CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#FDBA2D] text-xs font-bold font-mono tracking-wider border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
                <span>{loc('Planificador Personalizado', 'Custom Trip Planner')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display leading-[1.14]">
                {loc('Diseña tu experiencia en El Salvador', 'Design your experience in El Salvador')}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {loc(
                  'Cuéntanos tu tiempo, intereses y estilo de viaje. Combinamos destinos auténticos, transporte privado con conductor y actividades guiadas en una propuesta hecha a tu medida.',
                  'Tell us your dates, interests, and travel style. We combine authentic destinations, private transport with driver, and guided activities into a proposal tailored just for you.'
                )}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/planea-con-gia')}
                  className="px-8 py-4 bg-[#FDBA2D] hover:bg-[#ffc64a] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{loc('Diseña tu experiencia', 'Design your experience')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual 5 Questions Card */}
            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <span className="text-xs font-bold text-[#FDBA2D] uppercase font-mono tracking-wider">
                  {loc('Respondemos tus 5 preguntas clave:', 'We answer your 5 key questions:')}
                </span>
                <span className="text-[10px] text-slate-300 font-mono">100% {loc('personalizado', 'tailored')}</span>
              </div>

              <div className="space-y-2.5">
                {previewQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate('/planea-con-gia')}
                    className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center shrink-0">
                        {q.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FDBA2D] transition-colors">
                          {loc(q.qEs, q.qEn)}
                        </p>
                        <p className="text-[11px] text-slate-300 font-medium">
                          {loc(q.hintEs, q.hintEn)}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-1 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
