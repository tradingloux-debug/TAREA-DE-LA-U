import React from 'react';
import { ItineraryItem } from '../../types/experience';
import { useLanguage } from '../../context/LanguageContext';
import { Clock } from 'lucide-react';

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ items }) => {
  const { language } = useLanguage();

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200">
      {items.map((item, idx) => {
        const itemTitle = language === 'es' ? item.titleEs : item.titleEn;
        const itemDesc = language === 'es' ? item.descriptionEs : item.descriptionEn;

        return (
          <div key={idx} className="relative group">
            {/* Dot marker */}
            <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-white border-2 border-teal-700 flex items-center justify-center shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-700" />
            </div>

            {/* Time badge & title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100">
                  <Clock className="w-3 h-3 text-teal-700" />
                  {item.time}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                  {itemTitle}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-0.5">
                {itemDesc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
