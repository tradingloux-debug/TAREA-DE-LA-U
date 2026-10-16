import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs font-medium text-neutral-600 ${className}`}>
      <Globe className="w-3.5 h-3.5 text-neutral-400 ml-1" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          language === 'es'
            ? 'bg-white text-neutral-900 shadow-xs font-semibold'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
        aria-label="Cambiar idioma a Español"
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <span className="text-neutral-300 text-[10px]" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          language === 'en'
            ? 'bg-white text-neutral-900 shadow-xs font-semibold'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
        aria-label="Switch language to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span className="text-neutral-300 text-[10px]" aria-hidden="true">/</span>
      <button
        type="button"
        onClick={() => setLanguage('pt')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          language === 'pt'
            ? 'bg-white text-neutral-900 shadow-xs font-semibold'
            : 'text-neutral-500 hover:text-neutral-800'
        }`}
        aria-label="Mudar idioma para Português"
        aria-pressed={language === 'pt'}
      >
        PT
      </button>
    </div>
  );
};
