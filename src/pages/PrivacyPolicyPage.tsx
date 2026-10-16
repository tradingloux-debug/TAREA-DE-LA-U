import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield, Lock, Eye, Server, Phone, Mail, MessageCircle, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const phone = '+503 7011-9564';
  const emailOfficial = 'guiaexperiencessv@gmail.com';

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: language === 'es' ? 'Política de Privacidad' : 'Privacy Policy' },
            ]}
            backAction={{
              label: language === 'es' ? '← Volver al inicio' : '← Back to Home',
              path: '/',
            }}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-mono font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Protección de Datos' : 'Data Protection'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight">
            {language === 'es'
              ? 'Política de Privacidad de GIA Experiences'
              : 'Privacy Policy of GIA Experiences'}
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            {language === 'es' ? 'Última actualización: Octubre 2026' : 'Last updated: October 2026'}
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
            {language === 'es'
              ? 'En GIA Experiences respetamos tu privacidad y nos comprometemos a resguardar la información que compartes con nosotros al consultar, planificar o reservar experiencias turísticas en El Salvador.'
              : 'At GIA Experiences, we value your privacy and are committed to safeguarding the information you share when browsing, planning, or booking travel experiences in El Salvador.'}
          </p>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-8 text-neutral-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              1. Información que Recopilamos
            </h2>
            <p>
              Recopilamos únicamente los datos necesarios para brindar y gestionar nuestros servicios turísticos:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>
                <strong>Datos de contacto:</strong> Nombre, apellido, correo electrónico, número de teléfono y WhatsApp.
              </li>
              <li>
                <strong>Datos de reserva:</strong> Fechas seleccionadas, cantidad de viajeros, preferencias de itinerario y notas especiales (dietas, alergias o requerimientos de movilidad).
              </li>
              <li>
                <strong>Datos de uso:</strong> Preferencias de idioma, viajes guardados localmente y códigos de referencia.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              2. Finalidad del Tratamiento de Datos
            </h2>
            <p>
              Tus datos personales son utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>Coordinar y confirmar tus solicitudes de reserva de tours y experiencias.</li>
              <li>Comunicarnos contigo para compartir itinerarios, puntos de encuentro e indicaciones previas al viaje.</li>
              <li>Brindar asistencia personalizada a través de WhatsApp o teléfono antes, durante y después de tu experiencia.</li>
              <li>Gestionar tu saldo de Créditos GIA y programa de referidos.</li>
            </ul>
          </section>

          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              3. Almacenamiento y Seguridad
            </h2>
            <p>
              Implementamos medidas organizativas y técnicas de protección para evitar el acceso no autorizado a tus datos. Las solicitudes y preferencias en tu navegador se gestionan de forma segura, y los datos no son comercializados ni compartidos con terceros con fines publicitarios ajenos.
            </p>
          </section>

          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              4. Proveedores Tecnológicos y Aliados Operativos
            </h2>
            <p>
              Para la correcta prestación del servicio, cierta información necesaria de coordinación (por ejemplo, nombre de viajero y fecha) es compartida exclusivamente con los guías locales y transportistas acreditados asignados a tu experiencia.
            </p>
          </section>

          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              5. Cookies y Preferencias Locales
            </h2>
            <p>
              Utilizamos almacenamiento local en el navegador (Local Storage) para recordar tu idioma seleccionado (Español o Inglés), tus viajes guardados y el estado de tu carrito o borrador de reserva, permitiéndote una navegación fluida sin recargas innecesarias.
            </p>
          </section>

          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              6. Derechos del Usuario
            </h2>
            <p>
              Tienes derecho a solicitar el acceso, actualización, rectificación o eliminación de tus datos de contacto registrados en cualquier momento, escribiéndonos directamente a nuestro canal de soporte.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              7. Contacto para Dudas de Privacidad
            </h2>
            <p>
              Si tienes alguna duda o deseas ejercer tus derechos respecto a tus datos personales:
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`mailto:${emailOfficial}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00A6A6] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{emailOfficial}</span>
              </a>
              <a
                href={`tel:+50370119564`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#063A5B] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
