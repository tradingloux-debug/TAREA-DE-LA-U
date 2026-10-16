import React from 'react';
import { FilterPanel } from './FilterPanel';
import { ExperienceFilterState } from '../../types/experience';
import { X, Check, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ExperienceFilterState;
  onChange: (updated: Partial<ExperienceFilterState>) => void;
  onReset: () => void;
  resultsCount: number;
  activeFiltersCount?: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  resultsCount,
  activeFiltersCount = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer from right / bottom */}
      <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#00A6A6]" />
            <h3 className="text-sm font-black text-[#063A5B] font-display">
              Filtros {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 cursor-pointer"
            aria-label="Cerrar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterPanel filters={filters} onChange={onChange} onReset={onReset} />
        </div>

        {/* Footer Actions: Limpiar & Aplicar filtros */}
        <div className="p-4 border-t border-neutral-200 bg-white flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Aplicar filtros ({resultsCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
