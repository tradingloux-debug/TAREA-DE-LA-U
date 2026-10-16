import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  backAction?: {
    label: string;
    path: string;
  };
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  backAction,
  className = '',
}) => {
  const { navigate, goBack } = useRouter();
  const { language } = useLanguage();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
    >
      {/* Breadcrumb Trail */}
      <ol className="flex flex-wrap items-center gap-1.5 text-neutral-500 font-medium">
        <li>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-[#00A6A6] transition-colors cursor-pointer"
          >
            {language === 'es' ? 'Inicio' : 'Home'}
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-neutral-400">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                {item.path && !isLast ? (
                  <button
                    type="button"
                    onClick={() => navigate(item.path!)}
                    className="hover:text-[#00A6A6] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`font-semibold ${
                      isLast ? 'text-[#063A5B] truncate max-w-[200px] sm:max-w-xs block' : ''
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      {/* Discrete Back Action if requested */}
      {backAction && (
        <button
          type="button"
          onClick={() => goBack(backAction.path)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-neutral-100 text-xs font-semibold text-neutral-600 hover:text-[#063A5B] border border-neutral-200/80 transition-all cursor-pointer ml-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00A6A6]" />
          <span>{backAction.label}</span>
        </button>
      )}
    </nav>
  );
};
