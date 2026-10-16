import React, { useState } from 'react';
import { Experience } from '../../types/experience';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { HostStoryModal } from './HostStoryModal';
import { VirtualTour360 } from '../common/VirtualTour360';
import { Users, MapPin, Clock, Heart, Sparkles, Compass } from 'lucide-react';

interface LocalExperienceCardProps {
  experience: Experience;
}

export const LocalExperienceCard: React.FC<LocalExperienceCardProps> = ({ experience }) => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [tour360Open, setTour360Open] = useState(false);

  const title = language === 'es' ? experience.titleEs : experience.titleEn;
  const shortDesc = language === 'es' ? experience.shortDescriptionEs : experience.shortDescriptionEn;

  return (
    <>
      <div
        onClick={() => navigate(`/experiencias/${experience.slug}`)}
        className="group bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
      >
        {/* Media */}
        <div className="relative h-60 bg-slate-900 overflow-hidden">
          <img
            src={experience.images[0]}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-xs">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Experiencia local' : 'Local experience'}</span>
            </span>

            {(experience.has360 || experience.virtualTour360Url) && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setTour360Open(true);
                }}
                className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-amber-400/30 flex items-center gap-1 hover:bg-black/85 transition-colors cursor-pointer"
                title={language === 'es' ? 'Abrir imagen 360° interactiva' : 'Open interactive 360° image'}
              >
                <Compass className="w-3 h-3 text-amber-400" />
                <span>{language === 'es' ? 'Explorar 360°' : 'Explore 360°'}</span>
              </button>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[11px] font-mono text-emerald-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{experience.location}</span>
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
              {shortDesc}
            </p>

            {/* Host Callout */}
            {experience.hostStory && (
              <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 truncate">
                  {language === 'es' ? 'Anfitrión:' : 'Host:'} <strong className="text-slate-800">{experience.hostStory.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true);
                  }}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-900 underline shrink-0 ml-2"
                >
                  {language === 'es' ? 'Conoce su historia' : 'Meet the host'}
                </button>
              </div>
            )}
          </div>

          {/* Footer with price */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-neutral-400 block">{language === 'es' ? 'Desde' : 'From'}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold font-mono text-slate-900">
                  ${experience.price}
                </span>
                <span className="text-xs text-neutral-500">USD / {language === 'es' ? 'pers.' : 'person'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/experiencias/${experience.slug}`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              {language === 'es' ? 'Ver experiencia' : 'View experience'}
            </button>
          </div>
        </div>
      </div>

      {experience.hostStory && (
        <HostStoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          hostStory={experience.hostStory}
          experienceTitle={title}
        />
      )}

      <VirtualTour360
        isOpen={tour360Open}
        onClose={() => setTour360Open(false)}
        title={title}
        locationName={experience.location}
        imageSrc={experience.virtualTour360Url || experience.images[0]}
      />
    </>
  );
};
