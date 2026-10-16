import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  DESTINATIONS_360,
  Destination360,
  DestinationCategory,
  DestinationViewMode,
  DestinationPhotoInfo
} from '../../data/destinations360';
import { VirtualTour360 } from '../common/VirtualTour360';
import {
  Compass,
  Sparkles,
  Camera,
  Maximize2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Eye,
  Info,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  FileCheck
} from 'lucide-react';

export const ImmersiveSection: React.FC = () => {
  const { navigate } = useRouter();
  const { language, loc } = useLanguage();
  const l = (es: string, en: string, pt?: string) => loc(es, en, pt);

  const [viewMode, setViewMode] = useState<DestinationViewMode>('todos');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('todos');
  const [showAuditTable, setShowAuditTable] = useState(false);

  // Active 360 Modal
  const [activeTourModal, setActiveTourModal] = useState<{
    isOpen: boolean;
    title: string;
    location: string;
    image: string;
    sourceUrl?: string;
    license?: string;
    catalogSlug?: string;
  }>({
    isOpen: false,
    title: '',
    location: '',
    image: '',
  });

  // Active Gallery Modal (for destinations without 360)
  const [activeGalleryModal, setActiveGalleryModal] = useState<{
    isOpen: boolean;
    destination: Destination360 | null;
    activePhotoIndex: number;
  }>({
    isOpen: false,
    destination: null,
    activePhotoIndex: 0,
  });

  // Filter destinations
  const filteredDestinations = DESTINATIONS_360.filter((dest) => {
    // Mode filter
    if (viewMode === 'solo_360' && !dest.hasReal360) return false;
    if (viewMode === 'galeria_fotos' && dest.hasReal360) return false;

    // Category filter
    if (selectedCategory !== 'todos' && dest.category !== selectedCategory) return false;

    return true;
  });

  const count360 = DESTINATIONS_360.filter((d) => d.hasReal360).length;
  const countGallery = DESTINATIONS_360.filter((d) => !d.hasReal360).length;

  return (
    <section id="experiencias-360" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#063A5B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 backdrop-blur-md text-teal-300 text-xs font-mono font-bold uppercase tracking-wider border border-teal-500/30">
              <Compass className="w-4 h-4 text-teal-400 animate-spin-slow" />
              <span>
                {l(
                  'Experiencias 360° & Destinos Reales de El Salvador',
                  '360° Tours & Authentic Salvadoran Destinations',
                  'Experiências 360° & Destinos Reais de El Salvador'
                )}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display leading-tight">
              {l(
                'Explora El Salvador en 360° interactivo y fotografías reales',
                'Explore El Salvador in interactive 360° & authentic photography',
                'Explore El Salvador em 360° interativo e fotografias reais'
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {l(
                'Descubre los 15 destinos más emblemáticos del país con rigor y honestidad: fotografías esféricas 360° panorámicas reales para los sitios con captura interactiva verificada, y galerías documentales auténticas sin imágenes duplicadas ni recorridos artificiales.',
                'Discover El Salvador’s 15 most iconic destinations with authenticity and transparency: verified 360° spherical panoramas for featured sites, and genuine documentary galleries without duplicated or deceptive images.',
                'Descubra os 15 destinos mais emblemáticos do país com rigor e autenticidade: fotografias esféricas 360° panorâmicas reais para locais com captura interativa verificada e galerias documentais autênticas sem imagens duplicadas ou passeios artificiais.'
              )}
            </p>

            {/* Badges of authenticity */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {l(
                    `${count360} Experiencias 360° esféricas reales`,
                    `${count360} Real spherical 360° tours`,
                    `${count360} Experiências 360° esféricas reais`
                  )}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-300">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {l(
                    `${countGallery} Galerías documentales verificadas`,
                    `${countGallery} Verified documentary galleries`,
                    `${countGallery} Galerias documentais verificadas`
                  )}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {l(
                    '0% Imágenes duplicadas o inventadas',
                    '0% Duplicated or generic photos',
                    '0% Imagens duplicadas ou inventadas'
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Transparency Audit Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setShowAuditTable(!showAuditTable)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-teal-400/50"
            >
              <FileCheck className="w-4 h-4 text-teal-300" />
              <span>
                {showAuditTable
                  ? l('Ocultar tabla de fuentes y licencias', 'Hide sources & license audit', 'Ocultar tabela de fontes e licenças')
                  : l(
                      'Ver tabla de fuentes y licencias (15 destinos)',
                      'View sources & license audit (15 destinations)',
                      'Ver tabela de fontes e licenças (15 destinos)'
                    )}
              </span>
            </button>
          </div>
        </div>

        {/* Audit Table Drawer if expanded */}
        {showAuditTable && (
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-3xl p-6 sm:p-8 animate-in fade-in duration-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span>
                    {l(
                      'Auditoría de Fuentes, Licencias y Derechos Comerciales',
                      'Image Sources, Licensing & Commercial Rights Audit',
                      'Auditoria de Fontes, Licenças e Direitos Comerciais'
                    )}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {l(
                    'Transparencia total: Cada destino cuenta con autor acreditado, enlace a Wikimedia Commons / fuentes abiertas y verificación de uso comercial.',
                    'Full transparency: Every destination features accredited authors, Wikimedia Commons links, and verified commercial usage rights.',
                    'Transparência total: Cada destino conta com autor creditado, link para Wikimedia Commons / fontes abertas e verificação de uso comercial.'
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAuditTable(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[11px] uppercase tracking-wider text-teal-300 border-b border-white/10 bg-slate-950/60">
                  <tr>
                    <th className="py-3 px-3">{l('Destino', 'Destination', 'Destino')}</th>
                    <th className="py-3 px-3">{l('Tipo de Imagen', 'Image Type', 'Tipo de Imagem')}</th>
                    <th className="py-3 px-3">{l('Fuente Original', 'Original Source', 'Fonte Original')}</th>
                    <th className="py-3 px-3">{l('Licencia / Derechos', 'License / Rights', 'Licença / Direitos')}</th>
                    <th className="py-3 px-3">{l('Estado de Integración', 'Integration Status', 'Status de Integração')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {DESTINATIONS_360.map((dest) => (
                    <tr key={dest.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">
                        {language === 'es' ? dest.nameEs : language === 'pt' ? dest.nameEs : dest.nameEn}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {dest.departmentEs}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {dest.hasReal360 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                            <Compass className="w-3 h-3" />
                            {l('360° Esférico Real', 'Real 360° Spherical', '360° Esférico Real')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            <Camera className="w-3 h-3" />
                            {l('Fotografía Documental', 'Documentary Photography', 'Fotografia Documental')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <a
                          href={dest.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-400 hover:underline flex items-center gap-1"
                        >
                          <span>Wikimedia Commons</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-[11px] text-slate-300">{dest.license}</span>
                        <span className="block text-[10px] text-emerald-400 font-sans">
                          {l('Comercial permitido', 'Commercial allowed', 'Comercial permitido')}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {dest.hasReal360 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {l('Implementado (Visor 360° Activo)', 'Implemented (Active 360°)', 'Implementado (Visor 360° Ativo)')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-300 text-[11px] font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            {l('Galería Documental (360° en proceso)', 'Documentary Gallery (360° Pending)', 'Galeria Documental (360° em processo)')}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filter Navigation Bars */}
        <div className="space-y-4 pt-2">
          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mr-2">
              {l('Modo de visualización:', 'Display mode:', 'Modo de visualização:')}
            </span>

            {[
              {
                id: 'todos',
                label: l(`Todos los destinos (${DESTINATIONS_360.length})`, `All destinations (${DESTINATIONS_360.length})`, `Todos os destinos (${DESTINATIONS_360.length})`),
              },
              {
                id: 'solo_360',
                label: l(`Experiencias 360° Verificadas (${count360})`, `Verified 360° Tours (${count360})`, `Experiências 360° Verificadas (${count360})`),
                icon: Compass,
              },
              {
                id: 'galeria_fotos',
                label: l(`Galerías Fotográficas Reales (${countGallery})`, `Real Photo Galleries (${countGallery})`, `Galerias Fotográficas Reais (${countGallery})`),
                icon: Camera,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewMode(tab.id as DestinationViewMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00A6A6] text-white shadow-lg shadow-teal-900/30 ring-2 ring-teal-400/40'
                      : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mr-2">
              {l('Filtrar por categoría:', 'Filter by category:', 'Filtrar por categoria:')}
            </span>

            {[
              { id: 'todos', label: l('Todas las categorías', 'All categories', 'Todas as categorias') },
              { id: 'naturaleza', label: l('Naturaleza & Volcanes', 'Nature & Volcanoes', 'Natureza & Vulcões') },
              { id: 'playas', label: l('Playas & Surf', 'Beaches & Surf', 'Praias & Surf') },
              { id: 'cultura', label: l('Cultura & Arqueología', 'Culture & Archaeology', 'Cultura & Arqueologia') },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as DestinationCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid of Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-slate-900/90 rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between hover:border-teal-400/50 transition-all group"
            >
              {/* Media Card Top */}
              <div className="p-3">
                <div className="relative h-[260px] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                  <img
                    src={dest.coverImage}
                    alt={language === 'es' ? dest.nameEs : dest.nameEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

                  {/* Mode Badge Floating */}
                  <div className="absolute top-3 left-3 z-10">
                    {dest.hasReal360 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg">
                        <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                        <span>360° ESFÉRICO REAL</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/95 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg">
                        <Camera className="w-3.5 h-3.5" />
                        <span>GALERÍA DOCUMENTAL</span>
                      </span>
                    )}
                  </div>

                  {/* Location Pin */}
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
                    {dest.departmentEs}
                  </div>

                  {/* Quick Action Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-2xs">
                    {dest.hasReal360 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTourModal({
                            isOpen: true,
                            title: language === 'es' ? dest.nameEs : language === 'pt' ? dest.nameEs : dest.nameEn,
                            location: `${dest.departmentEs}, El Salvador`,
                            image: dest.panorama360Url || dest.coverImage,
                            sourceUrl: dest.sourceUrl,
                            license: dest.license,
                            catalogSlug: dest.catalogSlug,
                          })
                        }
                        className="px-4 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black shadow-2xl flex items-center gap-2 transform transition-transform scale-95 group-hover:scale-100 cursor-pointer"
                      >
                        <Compass className="w-4 h-4" />
                        <span>{l('Explorar en 360°', 'Explore in 360°', 'Explorar em 360°')}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveGalleryModal({
                            isOpen: true,
                            destination: dest,
                            activePhotoIndex: 0,
                          })
                        }
                        className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-2xl flex items-center gap-2 transform transition-transform scale-95 group-hover:scale-100 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{l('Ver galería fotográfica', 'View photo gallery', 'Ver galeria fotográfica')}</span>
                      </button>
                    )}
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-base font-bold text-white drop-shadow-md leading-snug">
                      {language === 'es' ? dest.nameEs : language === 'pt' ? dest.nameEs : dest.nameEn}
                    </p>
                    <p className="text-[11px] text-teal-300 font-medium mt-0.5">
                      {dest.departmentEs}, El Salvador
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body & Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {language === 'es' ? dest.shortDescEs : language === 'pt' ? dest.shortDescEs : dest.shortDescEn}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(language === 'es' || language === 'pt' ? dest.highlightsEs : dest.highlightsEn).map((h, idx) => (
                      <span
                        key={idx}
                        className="text-[10.5px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Attribution Source */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10.5px] text-slate-400">
                    <span className="truncate max-w-[180px]">{dest.author}</span>
                    <span className="font-mono text-teal-400">{dest.license}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {dest.hasReal360 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTourModal({
                          isOpen: true,
                          title: language === 'es' ? dest.nameEs : language === 'pt' ? dest.nameEs : dest.nameEn,
                          location: `${dest.departmentEs}, El Salvador`,
                          image: dest.panorama360Url || dest.coverImage,
                          sourceUrl: dest.sourceUrl,
                          license: dest.license,
                          catalogSlug: dest.catalogSlug,
                        })
                      }
                      className="w-full py-2.5 px-4 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>{l('Explorar en 360°', 'Explore in 360°', 'Explorar em 360°')}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGalleryModal({
                          isOpen: true,
                          destination: dest,
                          activePhotoIndex: 0,
                        })
                      }
                      className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-slate-950" />
                      <span>
                        {l('Ver galería fotográfica real', 'View real photo gallery', 'Ver galeria fotográfica real')}
                      </span>
                    </button>
                  )}

                  {dest.catalogSlug && (
                    <button
                      type="button"
                      onClick={() => navigate(`/experiencias/${dest.catalogSlug}`)}
                      className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-medium rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>
                        {l('Ver tour disponible en catálogo', 'View tour in catalog', 'Ver passeio disponível no catálogo')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360 Fullscreen Tour Modal */}
      <VirtualTour360
        isOpen={activeTourModal.isOpen}
        onClose={() => setActiveTourModal({ isOpen: false, title: '', location: '', image: '' })}
        title={activeTourModal.title}
        locationName={activeTourModal.location}
        imageSrc={activeTourModal.image}
      />

      {/* Photographic Gallery Modal (For destinations without 360) */}
      {activeGalleryModal.isOpen && activeGalleryModal.destination && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-200 select-none"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryModal({ isOpen: false, destination: null, activePhotoIndex: 0 })
                }
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                aria-label={l('Cerrar galería', 'Close gallery', 'Fechar galeria')}
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  <Camera className="w-3 h-3" />
                  <span>
                    {l(
                      'Galería fotográfica documental real',
                      'Authentic documentary gallery',
                      'Galeria fotográfica documental real'
                    )}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {language === 'es' || language === 'pt'
                    ? activeGalleryModal.destination.nameEs
                    : activeGalleryModal.destination.nameEn}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeGalleryModal.destination.departmentEs}, El Salvador
                </p>
              </div>
            </div>

            {activeGalleryModal.destination.catalogSlug && (
              <button
                type="button"
                onClick={() => {
                  const slug = activeGalleryModal.destination?.catalogSlug;
                  setActiveGalleryModal({ isOpen: false, destination: null, activePhotoIndex: 0 });
                  if (slug) navigate(`/experiencias/${slug}`);
                }}
                className="hidden sm:flex px-4 py-2 bg-[#00A6A6] hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md items-center gap-1.5 cursor-pointer"
              >
                <span>{l('Ver tour en catálogo', 'View tour in catalog', 'Ver passeio no catálogo')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Main Gallery Viewer Area */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-between p-4 sm:p-8 gap-6 overflow-y-auto">
            {/* Large Active Photo Container */}
            <div className="relative flex-1 w-full max-w-4xl h-[340px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden bg-slate-950 border border-white/15 flex items-center justify-center">
              {activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex] && (
                <img
                  src={
                    activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex].url
                  }
                  alt={
                    language === 'es' || language === 'pt'
                      ? activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .captionEs
                      : activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .captionEn
                  }
                  className="w-full h-full object-contain"
                />
              )}

              {/* Prev/Next arrows if multiple photos */}
              {activeGalleryModal.destination.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGalleryModal((prev) => ({
                        ...prev,
                        activePhotoIndex:
                          prev.activePhotoIndex === 0
                            ? (prev.destination?.gallery.length || 1) - 1
                            : prev.activePhotoIndex - 1,
                      }))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                    aria-label={l('Foto anterior', 'Previous photo', 'Foto anterior')}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveGalleryModal((prev) => ({
                        ...prev,
                        activePhotoIndex:
                          prev.activePhotoIndex === (prev.destination?.gallery.length || 1) - 1
                            ? 0
                            : prev.activePhotoIndex + 1,
                      }))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                    aria-label={l('Foto siguiente', 'Next photo', 'Próxima foto')}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Sidebar Details and Thumbnails */}
            <div className="w-full lg:w-80 space-y-5 bg-slate-900/90 rounded-3xl border border-white/10 p-5 text-white">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                  {l('Descripción del destino', 'Destination Overview', 'Descrição do destino')}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'es' || language === 'pt'
                    ? activeGalleryModal.destination.fullDescEs
                    : activeGalleryModal.destination.fullDescEn}
                </p>
              </div>

              {/* Status explanation */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>
                    {l('Compromiso de autenticidad', 'Authenticity pledge', 'Compromisso de autenticidade')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {l(
                    'Para proteger la veracidad turística, GIA Experiences no inventa fotos 360° ni utiliza imágenes de otros lugares. Este destino cuenta con fotografías reales verificadas mientras se completa la captura esférica 360°.',
                    'To ensure truthful representation, GIA Experiences does not use duplicated or artificial 360° renders. This site features authentic photographs while our 360° spherical capture is in progress.',
                    'Para proteger a veracidade turística, a GIA Experiences não inventa fotos 360° nem utiliza imagens de outros lugares. Este destino conta com fotografias reais verificadas enquanto se completa a captura esférica 360°.'
                  )}
                </p>
              </div>

              {/* Photo Caption & Credits */}
              {activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex] && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-1 text-xs">
                  <p className="font-semibold text-white">
                    {language === 'es' || language === 'pt'
                      ? activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .captionEs
                      : activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .captionEn}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex].author}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[10px] text-teal-400">
                    <span>
                      {
                        activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .license
                      }
                    </span>
                    <a
                      href={
                        activeGalleryModal.destination.gallery[activeGalleryModal.activePhotoIndex]
                          .sourceUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline flex items-center gap-0.5"
                    >
                      <span>Wikimedia</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Thumbnails Row */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {l(
                    `Fotografías disponibles (${activeGalleryModal.destination.gallery.length})`,
                    `Available photos (${activeGalleryModal.destination.gallery.length})`,
                    `Fotografias disponíveis (${activeGalleryModal.destination.gallery.length})`
                  )}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {activeGalleryModal.destination.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setActiveGalleryModal((prev) => ({
                          ...prev,
                          activePhotoIndex: idx,
                        }))
                      }
                      className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeGalleryModal.activePhotoIndex === idx
                          ? 'border-teal-400 scale-102 ring-2 ring-teal-400/40'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
