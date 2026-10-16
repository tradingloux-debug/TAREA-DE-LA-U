import React, { useState } from 'react';
import { PlannerPreferences, TravelerType, TripPace } from '../../types/trip';
import { Sparkles, Calendar, Users, Clock, DollarSign, Gauge, ArrowRight } from 'lucide-react';

interface TripPreferenceSelectorProps {
  initialDays?: number;
  onGenerate: (prefs: PlannerPreferences) => void;
  onPreferencesChange?: (prefs: PlannerPreferences) => void;
  className?: string;
  isGenerating?: boolean;
}

export const TripPreferenceSelector: React.FC<TripPreferenceSelectorProps> = ({
  initialDays = 5,
  onGenerate,
  onPreferencesChange,
  className = '',
  isGenerating = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [daysCount, setDaysCount] = useState<number>(initialDays);
  const [startDate, setStartDate] = useState<string>(() => {
    // Default to 14 days from now
    const d = new Date(Date.now() + 14 * 86400000);
    return d.toISOString().split('T')[0];
  });
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelerType, setTravelerType] = useState<TravelerType>('pareja');
  const [budgetTier, setBudgetTier] = useState<'economico' | 'equilibrado' | 'premium'>('equilibrado');
  const [pace, setPace] = useState<TripPace>('equilibrado');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'volcanes',
    'gastronomia',
    'playas',
    'cultura',
  ]);
  const [notes, setNotes] = useState<string>('');

  // Notify parent of live preference changes
  React.useEffect(() => {
    if (onPreferencesChange) {
      onPreferencesChange({
        daysCount,
        dates: startDate,
        travelersCount,
        travelerType,
        budgetTier,
        pace,
        interests: selectedInterests,
        restrictions: notes.trim() || undefined,
      });
    }
  }, [
    daysCount,
    startDate,
    travelersCount,
    travelerType,
    budgetTier,
    pace,
    selectedInterests,
    notes,
    onPreferencesChange,
  ]);

  // The 8 requested big interest chips
  const interestChips = [
    { id: 'volcanes', label: 'Volcanes', emoji: '🌋', desc: 'Cráteres y senderos' },
    { id: 'playas', label: 'Playas', emoji: '🏖', desc: 'Surf y sol pacífico' },
    { id: 'gastronomia', label: 'Gastronomía', emoji: '🍽', desc: 'Pupusas y mercado' },
    { id: 'cultura', label: 'Cultura', emoji: '🎨', desc: 'Añil y colonias' },
    { id: 'naturaleza', label: 'Naturaleza', emoji: '🌿', desc: 'Bosques y lagos' },
    { id: 'aventura', label: 'Aventura', emoji: '🧗', desc: 'Ríos y cascadas' },
    { id: 'comunidades', label: 'Comunidades', emoji: '🤝', desc: 'Saberes locales' },
    { id: 'cafe', label: 'Café', emoji: '☕', desc: 'Fincas de altura' },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((i) => i !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      daysCount,
      dates: startDate,
      travelersCount,
      travelerType,
      budgetTier,
      pace,
      interests: selectedInterests,
      restrictions: notes.trim() || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl border border-neutral-200/90 shadow-md p-6 sm:p-8 space-y-8 ${className}`}
    >
      {/* Header & Step Progress Bar */}
      <div className="space-y-4 border-b border-neutral-100 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diseña tu viaje a tu manera</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#063A5B] tracking-tight font-display mt-1">
              Configura tus preferencias
            </h2>
          </div>
          <span className="text-xs font-bold font-mono text-neutral-400">
            Paso {currentStep} de 4
          </span>
        </div>

        {/* Step indicator tabs */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { num: 1, label: 'Tu viaje' },
            { num: 2, label: 'Intereses' },
            { num: 3, label: 'Estilo' },
            { num: 4, label: 'Detalles' },
          ].map((st) => (
            <button
              key={st.num}
              type="button"
              onClick={() => setCurrentStep(st.num)}
              className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                currentStep === st.num
                  ? 'bg-[#00A6A6] text-white font-bold shadow-xs'
                  : currentStep > st.num
                  ? 'bg-teal-50 text-[#063A5B] font-semibold'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              <span className="text-[10px] sm:text-xs block leading-tight">
                {st.num}. {st.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PASO 1: Tu viaje */}
      <div className={`space-y-6 ${currentStep === 1 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
            PASO 1 · TU VIAJE
          </span>
          <h3 className="text-base font-bold text-[#063A5B]">
            ¿Cuántos días y con quién viajas?
          </h3>
        </div>

        {/* Número de días */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00A6A6]" />
              <span>Duración del viaje:</span>
            </span>
            <span className="text-sm font-extrabold text-[#063A5B] font-mono">
              {daysCount} Días
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 5, 7, 10].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDaysCount(d)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  daysCount === d
                    ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {d} Días
              </button>
            ))}
          </div>
        </div>

        {/* Fechas estimadas */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Calendar className="w-4 h-4 text-[#00A6A6]" />
            <span>Fecha estimada de llegada:</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6]"
          />
        </div>

        {/* Cantidad de personas & Tipo */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Users className="w-4 h-4 text-[#00A6A6]" />
            <span>Número de personas:</span>
          </label>

          <div className="grid grid-cols-4 gap-2">
            {[
              { count: 1, type: 'solo' as TravelerType, label: '1 Solo' },
              { count: 2, type: 'pareja' as TravelerType, label: '2 Pareja' },
              { count: 4, type: 'familia' as TravelerType, label: '3-4 Familia' },
              { count: 6, type: 'grupo' as TravelerType, label: '5+ Grupo' },
            ].map((p) => (
              <button
                key={p.count}
                type="button"
                onClick={() => {
                  setTravelersCount(p.count);
                  setTravelerType(p.type);
                }}
                className={`py-2.5 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  travelersCount === p.count
                    ? 'bg-[#00A6A6] text-white border-[#00A6A6] shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="w-full py-3 bg-[#063A5B] hover:bg-[#04283f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Siguiente: Tus intereses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* PASO 2: Tus intereses */}
      <div className={`space-y-6 ${currentStep === 2 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
            PASO 2 · TUS INTERESES
          </span>
          <h3 className="text-base font-bold text-[#063A5B]">
            ¿Qué experiencias quieres priorizar?
          </h3>
          <p className="text-xs text-neutral-500">
            Selecciona todos los que te entusiasmen (selección múltiple):
          </p>
        </div>

        {/* 8 Big Visual Chips */}
        <div className="grid grid-cols-2 gap-3">
          {interestChips.map((chip) => {
            const isSelected = selectedInterests.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleInterest(chip.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/90 border-[#00A6A6] shadow-xs text-[#063A5B] ring-1 ring-[#00A6A6]'
                    : 'bg-neutral-50/80 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <span className="text-2xl shrink-0">{chip.emoji}</span>
                <div className="truncate">
                  <span className="font-bold text-xs block truncate">{chip.label}</span>
                  <span className="text-[10.5px] text-neutral-500 block truncate">{chip.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="w-1/3 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="w-2/3 py-3 bg-[#063A5B] hover:bg-[#04283f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Siguiente: Tu estilo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PASO 3: Tu estilo */}
      <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
            PASO 3 · TU ESTILO
          </span>
          <h3 className="text-base font-bold text-[#063A5B]">
            Presupuesto y ritmo de viaje
          </h3>
        </div>

        {/* Presupuesto */}
        <div className="space-y-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <DollarSign className="w-4 h-4 text-[#00A6A6]" />
            <span>Nivel de presupuesto estimado:</span>
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'economico' as const, label: 'Económico', sign: '$', desc: 'Rutas accesibles' },
              { id: 'equilibrado' as const, label: 'Equilibrado', sign: '$$', desc: 'Calidad & confort' },
              { id: 'premium' as const, label: 'Premium', sign: '$$$', desc: 'Servicio exclusivo' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudgetTier(b.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  budgetTier === b.id
                    ? 'bg-amber-50/80 border-[#FDBA2D] text-[#063A5B] font-bold shadow-xs ring-1 ring-[#FDBA2D]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="font-mono text-base font-extrabold text-[#F47B3A] block">
                  {b.sign}
                </span>
                <span className="text-xs font-bold block">{b.label}</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">{b.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ritmo */}
        <div className="space-y-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Gauge className="w-4 h-4 text-[#00A6A6]" />
            <span>Ritmo del recorrido:</span>
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'relajado' as const, label: 'Relajado', desc: 'Tiempo libre & descanso' },
              { id: 'equilibrado' as const, label: 'Equilibrado', desc: '1-2 actividades diarias' },
              { id: 'intenso' as const, label: 'Intenso', desc: 'Aprovechar cada hora' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPace(p.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  pace === p.id
                    ? 'bg-teal-50 border-[#00A6A6] text-[#063A5B] font-bold shadow-xs ring-1 ring-[#00A6A6]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <span className="text-xs font-bold block">{p.label}</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="w-1/3 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="w-2/3 py-3 bg-[#063A5B] hover:bg-[#04283f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Siguiente: Detalles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PASO 4: Detalles */}
      <div className={`space-y-6 ${currentStep === 4 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
            PASO 4 · DETALLES
          </span>
          <h3 className="text-base font-bold text-[#063A5B]">
            Cuéntale a GIA algo más sobre el viaje que imaginas
          </h3>
          <p className="text-xs text-neutral-500">
            Cualquier preferencia especial, restricciones físicas o lugares específicos que quieras incluir.
          </p>
        </div>

        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Ej. Quiero conocer volcanes, probar comida salvadoreña y terminar algunos días en la playa."
            className="w-full p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6] leading-relaxed resize-none"
          />
        </div>

        {/* Resumen rápido de lo configurado */}
        <div className="p-3.5 rounded-2xl bg-[#F7F4ED] border border-neutral-200/80 text-xs text-[#063A5B] space-y-1">
          <span className="font-bold block">Resumen de tu selección:</span>
          <p className="text-[11px] text-neutral-600">
            • {daysCount} días · {travelersCount} personas · Ritmo {pace}
            <br />
            • {selectedInterests.length} intereses seleccionados ({selectedInterests.join(', ')})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="w-1/3 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Atrás
          </button>
          <div className="w-2/3">
            <span className="text-[10px] text-neutral-400 block text-right mb-1">
              Todo listo para diseñar
            </span>
          </div>
        </div>
      </div>

      {/* BIG PRIMARY CTA: Always accessible or at Step 4 */}
      <div className="pt-2 border-t border-neutral-100 text-center space-y-2">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-[#00A6A6] hover:bg-[#009191] active:scale-98 disabled:opacity-50 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:shadow-xl"
        >
          <Sparkles className="w-5 h-5 text-[#FDBA2D]" />
          <span>{isGenerating ? 'Diseñando tu viaje...' : '✨ Crear mi viaje con GIA'}</span>
        </button>
        <p className="text-[11px] text-neutral-400">
          Podrás modificar el itinerario después.
        </p>
      </div>
    </form>
  );
};
