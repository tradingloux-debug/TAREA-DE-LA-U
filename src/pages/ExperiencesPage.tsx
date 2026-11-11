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
  Car,
} from 'lucide-react';

const initialFilters: ExperienceFilterState = {
  searchQuery: '',
  category: 'all',
  pillarCategory: 'all',
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
  packageDurationTier: 'all',
  travelerProfile: 'all',
  comfortLevel: 'all',
};

export const ExperiencesPage: React.FC = () => {
  const { query, navigate } = useRouter();
  const { language, t, loc } = useLanguage();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Initialize filters from URL query parameters if present
  const [filters, setFilters] = useState<ExperienceFilterState>(() => {
    return {
      searchQuery: query.search || '',
      category: (query.category as Category) || 'all',
      pillarCategory: (query.pillar as any) || 'all',
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
      packageDurationTier: (query.durationTier as any) || 'all',
      travelerProfile: (query.profile as any) || 'all',
      comfortLevel: (query.comfort as any) || 'all',
    };
  });

  // Keep in sync when URL changes
  useEffect(() => {
    if (query.category || query.search || query.local || query.tour360 || query.region || query.durationTier) {
      setFilters((prev) => ({
        ...prev,
        category: (query.category as Category) || prev.category,
        searchQuery: query.search !== undefined ? query.search : prev.searchQuery,
        region: query.region || prev.region,
        onlyLocal: query.local === 'true' ? true : prev.onlyLocal,
        only360: query.tour360 === 'true' ? true : prev.only360,
        packageDurationTier: (query.durationTier as any) || prev.packageDurationTier,
      }));
    }
  }, [query.category, query.search, query.local, query.tour360, query.region, query.durationTier]);

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
    if (filters.packageDurationTier && filters.packageDurationTier !== 'all') count++;
    if (filters.travelerProfile && filters.travelerProfile !== 'all') count++;
    if (filters.comfortLevel && filters.comfortLevel !== 'all') count++;
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

      // 4 Strategic Pillars
      if (filters.pillarCategory && filters.pillarCategory !== 'all') {
        if (exp.pillarCategory !== filters.pillarCategory) {
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

      // Package duration tier
      if (filters.packageDurationTier && filters.packageDurationTier !== 'all') {
        if (exp.packageDurationTier !== filters.packageDurationTier) {
          return false;
        }
      }

      // Traveler profile
      if (filters.travelerProfile && filters.travelerProfile !== 'all') {
        if (!exp.travelerProfiles?.includes(filters.travelerProfile as any)) {
          return false;
        }
      }

      // Comfort level
      if (filters.comfortLevel && filters.comfortLevel !== 'all') {
        if (exp.comfortLevel !== filters.comfortLevel) {
          return false;
        }
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
        filters.packageDurationTier === 'all' &&
        !filters.onlyLocal &&
        !filters.only360,
      onClick: () =>
        handleFilterChange({
          category: 'all',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'paquetes',
      label: loc('Paquetes y Circuitos', 'Multi-day Packages'),
      active: filters.category === 'paquetes' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'paquetes',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'tier-1d',
      label: loc('Tours 1 Día', '1-Day Tours'),
      active: filters.packageDurationTier === '1_dia',
      onClick: () =>
        handleFilterChange({
          packageDurationTier: filters.packageDurationTier === '1_dia' ? 'all' : '1_dia',
          category: 'all',
        }),
    },
    {
      id: 'tier-2d1n',
      label: loc('Escapadas 2D/1N', '2D/1N Getaways'),
      active: filters.packageDurationTier === '2d_1n',
      onClick: () =>
        handleFilterChange({
          packageDurationTier: filters.packageDurationTier === '2d_1n' ? 'all' : '2d_1n',
          category: 'all',
        }),
    },
    {
      id: 'tier-3d2n',
      label: loc('Circuitos 3D/2N', '3D/2N Circuits'),
      active: filters.packageDurationTier === '3d_2n',
      onClick: () =>
        handleFilterChange({
          packageDurationTier: filters.packageDurationTier === '3d_2n' ? 'all' : '3d_2n',
          category: 'all',
        }),
    },
    {
      id: 'tier-gran-tour',
      label: loc('Gran Tour 5D - 7D', 'Grand Tour 5D - 7D'),
      active: filters.packageDurationTier === '5d_4n' || filters.packageDurationTier === '7d_6n',
      onClick: () =>
        handleFilterChange({
          packageDurationTier: filters.packageDurationTier === '7d_6n' ? 'all' : '7d_6n',
          category: 'all',
        }),
    },
    {
      id: 'naturaleza',
      label: loc('Naturaleza', 'Nature'),
      active: filters.category === 'naturaleza' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'naturaleza',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'playa',
      label: loc('Playas & Costa', 'Beaches & Coast'),
      active: filters.category === 'playa' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'playa',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'cultura',
      label: loc('Cultura e Historia', 'Culture & History'),
      active: filters.category === 'cultura' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'cultura',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'gastronomia',
      label: loc('Gastronomía', 'Gastronomy'),
      active: filters.category === 'gastronomia' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'gastronomia',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'comunitario',
      label: loc('Turismo Comunitario', 'Community Tourism'),
      active: filters.category === 'comunitario' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'comunitario',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: 'especial',
      label: loc('Experiencias Especiales', 'Special Experiences'),
      active: filters.category === 'especial' && filters.packageDurationTier === 'all',
      onClick: () =>
        handleFilterChange({
          category: 'especial',
          packageDurationTier: 'all',
          onlyLocal: false,
          only360: false,
        }),
    },
    {
      id: '360',
      label: loc('Recorridos 360°', '360° Tours'),
      active: Boolean(filters.only360),
      onClick: () =>
        handleFilterChange({
          only360: !filters.only360,
        }),
    },
  ];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14 pb-24 selection:bg-[#00B8C8]/20 selection:text-[#173B59]">
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
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-100 text-[#173B59] text-xs font-bold font-mono shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#00B8C8]" />
              <span>{t.catalog.badge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39B98A]/15 border border-[#39B98A]/30 text-[#1B6D4C] text-xs font-bold font-mono shadow-2xs">
              <Car className="w-3.5 h-3.5 text-[#39B98A]" />
              <span>{loc('Transporte privado 100% incluido en todos los tours', '100% Private transport included on all tours')}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-[#173B59] tracking-tight font-display leading-[1.12]">
              {t.catalog.pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl">
              {t.catalog.pageSubtitle}
            </p>
          </div>

          {/* Gran Buscador Interactivo */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-amber-100/90 shadow-md p-2 flex items-center gap-2">
            <div className="pl-3 sm:pl-4 text-neutral-400">
              <Search className="w-5 h-5 text-[#00B8C8]" />
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

          {/* 4 PILARES ESTRATÉGICOS GIA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#173B59] uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#00B8C8]" />
                {loc('Pilares Turísticos de El Salvador:', 'El Salvador Strategic Tourism Pillars:', 'Pilares Turísticos de El Salvador:')}
              </span>
              {filters.pillarCategory && filters.pillarCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleFilterChange({ pillarCategory: 'all' })}
                  className="text-xs text-neutral-500 hover:text-[#00B8C8] font-semibold cursor-pointer"
                >
                  {loc('Ver todos los pilares', 'Show all pillars', 'Ver todos os pilares')}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {[
                {
                  id: 'imperdibles',
                  icon: '🏛️',
                  title: loc('Los Imperdibles', 'Must-See Highlights', 'Os Imperdíveis'),
                  subtitle: loc('Destinos icónicos y emblemáticos', 'Iconic & emblematic landmarks', 'Destinos icônicos e emblemáticos'),
                  activeColor: 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/25',
                },
                {
                  id: 'en_tendencia',
                  icon: '🔥',
                  title: loc('En Tendencia', 'Trending Now', 'Em Alta'),
                  subtitle: loc('Surf internacional y Centro nocturno', 'World surf spots & night city', 'Surfe mundial e Centro noturno'),
                  activeColor: 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/25',
                },
                {
                  id: 'poco_conocido',
                  icon: '🌿',
                  title: loc('Que pocos conocen', 'Hidden Gems', 'Que poucos conhecem'),
                  subtitle: loc('Manglares, memoria viva y telares', 'Mangroves, living memory & craft', 'Manguezais, memória viva e artesanato'),
                  activeColor: 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/25',
                },
                {
                  id: 'familiar',
                  icon: '👨‍👩‍👧‍👦',
                  title: loc('GIA en Familia', 'GIA with Family', 'GIA em Família'),
                  subtitle: loc('Parques, laberintos y lagos calmos', 'Parks, hedge mazes & calm lakes', 'Parques, labirintos e lagos calmos'),
                  activeColor: 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-600/25',
                },
              ].map((pillar) => {
                const isSelected = filters.pillarCategory === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() =>
                      handleFilterChange({
                        pillarCategory: isSelected ? 'all' : (pillar.id as any),
                      })
                    }
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? pillar.activeColor
                        : 'bg-white border-neutral-200/80 hover:border-[#00B8C8]/40 hover:bg-neutral-50/70 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{pillar.icon}</span>
                      <span className={`text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-[#173B59]'}`}>
                        {pillar.title}
                      </span>
                    </div>
                    <p className={`text-[10.5px] leading-snug line-clamp-1 ${isSelected ? 'text-white/90' : 'text-neutral-500'}`}>
                      {pillar.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
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
                    ? 'bg-[#00B8C8] text-white border-[#00B8C8] shadow-md shadow-[#00B8C8]/20 ring-2 ring-[#00B8C8]/20'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#00B8C8]/40 hover:bg-neutral-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Banner: Diseña tu experiencia completa a medida */}
          <div className="rounded-3xl bg-gradient-to-r from-[#173B59] via-[#0E5171] to-[#00B8C8] p-5 sm:p-7 text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFC857] text-[#173B59] text-[10.5px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{loc('A tu manera', 'Your way')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                {loc(
                  '¿Buscas un itinerario completo a la medida de tu grupo?',
                  'Looking for a custom tour package tailored to your group?'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                {loc(
                  'Elige tus días, categoría de hotel (estándar, boutique o ecolodge), transporte privado con conductor y comidas incluidas. Recibe una cotización formal inmediata con código de reservación.',
                  'Choose your duration, lodging tier (standard, boutique, or ecolodge), private chauffeur transport, and meal plan. Get an instant formal quote code.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => navigate('/planea-con-gia')}
                className="flex-1 md:flex-initial px-5 py-3 bg-[#FF6B57] hover:bg-[#E85541] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF6B57]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#FFC857]" />
                <span>{loc('Personalizar mi viaje', 'Build custom trip')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
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
                {loc('Ordenar por:', 'Sort by:')}
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                className="bg-transparent focus:outline-hidden text-[#063A5B] font-bold cursor-pointer"
              >
                <option value="recommended">{loc('Recomendados', 'Recommended')}</option>
                <option value="price_asc">{loc('Precio menor', 'Price: Low to High')}</option>
                <option value="price_desc">{loc('Precio mayor', 'Price: High to Low')}</option>
                <option value="duration_asc">{loc('Duración', 'Duration')}</option>
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

                      {/* 16. SECCIÓN DE INSPIRACIÓN: Insertada tras la 4ª experiencia */}
                      {index === 3 && (
                        <div
                          className={`rounded-3xl bg-gradient-to-br from-[#063A5B] to-[#04283f] text-white p-6 sm:p-8 shadow-lg border border-teal-900/40 flex flex-col sm:flex-row items-center justify-between gap-6 ${
                            viewMode === 'grid' ? 'col-span-full' : ''
                          }`}
                        >
                          <div className="space-y-1.5 text-center sm:text-left">
                            <span className="text-xs font-mono font-bold text-[#FDBA2D] uppercase tracking-wider block">
                              {loc('¿No sabes qué elegir?', 'Need help deciding?')}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                              {loc(
                                'Cuéntale a GIA cómo quieres viajar y crea una ruta personalizada.',
                                'Tell GIA how you want to travel and create a customized itinerary.'
                              )}
                            </h3>
                            <p className="text-xs text-slate-300 max-w-xl">
                              {loc(
                                'Combinamos destinos, guías locales y transporte privado en una propuesta diseñada alrededor de tus días y presupuesto.',
                                'We combine destinations, local guides, and private transport into a proposal tailored to your days and budget.'
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => navigate('/planificador')}
                            className="px-6 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                          >
                            <Sparkles className="w-4 h-4 text-[#FDBA2D]" />
                            <span>{loc('Diseña tu experiencia', 'Design your trip')}</span>
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
                      <span>{loc('Mostrar más experiencias', 'Show more experiences')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00A6A6]" />
                    </button>
                    <p className="text-xs text-neutral-400 font-mono">
                      {loc(
                        `Mostrando ${paginatedExperiences.length} de ${filteredExperiences.length} experiencias`,
                        `Showing ${paginatedExperiences.length} of ${filteredExperiences.length} experiences`
                      )}
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
                    {loc(
                      'No encontramos experiencias con esos filtros',
                      'No experiences found with those filters'
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {loc(
                      'Prueba cambiando la categoría, duración o rango de precio para descubrir más opciones en El Salvador.',
                      'Try changing the category, duration tier, or price range to discover more options across El Salvador.'
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#00A6A6] hover:bg-[#009191] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{loc('Limpiar filtros', 'Clear filters')}</span>
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
