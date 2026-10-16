import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Compass,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'informacion',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = language === 'es' ? 'Ingresa tu nombre' : 'Please enter your name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = language === 'es' ? 'Ingresa un correo válido' : 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      errs.message = language === 'es' ? 'Escribe tu mensaje o consulta' : 'Please enter your message';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const phoneDisplay = '+503 7011-9564';
  const phoneLocal = '7011-9564';
  const phoneTel = 'tel:+50370119564';
  const waUrl = `https://wa.me/50370119564?text=${encodeURIComponent(
    language === 'es'
      ? 'Hola, me gustaría recibir información sobre las experiencias de GIA Experiences.'
      : 'Hello, I would like more information about GIA Experiences.'
  )}`;
  const emailOfficial = 'guiaexperiencessv@gmail.com';

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: language === 'es' ? 'Contacto' : 'Contact' },
            ]}
            backAction={{
              label: language === 'es' ? '← Volver al inicio' : '← Back to Home',
              path: '/',
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-bold font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GIA Experiences · Tour Operadora</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#063A5B] font-display tracking-tight">
            {language === 'es' ? 'Estamos para ayudarte' : "We're here to help"}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'es'
              ? '¿Tienes preguntas sobre una experiencia, una ruta o tu próximo viaje? Contáctanos.'
              : 'Do you have questions about an experience, a tour route, or your next trip? Contact us.'}
          </p>
        </div>

        {/* 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Teléfono & Llamada */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                  {language === 'es' ? 'Atención Telefónica' : 'Telephone Support'}
                </span>
                <h3 className="text-xl font-bold text-[#063A5B] font-display">
                  {phoneDisplay}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'es' ? 'Llamadas y WhatsApp' : 'Calls and WhatsApp'}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {language === 'es' ? 'Nacional:' : 'Local:'} {phoneLocal}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={phoneTel}
                className="w-full py-3 bg-[#063A5B] hover:bg-[#04283f] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Llamar' : 'Call now'}</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Oficial */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-[#25D366]" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                  {language === 'es' ? 'Mensajería Rápida' : 'Direct Messaging'}
                </span>
                <h3 className="text-xl font-bold text-[#063A5B] font-display">
                  WhatsApp Oficial
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'es'
                    ? 'Respuesta rápida de asesores y anfitriones locales.'
                    : 'Fast response from local travel specialists.'}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {phoneDisplay}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>{language === 'es' ? 'WhatsApp' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Correo Electrónico */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F47B3A] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                  {language === 'es' ? 'Correo Electrónico' : 'Official Email'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#063A5B] font-display break-all">
                  {emailOfficial}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'es'
                    ? 'Consultas corporativas, grupos y personalizaciones.'
                    : 'Corporate inquiries, custom private groups, and travel design.'}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {language === 'es' ? 'Horario:' : 'Hours:'} Lunes - Domingo, 08:00 - 18:00
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${emailOfficial}`}
                className="w-full py-3 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Escribir correo' : 'Send email'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column: Contact Form + Location / Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#063A5B] font-display">
                {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                {language === 'es'
                  ? 'Completa los datos y te responderemos a la brevedad con información detallada.'
                  : 'Fill in your details and we will reply promptly with complete information.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-emerald-950 font-display">
                    {language === 'es' ? '¡Mensaje recibido con éxito!' : 'Message received successfully!'}
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    {language === 'es'
                      ? 'Gracias por contactar a GIA Experiences. Un asesor de nuestro equipo se comunicará contigo al correo o teléfono proporcionado.'
                      : 'Thank you for reaching out to GIA Experiences. A travel specialist will get back to you shortly.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'informacion', message: '' });
                  }}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      {language === 'es' ? 'Nombre completo *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'es' ? 'Ej. Mateo Salazar' : 'E.g. John Doe'}
                      className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                        errors.name ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-teal-700'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      {language === 'es' ? 'Correo electrónico *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={language === 'es' ? 'tu.correo@ejemplo.com' : 'your.email@example.com'}
                      className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                        errors.email ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-teal-700'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      {language === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+503 7011-9564"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      {language === 'es' ? 'Motivo de consulta' : 'Inquiry Type'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                    >
                      <option value="informacion">
                        {language === 'es' ? 'Información de experiencias' : 'General experience inquiry'}
                      </option>
                      <option value="rutas">
                        {language === 'es' ? 'Rutas multidía personalizadas' : 'Custom multi-day tours'}
                      </option>
                      <option value="reserva">
                        {language === 'es' ? 'Dudas sobre una reserva' : 'Existing booking question'}
                      </option>
                      <option value="alianza">
                        {language === 'es' ? 'Anfitriones y aliados locales' : 'Host / partner collaboration'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    {language === 'es' ? 'Mensaje o requerimientos especiales *' : 'Message or special requests *'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'es'
                        ? 'Cuéntanos cuántas personas viajan, fechas estimadas o qué te gustaría experimentar...'
                        : 'Tell us your dates, group size, or what kind of trip you are envisioning...'
                    }
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-2 ${
                      errors.message ? 'border-red-400 focus:ring-red-400' : 'border-neutral-200 focus:ring-teal-700'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#063A5B] hover:bg-[#04283f] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'es' ? 'Enviar mensaje' : 'Submit message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Google Maps Space (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{language === 'es' ? 'Ubicación y Operación' : 'Location & Operations'}</span>
              </div>
              <h3 className="text-xl font-bold text-[#063A5B] font-display">
                El Salvador, Centroamérica
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {language === 'es'
                  ? 'GIA Experiences opera como tour operadora en todo el territorio de El Salvador. La atención personalizada y coordinación presencial se realiza bajo cita previa o directamente en los puntos de encuentro coordinados para cada experiencia.'
                  : 'GIA Experiences operates across El Salvador as a licensed tour operator. Personalized meetings are arranged by appointment or directly at designated trip meeting points.'}
              </p>

              {/* Prepared Google Map embed of El Salvador */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-neutral-200/80 h-56 sm:h-64 relative bg-slate-900 shadow-inner">
                  <iframe
                    title="Google Maps El Salvador"
                    src="https://maps.google.com/maps?q=El+Salvador&hl=es&z=8&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-200 shadow-md text-[11px] font-bold text-[#063A5B] flex items-center gap-1.5 pointer-events-none">
                    <MapPin className="w-3.5 h-3.5 text-[#00A6A6]" />
                    <span>El Salvador diseñado para ti</span>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">¿Deseas planear con IA?</span>
                <button
                  type="button"
                  onClick={() => navigate('/planea-con-gia')}
                  className="font-bold text-[#00A6A6] hover:underline cursor-pointer"
                >
                  Planea con GIA →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
