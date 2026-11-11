import React, { useState } from 'react';
import { PlannerPreferences, TravelerType, TripPace, TripServicesSelection, TripSpecialNeeds } from '../../types/trip';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Gauge,
  ArrowRight,
  Baby,
  Car,
  BedDouble,
  Plane,
  Utensils,
  Headphones,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';

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
  const { loc, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedInspiration, setSelectedInspiration] = useState<string>('');
  const [daysCount, setDaysCount] = useState<number>(initialDays);
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date(Date.now() + 14 * 86400000);
    return d.toISOString().split('T')[0];
  });
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelerType, setTravelerType] = useState<TravelerType>('pareja');
  const [childrenCount, setChildrenCount] = useState<number>(1);
  const [childrenAges, setChildrenAges] = useState<string>('3-8 años');
  const [budgetTier, setBudgetTier] = useState<'economico' | 'equilibrado' | 'premium'>('equilibrado');
  const [pace, setPace] = useState<TripPace>('equilibrado');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'volcanes',
    'gastronomia',
    'playas',
    'cultura',
  ]);
  const [services, setServices] = useState<TripServicesSelection>({
    lodging: true,
    transport: true,
    airportTransfer: true,
    certifiedGuide: true,
    dailyMeals: true,
    scheduledActivities: true,
  });
  const [specialNeeds, setSpecialNeeds] = useState<TripSpecialNeeds>({
    childSafetySeats: false,
    wheelchairAccessibility: false,
    dietaryRestrictions: '',
    guideLanguage: language === 'en' ? 'en' : 'es',
    petFriendlyRequired: false,
  });
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Inspiration intents triggers
  const inspirationTriggers = [
    {
      id: 'desconectar',
      label: loc('✨ Desconectarme de la rutina', '✨ Unplug from routine', '✨ Desconectar da rotina'),
      days: 3,
      interests: ['playas', 'naturaleza', 'cafe'],
      pace: 'relajado' as TripPace,
    },
    {
      id: 'representativos',
      label: loc('🏛️ Lugares más representativos', '🏛️ Must-see highlights', '🏛️ Lugares mais representativos'),
      days: 5,
      interests: ['volcanes', 'cultura', 'playas', 'gastronomia'],
      pace: 'equilibrado' as TripPace,
    },
    {
      id: 'familia',
      label: loc('👨‍👩‍👧‍👦 Viajo con mis hijos', '👨‍👩‍👧‍👦 Traveling with kids', '👨‍👩‍👧‍👦 Viajo com meus filhos'),
      days: 3,
      travelerType: 'familia' as TravelerType,
      travelersCount: 4,
      interests: ['naturaleza', 'playas', 'gastronomia'],
      pace: 'relajado' as TripPace,
    },
    {
      id: 'surf_city_ambas',
      label: loc('🏄 Conocer las dos Surf City', '🏄 Explore both Surf Cities', '🏄 Conhecer as duas Surf City'),
      days: 5,
      interests: ['playas', 'aventura', 'gastronomia'],
      pace: 'intenso' as TripPace,
    },
    {
      id: 'gastronomia',
      label: loc('🍽️ Gastronomía y naturaleza', '🍽️ Food & nature', '🍽️ Gastronomia e natureza'),
      days: 3,
      interests: ['gastronomia', 'cafe', 'volcanes'],
      pace: 'equilibrado' as TripPace,
    },
    {
      id: 'secretos',
      label: loc('🌿 Que pocos conocen', '🌿 Off the beaten path', '🌿 Que poucos conhecem'),
      days: 5,
      interests: ['comunidades', 'naturaleza', 'cultura'],
      pace: 'equilibrado' as TripPace,
    },
  ];

  const handleApplyInspiration = (trigger: typeof inspirationTriggers[0]) => {
    setSelectedInspiration(trigger.id);
    setDaysCount(trigger.days);
    setSelectedInterests(trigger.interests);
    setPace(trigger.pace);
    if (trigger.travelerType) {
      setTravelerType(trigger.travelerType);
      if (trigger.travelersCount) setTravelersCount(trigger.travelersCount);
    }
  };

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
        inspirationIntent: selectedInspiration,
        childrenCount: travelerType === 'familia' ? childrenCount : undefined,
        childrenAges: travelerType === 'familia' ? childrenAges : undefined,
        servicesIncluded: services,
        specialNeeds,
        customerName,
        customerPhone,
        customerEmail,
      });
    }
  }, [
    daysCount,
    startDate,
    travelersCount,
    travelerType,
    childrenCount,
    childrenAges,
    budgetTier,
    pace,
    selectedInterests,
    services,
    specialNeeds,
    customerName,
    customerPhone,
    customerEmail,
    notes,
    selectedInspiration,
    onPreferencesChange,
  ]);

  const interestChips = [
    { id: 'volcanes', label: loc('Volcanes', 'Volcanoes', 'Vulcões'), emoji: '🌋', desc: loc('Cráteres y senderos', 'Craters & trails', 'Crateras e trilhas') },
    { id: 'playas', label: loc('Playas & Surf', 'Beaches & Surf', 'Praias e Surfe'), emoji: '🏖️', desc: loc('Surf City 1 y 2', 'Surf City 1 & 2', 'Surf City 1 e 2') },
    { id: 'gastronomia', label: loc('Gastronomía', 'Gastronomy', 'Gastronomia'), emoji: '🍽️', desc: loc('Pupusas y mariscos', 'Pupusas & seafood', 'Pupusas e frutos do mar') },
    { id: 'cultura', label: loc('Cultura', 'Culture', 'Cultura'), emoji: '🎨', desc: loc('Añil y pueblos coloniales', 'Indigo & heritage towns', 'Anil e cidades coloniais') },
    { id: 'naturaleza', label: loc('Naturaleza', 'Nature', 'Natureza'), emoji: '🌿', desc: loc('Bosques y lagos', 'Lakes & cloud forests', 'Florestas e lagos') },
    { id: 'aventura', label: loc('Aventura', 'Adventure', 'Aventura'), emoji: '🧗', desc: loc('Cascadas y ríos', 'Waterfalls & springs', 'Cachoeiras e rios') },
    { id: 'comunidades', label: loc('Comunitario', 'Community', 'Comunitário'), emoji: '🤝', desc: loc('Memoria viva y telares', 'Living memory & craft', 'Memória viva e artesanato') },
    { id: 'cafe', label: loc('Café', 'Coffee', 'Café'), emoji: '☕', desc: loc('Fincas de altura', 'Highland plantations', 'Fazendas de altitude') },
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
      inspirationIntent: selectedInspiration,
      childrenCount: travelerType === 'familia' ? childrenCount : undefined,
      childrenAges: travelerType === 'familia' ? childrenAges : undefined,
      servicesIncluded: services,
      specialNeeds,
      customerName,
      customerPhone,
      customerEmail,
    });
  };

  const generateWhatsAppLink = () => {
    const text = `Hola GIA Experiences, quiero cotizar un viaje personalizado:%0A` +
      `- Días: ${daysCount}%0A` +
      `- Personas: ${travelersCount} (${travelerType})%0A` +
      `- Fecha estimada: ${startDate}%0A` +
      `- Intereses: ${selectedInterests.join(', ')}%0A` +
      `- Presupuesto: ${budgetTier}%0A` +
      `- Ritmo: ${pace}%0A` +
      (travelerType === 'familia' ? `- Niños: ${childrenCount} (Edades: ${childrenAges})%0A` : '') +
      `- Servicios: Transporte (${services.transport ? 'Sí' : 'No'}), Hotel (${services.lodging ? 'Sí' : 'No'}), Guía (${services.certifiedGuide ? 'Sí' : 'No'})%0A` +
      (customerName ? `- Nombre: ${customerName}%0A` : '');
    return `https://wa.me/50371234567?text=${text}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl border border-amber-100 shadow-sm p-6 sm:p-8 space-y-8 ${className}`}
    >
      {/* Quick Inspiration Intent Bar */}
      <div className="space-y-2 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#007C87]">
          <Sparkles className="w-3.5 h-3.5 text-[#00B8C8]" />
          <span>{loc('Inspiración rápida para comenzar:', 'Quick inspiration to get started:', 'Inspiração rápida para começar:')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {inspirationTriggers.map((trig) => (
            <button
              key={trig.id}
              type="button"
              onClick={() => handleApplyInspiration(trig)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedInspiration === trig.id
                  ? 'bg-[#00B8C8] text-white border-[#00B8C8] shadow-xs'
                  : 'bg-[#FFFDF8] hover:bg-neutral-50 border-neutral-200 text-neutral-700'
              }`}
            >
              {trig.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header & Step Progress Bar */}
      <div className="space-y-4 border-b border-amber-50 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39B98A]/10 border border-[#39B98A]/30 text-[#1B6D4C] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>{loc('Crea con GIA · Planificador a medida', 'Create with GIA · Tailored planner', 'Crie com GIA · Planejador sob medida')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#173B59] tracking-tight font-display mt-1">
              {loc('Diseña tu experiencia en El Salvador', 'Design your El Salvador experience', 'Crie sua experiência em El Salvador')}
            </h2>
          </div>
          <span className="text-xs font-bold font-mono text-neutral-400">
            {loc('Paso', 'Step', 'Passo')} {currentStep} {loc('de', 'of', 'de')} 4
          </span>
        </div>

        {/* Step indicator tabs */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { num: 1, label: loc('Tu viaje', 'Your trip', 'Sua viagem') },
            { num: 2, label: loc('Intereses', 'Interests', 'Interesses') },
            { num: 3, label: loc('Estilo', 'Style', 'Estilo') },
            { num: 4, label: loc('Servicios & Datos', 'Services & Info', 'Serviços e Dados') },
          ].map((st) => (
            <button
              key={st.num}
              type="button"
              onClick={() => setCurrentStep(st.num)}
              className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                currentStep === st.num
                  ? 'bg-[#39B98A] text-white font-bold shadow-xs'
                  : currentStep > st.num
                  ? 'bg-[#39B98A]/15 text-[#173B59] font-semibold'
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
          <span className="text-xs font-mono font-bold text-[#39B98A] uppercase tracking-wider">
            {loc('PASO 1 · TU VIAJE Y COMPAÑEROS', 'STEP 1 · YOUR TRIP & TRAVELERS', 'PASSO 1 · SUA VIAGEM E COMPANHEIROS')}
          </span>
          <h3 className="text-base font-bold text-[#173B59]">
            {loc('¿Cuántos días y con quién viajas?', 'How many days and who are you traveling with?', 'Quantos dias e com quem você viaja?')}
          </h3>
        </div>

        {/* Número de días */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00B8C8]" />
              <span>{loc('Duración del viaje:', 'Trip duration:', 'Duração da viagem:')}</span>
            </span>
            <span className="text-sm font-extrabold text-[#173B59] font-mono">
              {daysCount} {loc('Días', 'Days', 'Dias')}
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
                    ? 'bg-[#173B59] text-white border-[#173B59] shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-amber-200'
                }`}
              >
                {d} {loc('Días', 'Days', 'Dias')}
              </button>
            ))}
          </div>
        </div>

        {/* Fechas estimadas */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Calendar className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Fecha estimada de llegada a El Salvador:', 'Estimated arrival date in El Salvador:', 'Data estimada de chegada a El Salvador:')}</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#00B8C8]"
          />
        </div>

        {/* Cantidad de personas & Tipo */}
        <div className="space-y-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Users className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Grupo de viaje:', 'Travel party:', 'Grupo de viagem:')}</span>
          </label>

          <div className="grid grid-cols-4 gap-2">
            {[
              { count: 1, type: 'solo' as TravelerType, label: loc('1 Solo', '1 Solo', '1 Solo') },
              { count: 2, type: 'pareja' as TravelerType, label: loc('2 Pareja', '2 Couple', '2 Casal') },
              { count: 4, type: 'familia' as TravelerType, label: loc('3-4 Familia', '3-4 Family', '3-4 Família') },
              { count: 6, type: 'grupo' as TravelerType, label: loc('5+ Grupo', '5+ Group', '5+ Grupo') },
            ].map((p) => (
              <button
                key={p.count}
                type="button"
                onClick={() => {
                  setTravelersCount(p.count);
                  setTravelerType(p.type);
                }}
                className={`py-2.5 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                  travelersCount === p.count && travelerType === p.type
                    ? 'bg-[#39B98A] text-white border-[#39B98A] shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-amber-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* FAMILY EXTRA DETAILS */}
          {travelerType === 'familia' && (
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                <Baby className="w-4 h-4 text-sky-600" />
                <span>{loc('Configuración para viaje familiar:', 'Family trip configuration:', 'Configuração para viagem em família:')}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-neutral-600 font-semibold block mb-1">
                    {loc('Número de niños:', 'Number of children:', 'Número de crianças:')}
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-sky-200 bg-white text-xs font-medium"
                  >
                    <option value={1}>1 {loc('niño/a', 'child', 'criança')}</option>
                    <option value={2}>2 {loc('niños', 'children', 'crianças')}</option>
                    <option value={3}>3 {loc('niños o más', 'children or more', 'crianças ou mais')}</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-neutral-600 font-semibold block mb-1">
                    {loc('Edades aproximadas:', 'Approximate ages:', 'Idades aproximadas:')}
                  </label>
                  <select
                    value={childrenAges}
                    onChange={(e) => setChildrenAges(e.target.value)}
                    className="w-full p-2 rounded-xl border border-sky-200 bg-white text-xs font-medium"
                  >
                    <option value="0-2 años">{loc('Bebés (0-2 años)', 'Babies (0-2 years)', 'Bebês (0-2 anos)')}</option>
                    <option value="3-8 años">{loc('Pequeños (3-8 años)', 'Young kids (3-8 years)', 'Pequenos (3-8 anos)')}</option>
                    <option value="9-13 años">{loc('Preadolescentes (9-13 años)', 'Pre-teens (9-13 years)', 'Pré-adolescentes (9-13 anos)')}</option>
                    <option value="14+ años">{loc('Adolescentes (14+ años)', 'Teens (14+ years)', 'Adolescentes (14+ anos)')}</option>
                  </select>
                </div>
              </div>
              <p className="text-[10.5px] text-sky-800 leading-snug">
                {loc(
                  'GIA adaptará las actividades, paradas de descanso y transporte con sillas infantiles certificadas.',
                  'GIA will adapt itineraries, rest stops, and vehicle safety seats accordingly.',
                  'A GIA adaptará as atividades, paradas de descanso e transporte com cadeirinhas infantis.'
                )}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="w-full py-3 bg-[#173B59] hover:bg-[#122e47] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>{loc('Siguiente: Tus intereses', 'Next: Your interests', 'Próximo: Seus interesses')}</span>
          <ArrowRight className="w-4 h-4 text-[#FFC857]" />
        </button>
      </div>

      {/* PASO 2: Tus intereses */}
      <div className={`space-y-6 ${currentStep === 2 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#39B98A] uppercase tracking-wider">
            {loc('PASO 2 · TUS INTERESES', 'STEP 2 · YOUR INTERESTS', 'PASSO 2 · SEUS INTERESSES')}
          </span>
          <h3 className="text-base font-bold text-[#173B59]">
            {loc('¿Qué experiencias quieres priorizar?', 'What experiences would you like to prioritize?', 'Quais experiências deseja priorizar?')}
          </h3>
          <p className="text-xs text-neutral-500">
            {loc('Selecciona todas las que te entusiasmen (selección múltiple):', 'Select all that inspire you (multiple choices):', 'Selecione todas as que inspiram você:')}
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
                    ? 'bg-[#39B98A]/15 border-[#39B98A] shadow-xs text-[#173B59] ring-1 ring-[#39B98A]'
                    : 'bg-neutral-50/80 border-neutral-200 text-neutral-700 hover:border-amber-200'
                }`}
              >
                <span className="text-2xl shrink-0">{chip.emoji}</span>
                <div className="truncate">
                  <span className="font-bold text-xs block truncate text-[#173B59]">{chip.label}</span>
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
            {loc('Atrás', 'Back', 'Voltar')}
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="w-2/3 py-3 bg-[#173B59] hover:bg-[#122e47] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{loc('Siguiente: Tu estilo', 'Next: Your style', 'Próximo: Seu estilo')}</span>
            <ArrowRight className="w-4 h-4 text-[#FFC857]" />
          </button>
        </div>
      </div>

      {/* PASO 3: Tu estilo */}
      <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#39B98A] uppercase tracking-wider">
            {loc('PASO 3 · TU ESTILO', 'STEP 3 · YOUR STYLE', 'PASSO 3 · SEU ESTILO')}
          </span>
          <h3 className="text-base font-bold text-[#173B59]">
            {loc('Presupuesto y ritmo de viaje', 'Budget and travel pace', 'Orçamento e ritmo da viagem')}
          </h3>
        </div>

        {/* Presupuesto */}
        <div className="space-y-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <DollarSign className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Nivel de presupuesto estimado:', 'Estimated budget tier:', 'Nível de orçamento estimado:')}</span>
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'economico' as const, label: loc('Económico', 'Budget', 'Econômico'), sign: '$', desc: loc('Rutas accesibles', 'Accessible routes', 'Rotas acessíveis') },
              { id: 'equilibrado' as const, label: loc('Equilibrado', 'Balanced', 'Equilibrado'), sign: '$$', desc: loc('Calidad & confort', 'Quality & comfort', 'Qualidade e conforto') },
              { id: 'premium' as const, label: loc('Premium', 'Premium', 'Premium'), sign: '$$$', desc: loc('Servicio exclusivo', 'Exclusive service', 'Serviço exclusivo') },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudgetTier(b.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  budgetTier === b.id
                    ? 'bg-[#FFC857]/20 border-[#FFC857] text-[#173B59] font-bold shadow-xs ring-1 ring-[#FFC857]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-amber-200'
                }`}
              >
                <span className="font-mono text-base font-extrabold text-[#FF6B57] block">
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
            <Gauge className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Ritmo del recorrido:', 'Trip pace:', 'Ritmo do roteiro:')}</span>
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'relajado' as const, label: loc('Relajado', 'Relaxed', 'Relaxado'), desc: loc('Tiempo libre & descanso', 'Leisure & downtime', 'Tempo livre e descanso') },
              { id: 'equilibrado' as const, label: loc('Equilibrado', 'Balanced', 'Equilibrado'), desc: loc('1-2 actividades diarias', '1-2 activities/day', '1-2 atividades diárias') },
              { id: 'intenso' as const, label: loc('Intenso', 'Active', 'Intenso'), desc: loc('Aprovechar cada hora', 'Maximize every hour', 'Aproveitar cada hora') },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPace(p.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  pace === p.id
                    ? 'bg-[#00B8C8]/15 border-[#00B8C8] text-[#173B59] font-bold shadow-xs ring-1 ring-[#00B8C8]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-amber-200'
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
            {loc('Atrás', 'Back', 'Voltar')}
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="w-2/3 py-3 bg-[#173B59] hover:bg-[#122e47] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{loc('Siguiente: Servicios e Inclusiones', 'Next: Services & Needs', 'Próximo: Serviços e Dados')}</span>
            <ArrowRight className="w-4 h-4 text-[#FFC857]" />
          </button>
        </div>
      </div>

      {/* PASO 4: Servicios e Inclusiones + Datos de Cotización */}
      <div className={`space-y-6 ${currentStep === 4 ? 'block' : 'hidden'}`}>
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#39B98A] uppercase tracking-wider">
            {loc('PASO 4 · SERVICIOS, DETALLES Y COTIZACIÓN', 'STEP 4 · SERVICES, DETAILS & QUOTE', 'PASSO 4 · SERVIÇOS, DETALHES E COTAÇÃO')}
          </span>
          <h3 className="text-base font-bold text-[#173B59]">
            {loc('Servicios que deseas incluir en tu paquete', 'Services you want included in your package', 'Serviços que deseja incluir no seu pacote')}
          </h3>
        </div>

        {/* Services checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {[
            { key: 'transport', label: loc('Transporte terrestre privado', 'Private ground transport', 'Transporte terrestre privado'), icon: Car },
            { key: 'lodging', label: loc('Alojamiento seleccionado', 'Selected lodging', 'Hospedagem selecionada'), icon: BedDouble },
            { key: 'airportTransfer', label: loc('Traslados aeropuerto', 'Airport transfers', 'Traslado aeroporto'), icon: Plane },
            { key: 'certifiedGuide', label: loc('Guía local certificado', 'Certified local guide', 'Guia local certificado'), icon: Headphones },
            { key: 'dailyMeals', label: loc('Desayunos / Comidas', 'Breakfasts / Meals', 'Cafés da manhã / Refeições'), icon: Utensils },
            { key: 'scheduledActivities', label: loc('Entradas coordinadas', 'Coordinated entries', 'Ingressos coordenados'), icon: Sparkles },
          ].map((srv) => {
            const isChecked = services[srv.key as keyof TripServicesSelection];
            return (
              <button
                key={srv.key}
                type="button"
                onClick={() => setServices(prev => ({ ...prev, [srv.key]: !prev[srv.key as keyof TripServicesSelection] }))}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-[#39B98A]/10 border-[#39B98A] text-[#173B59] font-bold'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                }`}
              >
                <srv.icon className={`w-4 h-4 shrink-0 ${isChecked ? 'text-[#39B98A]' : 'text-neutral-400'}`} />
                <span className="text-[11px] leading-tight">{srv.label}</span>
              </button>
            );
          })}
        </div>

        {/* Special Needs & Accessibility */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-3">
          <span className="text-xs font-bold text-[#173B59] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#39B98A]" />
            {loc('Necesidades especiales y preferencias de viaje:', 'Special needs & accessibility requirements:', 'Necessidades especiais e preferências:')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={specialNeeds.childSafetySeats}
                onChange={(e) => setSpecialNeeds(prev => ({ ...prev, childSafetySeats: e.target.checked }))}
                className="rounded border-neutral-300 text-[#00B8C8] focus:ring-[#00B8C8]"
              />
              <span>{loc('Sillas de seguridad infantil en transporte', 'Child car safety seats', 'Cadeirinhas de segurança infantil')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={specialNeeds.wheelchairAccessibility}
                onChange={(e) => setSpecialNeeds(prev => ({ ...prev, wheelchairAccessibility: e.target.checked }))}
                className="rounded border-neutral-300 text-[#00B8C8] focus:ring-[#00B8C8]"
              />
              <span>{loc('Accesibilidad para movilidad reducida', 'Wheelchair / mobility access', 'Acessibilidade para mobilidade reduzida')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={specialNeeds.petFriendlyRequired}
                onChange={(e) => setSpecialNeeds(prev => ({ ...prev, petFriendlyRequired: e.target.checked }))}
                className="rounded border-neutral-300 text-[#00B8C8] focus:ring-[#00B8C8]"
              />
              <span>{loc('Alojamientos Pet-friendly verificados', 'Verified Pet-friendly lodgings', 'Hospedagens Pet-friendly verificadas')}</span>
            </label>
          </div>
        </div>

        {/* Contact info for quotation */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#173B59] block">
            {loc('Tus datos para recibir la propuesta formal:', 'Your contact details for the formal quote proposal:', 'Seus dados para receber a proposta formal:')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={loc('Nombre completo', 'Full name', 'Nome completo')}
              className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#39B98A]"
            />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder={loc('WhatsApp / Teléfono', 'WhatsApp / Phone', 'WhatsApp / Telefone')}
              className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#39B98A]"
            />
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder={loc('Correo electrónico', 'Email address', 'E-mail')}
              className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#39B98A]"
            />
          </div>
        </div>

        {/* Notas adicionales */}
        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder={loc('¿Algún lugar específico o detalle adicional que quieras incluir en tu viaje?', 'Any specific spots or extra details you’d like included?', 'Algum lugar específico ou detalhe adicional que queira incluir?')}
            className="w-full p-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#39B98A] resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="w-1/3 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {loc('Atrás', 'Back', 'Voltar')}
          </button>
          <div className="w-2/3 text-right">
            <span className="text-[10px] text-neutral-400 block">
              {loc('Listo para generar propuesta', 'Ready to generate proposal', 'Pronto para gerar proposta')}
            </span>
          </div>
        </div>
      </div>

      {/* BIG PRIMARY CTA: Vibrant Verde Tropical for Crea con GIA */}
      <div className="pt-2 border-t border-amber-50 space-y-3">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-[#39B98A] hover:bg-[#2fa076] active:scale-98 disabled:opacity-50 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:shadow-lg"
        >
          <Sparkles className="w-5 h-5 text-[#FFC857]" />
          <span>
            {isGenerating
              ? loc('Diseñando tu viaje...', 'Designing your trip...', 'Criando sua viagem...')
              : loc('✨ Crear mi viaje con GIA', '✨ Build my trip with GIA', '✨ Criar minha viagem com GIA')}
          </span>
        </button>

        {/* Direct WhatsApp CTA link */}
        <a
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-emerald-700 border border-emerald-300 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>{loc('📲 Enviar propuesta a asesor por WhatsApp', '📲 Send proposal to advisor via WhatsApp', '📲 Enviar proposta a consultor pelo WhatsApp')}</span>
        </a>

        <p className="text-[11px] text-neutral-400 text-center">
          {loc('Podrás modificar el itinerario día por día después.', 'You can adjust day-by-day activities afterwards.', 'Você poderá modificar o itinerário dia a dia depois.')}
        </p>
      </div>
    </form>
  );
};
