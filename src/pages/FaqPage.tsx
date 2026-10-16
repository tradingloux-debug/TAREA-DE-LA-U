import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  HelpCircle,
  ChevronDown,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const phone = '+503 7011-9564';
  const waUrl = `https://wa.me/50370119564?text=${encodeURIComponent(
    language === 'es'
      ? 'Hola, tengo una pregunta sobre las experiencias de GIA Experiences.'
      : 'Hello, I have a question about GIA Experiences.'
  )}`;

  const faqs = [
    {
      qEs: '¿Cómo puedo reservar?',
      qEn: 'How can I make a booking?',
      aEs: 'Puedes explorar nuestro catálogo de experiencias o rutas multidía, seleccionar la fecha deseada y cantidad de viajeros, y presionar "Reservar ahora". Al completar tus datos de contacto y aceptar los términos, se genera tu código de reserva para que nuestro equipo coordine contigo todos los detalles.',
      aEn: 'Browse our catalog of experiences or multi-day routes, select your preferred date and number of travelers, and click "Book now". After providing your contact info and accepting terms, a unique booking code is generated and our team confirms all operational details with you.',
    },
    {
      qEs: '¿Cómo sé que mi reserva está confirmada?',
      qEn: 'How do I know my booking is confirmed?',
      aEs: 'Tu reserva queda formalmente confirmada cuando GIA Experiences verifica la disponibilidad de guías y cupos, valida el pago o anticipo correspondiente, y te envía la confirmación oficial junto con tu itinerario detallado vía correo electrónico o WhatsApp.',
      aEn: 'Your booking is formally confirmed once GIA Experiences verifies guide availability and spots, confirms the necessary payment, and sends you the official confirmation along with your detailed itinerary via email or WhatsApp.',
    },
    {
      qEs: '¿Cómo contacto a GIA?',
      qEn: 'How can I contact GIA Experiences?',
      aEs: `Puedes llamarnos o escribirnos directamente a nuestro número oficial +503 7011-9564 (Llamadas y WhatsApp), por correo a guiaexperiencessv@gmail.com o a través del formulario en nuestra página de Contacto.`,
      aEn: `You can call or text us at our official number +503 7011-9564 (Calls & WhatsApp), email us at guiaexperiencessv@gmail.com, or reach out through our Contact page form.`,
    },
    {
      qEs: '¿Puedo personalizar una ruta?',
      qEn: 'Can I customize a tour route?',
      aEs: '¡Sí! En cada Ruta GIA encontrarás el botón "Personalizar esta ruta", el cual abre la herramienta Planea con GIA para que puedas adaptar los días, cambiar actividades o sumar destinos a tu propio ritmo.',
      aEn: 'Yes! On every GIA Route page, you can click "Customize this route", which opens Plan with GIA so you can adjust days, swap activities, or add destinations at your own pace.',
    },
    {
      qEs: '¿Qué es Planea con GIA?',
      qEn: 'What is Plan with GIA?',
      aEs: 'Es nuestro planificador inteligente diseñado para crear itinerarios a medida en El Salvador según tus gustos (playa, volcanes, cultura, gastronomía), presupuesto, duración y ritmo de viaje.',
      aEn: 'It is our smart trip planner designed to build tailor-made itineraries across El Salvador based on your interests (surf, volcanoes, culture, coffee), budget, trip duration, and preferred travel pace.',
    },
    {
      qEs: '¿Dónde veo el punto de encuentro?',
      qEn: 'Where do I find the meeting point?',
      aEs: 'En la página de detalle de cada experiencia encontrarás la sección "Punto de encuentro", donde se detalla el nombre del lugar, referencias de llegada y el mapa interactivo de ubicación.',
      aEn: 'On each experience page, you will find the "Meeting Point" section displaying the verified place name, arrival instructions, and an interactive map.',
    },
    {
      qEs: '¿Cómo abro la ubicación en Google Maps?',
      qEn: 'How do I open the location in Google Maps?',
      aEs: 'En la sección del punto de encuentro dispones de los botones "Ver en Google Maps" (para explorar la zona o guardar el pin) y "Cómo llegar" (para calcular la ruta de navegación GPS en tiempo real).',
      aEn: 'In the meeting point section, you can click "View on Google Maps" (to explore the pin) or "Get Directions" (to navigate via GPS directly to the spot).',
    },
    {
      qEs: '¿Puedo escribir por WhatsApp?',
      qEn: 'Can I reach out via WhatsApp?',
      aEs: `¡Por supuesto! Disponemos del número oficial +503 7011-9564 en WhatsApp, así como del botón flotante verde en la plataforma para chatear con un asesor en cualquier momento.`,
      aEn: `Of course! Our official WhatsApp number is +503 7011-9564, and you can also click the green floating WhatsApp button anytime while browsing.`,
    },
    {
      qEs: '¿Cómo funcionan los códigos de referido?',
      qEn: 'How do referral codes work?',
      aEs: 'En la sección "Comparte GIA" puedes generar y compartir tu código de invitación. Cuando tus amigos reservan con tu código, ellos reciben descuento y tú acumulas Créditos GIA aplicables a tus futuros viajes.',
      aEn: 'In the "Share GIA" section, you can get and share your referral code. When friends book with your code, they receive a discount and you earn GIA Credits toward future trips.',
    },
    {
      qEs: '¿Qué sucede si una actividad depende del clima?',
      qEn: 'What happens if an activity is weather-dependent?',
      aEs: 'En experiencias como caminatas a cumbres volcánicas o surf, la seguridad es nuestra prioridad. Si las condiciones meteorológicas lo ameritan, nuestro equipo coordinará la reprogramación de la fecha o una alternativa de igual valor.',
      aEn: 'For outdoor activities like volcano summits or surf breaks, safety comes first. If weather conditions interfere, our team will coordinate a reschedule date or an equivalent alternative.',
    },
  ];

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: language === 'es' ? 'Preguntas Frecuentes' : 'FAQ' },
            ]}
            backAction={{
              label: language === 'es' ? '← Volver al inicio' : '← Back to Home',
              path: '/',
            }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Centro de Respuestas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
            {language === 'es'
              ? 'Respuestas claras sobre cómo reservar, comunicarte con nosotros, puntos de encuentro y políticas de viaje.'
              : 'Clear answers on how to book, reach our team, meeting points, and travel policies.'}
          </p>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-sm font-bold text-[#063A5B] font-display">
                    {language === 'es' ? faq.qEs : faq.qEn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#00A6A6]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                    {language === 'es' ? faq.aEs : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs text-center space-y-4">
          <h3 className="text-xl font-bold text-[#063A5B] font-display">
            {language === 'es' ? '¿Tienes otra consulta específica?' : 'Have a specific question?'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            {language === 'es'
              ? 'Nuestro equipo de anfitriones y guías locales está disponible para ayudarte en cada detalle.'
              : 'Our team of travel specialists and local hosts is ready to help with every detail.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'es' ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}</span>
            </a>

            <button
              type="button"
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#063A5B] hover:bg-[#04283f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Ir a Contacto' : 'Go to Contact'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
