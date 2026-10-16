import React from 'react';
import {
  ExperienceFilterState,
  Category,
  PriceRange,
  DurationType,
  GroupType,
  DifficultyLevel,
} from '../../types/experience';
import { useLanguage } from '../../context/LanguageContext';
import { DEPARTMENTS, REGIONS } from '../../data/experiences';
import { RotateCcw, SlidersHorizontal, Users, Sparkles, CheckCircle2, Package } from 'lucide-react';

interface FilterPanelProps {
  filters: ExperienceFilterState;
  onChange: (updated: Partial<ExperienceFilterState>) => void;
  onReset: () => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  className = '',
}) => {
  const { language } = useLanguage();

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Header: Title & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#00A6A6]" />
          <h3 className="text-sm font-black text-[#063A5B] font-display">
            {language === 'es' ? 'Filtrar experiencias' : 'Filter experiences'}
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-neutral-500 hover:text-[#00A6A6] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'es' ? 'Limpiar filtros' : 'Reset filters'}</span>
        </button>
      </div>

      {/* 1. CATEGORÍA */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Categoría' : 'Category'}
        </span>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'all', label: language === 'es' ? 'Todas las categorías' : 'All categories' },
            { id: 'naturaleza', label: language === 'es' ? 'Naturaleza' : 'Nature' },
            { id: 'playa', label: language === 'es' ? 'Playas & Costa' : 'Beaches & Coast' },
            { id: 'aventura', label: language === 'es' ? 'Aventura' : 'Adventure' },
            { id: 'cultura', label: language === 'es' ? 'Cultura e Historia' : 'Culture & Heritage' },
            { id: 'gastronomia', label: language === 'es' ? 'Gastronomía' : 'Gastronomy' },
            { id: 'paquetes', label: language === 'es' ? 'Paquetes Completos' : 'Complete Packages' },
          ].map((item) => {
            const isActive = filters.category === item.id && !filters.onlyLocal;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ category: item.id as Category | 'all', onlyLocal: false })}
                className={`px-3 py-2 text-xs font-semibold rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-2xs'
                    : 'bg-neutral-50/70 text-neutral-700 border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Experiencias Locales button inside Category */}
          <button
            type="button"
            onClick={() => onChange({ onlyLocal: !filters.onlyLocal })}
            className={`px-3 py-2 text-xs font-semibold rounded-xl text-left transition-all cursor-pointer border flex items-center justify-between ${
              filters.onlyLocal
                ? 'bg-[#55A94B] text-white border-[#55A94B] shadow-2xs'
                : 'bg-emerald-50/50 text-emerald-800 border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Experiencias locales' : 'Local community'}</span>
            </span>
            <span className="text-[10px] font-bold font-mono">
              {language === 'es' ? 'Comunidad' : 'Roots'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. DISPONIBILIDAD Y TIPO DE OFERTA */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Modalidad de reserva' : 'Booking status'}
        </span>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'all', label: language === 'es' ? 'Todos los tipos' : 'All options' },
            {
              id: 'disponible_inmediato',
              label: language === 'es' ? 'Disponible directo' : 'Instant booking',
              icon: CheckCircle2,
              color: 'text-emerald-600',
            },
            {
              id: 'propuesta_a_medida',
              label: language === 'es' ? 'Propuestas de paquete' : 'Custom package proposals',
              icon: Package,
              color: 'text-amber-600',
            },
          ].map((item) => {
            const isActive = (filters.availabilityFilter || 'all') === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ availabilityFilter: item.id as any })}
                className={`px-3 py-2 text-xs font-semibold rounded-xl text-left transition-all cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-2xs'
                    : 'bg-neutral-50/70 text-neutral-700 border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color}`} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. UBICACIÓN / DEPARTAMENTO & REGIÓN */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Región y Departamento' : 'Region & Department'}
        </span>

        {/* Region filter */}
        <select
          value={filters.region || 'all'}
          onChange={(e) => onChange({ region: e.target.value })}
          className="w-full text-xs bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3 py-2 text-neutral-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6] cursor-pointer mb-1.5"
        >
          <option value="all">{language === 'es' ? 'Todas las regiones' : 'All regions'}</option>
          {REGIONS.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        {/* Department filter */}
        <select
          value={filters.department}
          onChange={(e) => onChange({ department: e.target.value })}
          className="w-full text-xs bg-neutral-50/70 border border-neutral-200/90 rounded-xl px-3 py-2 text-neutral-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#00A6A6] cursor-pointer"
        >
          <option value="all">
            {language === 'es' ? 'Todos los departamentos' : 'All departments'}
          </option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* 4. DIFICULTAD */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Nivel de dificultad' : 'Difficulty level'}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'all', label: language === 'es' ? 'Todas' : 'All' },
            { id: 'facil', label: language === 'es' ? 'Fácil' : 'Easy' },
            { id: 'moderado', label: language === 'es' ? 'Moderada' : 'Moderate' },
            { id: 'exigente', label: language === 'es' ? 'Exigente' : 'Challenging' },
          ].map((item) => {
            const isActive = (filters.difficulty || 'all') === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ difficulty: item.id as DifficultyLevel | 'all' })}
                className={`py-1.5 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#00A6A6] text-white border-[#00A6A6] shadow-2xs'
                    : 'bg-neutral-50/70 text-neutral-700 border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. PRECIO ($ / $$ / $$$) */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Rango de precio' : 'Price range'}
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'all', label: language === 'es' ? 'Todos' : 'All', sign: 'Cualq.' },
            { id: 'economico', label: language === 'es' ? 'Económico' : 'Budget', sign: '$' },
            { id: 'medio', label: language === 'es' ? 'Medio' : 'Mid', sign: '$$' },
            { id: 'premium', label: language === 'es' ? 'Premium' : 'Luxe', sign: '$$$' },
          ].map((item) => {
            const isActive = filters.priceRange === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ priceRange: item.id as PriceRange | 'all' })}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#00A6A6] text-white border-[#00A6A6] shadow-2xs'
                    : 'bg-neutral-50/70 text-neutral-700 border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                <span className="font-mono font-bold block">{item.sign}</span>
                <span className="text-[10px] block truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. DURACIÓN */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Duración' : 'Duration'}
        </span>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'all', label: language === 'es' ? 'Todas las duraciones' : 'All durations' },
            { id: 'hours', label: language === 'es' ? 'Menos de 3 horas' : 'Under 3 hours' },
            { id: 'half_day', label: language === 'es' ? 'Medio día (4-5 hrs)' : 'Half day (4-5 hrs)' },
            { id: 'full_day', label: language === 'es' ? 'Día completo (6+ hrs)' : 'Full day (6+ hrs)' },
            { id: 'multi_day', label: language === 'es' ? 'Paquetes de varios días' : 'Multi-day packages' },
          ].map((item) => {
            const isActive = filters.durationType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ durationType: item.id as DurationType | 'all' })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-2xs'
                    : 'bg-neutral-50/70 text-neutral-700 border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. CONTENIDO INMERSIVO 360 */}
      <div className="space-y-2 pt-2 border-t border-neutral-200/80">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#063A5B] block">
          {language === 'es' ? 'Contenido interactivo' : 'Interactive media'}
        </span>
        <button
          type="button"
          onClick={() => onChange({ only360: !filters.only360 })}
          className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            filters.only360
              ? 'bg-[#063A5B] text-white border-[#063A5B] shadow-2xs'
              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
          <span>{language === 'es' ? 'Vistas panorámicas 360°' : '360° Panoramic views'}</span>
        </button>
      </div>
    </aside>
  );
};
