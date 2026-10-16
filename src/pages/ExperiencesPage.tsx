import React, { useState, useMemo, useEffect } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import {
  ExperienceFilterState,
  Category,
  PriceRange,
  DurationType,
  GroupType,
} from '../types/experience';
import { ExperienceCard } from '../components/experiences/ExperienceCard';
import { FilterPanel } from '../components/experiences/FilterPanel';
import { MobileFilterDrawer } from '../components/experiences/MobileFilterDrawer';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { BackButton } from '../components/common/BackButton';
import { trackEvent } from '../services/analytics';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  LayoutGrid,
  List,
  Sparkles,
  Compass,
  RotateCcw,
  Users,
  ArrowRight,
  Frown,
} from 'lucide-react';

const initialFilters: ExperienceFilterState = {
  searchQuery: '',
  category: 'all',
  department: 'all',
  region: 'all',
  priceRange: 'all',
  durationType: 'all',
  groupType: 'all',
  sortBy: 'recommended',
  onlyLocal: false,
  only360: false,
  availabilityFilter: 'all',
  difficulty: 'all',
};

export const ExperiencesPage: React.FC = () => {
  const { query, navigate } = useRouter();
  const { language, t } = useLanguage();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Initialize filters from URL query parameters if present
  const [filters, setFilters] = useState<ExperienceFilterState>(() => {
    return {
      searchQuery: query.search || '',
      category: (query.category as Category) || 'all',
      department: query.department || 'all',
      region: query.region || 'all',
      priceRange: (query.priceRange as PriceRange) || 'all',
      durationType: (query.durationType as DurationType) || 'all',
      groupType: (query.groupType as GroupType) || 'all',
      sortBy: 'recommended',
      onlyLocal: query.local === 'true',
      only360: query.tour360 === 'true',
      availabilityFilter: (query.status as any) || 'all',
      difficulty: (query.difficulty as any) || 'all',
    };
  });

  // Keep in sync when URL changes
  useEffect(() => {
    if (query.category || query.search || query.local || query.tour360 || query.region) {
      setFilters((prev) => ({
        ...prev,
        category: (query.category as Category) || prev.category,
        searchQuery: query.search !== undefined ? query.search : prev.searchQuery,
        region: query.region || prev.region,
        onlyLocal: query.local === 'true' ? true : prev.onlyLocal,
        only360: query.tour360 === 'true' ? true : prev.only360,
      }));
    }
  }, [query.category, query.search, query.local, query.tour360, query.region]);

  const handleFilterChange = (updated: Partial<ExperienceFilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updated };
      trackEvent('filter_used', {
        filterChanged: Object.keys(updated)[0],
        value: Object.values(updated)[0],
      });
      return next;
    });
    // Reset pagination to first batch on filter change
    setVisibleCount(12);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setVisibleCount(12);
  };

  // Count active filters for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.category !== 'all') count++;
    if (filters.department !== 'all') count++;
    if (filters.region && filters.region !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.durationType !== 'all') count++;
    if (filters.groupType !== 'all') count++;
    if (filters.availabilityFilter && filters.availabilityFilter !== 'all') count++;
    if (filters.difficulty && filters.difficulty !== 'all') count++;
    if (filters.onlyLocal) count++;
    if (filters.only360) count++;
    return count;
  }, [filters]);

  // Filtered & sorted experiences
  const filteredExperiences = useMemo(() => {
    return DEMO_EXPERIENCES.filter((exp) => {
      // Search query (matches title, location, department, description, category)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const titleMatch = (language === 'es' ? exp.titleEs : exp.titleEn).toLowerCase().includes(q);
        const locMatch = exp.location.toLowerCase().includes(q);
        const deptMatch = exp.department.toLowerCase().includes(q);
        const descMatch = (
          language === 'es' ? exp.shortDescriptionEs : exp.shortDescriptionEn
        )
          .toLowerCase()
          .includes(q);
        const catMatch = exp.category.toLowerCase().includes(q);
        if (!titleMatch && !locMatch && !deptMatch && !descMatch && !catMatch) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'all' && exp.category !== filters.category) {
        return false;
      }

      // Region
      if (filters.region && filters.region !== 'all' && exp.region !== filters.region) {
        return false;
      }

      // Availability status
      if (filters.availabilityFilter && filters.availabilityFilter !== 'all') {
        if (exp.availabilityStatus !== filters.availabilityFilter) {
          return false;
        }
      }

      // Difficulty
      if (filters.difficulty && filters.difficulty !== 'all') {
        if (exp.difficulty !== filters.difficulty) {
          return false;
        }
      }

      // Local experience flag
      if (filters.onlyLocal && !exp.isLocalExperience) {
        return false;
      }

      // 360 tour flag
      if (filters.only360 && !(exp.has360 || exp.virtualTour360Url)) {
        return false;
      }

      // Department
      if (filters.department !== 'all' && exp.department !== filters.department) {
        return false;
      }

      // Price range
      if (filters.priceRange !== 'all' && exp.priceRange !== filters.priceRange) {
        return false;
      }

      // Duration type
      if (filters.durationType !== 'all' && exp.durationType !== filters.durationType) {
        return false;
      }

      // Group type
      if (filters.groupType !== 'all' && !exp.groupType.includes(filters.groupType)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'duration_asc') return a.durationHours - b.durationHours;
      // Recommended default: featured first, then demo rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.demoRating || 0) - (a.demoRating || 0);
    });
  }, [filters, language]);

  // Paginated experiences
  const paginatedExperiences = useMemo(() => {
    return filteredExperiences.slice(0, visibleCount);
  }, [filteredExperiences, visibleCount]);

  const hasMore = visibleCount < filteredExperiences.length;

  // TOP QUICK FILTER CHIPS
  const quickChips = [
    {
      id: 'todos',
      label: t.catalog.allChip,
      active:
        filters.category === 'all' &&
        !filters.onlyLocal &&
        !filters.only360,
      onClick: () =>
        handleFilterChange({
          category: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'naturaleza',
      label: language === 'es' ? 'Naturaleza' : 'Nature',
      active: filters.category === 'naturaleza' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'naturaleza',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'playa',
      label: language === 'es' ? 'Playas & Costa' : 'Beaches',
      active: filters.category === 'playa' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'playa',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'aventura',
      label: t.categories.adventure,
      active: filters.category === 'aventura' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'aventura',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'cultura',
      label: t.categories.culture,
      active: filters.category === 'cultura' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'cultura',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'gastronomia',
      label: t.categories.gastronomy,
      active: filters.category === 'gastronomia' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'gastronomia',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'paquetes',
      label: language === 'es' ? 'Paquetes Completos' : 'Packages',
      active: filters.category === 'paquetes' && !filters.onlyLocal,
      onClick: () =>
        handleFilterChange({
          category: 'paquetes',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'locales',
      label: t.catalog.localChip,
      active: Boolean(filters.onlyLocal),
      onClick: () =>
        handleFilterChange({
          onlyLocal: !filters.onlyLocal,
          category: 'all',
        }),
    },
    {
      id: '360',
      label: t.catalog.virtualTourChip,
      active: Boolean(filters.only360),
      onClick: () =>
        handleFilterChange({
          only360: !filters.only360,
        }),
    },
  ];

  return (
    <div className="bg-[#F7F4ED] min-h-screen py-10 sm:py-14 pb-24 selection:bg-teal-500/20 selection:text-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={language === 'es' ? 'Volver al inicio' : 'Back to Home'}
          />
        </div>

        {/* 2. ENCABEZADO DE LA PÁGINA (Inspiracional, espacioso y claro) */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-neutral-200/80 text-[#063A5B] text-xs font-bold font-mono shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span>{t.catalog.badge}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] tracking-tight font-display leading-[1.12]">
              {t.catalog.pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl">
              {t.catalog.pageSubtitle}
            </p>
          </div>

          {/* Gran Buscador Interactivo */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-md p-2 flex items-center gap-2">
            <div className="pl-3 sm:pl-4 text-neutral-400">
              <Search className="w-5 h-5 text-[#00A6A6]" />
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
              placeholder={t.catalog.searchPlaceholder}
              className="flex-1 py-2 sm:py-2.5 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 bg-transparent focus:outline-hidden font-medium"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => handleFilterChange({ searchQuery: '' })}
                className="px-3 py-1 text-xs text-neutral-400 hover:text-neutral-700 font-semibold cursor-pointer"
              >
                {t.catalog.clearSearch}
              </button>
            )}
          </div>

          {/* 3. FILTROS RÁPIDOS SUPERIORES (Chips interactivos con estado activo claro) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {quickChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={chip.onClick}
                className={`py-2 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  chip.active
                    ? 'bg-[#00A6A6] text-white border-[#00A6A6] shadow-xs ring-2 ring-[#00A6A6]/20'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6. BARRA DE RESULTADOS Y CONTROLES: Contador, Ordenar & Vista Grid/Lista */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-neutral-200/70">
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-[#063A5B] font-display">
              <span className="font-mono text-base font-black text-[#00A6A6] mr-1">
                {filteredExperiences.length}
              </span>
              {t.catalog.resultsFound}
            </p>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-neutral-500 hover:text-[#00A6A6] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.catalog.resetActive} ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Controles de ordenamiento y vista */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Mobile Filter Trigger Button con contador */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-[#063A5B] hover:bg-[#04283f] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FDBA2D]" />
              <span>
                {t.catalog.filtersTitle} {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </span>
            </button>

            {/* Ordenar por */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="text-neutral-500 text-[11px] font-medium hidden sm:inline">
                Ordenar por:
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent focus:outline-hidden text-[#063A5B] font-bold cursor-pointer"
              >
                <option value="recommended">Recomendados</option>
                <option value="price_asc">Precio menor</option>
                <option value="price_desc">Precio mayor</option>
                <option value="duration_asc">Duración</option>
              </select>
            </div>

            {/* Control para cambiar vista (Grid / Lista) */}
            <div className="hidden sm:flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#063A5B] text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                aria-label="Vista Grid"
                title="Vista Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#063A5B] text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                aria-label="Vista Lista"
                title="Vista Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. ESTRUCTURA DESKTOP: Sidebar a la izquierda (260-300px) + Resultados a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Sidebar Desktop: Aproximadamente 280px (4 de 12 columnas en Tailwind) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200/90 shadow-sm sticky top-24">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Resultados: Ocupa el resto del ancho (8 de 12 o 9 de 12 columnas) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {paginatedExperiences.length > 0 ? (
              <>
                {/* Visual Cards Container */}
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7'
                      : 'flex flex-col gap-5'
                  }
                >
                  {paginatedExperiences.map((exp, index) => (
                    <React.Fragment key={exp.id}>
                      <ExperienceCard experience={exp} viewMode={viewMode} />

                      {/* 16. SECCIÓN DE INSPIRACIÓN: Insertada elegantemente tras la 4ª o 6ª experiencia */}
                      {index === 3 && (
                        <div
                          className={`rounded-3xl bg-gradient-to-br from-[#063A5B] to-[#04283f] text-white p-6 sm:p-8 shadow-lg border border-teal-900/40 flex flex-col sm:flex-row items-center justify-between gap-6 ${
                            viewMode === 'grid' ? 'col-span-full' : ''
                          }`}
                        >
                          <div className="space-y-1.5 text-center sm:text-left">
                            <span className="text-xs font-mono font-bold text-[#FDBA2D] uppercase tracking-wider block">
                              ¿No sabes qué elegir?
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                              Cuéntale a GIA cómo quieres viajar y crea una ruta personalizada.
                            </h3>
                            <p className="text-xs text-slate-300 max-w-xl">
                              Combinamos destinos, guías locales y transporte privado en una propuesta diseñada alrededor de tus días y presupuesto.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => navigate('/planea-con-gia')}
                            className="px-6 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                          >
                            <Sparkles className="w-4 h-4 text-[#FDBA2D]" />
                            <span>Planea con GIA</span>
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* 13. PAGINACIÓN / CARGA: Botón "Mostrar más experiencias" */}
                {hasMore && (
                  <div className="pt-6 text-center space-y-2">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-8 py-3.5 bg-white hover:bg-neutral-50 text-[#063A5B] border border-neutral-300 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-xs hover:shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Mostrar más experiencias</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00A6A6]" />
                    </button>
                    <p className="text-xs text-neutral-400 font-mono">
                      Mostrando {paginatedExperiences.length} de {filteredExperiences.length} experiencias
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* 14. EMPTY STATE: Pantalla visual clara e ilustrativa */
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-14 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#FDBA2D] border border-amber-200/60 flex items-center justify-center mx-auto shadow-2xs">
                  <Compass className="w-8 h-8 text-[#00A6A6]" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-[#063A5B] font-display">
                    No encontramos experiencias con esos filtros
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Prueba cambiando la categoría, ubicación o rango de precio para descubrir más opciones en El Salvador.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar filtros</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 15. MOBILE FILTER DRAWER */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        resultsCount={filteredExperiences.length}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
};
