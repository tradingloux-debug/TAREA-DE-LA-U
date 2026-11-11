import React, { useState, useMemo } from 'react';
import { DEMO_ROUTES } from '../data/routes';
import { RouteCard } from '../components/routes/RouteCard';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../services/analytics';
import {
  Compass,
  Sparkles,
  BedDouble,
  CarFront,
  MapPinned,
  Headphones,
  Waves,
  Calendar,
  Filter,
  CheckCircle2,
  ArrowRight,
  Clock,
  RotateCcw
} from 'lucide-react';
import { BackButton } from '../components/common/BackButton';

type CategoryFilter = 'all' | 'cultural' | 'naturaleza' | 'aventura' | 'gastronomica' | 'playa' | 'familiar' | 'combinada';
type DurationFilter = 'all' | 1 | 2 | 3 | 5 | 7;

export const RoutesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { loc } = useLanguage();
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const surfCityFeaturedRoute = useMemo(() => {
    return DEMO_ROUTES.find(r => r.isSurfCityCombined || r.id === 'route-surf-city-5d');
  }, []);

  const filteredRoutes = useMemo(() => {
    return DEMO_ROUTES.filter(route => {
      // Duration filter
      if (selectedDuration !== 'all') {
        if (selectedDuration === 7 && route.days < 7) return false;
        if (selectedDuration !== 7 && route.days !== selectedDuration) return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        if (route.category !== selectedCategory) return false;
      }
      return true;
    });
  }, [selectedDuration, selectedCategory]);

  const hasActiveFilters = selectedDuration !== 'all' || selectedCategory !== 'all';

  const resetFilters = () => {
    setSelectedDuration('all');
    setSelectedCategory('all');
  };

  const categories = [
    { id: 'all', es: 'Todas las categorías', en: 'All categories', pt: 'Todas as categorias' },
    { id: 'combinada', es: 'Rutas Combinadas', en: 'Combined Routes', pt: 'Rotas Combinadas' },
    { id: 'playa', es: 'Playas & Surf City', en: 'Beaches & Surf City', pt: 'Praias e Surf City' },
    { id: 'cultural', es: 'Cultura e Historia', en: 'Culture & History', pt: 'Cultura e História' },
    { id: 'naturaleza', es: 'Naturaleza & Volcanes', en: 'Nature & Volcanoes', pt: 'Natureza e Vulcões' },
    { id: 'aventura', es: 'Aventura Activa', en: 'Active Adventure', pt: 'Aventura Ativa' },
    { id: 'gastronomica', es: 'Gastronómica & Café', en: 'Gastronomy & Coffee', pt: 'Gastronomia e Café' },
    { id: 'familiar', es: 'GIA en Familia', en: 'GIA with Family', pt: 'GIA em Família' },
  ];

  const durations = [
    { id: 'all', label: loc('Todas las duraciones', 'All durations', 'Todas as durações') },
    { id: 1, label: loc('1 día (Full Day)', '1 day (Full Day)', '1 dia (Full Day)') },
    { id: 2, label: loc('2 días / 1 noche', '2 days / 1 night', '2 dias / 1 noite') },
    { id: 3, label: loc('3 días / 2 noches', '3 days / 2 nights', '3 dias / 2 noites') },
    { id: 5, label: loc('5 días / 4 noches', '5 days / 4 nights', '5 dias / 4 noites') },
    { id: 7, label: loc('7+ días (Gran Tour)', '7+ days (Grand Tour)', '7+ dias (Grande Tour)') },
  ];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Back navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={loc('Volver al inicio', 'Back to Home', 'Voltar ao início')}
          />
        </div>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B8C8]/15 border border-[#00B8C8]/30 text-[#007C87] text-xs font-bold font-mono">
            <Compass className="w-3.5 h-3.5 text-[#00B8C8]" />
            <span>{loc('Tours completos por El Salvador', 'Complete tours across El Salvador', 'Tours completos por El Salvador')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#173B59] tracking-tight font-display">
            {loc('Rutas Turísticas de El Salvador', 'Tour Routes of El Salvador', 'Rotas Turísticas de El Salvador')}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {loc(
              'Explora itinerarios completos coordinados de principio a fin: alojamiento seleccionado, transporte privado entre destinos, guías locales certificados y experiencias auténticas sin preocuparte por la logística.',
              'Explore complete itineraries coordinated from start to finish: selected lodging, private ground transit between destinations, certified local guides, and authentic experiences without logistical worries.',
              'Explore itinerários completos coordenados do início ao fim: hospedagem selecionada, transporte privado entre destinos, guias locais certificados e experiências autênticas sem preocupações logísticas.'
            )}
          </p>
        </div>

        {/* Value props badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: BedDouble, es: 'Alojamiento seleccionado', en: 'Selected lodging', pt: 'Hospedagem selecionada', color: 'text-[#00B8C8]' },
            { icon: CarFront, es: 'Movilidad 100% coordinada', en: '100% Coordinated transport', pt: 'Transporte 100% coordenado', color: 'text-[#39B98A]' },
            { icon: MapPinned, es: 'Experiencias y entradas', en: 'Experiences & tickets', pt: 'Experiências e ingressos', color: 'text-[#FF6B57]' },
            { icon: Headphones, es: 'Asistencia GIA 24/7', en: 'GIA 24/7 travel support', pt: 'Suporte GIA 24/7', color: 'text-[#FFC857]' },
          ].map(item => (
            <div key={item.es} className="bg-white rounded-2xl border border-amber-100/80 p-4 flex items-center gap-3 text-xs font-bold text-[#173B59] shadow-2xs">
              <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
              <span>{loc(item.es, item.en, item.pt)}</span>
            </div>
          ))}
        </div>

        {/* Featured Route Spotlight: Surf City 1 + Surf City 2 */}
        {surfCityFeaturedRoute && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#173B59] via-[#0E5171] to-[#00B8C8] p-6 sm:p-8 text-white shadow-xl border border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC857] text-[#173B59] text-xs font-black uppercase tracking-wider">
                    <Waves className="w-3.5 h-3.5 text-[#173B59]" />
                    {loc('Producto Destacado GIA', 'GIA Featured Product', 'Produto em Destaque GIA')}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                    {loc('La Libertad + Oriente salvadoreño', 'La Libertad + Eastern Coast', 'La Libertad + Costa Leste')}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-400/20 text-[#FFC857] text-xs font-semibold">
                    {loc('Por cotizar según modalidad', 'Quote based on modality', 'Cotação por modalidade')}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                  {loc(surfCityFeaturedRoute.titleEs, surfCityFeaturedRoute.titleEn)}
                </h2>

                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-2xl">
                  {loc(
                    'La primera ruta que une integralmente las rompientes de La Libertad (El Tunco, El Zonte, El Sunzal) con el paraíso virgen de Oriente (Playa Las Flores, El Cuco, Punta Mango), conectadas por la panorámica Carretera del Litoral (CA-2).',
                    'The premier circuit seamlessly uniting the point breaks of La Libertad (El Tunco, El Zonte, El Sunzal) with the unspoiled eastern paradise (Playa Las Flores, El Cuco, Punta Mango), linked via the scenic Pacific Coastal Highway (CA-2).',
                    'O primeiro roteiro que une integralmente os picos de surfe de La Libertad com o paraíso do leste (Playa Las Flores, El Cuco, Punta Mango), pela panorâmica Rodovia do Litoral (CA-2).'
                  )}
                </p>

                {/* 5 Modalities preview */}
                <div className="pt-2">
                  <span className="text-xs font-mono font-bold text-[#FFC857] uppercase tracking-wider block mb-2">
                    {loc('5 Modalidades disponibles según tu estilo de viaje:', '5 Available modalities tailored to your travel style:', '5 Modalidades disponíveis conforme seu estilo:')}
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { es: '🏄 Surf y Aventura', en: '🏄 Surf & Adventure', pt: '🏄 Surfe e Aventura' },
                      { es: '🧘 Playas y Relajación', en: '🧘 Beaches & Relaxation', pt: '🧘 Praias e Relaxamento' },
                      { es: '🦐 Playas y Gastronomía', en: '🦐 Beaches & Gastronomy', pt: '🦐 Praias e Gastronomia' },
                      { es: '✨ Experiencia Combinada', en: '✨ Combined Experience', pt: '✨ Experiência Combinada' },
                      { es: '👨‍👩‍👧‍👦 Versión Familiar', en: '👨‍👩‍👧‍👦 Family Edition', pt: '👨‍👩‍👧‍👦 Edição Familiar' },
                    ].map(mod => (
                      <span key={mod.es} className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15">
                        {loc(mod.es, mod.en, mod.pt)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(`/rutas/${surfCityFeaturedRoute.slug}`)}
                  className="px-6 py-3.5 bg-[#FF6B57] hover:bg-[#E85541] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#FF6B57]/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{loc('Ver Itinerario Completo', 'View Full Itinerary', 'Ver Itinerário Completo')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/planea-con-gia?route=${surfCityFeaturedRoute.slug}`)}
                  className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
                  <span>{loc('Solicitar Cotización', 'Request Quote', 'Solicitar Cotação')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DUAL FILTERS SECTION: Duration & Category */}
        <div className="bg-white rounded-3xl border border-amber-100/90 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#00B8C8]" />
              <h3 className="text-sm font-bold text-[#173B59] uppercase tracking-wider">
                {loc('Filtros conjuntos de Rutas', 'Joint Route Filters', 'Filtros combinados de Rotas')}
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-neutral-500 hover:text-[#00B8C8] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{loc('Limpiar filtros', 'Reset filters', 'Limpar filtros')}</span>
              </button>
            )}
          </div>

          {/* Filter 1: Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#173B59] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00B8C8]" />
                {loc('1. Filtrar por Duración:', '1. Filter by Duration:', '1. Filtrar por Duração:')}
              </span>
              <button
                type="button"
                onClick={() => navigate('/planea-con-gia')}
                className="text-xs font-bold text-[#FF6B57] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#FFC857]" />
                <span>{loc('¿Quieres duración personalizada?', 'Need custom duration?', 'Quer duração personalizada?')}</span>
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {durations.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDuration(opt.id as any)}
                  className={`px-3.5 py-2 rounded-xl border transition-all font-semibold whitespace-nowrap cursor-pointer ${
                    selectedDuration === opt.id
                      ? 'bg-[#00B8C8] text-white border-[#00B8C8] shadow-md shadow-[#00B8C8]/20 ring-2 ring-[#00B8C8]/20'
                      : 'bg-[#FFFDF8] text-neutral-700 border-neutral-200 hover:border-[#00B8C8]/40'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Category */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#173B59] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#39B98A]" />
              {loc('2. Filtrar por Categoría / Temática:', '2. Filter by Category / Theme:', '2. Filtrar por Categoria / Tema:')}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-2 rounded-xl border transition-all font-semibold whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#173B59] text-white border-[#173B59] shadow-md shadow-[#173B59]/20 ring-2 ring-[#173B59]/20'
                      : 'bg-[#FFFDF8] text-neutral-700 border-neutral-200 hover:border-[#173B59]/40'
                  }`}
                >
                  {loc(cat.es, cat.en, cat.pt)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results counter */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#173B59]">
            <span className="font-mono text-base font-black text-[#00B8C8] mr-1.5">
              {filteredRoutes.length}
            </span>
            {loc('rutas encontradas', 'routes found', 'rotas encontradas')}
          </p>
        </div>

        {/* Routes Grid */}
        {filteredRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map(route => (
              <RouteCard
                key={route.id}
                route={route}
                onCustomize={() => {
                  trackEvent('route_personalization_started', { slug: route.slug });
                  navigate(`/planea-con-gia?route=${route.slug}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-200 p-10 text-center space-y-4">
            <Compass className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#173B59]">
              {loc('No encontramos rutas con esa combinación exacta', 'No routes match this exact combination', 'Não encontramos rotas com essa combinação exata')}
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              {loc(
                'Prueba ajustando la duración o la categoría, o crea una ruta completamente a tu medida.',
                'Try adjusting the duration or category, or create a completely tailored route with us.',
                'Tente ajustar a duração ou categoria, ou crie uma rota personalizada conosco.'
              )}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl cursor-pointer"
              >
                {loc('Ver todas las rutas', 'View all routes', 'Ver todas as rotas')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/planea-con-gia')}
                className="px-4 py-2 bg-[#FF6B57] hover:bg-[#E85541] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {loc('Crear ruta personalizada', 'Build custom route', 'Criar rota personalizada')}
              </button>
            </div>
          </div>
        )}

        {/* Personalized Banner */}
        <div className="bg-gradient-to-r from-[#173B59] via-[#10486D] to-[#00B8C8] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#FFC857] uppercase tracking-widest">
              {loc('¿Quieres una ruta exclusiva?', 'Would you like a private route?', 'Deseja uma rota exclusiva?')}
            </span>
            <h3 className="text-2xl font-bold font-display text-white">
              {loc('Diseña un viaje único con Crea con GIA', 'Design a unique trip with Create with GIA', 'Crie uma viagem única com Crie com GIA')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {loc(
                'Dinos cuántos días tienes, quiénes viajan y qué deseas vivir. GIA preparará una propuesta personalizada de alojamiento, movilidad y experiencias.',
                'Tell us your dates, travelers, and interests. GIA will prepare a customized lodging, transportation, and experience proposal.',
                'Diga-nos quantos dias tem, quem viaja e o que deseja viver. A GIA preparará uma proposta personalizada de hospedagem, mobilidade e experiências.'
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/planea-con-gia')}
            className="px-6 py-3.5 bg-[#FF6B57] hover:bg-[#E85541] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#FF6B57]/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-[#FFC857]" />
            <span>{loc('Crear mi viaje personalizado', 'Create my custom trip', 'Criar minha viagem personalizada')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
