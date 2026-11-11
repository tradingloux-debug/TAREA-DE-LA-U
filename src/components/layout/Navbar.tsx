import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAccount } from '../../context/AccountContext';
import { useBookingDraft } from '../../context/BookingDraftContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { GiaLogo } from '../common/GiaLogo';
import {
  Menu,
  X,
  Home,
  Sparkles,
  User,
  ChevronDown,
  Compass,
  Route,
  Heart,
  BookmarkCheck,
  Share2,
  HelpCircle,
  ArrowRight,
  Mail,
  Copy,
  Check,
  Phone,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();
  const { language, loc } = useLanguage();
  const l = (es: string, en: string, pt?: string) => loc(es, en, pt);
  const { profile } = useAccount();
  const { favorites } = useBookingDraft();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (targetPath: string) => {
    if (targetPath === '/' && (path === '/' || path === '')) return true;
    if (targetPath !== '/' && path.startsWith(targetPath)) return true;
    return false;
  };

  const handleNav = (to: string) => {
    navigate(to);
    setMobileMenuOpen(false);
    setExploreDropdownOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-amber-100/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Official GIA Experiences Logo */}
        <button
          type="button"
          onClick={() => handleNav('/')}
          className="flex items-center text-left focus-visible:outline-[#00B8C8] rounded-md cursor-pointer transition-opacity hover:opacity-95 shrink-0"
          aria-label={`GIA Experiences — ${l('Inicio', 'Home', 'Início')}`}
        >
          <GiaLogo size="navbar" />
        </button>

        {/* Center: Simplified Clean Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-[#173B59]">
          {/* 1. Inicio */}
          <button
            type="button"
            onClick={() => handleNav('/')}
            className={`py-2 transition-colors cursor-pointer ${
              isActive('/')
                ? 'text-[#00B8C8] font-bold border-b-2 border-[#00B8C8]'
                : 'hover:text-[#00B8C8]'
            }`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <span>{l('Inicio', 'Home', 'Início')}</span>
          </button>

          {/* 2. Experiencias */}
          <button
            type="button"
            onClick={() => handleNav('/experiencias')}
            className={`py-2 transition-colors cursor-pointer ${
              isActive('/experiencias') && !isActive('/experiencias-locales')
                ? 'text-[#FF6B57] font-bold border-b-2 border-[#FF6B57]'
                : 'hover:text-[#FF6B57]'
            }`}
          >
            <span>{l('Experiencias', 'Experiences', 'Experiências')}</span>
          </button>

          {/* 3. Rutas */}
          <button
            type="button"
            onClick={() => handleNav('/rutas')}
            className={`py-2 transition-colors cursor-pointer ${
              isActive('/rutas')
                ? 'text-[#00B8C8] font-bold border-b-2 border-[#00B8C8]'
                : 'hover:text-[#00B8C8]'
            }`}
          >
            <span>{l('Rutas', 'Routes', 'Rotas')}</span>
          </button>

          {/* 4. Planifica tu viaje */}
          <button
            type="button"
            onClick={() => handleNav('/planea-con-gia')}
            className={`py-2 transition-colors cursor-pointer ${
              isActive('/planea-con-gia')
                ? 'text-[#39B98A] font-bold border-b-2 border-[#39B98A]'
                : 'hover:text-[#39B98A]'
            }`}
          >
            <span>{l('Crea con GIA', 'Create with GIA', 'Crie com a GIA')}</span>
          </button>

          {/* 5. GIA Premia (Visible & highlighted in main nav) */}
          <button
            type="button"
            onClick={() => handleNav('/gia-premia')}
            className={`py-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              isActive('/gia-premia')
                ? 'text-[#FFC857] font-bold border-b-2 border-[#FFC857]'
                : 'hover:text-[#FFC857]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>GIA Premia</span>
          </button>

          {/* 6. Sobre GIA */}
          <button
            type="button"
            onClick={() => handleNav('/quienes-somos')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap ${
              isActive('/quienes-somos')
                ? 'text-[#00B8C8] font-bold border-b-2 border-[#00B8C8]'
                : 'hover:text-[#00B8C8]'
            }`}
          >
            <span>{l('Sobre GIA', 'About GIA', 'Sobre a GIA')}</span>
          </button>

          {/* 7. Contacto */}
          <button
            type="button"
            onClick={() => handleNav('/contacto')}
            className={`py-2 transition-colors cursor-pointer ${
              isActive('/contacto')
                ? 'text-[#00B8C8] font-bold border-b-2 border-[#00B8C8]'
                : 'hover:text-[#00B8C8]'
            }`}
          >
            <span>{l('Contacto', 'Contact', 'Contato')}</span>
          </button>
        </nav>

        {/* Right: ES / EN, Favoritos, Cuenta & CTA destacado "Crear mi viaje" */}
        <div className="hidden lg:flex items-center gap-3.5">
          <LanguageSelector />

          {/* Favoritos button with counter */}
          <button
            type="button"
            onClick={() => handleNav('/mis-favoritos')}
            className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
              isActive('/mis-favoritos') || isActive('/favoritos')
                ? 'bg-rose-50 text-rose-600 ring-2 ring-rose-300'
                : 'text-neutral-600 hover:text-rose-600 hover:bg-rose-50/70'
            }`}
            title={l('Mis experiencias favoritas', 'My favorite experiences', 'Minhas experiências favoritas')}
            aria-label="Favoritos"
          >
            <Heart
              className={`w-5 h-5 transition-transform active:scale-125 ${
                favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </button>

          {profile ? (
            <button
              type="button"
              onClick={() => handleNav('/mi-cuenta')}
              className={`text-xs font-bold flex items-center gap-2 transition-all cursor-pointer py-1.5 px-3 rounded-full border ${
                isActive('/mi-cuenta')
                  ? 'border-[#00A6A6] text-[#00A6A6] bg-teal-50 ring-2 ring-teal-200'
                  : 'border-neutral-200 text-[#063A5B] hover:border-[#00A6A6] hover:bg-teal-50/50'
              }`}
              title={l('Ver mi cuenta y perfil', 'View my account & profile', 'Ver minha conta e perfil')}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center text-teal-800 text-[11px] font-bold shrink-0 border border-teal-300">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.firstName} className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.firstName.charAt(0)}</span>
                )}
              </div>
              <span className="max-w-[110px] truncate">{profile.firstName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNav('/mi-cuenta')}
              className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg ${
                isActive('/mi-cuenta')
                  ? 'text-[#00A6A6] bg-teal-50'
                  : 'text-[#063A5B] hover:text-[#00A6A6] hover:bg-neutral-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{l('Cuenta', 'Account', 'Conta')}</span>
            </button>
          )}

          {/* CTA Destacado: PRIMARY Coral Tropical #FF6B57 */}
          <button
            type="button"
            onClick={() => handleNav('/planea-con-gia')}
            className="px-5 py-2.5 bg-[#FF6B57] hover:bg-[#E85541] active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#FF6B57]/20 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#FFC857]" />
            <span>{l('Crear mi viaje', 'Create my trip', 'Criar minha viagem')}</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Favorites Heart */}
          <button
            type="button"
            onClick={() => handleNav('/mis-favoritos')}
            className={`relative p-2 rounded-xl transition-all cursor-pointer ${
              isActive('/mis-favoritos') || isActive('/favoritos')
                ? 'bg-rose-50 text-rose-600'
                : 'text-neutral-600 hover:text-rose-600 hover:bg-neutral-100'
            }`}
            aria-label="Favoritos"
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('/')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isActive('/') ? 'bg-teal-50 text-[#00A6A6]' : 'text-[#063A5B] hover:bg-neutral-100'
            }`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <Home className="w-4 h-4" />
            <span>{l('Inicio', 'Home', 'Início')}</span>
          </button>
          {/* Header móvil limpio con logo a la izquierda y hamburguesa a la derecha */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#063A5B] hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? l('Cerrar menú', 'Close menu', 'Fechar menu') : l('Abrir menú', 'Open menu', 'Abrir menu')}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100/90 bg-[#FFFDF8] px-5 pt-4 pb-8 space-y-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1.5 text-sm font-semibold text-[#173B59]">
            <button
              type="button"
              onClick={() => handleNav('/')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/') ? 'bg-[#00B8C8]/10 text-[#00B8C8] font-bold' : 'hover:bg-amber-50/50'
              }`}
            >
              <span>{l('Inicio', 'Home', 'Início')}</span>
              <Home className="w-4 h-4 text-[#00B8C8]" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/experiencias')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/experiencias') && !isActive('/experiencias-locales')
                  ? 'bg-[#FF6B57]/10 text-[#FF6B57] font-bold'
                  : 'hover:bg-amber-50/50'
              }`}
            >
              <span>{l('Explorar experiencias', 'Explore experiences', 'Explorar experiências')}</span>
              <Compass className="w-4 h-4 text-[#FF6B57]" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/rutas')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/rutas') ? 'bg-[#00B8C8]/10 text-[#00B8C8] font-bold' : 'hover:bg-amber-50/50'
              }`}
            >
              <span>{l('Rutas GIA', 'GIA Routes', 'Rotas GIA')}</span>
              <Route className="w-4 h-4 text-[#173B59]" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/planea-con-gia')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/planea-con-gia') ? 'bg-[#39B98A]/10 text-[#39B98A] font-bold' : 'hover:bg-amber-50/50'
              }`}
            >
              <span>{l('Crea con GIA', 'Create with GIA', 'Crie com a GIA')}</span>
              <Sparkles className="w-4 h-4 text-[#FFC857]" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/gia-premia')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/gia-premia') ? 'bg-[#FFC857]/20 text-[#B87C00] font-bold border border-[#FFC857]/40' : 'hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFC857]" />
                <span className="font-bold">GIA Premia</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFC857]/25 text-[#B87C00]">
                  {l('Recompensas', 'Rewards', 'Recompensas')}
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-[#FFC857]" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/quienes-somos')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/quienes-somos') ? 'bg-[#00B8C8]/10 text-[#00B8C8] font-bold' : 'hover:bg-amber-50/50'
              }`}
            >
              <span>{l('Sobre GIA', 'About GIA', 'Sobre a GIA')}</span>
              <Compass className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/mis-favoritos')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/mis-favoritos') || isActive('/favoritos') ? 'bg-teal-50 text-[#00A6A6] font-bold' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{l('Mis favoritos', 'My favorites', 'Meus favoritos')}</span>
              </div>
              {favorites.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('/mis-reservas')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/mis-reservas') ? 'bg-teal-50 text-[#00A6A6] font-bold' : 'hover:bg-neutral-50'
              }`}
            >
              <span>{l('Mis reservas', 'My bookings', 'Minhas reservas')}</span>
              <BookmarkCheck className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/mi-cuenta/referidos')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/mi-cuenta') ? 'bg-teal-50 text-[#00A6A6] font-bold' : 'hover:bg-neutral-50'
              }`}
            >
              <span>{l('Mi cuenta', 'My account', 'Minha conta')}</span>
              <Share2 className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('/contacto')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/contacto') ? 'bg-teal-50 text-[#00A6A6] font-bold' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A6A6]" />
                <span>{l('Contacto (+503 7011-9564)', 'Contact (+503 7011-9564)', 'Contato (+503 7011-9564)')}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleNav('/ayuda')}
              className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                isActive('/ayuda') ? 'bg-teal-50 text-[#00A6A6] font-bold' : 'hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#00A6A6]" />
                <span>{l('Centro de Ayuda & FAQ', 'Help Center & FAQ', 'Central de Ajuda & FAQ')}</span>
              </div>
            </button>
          </nav>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-neutral-500">{l('Idioma:', 'Language:', 'Idioma:')}</span>
            <LanguageSelector />
          </div>

          <div className="flex items-center justify-between px-1">
            {profile ? (
              <button
                type="button"
                onClick={() => handleNav('/mi-cuenta')}
                className="w-full text-left p-3 rounded-2xl bg-teal-50/60 border border-teal-200/60 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-bold shrink-0 border border-teal-300">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{profile.firstName.charAt(0)}</span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {profile.firstName} {profile.lastName}
                  </span>
                  <span className="text-[11px] text-[#00A6A6] font-medium block">
                    {l('Ver mi cuenta y beneficios →', 'View my account & perks →', 'Ver minha conta e benefícios →')}
                  </span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('/mi-cuenta')}
                className="text-xs font-bold text-[#063A5B] flex items-center gap-1.5 hover:text-[#00A6A6] p-1.5"
              >
                <User className="w-4 h-4 text-[#00A6A6]" />
                <span>{l('Iniciar sesión / Crear cuenta', 'Log in / Sign up', 'Entrar / Criar conta')}</span>
              </button>
            )}
          </div>

          {/* Botón grande al final: "Crear mi viaje" */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNav('/planea-con-gia')}
              className="w-full py-4 text-center text-xs font-extrabold uppercase tracking-wider text-white bg-[#FF6B57] hover:bg-[#E85541] rounded-2xl shadow-md shadow-[#FF6B57]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#FFC857]" />
              <span>{l('Crear mi viaje', 'Create my trip', 'Criar minha viagem')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Ayuda y Contacto */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#063A5B]">
                <HelpCircle className="w-5 h-5 text-[#00A6A6]" />
                <h3 className="text-base font-bold font-display">{l('Centro de Ayuda y Contacto GIA', 'GIA Help & Contact Center', 'Central de Ajuda e Contato GIA')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer"
                aria-label={l('Cerrar', 'Close', 'Fechar')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {l(
                '¿Tienes preguntas sobre cómo diseñar tu viaje, personalizar itinerarios o reservar experiencias en El Salvador? Nuestro equipo está listo para ayudarte.',
                'Have questions about designing your trip, customizing itineraries, or booking experiences in El Salvador? Our team is ready to help.',
                'Tem dúvidas sobre como planejar sua viagem, personalizar roteiros ou reservar experiências em El Salvador? Nossa equipe está pronta para ajudar você.'
              )}
            </p>

            <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-neutral-700 space-y-2.5">
              <span className="font-bold text-[#063A5B] block font-mono text-[11px] uppercase tracking-wider">
                {l('Contacto Directo', 'Direct Contact', 'Contato Direto')}
              </span>

              <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-teal-200/60 shadow-2xs">
                <a
                  href="mailto:guiaexperiencessv@gmail.com"
                  className="text-xs font-semibold text-[#00A6A6] hover:underline flex items-center gap-1.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-[#00A6A6]" />
                  <span className="truncate">guiaexperiencessv@gmail.com</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('guiaexperiencessv@gmail.com');
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="px-2 py-1 text-[11px] font-bold text-neutral-600 hover:text-[#063A5B] bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                  title={l('Copiar correo', 'Copy email', 'Copiar e-mail')}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">{l('Copiado', 'Copied', 'Copiado')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{l('Copiar', 'Copy', 'Copiar')}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-neutral-500">
                {l(
                  'Horario de atención: Lunes a Domingo, 08:00 - 18:00 (GMT-6)',
                  'Business hours: Monday to Sunday, 08:00 - 18:00 (GMT-6)',
                  'Horário de atendimento: Segunda a Domingo, 08:00 - 18:00 (GMT-6)'
                )}
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <a
                href="mailto:guiaexperiencessv@gmail.com"
                className="flex-1 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{l('Enviar correo', 'Send email', 'Enviar e-mail')}</span>
              </a>
              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                {l('Cerrar', 'Close', 'Fechar')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
