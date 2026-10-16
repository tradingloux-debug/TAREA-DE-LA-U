import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { language } = useLanguage();
  const { path } = useRouter();
  const [dismissedTooltip, setDismissedTooltip] = useState(false);

  // Only show on requested pages: Home, Experiencias, Rutas, Experiencias Locales, Contacto
  // Never show on checkout or confirmation to avoid blocking booking flow
  const allowedPaths = [
    '/',
    '',
    '/experiencias',
    '/rutas',
    '/experiencias-locales',
    '/contacto',
    '/contact',
    '/quienes-somos',
    '/about-us',
    '/preguntas-frecuentes',
    '/faq',
    '/ayuda',
    '/help',
  ];

  const isAllowed =
    allowedPaths.includes(path) ||
    path.startsWith('/experiencias/') ||
    path.startsWith('/rutas/');

  if (!isAllowed) return null;

  const phone = '50370119564';
  const defaultMessage =
    language === 'es'
      ? 'Hola, me gustaría recibir información sobre las experiencias de GIA Experiences.'
      : 'Hello, I would like more information about GIA Experiences.';

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-30 flex items-center gap-2 group">
      {/* Tooltip */}
      {!dismissedTooltip && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white text-[#063A5B] text-xs font-bold py-2 px-3.5 rounded-2xl shadow-lg border border-neutral-200/90 animate-in fade-in slide-in-from-right-2 duration-200">
          <span>{language === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDismissedTooltip(true);
            }}
            className="text-neutral-400 hover:text-neutral-600 p-0.5 rounded-full cursor-pointer"
            aria-label={language === 'es' ? 'Cerrar ayuda' : 'Close help'}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'es' ? 'Chat por WhatsApp con GIA Experiences (+503 7011-9564)' : 'Chat with GIA Experiences on WhatsApp (+503 7011-9564)'}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ring-4 ring-white/80"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
