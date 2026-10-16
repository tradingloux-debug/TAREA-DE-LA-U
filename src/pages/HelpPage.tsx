import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  HelpCircle,
  BookmarkCheck,
  CreditCard,
  RefreshCw,
  MapPin,
  Sparkles,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const phone = '+503 7011-9564';
  const waUrl = `https://wa.me/50370119564?text=${encodeURIComponent(
    language === 'es'
      ? 'Hola, necesito ayuda y asistencia de GIA Experiences.'
      : 'Hello, I need help and support from GIA Experiences.'
  )}`;

  const helpTopics = [
    {
      titleEs: 'Reservas y Códigos',
      titleEn: 'Bookings & Confirmation',
      descEs: 'Consulta el estado de tu experiencia, localiza tu código o solicita cambios de fecha.',
      descEn: 'Check the status of your booking, find your code, or request date changes.',
      icon: BookmarkCheck,
      action: () => navigate('/mis-reservas'),
      ctaEs: 'Ver mis reservas',
      ctaEn: 'View my bookings',
      badge: 'Autoservicio',
    },
    {
      titleEs: 'Pagos y Facturación',
      titleEn: 'Payments & Billing',
      descEs: 'Conoce los medios de pago oficiales habilitados en El Salvador y la política de anticipos.',
      descEn: 'Learn about verified payment channels and booking advance deposit policies.',
      icon: CreditCard,
      action: () => navigate('/terminos-y-condiciones'),
      ctaEs: 'Ver condiciones de pago',
      ctaEn: 'View payment terms',
      badge: 'Finanzas',
    },
    {
      titleEs: 'Cancelaciones y Reprogramación',
      titleEn: 'Cancellations & Reschedules',
      descEs: 'Políticas operativas por clima, fuerza mayor y solicitudes de modificación de itinerario.',
      descEn: 'Policies for weather conditions, unforeseen situations, and schedule adjustments.',
      icon: RefreshCw,
      action: () => navigate('/terminos-y-condiciones'),
      ctaEs: 'Ver política de cancelaciones',
      ctaEn: 'View cancellation terms',
      badge: 'Flexibilidad',
    },
    {
      titleEs: 'Punto de Encuentro y Mapas',
      titleEn: 'Meeting Points & Maps',
      descEs: 'Aprende a ubicar el punto de encuentro, abrir Google Maps y calcular rutas en tiempo real.',
      descEn: 'Learn how to locate meeting points, open Google Maps, and get real-time directions.',
      icon: MapPin,
      action: () => navigate('/experiencias'),
      ctaEs: 'Explorar experiencias',
      ctaEn: 'Browse experiences',
      badge: 'Navegación',
    },
    {
      titleEs: 'Planea con GIA (Itinerarios IA)',
      titleEn: 'Plan with GIA (AI Planner)',
      descEs: 'Cómo funciona el diseñador inteligente de viajes y cómo convertirlo en tu reserva final.',
      descEn: 'How our smart itinerary engine works and how to confirm your custom route.',
      icon: Sparkles,
      action: () => navigate('/planea-con-gia'),
      ctaEs: 'Abrir planeador',
      ctaEn: 'Open trip planner',
      badge: 'Inteligencia Artificial',
    },
    {
      titleEs: 'Preguntas Frecuentes (FAQ)',
      titleEn: 'Frequently Asked Questions',
      descEs: 'Respuestas inmediatas a las dudas más comunes de los viajeros.',
      descEn: 'Immediate answers to the most common questions asked by travelers.',
      icon: HelpCircle,
      action: () => navigate('/preguntas-frecuentes'),
      ctaEs: 'Leer preguntas frecuentes',
      ctaEn: 'Read FAQ',
      badge: 'Guía rápida',
    },
  ];

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: language === 'es' ? 'Centro de Ayuda' : 'Help Center' },
            ]}
            backAction={{
              label: language === 'es' ? '← Volver al inicio' : '← Back to Home',
              path: '/',
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Soporte GIA Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] font-display tracking-tight">
            {language === 'es' ? 'Centro de Ayuda y Asistencia' : 'Help & Support Center'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            {language === 'es'
              ? 'Encuentra soluciones rápidas para tus reservas, pagos, traslados y coordinación de viajes en El Salvador.'
              : 'Find quick guidance for bookings, payments, logistics, and trip arrangements across El Salvador.'}
          </p>
        </div>

        {/* 6 Help Category Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {topic.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#063A5B] font-display">
                    {language === 'es' ? topic.titleEs : topic.titleEn}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {language === 'es' ? topic.descEs : topic.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={topic.action}
                    className="w-full py-2.5 px-4 bg-neutral-50 hover:bg-neutral-100 text-[#063A5B] hover:text-[#00A6A6] text-xs font-bold rounded-xl transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <span>{language === 'es' ? topic.ctaEs : topic.ctaEn}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Channels Banner */}
        <div className="bg-gradient-to-r from-[#063A5B] to-[#04283f] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              {language === 'es' ? '¿Prefieres hablar con una persona?' : 'Prefer to speak with our team?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              {language === 'es'
                ? 'Nuestros asesores salvadoreños están disponibles en WhatsApp y teléfono oficial para asistirte en tiempo real.'
                : 'Our local travel team is available on WhatsApp and phone for immediate, human support.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp (+503 7011-9564)</span>
            </a>

            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="px-5 py-3 bg-white hover:bg-neutral-100 text-[#063A5B] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#00A6A6]" />
              <span>{language === 'es' ? 'Página de Contacto' : 'Contact Page'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
