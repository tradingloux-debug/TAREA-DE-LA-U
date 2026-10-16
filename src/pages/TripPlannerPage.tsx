import React, { useState, useEffect } from 'react';
import { DEMO_ROUTES } from '../data/routes';
import { TourRoute } from '../types/routes';
import { MyTrip, PlannerPreferences } from '../types/trip';
import { plannerEngine } from '../services/plannerEngine';
import { tripStorage } from '../services/tripStorage';
import { TripPreferenceSelector } from '../components/planner/TripPreferenceSelector';
import { TripItineraryView } from '../components/planner/TripItineraryView';
import { PlannerInspirationalPreview } from '../components/planner/PlannerInspirationalPreview';
import { PlannerGeneratingLoading } from '../components/planner/PlannerGeneratingLoading';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../services/analytics';
import { Sparkles, ArrowLeft, BookmarkCheck, RefreshCw, SlidersHorizontal, Eye } from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

export const TripPlannerPage: React.FC = () => {
  const { query, navigate } = useRouter();
  const { language } = useLanguage();

  // Route preloaded if arrived via ?route=slug
  const preloadedRoute: TourRoute | undefined = query.route
    ? DEMO_ROUTES.find((r) => r.slug === query.route)
    : undefined;

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<MyTrip | null>(() => {
    if (preloadedRoute) {
      return plannerEngine.generateTrip(
        {
          daysCount: preloadedRoute.days,
          travelersCount: 2,
          travelerType: 'pareja',
          budgetTier: 'equilibrado',
          pace: 'equilibrado',
          interests: ['cultura', 'volcanes', 'gastronomia'],
        },
        preloadedRoute
      );
    }
    return null;
  });

  const [livePreferences, setLivePreferences] = useState<PlannerPreferences>({
    daysCount: preloadedRoute?.days || 5,
    travelersCount: 2,
    travelerType: 'pareja',
    budgetTier: 'equilibrado',
    pace: 'equilibrado',
    interests: ['volcanes', 'gastronomia', 'playas', 'cultura'],
  });

  const [isSaved, setIsSaved] = useState(false);
  const [mobileTab, setMobileTab] = useState<'preferences' | 'itinerary'>('preferences');

  useEffect(() => {
    trackEvent('trip_planner_opened', { routeSlug: query.route });
    if (preloadedRoute) {
      setMobileTab('itinerary');
    }
  }, [query.route, preloadedRoute]);

  const handleGenerate = (prefs: PlannerPreferences) => {
    trackEvent('trip_preferences_completed', { days: prefs.daysCount, pace: prefs.pace });
    setIsGenerating(true);

    // Smooth transition giving time to visual loading states
    setTimeout(() => {
      const generated = plannerEngine.generateTrip(prefs, preloadedRoute);
      setCurrentTrip(generated);
      setIsGenerating(false);
      setIsSaved(false);
      setMobileTab('itinerary');
      trackEvent('trip_generated', { tripId: generated.id });

      // Scroll to top of results on desktop or mobile
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 320, behavior: 'smooth' });
      }
    }, 2400);
  };

  const handleModifyTripInstruction = (instruction: string) => {
    if (!currentTrip) return;
    trackEvent('trip_modified', { instruction });
    const modified = plannerEngine.modifyTripByInstruction(currentTrip, instruction);
    setCurrentTrip(modified);
    setIsSaved(false);
  };

  const handleModifyDay = (
    dayNumber: number,
    action: 'swap' | 'freeday' | 'remove',
    newExpId?: string
  ) => {
    if (!currentTrip) return;
    if (action === 'swap' && newExpId) {
      const updated = plannerEngine.swapDayExperience(currentTrip, dayNumber, newExpId);
      setCurrentTrip(updated);
      setIsSaved(false);
    } else if (action === 'freeday') {
      const updated = plannerEngine.setFreeDay(currentTrip, dayNumber);
      setCurrentTrip(updated);
      setIsSaved(false);
    }
  };

  const handleRegenerate = () => {
    if (!currentTrip) return;
    setIsGenerating(true);
    setTimeout(() => {
      const regenerated = plannerEngine.generateTrip(
        {
          daysCount: currentTrip.daysCount,
          travelersCount: currentTrip.travelersCount,
          travelerType: currentTrip.travelerType,
          budgetTier: currentTrip.budgetTier || 'equilibrado',
          pace: currentTrip.pace,
          interests: currentTrip.interests,
        },
        preloadedRoute
      );
      setCurrentTrip(regenerated);
      setIsGenerating(false);
      setIsSaved(false);
    }, 1800);
  };

  const handleSaveTrip = () => {
    if (!currentTrip) return;
    tripStorage.saveTrip(currentTrip);
    setIsSaved(true);
    trackEvent('trip_saved', { tripId: currentTrip.id });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-[#F7F4ED] min-h-screen py-10 sm:py-14 pb-28 selection:bg-teal-500/20 selection:text-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/rutas"
            label={language === 'es' ? 'Volver a tours y rutas' : 'Back to tours and routes'}
          />
        </div>

        {/* 1. CONCEPTO: Header refinado */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-neutral-200/80 text-[#063A5B] text-xs font-bold font-mono shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>✨ Diseñado para ti</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] tracking-tight font-display leading-[1.12]">
            Planea con GIA
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Cuéntanos cómo quieres vivir El Salvador y diseñaremos una ruta alrededor de tus intereses, tiempo y presupuesto.
          </p>
        </div>

        {/* Notice if route is preloaded from catalog */}
        {preloadedRoute && (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-[#063A5B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#00A6A6]">Ruta base precargada:</span>
              <span className="font-semibold underline">{preloadedRoute.titleEs}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/planea-con-gia')}
              className="text-xs text-[#00A6A6] hover:text-[#063A5B] font-bold cursor-pointer"
            >
              Diseñar nueva ruta desde cero →
            </button>
          </div>
        )}

        {/* Mobile View Switcher (Visible only when currentTrip exists on mobile) */}
        {currentTrip && (
          <div className="lg:hidden flex items-center p-1 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setMobileTab('preferences')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'preferences'
                  ? 'bg-[#063A5B] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>1. Preferencias</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('itinerary')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === 'itinerary'
                  ? 'bg-[#00A6A6] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>2. Ver Itinerario</span>
            </button>
          </div>
        )}

        {/* 2. ESTRUCTURA DESKTOP: 40% (Columna Izquierda) / 60% (Columna Derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: 40% (5 columnas de 12) */}
          <div
            className={`lg:col-span-5 space-y-6 ${
              mobileTab === 'itinerary' && currentTrip ? 'hidden lg:block' : 'block'
            }`}
          >
            <TripPreferenceSelector
              initialDays={preloadedRoute?.days || currentTrip?.daysCount || 5}
              onGenerate={handleGenerate}
              onPreferencesChange={setLivePreferences}
              isGenerating={isGenerating}
            />
          </div>

          {/* Columna Derecha: 60% (7 columnas de 12) */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              mobileTab === 'preferences' && currentTrip ? 'hidden lg:block' : 'block'
            }`}
          >
            {isGenerating ? (
              <PlannerGeneratingLoading />
            ) : currentTrip ? (
              <TripItineraryView
                trip={currentTrip}
                onModifyDay={handleModifyDay}
                onModifyTripInstruction={handleModifyTripInstruction}
                onRegenerateTrip={handleRegenerate}
                onSaveTrip={handleSaveTrip}
                isSaved={isSaved}
              />
            ) : (
              /* 4. ESTADO INICIAL DEL PANEL DERECHO: Ya no está vacío, es inspiracional */
              <PlannerInspirationalPreview
                preferences={livePreferences}
                onQuickGenerate={() => handleGenerate(livePreferences)}
              />
            )}
          </div>
        </div>
      </div>

      {/* 12. MOBILE STICKY BOTTOM BAR: Únicamente después de generar */}
      {currentTrip && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase font-mono">
                {currentTrip.daysCount} Días · {currentTrip.travelersCount} Viajeros
              </span>
              <span className="text-base font-black font-mono text-[#063A5B]">
                ${currentTrip.estimatedTotal} USD
              </span>
            </div>

            <button
              type="button"
              onClick={handleSaveTrip}
              className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#00A6A6] hover:bg-[#009191] text-white'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{isSaved ? '¡Guardado!' : 'Guardar mi viaje'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
