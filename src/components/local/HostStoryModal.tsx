import React from 'react';
import { HostStory } from '../../types/experience';
import { useLanguage } from '../../context/LanguageContext';
import { X, Heart, Users, Sparkles } from 'lucide-react';

interface HostStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostStory: HostStory;
  experienceTitle: string;
}

export const HostStoryModal: React.FC<HostStoryModalProps> = ({
  isOpen,
  onClose,
  hostStory,
  experienceTitle,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const story = language === 'es' ? hostStory.storyEs : hostStory.storyEn;
  const impact = language === 'es' ? hostStory.impactEs : hostStory.impactEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-teal-300 uppercase tracking-wider block">
                Anfitriones Locales
              </span>
              <h3 className="text-base font-bold font-display">{hostStory.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              {hostStory.community}
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              Historia y vocación de la comunidad
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {story}
            </p>
          </div>

          {/* Social and community impact */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Cómo contribuye tu visita</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {impact}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
