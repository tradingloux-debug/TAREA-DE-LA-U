import React, { useState } from 'react';
import { Experience, CustomizationOption } from '../../types/experience';
import { useLanguage } from '../../context/LanguageContext';
import { useAccount } from '../../context/AccountContext';
import { trackEvent } from '../../services/analytics';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Send,
  Hotel,
  Car,
  Utensils,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  Check,
  Share2,
  ArrowRight,
} from 'lucide-react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  experience,
}) => {
  const { language, loc } = useLanguage();
  const { profile } = useAccount();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(minDate);
  const [dateFlexibility, setDateFlexibility] = useState<'exact' | 'plus_minus_2' | 'month'>('plus_minus_2');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Contact info
  const [fullName, setFullName] = useState<string>(
    profile ? `${profile.firstName} ${profile.lastName}`.trim() : ''
  );
  const [email, setEmail] = useState<string>(profile?.email || '');
  const [phone, setPhone] = useState<string>(profile?.phone || '');
  const [country, setCountry] = useState<string>(profile?.country || 'El Salvador');

  // Preferences
  const [lodgingTier, setLodgingTier] = useState<'economico' | 'estandar' | 'premium'>(
    experience.comfortLevel || 'estandar'
  );
  const [transportMode, setTransportMode] = useState<'privado' | 'shuttle' | 'renta_auto'>('privado');
  const [mealPlanPref, setMealPlanPref] = useState<'desayunos' | 'media_pension' | 'completa'>('media_pension');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quoteCode, setQuoteCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const title = loc(experience.titleEs, experience.titleEn);
  const durationLabel = experience.durationBadgeEs
    ? loc(experience.durationBadgeEs, experience.durationBadgeEn || experience.durationBadgeEs)
    : experience.duration;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg(loc('Por favor ingresa tu nombre completo.', 'Please enter your full name.'));
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(loc('Por favor ingresa un correo electrónico válido.', 'Please enter a valid email address.'));
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(loc('Por favor ingresa tu número de WhatsApp o teléfono.', 'Please enter your WhatsApp or phone number.'));
      return;
    }

    setIsSubmitting(true);
    trackEvent('quote_requested', {
      experienceId: experience.id,
      experienceTitle: title,
      adults,
      children,
      date,
      lodgingTier,
      transportMode,
      selectedAddonsCount: selectedAddons.length,
    });

    const code = `COT-GIA-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      // Save quote request into localStorage for reference
      try {
        const storedQuotes = JSON.parse(localStorage.getItem('gia_quote_requests') || '[]');
        storedQuotes.unshift({
          code,
          experienceId: experience.id,
          experienceTitle: title,
          date,
          dateFlexibility,
          adults,
          children,
          fullName,
          email,
          phone,
          country,
          lodgingTier,
          transportMode,
          mealPlanPref,
          selectedAddons,
          specialNotes,
          createdAt: new Date().toISOString(),
          status: 'PENDING_REVIEW',
        });
        localStorage.setItem('gia_quote_requests', JSON.stringify(storedQuotes));
      } catch (err) {
        console.warn('Could not store quote in localStorage', err);
      }

      setIsSubmitting(false);
      setQuoteCode(code);
    }, 700);
  };

  const totalPeople = adults + children;

  // Pre-filled WhatsApp message
  const whatsappMessage = encodeURIComponent(
    language === 'es'
      ? `¡Hola equipo de GIA Experiences! Acabo de solicitar la cotización *${quoteCode || ''}* para el paquete *${title}* (${durationLabel}).
Fechas aproximadas: ${date} (${dateFlexibility === 'exact' ? 'Fecha exacta' : 'Fechas flexibles'}).
Viajeros: ${totalPeople} personas (${adults} adultos, ${children} niños).
Alojamiento deseado: Categoría ${lodgingTier.toUpperCase()}.
Transporte: ${transportMode === 'privado' ? 'Privado con chofer' : transportMode}.
Nombre: ${fullName} (${country}).
¿Podrían confirmarme disponibilidad y presupuesto final? Muchas gracias.`
      : `Hello GIA Experiences team! I just requested quotation *${quoteCode || ''}* for the package *${title}* (${durationLabel}).
Approximate travel date: ${date}.
Travelers: ${totalPeople} people (${adults} adults, ${children} children).
Lodging preference: ${lodgingTier.toUpperCase()}.
Transport: ${transportMode === 'privado' ? 'Private driver' : transportMode}.
Name: ${fullName} (${country}).
Could you please confirm availability and the finalized customized proposal? Thank you!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#063A5B] to-[#04283f] text-white p-5 sm:p-6 flex items-start justify-between gap-4 relative shrink-0">
          <div className="space-y-1.5 pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00A6A6]/30 text-teal-300 text-[11px] font-mono font-bold border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FDBA2D]" />
              <span>{loc('Cotización Personalizada', 'Customized Quote Proposal')}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display leading-tight text-white">
              {title}
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <span className="font-semibold text-teal-300">{durationLabel}</span>
              <span>·</span>
              <span>{experience.location}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {quoteCode ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {loc('Solicitud Recibida con Éxito', 'Request Received Successfully')}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#063A5B] font-display">
                  {loc('¡Tu cotización ha sido registrada!', 'Your quote request is logged!')}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {loc(
                    'Un asesor de viajes de GIA Experiences verificará tarifas con proveedores locales y te enviará la propuesta detallada en menos de 24 horas.',
                    'A GIA Experiences travel specialist will verify local vendor rates and deliver your detailed proposal within 24 hours.'
                  )}
                </p>
              </div>

              {/* Code Box */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 max-w-md mx-auto space-y-2 text-left">
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
                  <span className="text-xs text-neutral-500 font-medium">{loc('Código de seguimiento:', 'Tracking code:')}</span>
                  <span className="font-mono text-base font-extrabold text-[#00A6A6]">{quoteCode}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">{loc('Destino / Paquete', 'Package')}</span>
                    <span className="font-semibold text-neutral-800 truncate block">{title}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">{loc('Fecha estimada', 'Estimated date')}</span>
                    <span className="font-semibold text-neutral-800">{date}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">{loc('Viajeros', 'Travelers')}</span>
                    <span className="font-semibold text-neutral-800">{totalPeople} ({adults} ad, {children} niñ)</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">{loc('Alojamiento', 'Lodging')}</span>
                    <span className="font-semibold text-neutral-800 capitalize">{lodgingTier}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={`https://wa.me/50370119564?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>{loc('Enviar y chatear por WhatsApp', 'Chat on WhatsApp with this quote')}</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {loc('Cerrar y seguir explorando', 'Close and continue exploring')}
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleGenerateQuote} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* 1. Dates & Travelers */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 space-y-4">
                <h4 className="text-xs font-bold text-[#063A5B] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00A6A6]" />
                  <span>1. {loc('Fechas y Grupo de Viaje', 'Dates & Travel Group')}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">
                      {loc('Fecha estimada de viaje', 'Estimated travel date')}
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    />
                  </div>

                  {/* Flexibility */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700">
                      {loc('Flexibilidad de fechas', 'Date flexibility')}
                    </label>
                    <select
                      value={dateFlexibility}
                      onChange={(e) => setDateFlexibility(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    >
                      <option value="plus_minus_2">{loc('Flexible (+/- 2 días)', 'Flexible (+/- 2 days)')}</option>
                      <option value="exact">{loc('Fecha exacta', 'Exact dates')}</option>
                      <option value="month">{loc('Mes aproximado', 'Approximate month')}</option>
                    </select>
                  </div>
                </div>

                {/* Adults / Children counter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 block">{loc('Adultos', 'Adults')}</span>
                      <span className="text-[10px] text-neutral-400">12+ años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults((p) => Math.max(1, p - 1))}
                        className="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 disabled:opacity-40 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults((p) => p + 1)}
                        className="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 block">{loc('Niños', 'Children')}</span>
                      <span className="text-[10px] text-neutral-400">3 a 11 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren((p) => Math.max(0, p - 1))}
                        className="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 disabled:opacity-40 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren((p) => p + 1)}
                        className="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Package Preferences: Lodging, Transport, Meals */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#063A5B] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-[#00A6A6]" />
                  <span>2. {loc('Categoría de Servicios Preferida', 'Preferred Service Categories')}</span>
                </h4>

                {/* Lodging Tier Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    {loc('Nivel de Alojamiento', 'Lodging Comfort Tier')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'economico',
                        title: loc('Económico', 'Budget'),
                        desc: loc('Hostales y posadas rurales limpias', 'Cozy hostels & authentic inns'),
                      },
                      {
                        id: 'estandar',
                        title: loc('Estándar', 'Standard'),
                        desc: loc('Hoteles 3-4* con baño privado y desayuno', '3-4* hotels, private bath & breakfast'),
                      },
                      {
                        id: 'premium',
                        title: loc('Premium / Boutique', 'Premium / Boutique'),
                        desc: loc('Hoteles boutique, ecolodges o resorts', 'Boutique hotels, ecolodges & resorts'),
                      },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setLodgingTier(tier.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          lodgingTier === tier.id
                            ? 'border-[#00A6A6] bg-teal-50/60 ring-1 ring-[#00A6A6]'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-neutral-900 block">{tier.title}</span>
                        <span className="text-[10.5px] text-neutral-500 leading-tight block mt-0.5">{tier.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Mode */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-700 block">
                      {loc('Transporte & Traslados', 'Transportation & Transfers')}
                    </label>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      {loc('✓ 100% Incluido', '✓ 100% Included')}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    {loc(
                      'El transporte está incluido en todas las experiencias de GIA. Elige tu configuración de vehículo preferida:',
                      'Transportation is included in all GIA experiences. Choose your preferred vehicle configuration:'
                    )}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'privado',
                        title: loc('Privado con chofer', 'Private Driver & A/C'),
                        desc: loc('Vehículo turístico exclusivo y asistencia', 'Exclusive van & tour assistance'),
                      },
                      {
                        id: 'shuttle',
                        title: loc('Shuttles turísticos', 'Point-to-Point Shuttles'),
                        desc: loc('Conexiones compartidas entre destinos', 'Coordinated tourist shuttle legs'),
                      },
                      {
                        id: 'renta_auto',
                        title: loc('Renta de vehículo', 'Rental Car (Self-drive)'),
                        desc: loc('SUV / Sedán con seguro para conducir tú', 'Vehicles with rental insurance'),
                      },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setTransportMode(mode.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          transportMode === mode.id
                            ? 'border-[#00A6A6] bg-teal-50/60 ring-1 ring-[#00A6A6]'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-neutral-900 block">{mode.title}</span>
                        <span className="text-[10.5px] text-neutral-500 leading-tight block mt-0.5">{mode.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Plan */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    {loc('Plan de Alimentación Deseado', 'Desired Meal Plan')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'desayunos',
                        title: loc('Solo Desayunos', 'Breakfast Only'),
                        desc: loc('Libertad para almorzar y cenar en ruta', 'Explore local restaurants on the road'),
                      },
                      {
                        id: 'media_pension',
                        title: loc('Media Pensión (Recomendado)', 'Half Board (Recommended)'),
                        desc: loc('Desayunos y almuerzos tradicionales incluidos', 'Breakfasts & authentic curated lunches'),
                      },
                      {
                        id: 'completa',
                        title: loc('Pensión Completa', 'Full Board'),
                        desc: loc('Todas las comidas del viaje coordinadas', 'All meals included & reservations set'),
                      },
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setMealPlanPref(plan.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          mealPlanPref === plan.id
                            ? 'border-[#00A6A6] bg-teal-50/60 ring-1 ring-[#00A6A6]'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-neutral-900 block">{plan.title}</span>
                        <span className="text-[10.5px] text-neutral-500 leading-tight block mt-0.5">{plan.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Customization Addons if available */}
              {experience.customizationOptions && experience.customizationOptions.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-neutral-700 block">
                    {loc('Servicios opcionales que puedes agregar:', 'Optional Add-on Experiences:')}
                  </label>
                  <div className="space-y-1.5">
                    {experience.customizationOptions.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-teal-50/80 border-[#00A6A6]'
                              : 'bg-white border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-[#00A6A6] border-[#00A6A6] text-white'
                                  : 'border-neutral-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-neutral-800">
                                {loc(addon.labelEs, addon.labelEn)}
                              </p>
                              {addon.descriptionEs && (
                                <p className="text-[11px] text-neutral-500">
                                  {loc(addon.descriptionEs, addon.descriptionEn || addon.descriptionEs)}
                                </p>
                              )}
                            </div>
                          </div>
                          {addon.priceDiff ? (
                            <span className="text-xs font-mono font-bold text-[#00A6A6]">
                              +${addon.priceDiff} USD
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-neutral-400">
                              {loc('A cotizar', 'Quote')}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Contact Information */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 space-y-3">
                <h4 className="text-xs font-bold text-[#063A5B] uppercase tracking-wider font-mono">
                  3. {loc('Tus Datos de Contacto', 'Your Contact Details')}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700">
                      {loc('Nombre completo', 'Full name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Sofia Martínez"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700">
                      {loc('Correo electrónico', 'Email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sofia@ejemplo.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700">
                      {loc('WhatsApp / Teléfono', 'WhatsApp / Phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+503 7000 0000"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700">
                      {loc('País de residencia', 'Country of residence')}
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="El Salvador, USA, etc."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-semibold text-neutral-700">
                    {loc('Peticiones especiales, dietas o dudas (opcional)', 'Special requests, dietary needs, or notes (optional)')}
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder={loc(
                      'Ej. Somos vegetarianos, viajamos con equipaje grande, deseamos habitación con cama king...',
                      'E.g. Vegetarian diet, large luggage, celebration anniversary...'
                    )}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-[#00A6A6] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Operator Guarantee banner */}
              <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 text-teal-950 text-[11px] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {loc(
                    'Compromiso GIA Experiences: Te respondemos con cotización transparente, desglose de servicios y sin compromiso de compra.',
                    'GIA Experiences Commitment: We respond with a transparent breakdown and zero upfront commitment.'
                  )}
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#00A6A6] hover:bg-[#009191] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{loc('Registrando solicitud...', 'Logging request...')}</span>
                ) : (
                  <>
                    <span>{loc('Solicitar Cotización Personalizada', 'Request Customized Proposal')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
