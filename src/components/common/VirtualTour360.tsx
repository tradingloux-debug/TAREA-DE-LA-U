import React, { useEffect } from 'react';
import { X, Compass, ArrowLeft } from 'lucide-react';
import { trackEvent } from '../../services/analytics';
import { Interactive360Viewer } from './Interactive360Viewer';
import { useLanguage } from '../../context/LanguageContext';

interface VirtualTour360Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  locationName: string;
  imageSrc: string;
}

export const VirtualTour360: React.FC<VirtualTour360Props> = ({
  isOpen,
  onClose,
  title,
  locationName,
  imageSrc,
}) => {
  const { language } = useLanguage();
  useEffect(() => {
    if (isOpen) {
      trackEvent('virtual_tour_opened', { title, locationName });
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, title, locationName, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'es' ? `Visor 360 de ${title}` : `360° viewer for ${title}`}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col select-none animate-in fade-in duration-200"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between text-white pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            aria-label={language === 'es' ? 'Volver' : 'Back'}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'es' ? 'Volver' : 'Back'}</span>
          </button>
          <div className="w-px h-5 bg-white/20 hidden sm:block" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-teal-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Modo pantalla completa · 360°' : 'Full-screen mode · 360°'}</span>
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
              {title}
            </h3>
            {locationName && (
              <p className="text-xs text-slate-400">{locationName}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer hover:scale-105"
          aria-label={language === 'es' ? 'Cerrar visor 360' : 'Close 360° viewer'}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Fullscreen Viewer */}
      <div className="flex-1 w-full h-full relative">
        <Interactive360Viewer
          imageSrc={imageSrc}
          title={title}
          locationName={locationName}
          className="w-full h-full rounded-none border-0"
          isExpanded={true}
          onExpand={onClose}
        />
      </div>
    </div>
  );
};
