import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'pill' | 'subtle' | 'ghost' | 'card';
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = '/',
  label,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const { goBack, navigate } = useRouter();
  const { language } = useLanguage();

  const defaultText = language === 'es' ? 'Atrás' : 'Back';
  const displayText = label || defaultText;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (fallbackPath) {
      goBack(fallbackPath);
    } else {
      goBack('/');
    }
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-neutral-100 text-neutral-700 hover:text-[#063A5B] text-xs font-bold border border-neutral-200/90 shadow-2xs transition-all cursor-pointer ${className}`}
        aria-label={displayText}
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#00A6A6] group-hover:-translate-x-0.5 transition-transform" />
        <span>{displayText}</span>
      </button>
    );
  }

  if (variant === 'ghost') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#00A6A6] transition-colors cursor-pointer ${className}`}
        aria-label={displayText}
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{displayText}</span>
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 hover:text-[#063A5B] text-xs font-bold border border-neutral-200 shadow-2xs transition-all cursor-pointer ${className}`}
        aria-label={displayText}
      >
        <ArrowLeft className="w-4 h-4 text-[#00A6A6] group-hover:-translate-x-1 transition-transform" />
        <span>{displayText}</span>
      </button>
    );
  }

  if (variant === 'subtle') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100/80 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-900 text-xs font-semibold transition-colors cursor-pointer ${className}`}
        aria-label={displayText}
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{displayText}</span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#063A5B] hover:text-[#00A6A6] transition-colors cursor-pointer ${className}`}
      aria-label={displayText}
    >
      <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-2xs group-hover:border-[#00A6A6]/40 group-hover:bg-teal-50/50 transition-colors">
        <ArrowLeft className="w-4 h-4 text-[#00A6A6] group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span>{displayText}</span>
    </button>
  );
};
