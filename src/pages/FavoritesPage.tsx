import React, { useState } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { ExperienceCard } from '../components/experiences/ExperienceCard';
import { useBookingDraft } from '../context/BookingDraftContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { BackButton } from '../components/common/BackButton';
import {
  Heart,
  Compass,
  ArrowRight,
  Trash2,
  Sparkles,
  LayoutGrid,
  List,
  BookmarkCheck,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const { favorites, toggleFavorite } = useBookingDraft();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter experiences that are in the favorites list
  const favoriteExperiences = DEMO_EXPERIENCES.filter((exp) =>
    favorites.includes(exp.id)
  );

  const handleClearAll = () => {
    if (
      window.confirm(
        language === 'es'
          ? '¿Estás seguro de que deseas eliminar todas las experiencias de tus favoritos?'
          : 'Are you sure you want to remove all experiences from your favorites?'
      )
    ) {
      favorites.forEach((id) => toggleFavorite(id));
    }
  };

  return (
    <div className="bg-neutral-50/70 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <div>
          <BackButton
            fallbackPath="/experiencias"
            label={language === 'es' ? 'Volver a explorar experiencias' : 'Back to explore experiences'}
          />
        </div>

        {/* Header Breadcrumbs / Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00A6A6] mb-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{language === 'es' ? 'Colección Personal' : 'Personal Collection'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#063A5B] tracking-tight font-display">
              {language === 'es' ? 'Mis Experiencias Favoritas' : 'My Favorite Experiences'}
            </h1>
            <p className="text-sm text-neutral-600 mt-1.5 max-w-2xl">
              {language === 'es'
                ? 'Todas las experiencias y recorridos que guardaste tocando el icono de corazón. Puedes reservarlas automáticamente en cualquier momento.'
                : 'All experiences and tours you saved by tapping the heart icon. You can automatically reserve them anytime.'}
            </p>
          </div>

          {/* Actions & Stats */}
          {favoriteExperiences.length > 0 && (
            <div className="flex items-center gap-3 self-start md:self-end">
              {/* View mode toggle */}
              <div className="flex items-center bg-white rounded-xl border border-neutral-200 p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-neutral-100 text-[#063A5B] font-bold'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  title={language === 'es' ? 'Cuadrícula' : 'Grid'}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-neutral-100 text-[#063A5B] font-bold'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  title={language === 'es' ? 'Lista' : 'List'}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Clear button */}
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200/80 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Vaciar lista' : 'Clear all'}</span>
              </button>
            </div>
          )}
        </div>

        {/* 24-Hour and instant reservation banner */}
        <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-indigo-50/60 rounded-2xl border border-teal-200/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-2">
                <span>{language === 'es' ? '¿Listo para reservar?' : 'Ready to reserve?'}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-teal-200/80 text-teal-900">
                  <Clock className="w-3 h-3" />
                  {language === 'es' ? '24h para pagar 100%' : '24h to pay 100%'}
                </span>
              </p>
              <p className="text-xs text-neutral-600 mt-0.5 max-w-2xl leading-relaxed">
                {language === 'es'
                  ? 'Al hacer clic en "Reservar", tu cupo queda asegurado al instante. Tendrás una ventana de 24 horas para realizar el pago del 100% mediante tarjeta, Wompi o transferencia bancaria.'
                  : 'Clicking "Reserve" secures your spot instantly. You have a 24-hour window to complete the 100% payment by credit card, Wompi, or bank transfer.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/experiencias')}
            className="self-start sm:self-center px-4 py-2 bg-white hover:bg-neutral-50 text-[#063A5B] border border-neutral-200 font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span>{language === 'es' ? 'Explorar más tours' : 'Explore more tours'}</span>
          </button>
        </div>

        {/* Content list or Empty State */}
        {favoriteExperiences.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-14 text-center max-w-xl mx-auto space-y-5 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#063A5B]">
                {language === 'es'
                  ? 'Aún no has guardado favoritos'
                  : 'You have no saved favorites yet'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Explora nuestros recorridos, rutas y aventuras. Toca el ícono del corazón ❤️ en cualquier tarjeta o detalle para guardarlo aquí y tenerlo a mano.'
                  : 'Browse our curated tours and adventures. Tap the heart icon ❤️ on any card or detail page to save it here for easy access.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/experiencias')}
                className="w-full sm:w-auto px-6 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{language === 'es' ? 'Explorar Experiencias' : 'Explore Experiences'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/rutas')}
                className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'es' ? 'Ver Rutas GIA' : 'View GIA Routes'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Popular recommendations teaser */}
            <div className="pt-8 border-t border-neutral-100">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                {language === 'es' ? 'Experiencias recomendadas para empezar' : 'Recommended experiences to start'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {DEMO_EXPERIENCES.slice(0, 2).map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => navigate(`/experiencias/${exp.slug}`)}
                    className="p-3 rounded-2xl border border-neutral-200 hover:border-[#00A6A6] bg-neutral-50 hover:bg-white transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={exp.images[0]}
                      alt={exp.titleEs}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#063A5B] group-hover:text-[#00A6A6] truncate">
                        {language === 'es' ? exp.titleEs : exp.titleEn}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                        ${exp.price} USD · {exp.durationHours}h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                : 'space-y-4'
            }
          >
            {favoriteExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
