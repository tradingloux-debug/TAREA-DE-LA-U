import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  FileText,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  ArrowLeft,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const phone = '+503 7011-9564';
  const waUrl = `https://wa.me/50370119564?text=${encodeURIComponent(
    language === 'es'
      ? 'Hola, tengo una consulta sobre los Términos y Condiciones de GIA Experiences.'
      : 'Hello, I have a question regarding the Terms & Conditions of GIA Experiences.'
  )}`;
  const emailOfficial = 'guiaexperiencessv@gmail.com';

  return (
    <div className="bg-neutral-50/70 min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions' },
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
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A6A6] text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Marco Legal Operativo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#063A5B] font-display tracking-tight">
            {language === 'es'
              ? 'Términos y Condiciones de GIA Experiences'
              : 'Terms and Conditions of GIA Experiences'}
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            {language === 'es' ? 'Última actualización: Octubre 2026' : 'Last updated: October 2026'}
          </p>
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-neutral-700 leading-relaxed">
            <p className="font-semibold text-[#063A5B]">
              {language === 'es'
                ? 'GIA EXPERIENCES ES UNA TOUR OPERADORA DE EL SALVADOR.'
                : 'GIA EXPERIENCES IS A TOUR OPERATOR IN EL SALVADOR.'}
            </p>
            <p className="mt-1">
              {language === 'es'
                ? 'GIA diseña, organiza, comercializa y coordina experiencias, excursiones y rutas turísticas en El Salvador, trabajando con anfitriones, comunidades, guías locales, transportistas y aliados para brindar servicios auténticos y de calidad.'
                : 'GIA designs, organizes, commercializes, and coordinates experiences, excursions, and travel routes in El Salvador, collaborating with certified guides, transport providers, local communities, and trusted partners.'}
            </p>
          </div>
        </div>

        {/* Content Clauses */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs space-y-8 text-neutral-700 text-xs sm:text-sm leading-relaxed">
          {/* 1. Identificación */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              1. Identificación de la Empresa
            </h2>
            <p>
              GIA Experiences es una tour operadora turística radicada en El Salvador, especializada en la creación y operación de itinerarios y experiencias guiadas en todo el territorio nacional.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-neutral-400 block text-[11px]">Razón social:</span>
                <span className="font-bold text-neutral-700">[PENDIENTE DE VALIDACIÓN LEGAL]</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-neutral-400 block text-[11px]">NIT / Registro:</span>
                <span className="font-bold text-neutral-700">[PENDIENTE DE COMPLETAR]</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-neutral-400 block text-[11px]">Teléfono oficial:</span>
                <span className="font-bold text-neutral-700">{phone} (Llamadas y WhatsApp)</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
                <span className="text-neutral-400 block text-[11px]">Correo oficial:</span>
                <span className="font-bold text-neutral-700">{emailOfficial}</span>
              </div>
            </div>
          </section>

          {/* 2. Objeto */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              2. Objeto de los Servicios
            </h2>
            <p>
              A través de la plataforma digital, GIA Experiences permite al usuario consultar, diseñar, organizar, reservar y contratar experiencias turísticas, actividades de aventura, talleres culturales, inmersiones gastronómicas y rutas multidía en El Salvador.
            </p>
          </section>

          {/* 3. Confirmación de Reserva */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              3. Confirmación de Reserva
            </h2>
            <p className="font-medium text-neutral-900 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              "La reserva quedará confirmada cuando GIA Experiences haya verificado la disponibilidad correspondiente, recibido el pago o anticipo requerido cuando aplique y enviado al cliente una confirmación de reserva formal por correo electrónico o mensajería autorizada."
            </p>
          </section>

          {/* 4. Información de la Experiencia */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              4. Información Previa de la Experiencia
            </h2>
            <p>
              Antes de solicitar o confirmar cualquier reserva, el cliente tendrá acceso a la información fundamental del servicio: precio total expresado en dólares de EE. UU. (USD), duración estimada, itinerario detallado, servicios incluidos y no incluidos, punto de encuentro verificado, requisitos físicos o de vestimenta y recomendaciones de seguridad.
            </p>
          </section>

          {/* 5. Precios y Pagos */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              5. Precios y Medios de Pago
            </h2>
            <p>
              Todos los precios se expresan en dólares estadounidenses (USD), moneda de curso legal en El Salvador. Cualquier cargo aplicable será presentado antes de la confirmación definitiva. Los pagos se gestionan mediante los canales oficiales autorizados por GIA.
            </p>
          </section>

          {/* 6. Cancelaciones y Reembolsos */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              6. Cancelaciones, Modificaciones y Reembolsos
            </h2>
            <p>
              La política específica de cancelación aplicable a cada experiencia o ruta será informada al cliente antes de formalizar la reserva. GIA Experiences no aplica políticas de exclusión arbitrarias; ante situaciones imprevistas debidamente justificadas, se procurará la reprogramación o alternativas acordes a la naturaleza del servicio.
            </p>
          </section>

          {/* 7. No-Show */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              7. No-Show (No Presentación)
            </h2>
            <p>
              "Cuando un viajero no se presente en la fecha, hora y punto de encuentro establecidos, se aplicarán las condiciones de no-show informadas antes de la reserva, procurando coordinar alternativas operativas cuando la logística del recorrido lo permita."
            </p>
          </section>

          {/* 8. Clima y Condiciones Operativas */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              8. Condiciones Climáticas y Operativas
            </h2>
            <p>
              Determinadas actividades (ascensos a volcanes, surf, navegación o caminatas ecológicas) pueden verse afectadas por factores climáticos, disposiciones de protección civil o condiciones de seguridad. En dichos casos, GIA gestionará la reprogramación de la actividad o una ruta alternativa de valor equivalente.
            </p>
          </section>

          {/* 9. Cambios de Itinerario */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              9. Cambios de Itinerario
            </h2>
            <p className="font-medium text-neutral-900 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              "El orden de determinadas actividades podrá modificarse cuando resulte necesario por razones climáticas, operativas, de seguridad, disponibilidad o acceso, procurando mantener la naturaleza general del servicio contratado."
            </p>
          </section>

          {/* 10. Proveedores y Aliados */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              10. Coordinación con Proveedores y Aliados Locales
            </h2>
            <p>
              GIA coordina la ejecución de traslados, guiados, degustaciones, hospedajes y actividades con transportistas calificados, anfitriones comunitarios, cooperativas y guías locales acreditados, garantizando estándares compartidos de seguridad y servicio.
            </p>
          </section>

          {/* 11 & 12. Responsabilidad y Requisitos del Viajero */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              11. Responsabilidad y Requisitos del Viajero
            </h2>
            <p>
              El viajero se compromete a proporcionar información verídica de contacto, presentarse puntualmente en los puntos de encuentro convenidos, acatar las instrucciones de guías y guardaparques, y respetar las normas de conservación de áreas naturales y patrimonio histórico.
            </p>
          </section>

          {/* 13. Experiencias Comunitarias */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              12. Experiencias Comunitarias y Respeto Cultural
            </h2>
            <p className="font-medium text-neutral-900 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              "Los visitantes deberán mantener una conducta respetuosa hacia las comunidades, anfitriones, costumbres, tradiciones, espacios culturales y ambientes naturales."
            </p>
          </section>

          {/* 14. Planea con GIA (IA) */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              13. Itinerarios Asistidos por IA (Planea con GIA)
            </h2>
            <p>
              Las propuestas generadas mediante la herramienta "Planea con GIA" son itinerarios preliminares sugeridos para inspiración y planificación del viajero. No constituyen automáticamente una reserva confirmada, disponibilidad de cupos ni precio definitivo hasta que el equipo de GIA verifique la viabilidad operativa.
            </p>
          </section>

          {/* 15. Contenido Editorial e IA */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              14. Historias GIA y Contenidos Editoriales
            </h2>
            <p>
              Parte del material visual o introductorio puede ser asistido con fines ilustrativos por herramientas tecnológicas. GIA Experiences no presenta contenidos artificiales como testimonios reales de personas físicas sin previa verificación.
            </p>
          </section>

          {/* 16. Comparte GIA y Créditos */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              15. Programa Comparte GIA y Créditos
            </h2>
            <p>
              Los códigos promocionales y los Créditos GIA son incentivos de fidelización para ser redimidos exclusivamente en reservas de la plataforma. No son transferibles por dinero en efectivo, no constituyen depósito bancario y en ningún caso generarán saldo negativo.
            </p>
          </section>

          {/* 17. Propiedad Intelectual */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              16. Propiedad Intelectual
            </h2>
            <p>
              El nombre comercial GIA Experiences, el logotipo oficial, la identidad gráfica, el código fuente y las fotografías y videos originales son propiedad exclusiva de GIA Experiences y sus creadores, protegidos por las leyes de propiedad intelectual correspondientes.
            </p>
          </section>

          {/* 18. Privacidad */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              17. Privacidad y Protección de Datos
            </h2>
            <p>
              El tratamiento de tus datos personales para la coordinación de reservas se rige por nuestra{' '}
              <button
                type="button"
                onClick={() => navigate('/politica-de-privacidad')}
                className="text-[#00A6A6] font-bold underline cursor-pointer"
              >
                Política de Privacidad
              </button>
              .
            </p>
          </section>

          {/* 19. Reclamos y Contacto */}
          <section className="space-y-3 pb-6 border-b border-neutral-100">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              18. Consultas, Reclamos y Atención al Cliente
            </h2>
            <p>
              Para cualquier duda, solicitud especial o aclaración sobre estos términos, disponemos de nuestros canales directos:
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp: {phone}</span>
              </a>
              <a
                href={`mailto:${emailOfficial}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00A6A6] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{emailOfficial}</span>
              </a>
            </div>
          </section>

          {/* 20. Legislación */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#063A5B] font-display">
              19. Legislación Aplicable
            </h2>
            <p>
              Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes vigentes de la República de El Salvador.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
