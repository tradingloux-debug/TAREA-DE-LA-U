import React from 'react';
import { ArrowRight, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import expJuayua from '../../assets/images/exp_juayua_chorros_calera.jpg';
import expElImposible from '../../assets/images/exp_el_imposible_piedra_sellada.jpg';
import expRioSapo from '../../assets/images/exp_rio_sapo_morazan.jpg';

const concepts = [
  {
    image: expJuayua,
    location: 'Juayúa · Apaneca · Ataco',
    titleEs: 'Ruta de las Flores a tu ritmo',
    titleEn: 'Ruta de las Flores at your pace',
    descriptionEs: 'Un circuito en diseño que combinará pueblos, gastronomía, café y naturaleza.',
    descriptionEn: 'A route in development combining colorful towns, food, coffee, and nature.',
  },
  {
    image: expElImposible,
    location: 'Ahuachapán',
    titleEs: 'El Imposible: bosque y aventura',
    titleEn: 'El Imposible: forest and adventure',
    descriptionEs: 'Una propuesta de naturaleza para viajeros que buscan senderos y paisajes remotos.',
    descriptionEn: 'A nature concept for travelers seeking trails and remote landscapes.',
  },
  {
    image: expRioSapo,
    location: 'Perquín · Río Sapo, Morazán',
    titleEs: 'Oriente auténtico',
    titleEn: 'Authentic eastern El Salvador',
    descriptionEs: 'Historia local, montaña y aguas cristalinas en una futura ruta por Morazán.',
    descriptionEn: 'Local history, mountains, and clear waters in a future Morazán route.',
  },
];

export const UpcomingExperiencesSection: React.FC = () => {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  return (
    <section className="py-20 sm:py-24 bg-[#063A5B] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold font-mono uppercase tracking-wide text-[#FDBA2D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Nuevas experiencias' : 'New experiences'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display">
              {language === 'es' ? 'Lo próximo de GIA' : 'Coming next from GIA'}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {language === 'es'
                ? 'Estamos diseñando estas experiencias con aliados locales. Los precios, fechas e inclusiones se publicarán después de verificarlos con cada operador.'
                : 'We are designing these experiences with local partners. Prices, dates, and inclusions will be published after verification with each operator.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/contacto')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDBA2D] px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-[#f5b124] self-start lg:self-auto"
          >
            {language === 'es' ? 'Solicitar información' : 'Request information'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <article key={concept.location} className="group overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-sm">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={concept.image}
                  alt={language === 'es' ? concept.titleEs : concept.titleEn}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063A5B]/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-[#063A5B] shadow-sm">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {language === 'es' ? 'Próximamente' : 'Coming soon'}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7FE1DA]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{concept.location}</span>
                </div>
                <h3 className="text-xl font-extrabold font-display">
                  {language === 'es' ? concept.titleEs : concept.titleEn}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {language === 'es' ? concept.descriptionEs : concept.descriptionEn}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
