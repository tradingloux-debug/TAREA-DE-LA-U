import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { trackEvent } from '../../services/analytics';
import { Category } from '../../types/experience';

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { navigate } = useRouter();
  const { t, language } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      trackEvent('search_used', { query: searchTerm.trim() });
      navigate(`/experiencias?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/experiencias');
    }
  };

  const handleQuickFilter = (category: Category) => {
    trackEvent('filter_used', { category, source: 'hero_quick_filter' });
    navigate(`/experiencias?category=${category}`);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-3 ${className}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center bg-white rounded-2xl shadow-xl border border-neutral-200/90 p-2 focus-within:ring-2 focus-within:ring-[#00A6A6] transition-all"
      >
        <div className="pl-3.5 pr-2 text-neutral-400">
          <Search className="w-5 h-5 text-[#00A6A6]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={language === 'es' ? 'Busca playa, volcanes, gastronomía, cultura...' : 'Search beaches, volcanoes, food, culture...'}
          className="w-full py-2 px-1 text-sm text-[#063A5B] placeholder:text-neutral-400 focus:outline-hidden bg-transparent"
        />
        <button
          type="submit"
          className="shrink-0 px-6 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          {t.hero.searchBtn}
        </button>
      </form>

      {/* Quick Category filter buttons */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-0.5 text-xs text-slate-200">
        <span className="text-slate-300 font-medium">{language === 'es' ? 'Populares:' : 'Popular:'}</span>
        <button
          type="button"
          onClick={() => handleQuickFilter('cultura')}
          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer text-xs"
        >
          {t.categories.culture}
        </button>
        <button
          type="button"
          onClick={() => handleQuickFilter('gastronomia')}
          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer text-xs"
        >
          {t.categories.gastronomy}
        </button>
        <button
          type="button"
          onClick={() => handleQuickFilter('naturaleza')}
          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer text-xs"
        >
          {language === 'es' ? 'Naturaleza y volcanes' : 'Nature & volcanoes'}
        </button>
        <button
          type="button"
          onClick={() => handleQuickFilter('aventura')}
          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors cursor-pointer text-xs"
        >
          {language === 'es' ? 'Aventura y surf' : 'Adventure & surf'}
        </button>
      </div>
    </div>
  );
};
