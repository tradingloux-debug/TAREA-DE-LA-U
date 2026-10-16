import React, { useState } from 'react';
import { PlannerPreferences } from '../../types/trip';
import {
  Sparkles,
  MapPin,
  Compass,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Heart,
  Navigation,
} from 'lucide-react';

interface PlannerInspirationalPreviewProps {
  preferences?: PlannerPreferences;
  onQuickGenerate?: () => void;
}

export const PlannerInspirationalPreview: React.FC<PlannerInspirationalPreviewProps> = ({
  preferences,
  onQuickGenerate,
}) => {
  const [activeTab, setActiveTab] = useState<'mapa' | 'destinos' | 'ejemplo'>('mapa');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const selectedInterests = preferences?.interests || ['volcanes', 'playas', 'gastronomia', 'cultura'];
  const daysCount = preferences?.daysCount || 5;
  const travelersCount = preferences?.travelersCount || 2;

  // The 4 main synergy combinations from user prompt
  const synergyItems = [
    {
      id: 'volcanes',
      emoji: '🌋',
      name: 'Volcanes',
      subtitle: 'Cráteres y senderos',
      dept: 'Santa Ana & Izalco',
    },
    {
      id: 'gastronomia',
      emoji: '🍽',
      name: 'Gastronomía',
      subtitle: 'Pupusas y mercado',
      dept: 'Ruta de las Flores & San Salvador',
    },
    {
      id: 'playas',
      emoji: '🏖',
      name: 'Playa',
      subtitle: 'Surf y sol pacífico',
      dept: 'Surf City & La Libertad',
    },
    {
      id: 'cultura',
      emoji: '🎨',
      name: 'Cultura',
      subtitle: 'Añil y colonias',
      dept: 'Suchitoto & Joya de Cerén',
    },
  ];

  // Visual highlights cards with authentic local project assets
  const destinationHighlights = [
    {
      id: 'santa-ana',
      title: 'Volcán Ilamatepec & Lago de Coatepeque',
      department: 'Santa Ana',
      category: 'Naturaleza & Volcanes',
      badge: 'Icono Nacional',
      img: '/src/assets/images/exp_nature_santa_ana_1791258129967.jpg',
      desc: 'Cráter de aguas turquesas a 2,381 msnm y almuerzo con vista panorámica a la caldera volcánica.',
      interest: 'volcanes',
    },
    {
      id: 'surf-city',
      title: 'Surf City & Rompientes del Pacífico',
      department: 'La Libertad',
      category: 'Playa & Aventura',
      badge: 'Clase Mundial',
      img: '/src/assets/images/exp_adventure_surf_tunco_1791258121258.jpg',
      desc: 'Olas constantes, atardeceres dorados en arena negra volcánica y mariscadas frescas.',
      interest: 'playas',
    },
    {
      id: 'ruta-flores',
      title: 'Fincas de Café en Apaneca & Pueblos Vivos',
      department: 'Ahuachapán',
      category: 'Gastronomía & Sabores',
      badge: 'Cata de Origen',
      img: '/src/assets/images/exp_coffee_apaneca_1791258112096.jpg',
      desc: 'Microclima de altura, laberintos naturales y degustación guiada de granos Bourbon y Pacamara.',
      interest: 'gastronomia',
    },
    {
      id: 'suchitoto',
      title: 'Suchitoto Colonial & Añil Ancestral',
      department: 'Cuscatlán',
      category: 'Cultura & Tradición',
      badge: 'Patrimonio Vivo',
      img: '/src/assets/images/exp_culture_suchitoto_1791258103725.jpg',
      desc: 'Arquitectura colonial preservada, taller de tinción textil con índigo y navegación en el lago.',
      interest: 'cultura',
    },
  ];

  // Illustrative 4-day example timeline as specifically requested
  const exampleDays = [
    {
      day: 1,
      dest: 'San Salvador',
      theme: 'Bienvenida cultural',
      schedule: [
        { time: '08:30', title: 'Experiencia', desc: 'Recorrido por Centro Histórico, Palacio y Teatro Nacional' },
        { time: '12:30', title: 'Gastronomía', desc: 'Almuerzo tradicional en mercado o bistró salvadoreño' },
        { time: '16:00', title: 'Actividad', desc: 'Paseo al mirador Puerta del Diablo o cafetería de especialidad' },
      ],
      tag: 'Cultura',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      day: 2,
      dest: 'Volcán + café',
      theme: 'Santa Ana & Finca de Altura',
      schedule: [
        { time: '08:30', title: 'Experiencia', desc: 'Ascenso guiado al cráter verde esmeralda de Ilamatepec' },
        { time: '12:30', title: 'Gastronomía', desc: 'Almuerzo típico con vista panorámica a Coatepeque' },
        { time: '16:00', title: 'Actividad', desc: 'Recorrido sensorial y cata en finca cafetalera de Apaneca' },
      ],
      tag: 'Naturaleza & Café',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      day: 3,
      dest: 'Ruta cultural',
      theme: 'Suchitoto & Añil',
      schedule: [
        { time: '08:30', title: 'Experiencia', desc: 'Taller práctico de tinción natural con añil maya' },
        { time: '12:30', title: 'Gastronomía', desc: 'Degustación de pupusas de maíz y arroz recién hechas' },
        { time: '16:00', title: 'Actividad', desc: 'Paseo en lancha por el Lago Suchitlán al atardecer' },
      ],
      tag: 'Tradición',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      day: 4,
      dest: 'Costa',
      theme: 'Surf City & Pacífico',
      schedule: [
        { time: '08:30', title: 'Experiencia', desc: 'Clase guiada de surf en rompientes de El Tunco o Sunzal' },
        { time: '12:30', title: 'Gastronomía', desc: 'Mariscada tradicional frente a las olas' },
        { time: '16:00', title: 'Actividad', desc: 'Relajación en playa de arena negra y atardecer dorado' },
      ],
      tag: 'Playa & Surf',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-md p-6 sm:p-8 lg:p-9 space-y-7 animate-in fade-in duration-300">
      {/* 1. Inspirational Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>✨ Diseñado para ti</span>
          </div>

          <span className="text-xs text-neutral-400 font-mono">
            {daysCount} días · {travelersCount} persona{travelersCount > 1 ? 's' : ''}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#063A5B] tracking-tight font-display">
          Tu aventura comienza aquí
        </h2>

        <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
          Selecciona tus preferencias y GIA combinará destinos y experiencias para crear una ruta pensada para ti.
        </p>
      </div>

      {/* 2. Interactive Navigation Subtabs for Preview Content */}
      <div className="flex items-center p-1 bg-neutral-100 rounded-2xl border border-neutral-200/80">
        <button
          type="button"
          onClick={() => setActiveTab('mapa')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'mapa'
              ? 'bg-white text-[#063A5B] shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Navigation className="w-3.5 h-3.5 text-[#00A6A6]" />
          <span>Mapa interactivo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('destinos')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'destinos'
              ? 'bg-white text-[#063A5B] shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#FDBA2D]" />
          <span>Destinos clave ({destinationHighlights.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ejemplo')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'ejemplo'
              ? 'bg-white text-[#063A5B] shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#F47B3A]" />
          <span>Itinerario de Ejemplo (4 Días)</span>
        </button>
      </div>

      {/* 3. Synergy formula: What GIA combines */}
      <div className="space-y-3 p-4 rounded-2xl bg-[#F7F4ED] border border-neutral-200/80">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#063A5B] uppercase tracking-wider">
            Lo que GIA combina en tu propuesta:
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">
            Responde a tus intereses
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {synergyItems.map((item) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-white border-[#00A6A6] shadow-2xs ring-1 ring-[#00A6A6]'
                    : 'bg-white/60 border-neutral-200 text-neutral-500 opacity-80'
                }`}
              >
                <span className="text-2xl block mb-1">{item.emoji}</span>
                <span className="text-xs font-extrabold text-[#063A5B] block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-neutral-500 block truncate mt-0.5">
                  {item.subtitle}
                </span>
                {isSelected && (
                  <span className="inline-block mt-1 text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-teal-50 text-[#00A6A6]">
                    Seleccionado
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Tab 1: STYLIZED MAP OF EL SALVADOR */}
      {activeTab === 'mapa' && (
        <div className="space-y-4">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#063A5B] via-[#04283f] to-[#063A5B] p-6 sm:p-7 text-white overflow-hidden shadow-inner border border-teal-900/40">
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#00A6A6]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#FDBA2D]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FDBA2D]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Territorio Conectado · El Salvador
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 font-semibold border border-white/10">
                Logística Optimizada
              </span>
            </div>

            {/* SVG Stylized Vector Map with Reactive Nodes */}
            <div className="py-6 sm:py-8 relative z-10">
              <svg
                viewBox="0 0 540 190"
                className="w-full h-auto max-h-[160px] drop-shadow-md select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Silhouette map of El Salvador */}
                <path
                  d="M30 95 C60 70, 110 60, 160 55 C220 50, 270 58, 330 65 C390 70, 440 60, 490 85 C515 98, 510 120, 470 130 C410 145, 330 140, 240 135 C170 130, 90 125, 30 115 Z"
                  fill="#084973"
                  stroke="#20C5C7"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  opacity="0.9"
                />
                {/* Pacific coastline curl wave line */}
                <path
                  d="M35 120 C100 132, 190 138, 270 142 C360 145, 430 140, 480 132"
                  stroke="#00A6A6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Connecting Route Arc between key hubs */}
                <path
                  d="M80 82 Q130 55, 240 95 T265 62 T210 130"
                  stroke="#FDBA2D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  opacity="0.8"
                />

                {/* Santa Ana / Los Volcanes Node */}
                <g
                  transform="translate(130, 68)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Santa Ana & Volcán Ilamatepec')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={selectedInterests.includes('volcanes') ? '12' : '8'}
                    fill="#FDBA2D"
                    fillOpacity="0.3"
                    className="animate-ping"
                  />
                  <circle cx="0" cy="0" r="5.5" fill="#FDBA2D" />
                  <text x="9" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
                    Volcán Ilamatepec
                  </text>
                </g>

                {/* Ruta de las Flores / Apaneca Node */}
                <g
                  transform="translate(75, 82)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Ruta de las Flores (Café de Altura)')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="0" cy="0" r="5" fill="#55A94B" />
                  <text x="-70" y="-6" fill="#A5F3FC" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                    Ruta de las Flores
                  </text>
                </g>

                {/* San Salvador / Centro Histórico Node */}
                <g
                  transform="translate(240, 95)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('San Salvador (Centro Histórico)')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="0" cy="0" r="6" fill="#20C5C7" />
                  <text x="9" y="3" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                    San Salvador
                  </text>
                </g>

                {/* Suchitoto / Lago Suchitlán Node */}
                <g
                  transform="translate(265, 62)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Suchitoto Colonial & Añil')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle cx="0" cy="0" r="5" fill="#F47B3A" />
                  <text x="9" y="2" fill="#FDBA2D" fontSize="10.5" fontWeight="600" fontFamily="sans-serif">
                    Suchitoto & Lago
                  </text>
                </g>

                {/* Surf City / El Tunco Node */}
                <g
                  transform="translate(210, 130)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint('Surf City (Costa del Pacífico)')}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={selectedInterests.includes('playas') ? '11' : '7'}
                    fill="#00A6A6"
                    fillOpacity="0.4"
                    className="animate-ping"
                  />
                  <circle cx="0" cy="0" r="5.5" fill="#00A6A6" />
                  <text x="-72" y="15" fill="#F7F4ED" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
                    Surf City (Costa)
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Map Note & Hover feedback */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
              <span>
                {hoveredPoint ? (
                  <strong className="text-[#FDBA2D]">Punto destacado: {hoveredPoint}</strong>
                ) : (
                  'Distancias cortas y paisajes diversos: montaña y mar el mismo día.'
                )}
              </span>
              <span className="font-mono text-teal-300 text-[11px]">45 - 90 min traslados</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-neutral-600">
            <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A6A6] shrink-0" />
              <span>Coordinación logística de rutas</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FDBA2D] shrink-0" />
              <span>Anfitriones salvadoreños certificados</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#55A94B] shrink-0" />
              <span>Ritmo ajustable a tu tiempo</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: DESTINOS CLAVE */}
      {activeTab === 'destinos' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {destinationHighlights.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-2xl border border-neutral-200/90 overflow-hidden bg-white hover:border-[#00A6A6] transition-all shadow-2xs hover:shadow-md"
              >
                <div className="relative h-36 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={dest.img}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    {dest.department}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#00A6A6] text-white text-[10px] font-bold">
                    {dest.badge}
                  </div>
                </div>

                <div className="p-3.5 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#00A6A6] uppercase tracking-wider block">
                    {dest.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#063A5B] group-hover:text-[#00A6A6] transition-colors leading-snug">
                    {dest.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                    {dest.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Tab 3: ITINERARIO DE EJEMPLO (4 Días estructurados con 08:30 / 12:30 / 16:00) */}
      {activeTab === 'ejemplo' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#063A5B] font-display">
                Ejemplo Ilustrativo
              </span>
              <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                Modelo de muestra
              </span>
            </div>
            <span className="text-[11px] text-neutral-500">
              4 días coordinados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {exampleDays.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-2xl border border-neutral-200/90 bg-neutral-50/70 hover:bg-white hover:border-[#00A6A6]/60 transition-all space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black font-mono text-[#00A6A6]">
                    DÍA {item.day}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.color}`}>
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#063A5B]">
                    {item.dest}
                  </h4>
                  <p className="text-[11px] font-semibold text-neutral-700">
                    "{item.theme}"
                  </p>
                </div>

                {/* Hourly slots */}
                <div className="space-y-1.5 pt-1 border-t border-neutral-200/60 text-[11px]">
                  {item.schedule.map((slot, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[#00A6A6] text-[10.5px] shrink-0">
                        {slot.time}
                      </span>
                      <p className="text-neutral-600 leading-snug">
                        <strong className="text-neutral-800">{slot.title}:</strong> {slot.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-neutral-400 italic text-center">
            * El itinerario final se genera dinámicamente según la cantidad de días, personas y ritmo que indiques a la izquierda.
          </p>
        </div>
      )}

      {/* 7. Bottom interactive prompt & generation shortcut */}
      <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-neutral-500 text-center sm:text-left">
          <span className="font-bold text-[#063A5B] block">
            ¿Listo para ver tu propuesta única?
          </span>
          <span className="text-[11px]">
            Presiona el botón principal en el panel de preferencias.
          </span>
        </div>

        {onQuickGenerate && (
          <button
            type="button"
            onClick={onQuickGenerate}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#063A5B] hover:bg-[#04283f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>Generar con esta selección</span>
          </button>
        )}
      </div>
    </div>
  );
};
