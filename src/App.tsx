import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { BookingDraftProvider } from './context/BookingDraftContext';
import { AccountProvider } from './context/AccountContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ExploreElSalvadorPage } from './pages/ExploreElSalvadorPage';
import { RoutesPage } from './pages/RoutesPage';
import { RouteDetailPage } from './pages/RouteDetailPage';
import { LocalExperiencesPage } from './pages/LocalExperiencesPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { ReferralsPage } from './pages/ReferralsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { FaqPage } from './pages/FaqPage';
import { HelpPage } from './pages/HelpPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Route selector
  const renderPage = () => {
    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/experiencias') {
      return <ExperiencesPage />;
    }
    if (path.startsWith('/experiencias/')) {
      return <ExperienceDetailPage />;
    }
    if (path === '/rutas') {
      return <RoutesPage />;
    }
    if (path.startsWith('/rutas/')) {
      return <RouteDetailPage />;
    }
    if (path === '/experiencias-locales') {
      return <LocalExperiencesPage />;
    }
    if (path === '/planea-con-gia' || path.startsWith('/planea-con-gia') || path === '/planificador' || path.startsWith('/planificador')) {
      return <TripPlannerPage />;
    }
    if (path === '/mi-cuenta' || path.startsWith('/mi-cuenta')) {
      return <ReferralsPage />;
    }
    if (path === '/checkout') {
      return <CheckoutPage />;
    }
    if (path === '/reserva-confirmada') {
      return <ConfirmationPage />;
    }
    if (path === '/mis-reservas') {
      return <MyBookingsPage />;
    }
    if (path === '/mis-favoritos' || path === '/favoritos') {
      return <FavoritesPage />;
    }
    if (path === '/explorar-el-salvador') {
      return <ExploreElSalvadorPage />;
    }
    if (path === '/contacto' || path === '/contact') {
      return <ContactPage />;
    }
    if (path === '/quienes-somos' || path === '/about-us') {
      return <AboutUsPage />;
    }
    if (path === '/terminos-y-condiciones' || path === '/terms-and-conditions') {
      return <TermsPage />;
    }
    if (path === '/politica-de-privacidad' || path === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (path === '/preguntas-frecuentes' || path === '/faq') {
      return <FaqPage />;
    }
    if (path === '/ayuda' || path === '/help') {
      return <HelpPage />;
    }
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-teal-500/20 selection:text-teal-900">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AccountProvider>
          <BookingDraftProvider>
            <AppContent />
          </BookingDraftProvider>
        </AccountProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}
