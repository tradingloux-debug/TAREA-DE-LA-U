import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { GiaLogo } from '../common/GiaLogo';
import { MapPin, Info, Mail, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';

interface ContactModalData {
  title: string;
  message: string;
  email: string;
  type?: 'contact' | 'info';
}

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { language, loc } = useLanguage();
  const l = (es: string, en: string, pt?: string) => loc(es, en, pt);
  const [modalData, setModalData] = useState<ContactModalData | null>(null);
  const [copied, setCopied] = useState(false);

  const contactEmail = 'guiaexperiencessv@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-white text-neutral-600 border-t border-neutral-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Block (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-left focus:outline-hidden cursor-pointer inline-block"
              aria-label="GIA Experiences"
            >
              <GiaLogo size="navbar" alt={l('GIA Experiences — El Salvador diseñado para ti', 'GIA Experiences — El Salvador, designed for you', 'GIA Experiences — El Salvador desenhado para você')} />
            </button>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              {l('Plataforma para descubrir, diseñar y vivir experiencias únicas en El Salvador. Turismo auténtico conectado con personas, cultura y naturaleza.', 'A platform to discover, design, and experience unique journeys in El Salvador. Authentic tourism connected with people, culture, and nature.', 'Plataforma para descobrir, planejar e viver experiências únicas em El Salvador. Turismo autêntico conectado com pessoas, cultura e natureza.')}
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-[#00A6A6] font-semibold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{l('El Salvador, Centroamérica · El Salvador diseñado para ti', 'El Salvador, Central America · El Salvador, designed for you', 'El Salvador, América Central · El Salvador desenhado para você')}</span>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-[#00A6A6] transition-colors font-medium group"
                title={l('Escribir correo a GIA Experiences', 'Email GIA Experiences', 'Enviar e-mail para GIA Experiences')}
              >
                <Mail className="w-3.5 h-3.5 text-[#00A6A6] shrink-0" />
                <span className="group-hover:underline">{contactEmail}</span>
              </a>
            </div>
          </div>

          {/* 5 Clean Columns according to requirement 55 */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Col 1: Explorar */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
                {l('Explorar', 'Explore', 'Explorar')}
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/experiencias')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Experiencias', 'Experiences', 'Experiências')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/rutas')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Rutas GIA', 'GIA Routes', 'Rotas GIA')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/experiencias-locales')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Experiencias locales', 'Local experiences', 'Experiências locais')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/experiencias-locales')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Historias GIA', 'GIA Stories', 'Histórias GIA')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Planifica */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
                {l('Planifica', 'Plan', 'Planeje')}
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/planea-con-gia')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-[#00A6A6] font-bold"
                  >
                    {l('Planea con GIA', 'Plan with GIA', 'Planeje com a GIA')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/mi-cuenta/referidos')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Mis viajes', 'My trips', 'Minhas viagens')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/mis-reservas')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Mis reservas', 'My bookings', 'Minhas reservas')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: GIA */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
                GIA
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/quienes-somos')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600 font-medium"
                  >
                    {l('Quiénes somos', 'About us', 'Quem somos')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/mi-cuenta/referidos')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Comparte GIA', 'Share GIA', 'Compartilhe a GIA')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/contacto')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Contacto', 'Contact', 'Contato')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/ayuda')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Ayuda', 'Help', 'Ajuda')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
                Legal
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/terminos-y-condiciones')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Términos y Condiciones', 'Terms & Conditions', 'Termos e Condições')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/politica-de-privacidad')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Política de Privacidad', 'Privacy Policy', 'Política de Privacidade')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/preguntas-frecuentes')}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer text-neutral-600"
                  >
                    {l('Preguntas Frecuentes', 'FAQ', 'Perguntas Frequentes')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Contacto Directo */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#063A5B] font-mono">
                {l('Contacto', 'Contact', 'Contato')}
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <a
                    href="tel:+50370119564"
                    className="font-bold text-[#063A5B] hover:text-[#00A6A6] block transition-colors"
                  >
                    +503 7011-9564
                  </a>
                  <span className="text-[11px] text-neutral-400 block">
                    {l('Llamadas y WhatsApp', 'Calls and WhatsApp', 'Chamadas e WhatsApp')}
                  </span>
                </div>

                <a
                  href="https://wa.me/50370119564?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20GIA%20Experiences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100 transition-colors text-[11px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{l('Escríbenos por WhatsApp', 'Message on WhatsApp', 'Fale conosco pelo WhatsApp')}</span>
                </a>

                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[11px] text-[#00A6A6] hover:underline font-medium block truncate pt-1"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            © {new Date().getFullYear()} GIA Experiences. {l('El Salvador diseñado para ti.', 'El Salvador, designed for you.', 'El Salvador desenhado para você.')}
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>{l('Contacto:', 'Contact:', 'Contato:')} <a href={`mailto:${contactEmail}`} className="text-[#00A6A6] hover:underline font-medium">{contactEmail}</a></span>
            <span>·</span>
            <span>{l('Turismo auténtico, comunitario y sostenible.', 'Authentic, community-based, and sustainable tourism.', 'Turismo autêntico, comunitário e sustentável.')}</span>
          </div>
        </div>
      </div>

      {/* Info / Contact Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-[#063A5B] font-bold text-sm">
              {modalData.type === 'contact' ? (
                <MessageSquare className="w-4 h-4 text-[#00A6A6]" />
              ) : (
                <Info className="w-4 h-4 text-[#00A6A6]" />
              )}
              <span>{modalData.title}</span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {modalData.message}
            </p>

            {/* Email Card with Quick Action */}
            <div className="p-3.5 bg-teal-50/70 border border-teal-100 rounded-2xl space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 font-mono">
                {language === 'es' ? 'Correo electrónico de contacto' : 'Contact email'}
              </div>
              <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-teal-200/60 shadow-2xs">
                <a
                  href={`mailto:${modalData.email}`}
                  className="text-xs font-semibold text-[#00A6A6] hover:underline flex items-center gap-1.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[#00A6A6]" />
                  <span className="truncate">{modalData.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-1 text-[11px] font-bold text-neutral-600 hover:text-[#063A5B] bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                  title={language === 'es' ? 'Copiar correo al portapapeles' : 'Copy email to clipboard'}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">{language === 'es' ? 'Copiado' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{language === 'es' ? 'Copiar' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-neutral-500">
                {language === 'es' ? 'Horario de atención: lunes a domingo de 08:00 a 18:00 (GMT-6)' : 'Service hours: Monday to Sunday, 08:00 to 18:00 (GMT-6)'}
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <a
                href={`mailto:${modalData.email}`}
                className="flex-1 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Enviar correo' : 'Send email'}</span>
              </a>
              <button
                type="button"
                onClick={() => setModalData(null)}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
