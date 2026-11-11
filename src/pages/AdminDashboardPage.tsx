import React, { useState } from 'react';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { DEMO_ROUTES } from '../data/routes';
import { Experience } from '../types/experience';
import { TourRoute } from '../types/routes';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { BackButton } from '../components/common/BackButton';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  Compass,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Eye,
  Edit3,
  Flame,
  Check,
  Layers,
  PhoneCall
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { loc } = useLanguage();
  const { navigate } = useRouter();

  // Local state initialized from catalog to allow live simulation of admin updates
  const [experiences, setExperiences] = useState<Experience[]>(DEMO_EXPERIENCES);
  const [routes, setRoutes] = useState<TourRoute[]>(DEMO_ROUTES);
  const [activeTab, setActiveTab] = useState<'experiences' | 'routes' | 'quotes'>('experiences');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'on_quote' | 'in_development'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock quote requests storage from planner
  const [quoteRequests] = useState([
    {
      id: 'COT-2026-001',
      date: '11 Nov 2026',
      clientName: 'Carlos & Sofia Méndez',
      channel: 'WhatsApp Web',
      routeTitle: 'Surf City Experience (La Libertad + Oriente 5D)',
      modality: 'Surf y Aventura',
      travelers: 2,
      estimatedBudget: '$790 USD',
      status: 'Pendiente de confirmación',
      phone: '+503 7123-4567',
    },
    {
      id: 'COT-2026-002',
      date: '10 Nov 2026',
      clientName: 'Familia Henderson (EE. UU.)',
      channel: 'Crea con GIA',
      routeTitle: 'GIA en Familia: Volcanes, Parques y Lago',
      modality: 'Versión Familiar (2 adultos + 2 niños)',
      travelers: 4,
      estimatedBudget: '$1,250 USD',
      status: 'Cotización enviada',
      phone: '+1 415 555-0199',
    },
    {
      id: 'COT-2026-003',
      date: '09 Nov 2026',
      clientName: 'Lucas Ferreira (Brasil)',
      channel: 'Crea con GIA',
      routeTitle: 'Travesía Costera y Cafetales Pacamara (7D)',
      modality: 'Experiencia Combinada',
      travelers: 1,
      estimatedBudget: '$540 USD',
      status: 'En proceso',
      phone: '+55 11 98765-4321',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleTrending = (expId: string) => {
    setExperiences(prev =>
      prev.map(exp => {
        if (exp.id === expId) {
          const isCurrentlyTrending = exp.pillarCategory === 'en_tendencia';
          const nextPillar = isCurrentlyTrending ? 'imperdibles' : 'en_tendencia';
          showToast(
            isCurrentlyTrending
              ? loc('Se quitó de "En Tendencia"', 'Removed from "Trending"', 'Removido de "Em Alta"')
              : loc('Se marcó como "En Tendencia"', 'Marked as "Trending"', 'Marcado como "Em Alta"')
          );
          return {
            ...exp,
            pillarCategory: nextPillar,
            trendingReasonEs: !isCurrentlyTrending && !exp.trendingReasonEs
              ? 'Destacado por alta demanda de la temporada turística'
              : exp.trendingReasonEs,
          };
        }
        return exp;
      })
    );
  };

  const toggleRouteStatus = (routeId: string) => {
    setRoutes(prev =>
      prev.map(r => {
        if (r.id === routeId) {
          const nextStatus = r.pricingStatus === 'on_quote' ? 'confirmed' : 'on_quote';
          showToast(
            nextStatus === 'on_quote'
              ? loc('Ruta establecida en "Por cotizar"', 'Route set to "On Quote"', 'Rota definida como "Sob consulta"')
              : loc('Ruta establecida en "Tarifa Confirmada"', 'Route set to "Confirmed Rate"', 'Rota definida como "Tarifa Confirmada"')
          );
          return { ...r, pricingStatus: nextStatus };
        }
        return r;
      })
    );
  };

  const filteredExperiences = experiences.filter(exp => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = exp.titleEs.toLowerCase().includes(q) || exp.location.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (statusFilter === 'published') return exp.active !== false;
    if (statusFilter === 'on_quote') return exp.isPriceOnQuote || exp.pricingStatus === 'on_quote';
    return true;
  });

  const trendingCount = experiences.filter(e => e.pillarCategory === 'en_tendencia').length;
  const quoteCount = quoteRequests.length;

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation */}
        <div>
          <BackButton
            fallbackPath="/"
            label={loc('Volver al inicio', 'Back to Home', 'Voltar ao início')}
          />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B59] text-white text-xs font-mono font-bold mb-2 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>GIA Experiences · Backoffice Operador</span>
            </div>
            <h1 className="text-3xl font-black text-[#173B59] tracking-tight font-display">
              {loc('Panel de Administración y Control', 'Tour Operator Admin Dashboard', 'Painel de Administração do Operador')}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              {loc(
                'Gestión de catálogo, estado de publicación, control de "En Tendencia" y cotizaciones recibidas.',
                'Catalog management, publication status, "Trending" toggles, and incoming quote requests.',
                'Gestão do catálogo, status de publicação, controle de "Em Alta" e cotações recebidas.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{loc('Sistema Operativo Activo', 'System Operational', 'Sistema Operacional Ativo')}</span>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
            <span className="text-xs font-semibold text-neutral-400 block">{loc('Total Experiencias', 'Total Experiences', 'Total Experiências')}</span>
            <span className="text-2xl font-black font-mono text-[#173B59] mt-1 block">{experiences.length}</span>
            <span className="text-[11px] text-[#00B8C8] font-bold mt-0.5 block">{loc('100% con transporte', '100% with transport', '100% com transporte')}</span>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
            <span className="text-xs font-semibold text-neutral-400 block">{loc('Rutas Multidía', 'Multi-day Routes', 'Rotas Multidias')}</span>
            <span className="text-2xl font-black font-mono text-[#173B59] mt-1 block">{routes.length}</span>
            <span className="text-[11px] text-[#39B98A] font-bold mt-0.5 block">{loc('Incluye Surf City 1+2', 'Includes Surf City 1+2', 'Inclui Surf City 1+2')}</span>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
            <span className="text-xs font-semibold text-neutral-400 block">{loc('En Tendencia Activas', 'Active Trending', 'Ativas em Alta')}</span>
            <span className="text-2xl font-black font-mono text-rose-600 mt-1 block flex items-center gap-1.5">
              <Flame className="w-5 h-5 fill-rose-500 text-rose-500" />
              <span>{trendingCount}</span>
            </span>
            <span className="text-[11px] text-neutral-500 mt-0.5 block">{loc('Filtro 2026 destacado', '2026 Featured filter', 'Destaque de 2026')}</span>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
            <span className="text-xs font-semibold text-neutral-400 block">{loc('Cotizaciones Recibidas', 'Quotes Received', 'Cotações Recebidas')}</span>
            <span className="text-2xl font-black font-mono text-[#FFC857] mt-1 block">{quoteCount}</span>
            <span className="text-[11px] text-amber-700 font-bold mt-0.5 block">{loc('Crea con GIA & Rutas', 'Create with GIA & Routes', 'Crie com GIA e Rotas')}</span>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('experiences')}
            className={`pb-3 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'experiences'
                ? 'border-[#00B8C8] text-[#173B59]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <Compass className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Experiencias y Tendencias', 'Experiences & Trending', 'Experiências e Tendências')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('routes')}
            className={`pb-3 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'routes'
                ? 'border-[#00B8C8] text-[#173B59]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <Layers className="w-4 h-4 text-[#39B98A]" />
            <span>{loc('Rutas Turísticas', 'Tour Routes', 'Rotas Turísticas')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'border-[#00B8C8] text-[#173B59]'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <FileText className="w-4 h-4 text-[#FF6B57]" />
            <span>{loc('Cotizaciones Recibidas', 'Quotes Inbox', 'Caixa de Cotações')}</span>
          </button>
        </div>

        {/* TAB 1: EXPERIENCIAS */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={loc('Buscar experiencia o anfitrión...', 'Search experience or host...', 'Buscar experiência ou anfitrião...')}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 text-xs text-neutral-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00B8C8]"
                />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 font-semibold">{loc('Filtrar:', 'Filter:', 'Filtrar:')}</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-700"
                >
                  <option value="all">{loc('Todas las experiencias', 'All experiences', 'Todas as experiências')}</option>
                  <option value="published">{loc('Solo activas', 'Only active', 'Apenas ativas')}</option>
                  <option value="on_quote">{loc('Por cotizar', 'On quote', 'Sob consulta')}</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-bold">{loc('Experiencia / Destino', 'Experience / Destination', 'Experiência / Destino')}</th>
                      <th className="py-3 px-4 font-bold">{loc('Categoría / Pilar', 'Category / Pillar', 'Categoria / Pilar')}</th>
                      <th className="py-3 px-4 font-bold">{loc('Precio / Estado', 'Price / Status', 'Preço / Status')}</th>
                      <th className="py-3 px-4 font-bold">{loc('En Tendencia', 'Trending', 'Em Alta')}</th>
                      <th className="py-3 px-4 font-bold text-right">{loc('Acciones', 'Actions', 'Ações')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredExperiences.slice(0, 15).map((exp) => {
                      const isTrending = exp.pillarCategory === 'en_tendencia';
                      return (
                        <tr key={exp.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#173B59] block line-clamp-1">{exp.titleEs}</span>
                            <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#00B8C8]" />
                              {exp.location}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10.5px] font-bold block w-fit mb-1">
                              {exp.category}
                            </span>
                            {exp.pillarCategory && (
                              <span className="text-[10px] text-neutral-500 font-semibold">
                                Pilar: {exp.pillarCategory}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-sm text-[#173B59] block">
                              ${exp.price} USD
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold block">
                              {loc('Transporte incluido', 'Transport included', 'Transporte incluído')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => toggleTrending(exp.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                isTrending
                                  ? 'bg-rose-500 text-white shadow-xs'
                                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                              }`}
                            >
                              <Flame className={`w-3.5 h-3.5 ${isTrending ? 'fill-white' : 'text-neutral-400'}`} />
                              <span>{isTrending ? loc('En Tendencia', 'Trending', 'Em Alta') : loc('Activar', 'Activate', 'Ativar')}</span>
                            </button>
                            {exp.trendingReasonEs && (
                              <span className="text-[10px] text-neutral-400 block mt-1 line-clamp-1 max-w-[200px]">
                                {exp.trendingReasonEs}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => navigate(`/experiencias/${exp.slug}`)}
                              className="px-2.5 py-1 text-neutral-600 hover:text-[#00B8C8] font-bold text-xs rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{loc('Ver', 'View', 'Ver')}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RUTAS */}
        {activeTab === 'routes' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-bold">{loc('Ruta Turística', 'Tour Route', 'Rota Turística')}</th>
                      <th className="py-3 px-4 font-bold">{loc('Duración / Categoría', 'Duration / Category', 'Duração / Categoria')}</th>
                      <th className="py-3 px-4 font-bold">{loc('Precio / Estado Cotización', 'Price / Pricing Status', 'Preço / Status Cotação')}</th>
                      <th className="py-3 px-4 font-bold text-right">{loc('Acciones', 'Actions', 'Ações')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {routes.map((route) => {
                      const isOnQuote = route.pricingStatus === 'on_quote';
                      return (
                        <tr key={route.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-4 px-4 max-w-sm">
                            <span className="font-bold text-[#173B59] block text-sm">{route.titleEs}</span>
                            <span className="text-[11px] text-neutral-400 block mt-0.5 truncate">
                              {route.destinations.join(' → ')}
                            </span>
                            {route.isSurfCityCombined && (
                              <span className="inline-block px-2 py-0.5 rounded-md bg-[#00B8C8]/15 text-[#007C87] text-[10px] font-black uppercase mt-1">
                                {loc('Producto Surf City 1+2', 'Surf City 1+2 Product', 'Produto Surf City 1+2')}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-mono font-bold text-neutral-700 block">
                              {route.days} {loc('Días', 'Days', 'Dias')}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-semibold capitalize">
                              {route.category || 'Combinada'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleRouteStatus(route.id)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isOnQuote
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                }`}
                              >
                                {isOnQuote
                                  ? loc('Por Cotizar', 'On Quote', 'Sob Consulta')
                                  : loc(`Confirmado ($${route.price})`, `Confirmed ($${route.price})`, `Confirmado ($${route.price})`)}
                              </button>
                            </div>
                            <span className="text-[10px] text-neutral-400 block mt-1">
                              {isOnQuote ? loc('Requiere cotizar según modalidad', 'Quote per modality', 'Cotação por modalidade') : loc('Tarifa fija visible', 'Fixed public rate', 'Tarifa pública')}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => navigate(`/rutas/${route.slug}`)}
                              className="px-3 py-1 text-neutral-600 hover:text-[#00B8C8] font-bold text-xs rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{loc('Ver ruta', 'View route', 'Ver rota')}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COTIZACIONES RECIBIDAS */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#173B59] uppercase tracking-wider">
                  {loc('Bandeja de Solicitudes de Cotización Recibidas', 'Incoming Quote Requests Inbox', 'Caixa de Solicitações de Cotação Recebidas')}
                </span>
                <span className="text-xs text-neutral-400 font-mono">3 {loc('solicitudes activas', 'active requests', 'solicitações ativas')}</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {quoteRequests.map((q) => (
                  <div key={q.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/70 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#00B8C8]">{q.id}</span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-xs text-neutral-400">{q.date}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          {q.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#173B59]">{q.clientName}</h4>
                      <p className="text-xs text-neutral-600 font-medium">
                        {q.routeTitle} · <span className="text-neutral-500">{q.modality}</span>
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {q.travelers} {loc('viajeros', 'travelers', 'viajantes')} · {loc('Canal:', 'Channel:', 'Canal:')} {q.channel} · Tel: {q.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right mr-2">
                        <span className="text-[10px] text-neutral-400 block">{loc('Presupuesto estimado', 'Estimated budget', 'Orçamento estimado')}</span>
                        <span className="font-mono font-bold text-base text-[#173B59]">{q.estimatedBudget}</span>
                      </div>
                      <a
                        href={`https://wa.me/50371234567?text=Hola%20${encodeURIComponent(q.clientName)},%20te%20saludamos%20de%20GIA%20Experiences%20respecto%20a%20tu%20cotizaci%C3%B3n%20${q.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-[#39B98A] hover:bg-[#2fa076] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{loc('Contactar por WhatsApp', 'Contact via WhatsApp', 'Contatar por WhatsApp')}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#173B59] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-white/20 animate-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-[#39B98A]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
