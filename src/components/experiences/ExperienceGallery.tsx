import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Images,
  Maximize2,
  X,
  Camera,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PhotoCredit } from '../../types/experience';

interface ExperienceGalleryProps {
  images: string[];
  title: string;
  credits?: PhotoCredit[];
  destinationName?: string;
}

export const ExperienceGallery: React.FC<ExperienceGalleryProps> = ({
  images,
  title,
  credits = [],
  destinationName,
}) => {
  const { language, t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const safeImages = images.filter(Boolean);
  const activeImage = safeImages[selectedIdx] || safeImages[0];
  const hasMultipleImages = safeImages.length > 1;

  const currentCredit = credits[selectedIdx] || credits[0];

  const handleImgError = (idx: number) => {
    setHasError((prev) => ({ ...prev, [idx]: true }));
  };

  const showPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!safeImages.length) return;
    setSelectedIdx((current) => (current - 1 + safeImages.length) % safeImages.length);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!safeImages.length) return;
    setSelectedIdx((current) => (current + 1) % safeImages.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, safeImages.length]);

  return (
    <div className="space-y-4">
      {/* Main Large Visual Stage */}
      <div className="relative h-[340px] sm:h-[460px] md:h-[540px] w-full rounded-3xl overflow-hidden bg-neutral-900 shadow-xl group border border-neutral-200/50">
        {!hasError[selectedIdx] && activeImage ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block w-full h-full cursor-zoom-in text-left focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#00A6A6]"
            aria-label={`${t.detail.openGallery}: ${title}`}
          >
            <img
              src={activeImage}
              alt={currentCredit?.caption || `${title} - Fotografía ${selectedIdx + 1}`}
              onError={() => handleImgError(selectedIdx)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#063A5B] to-[#04283f] text-slate-300 p-6 text-center">
            <Compass className="w-14 h-14 text-[#00A6A6] opacity-75 mb-3" />
            <span className="text-base font-semibold text-white">{title}</span>
            <span className="text-xs text-slate-400 mt-1">
              {language === 'es'
                ? 'Espacio preparado para fotografía verificada del destino'
                : 'Space prepared for verified destination photograph'}
            </span>
          </div>
        )}

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Top Floating Badge bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
            <Camera className="w-3.5 h-3.5 text-[#FDBA2D]" />
            <span>{language === 'es' ? 'Fotografía real verificada' : 'Verified authentic photo'}</span>
          </span>

          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#063A5B] text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            title={language === 'es' ? 'Aportar fotografía autorizada' : 'Contribute authorized photo'}
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#00A6A6]" />
            <span className="hidden sm:inline">
              {language === 'es' ? 'Aportar foto' : 'Suggest photo'}
            </span>
          </button>
        </div>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 pointer-events-none z-10">
          <div className="space-y-1 max-w-[70%]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15">
              <Images className="w-3.5 h-3.5 text-[#FDBA2D]" />
              {selectedIdx + 1} / {Math.max(safeImages.length, 1)}
            </span>
            {currentCredit?.caption && (
              <p className="text-white text-xs font-medium drop-shadow-md truncate hidden sm:block">
                {currentCredit.caption}
              </p>
            )}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {activeImage && (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#063A5B] text-xs font-bold shadow-lg hover:bg-neutral-100 transition-all cursor-pointer active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#00A6A6]" />
                <span>{language === 'es' ? 'Ver pantalla completa' : 'Fullscreen gallery'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Previous & Next Floating Buttons on Hero */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label={t.detail.previousImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/25 flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer shadow-lg z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label={t.detail.nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/25 flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer shadow-lg z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Secondary Thumbnails Row */}
      {hasMultipleImages && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span className="font-semibold text-neutral-700">
              {language === 'es' ? 'Fotografías del destino' : 'Destination photo gallery'} ({safeImages.length})
            </span>
            <span className="text-[11px] text-neutral-400">
              {language === 'es' ? 'Haz clic en una miniatura para ampliar' : 'Click a thumbnail to inspect'}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 overflow-x-auto pb-1">
            {safeImages.map((img, idx) => {
              const credit = credits[idx];
              const isCurrent = selectedIdx === idx;
              return (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  onDoubleClick={() => {
                    setSelectedIdx(idx);
                    setLightboxOpen(true);
                  }}
                  aria-label={`${t.detail.thumbnail} ${idx + 1}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#00A6A6] ring-3 ring-[#00A6A6]/20 shadow-md scale-[1.02]'
                      : 'border-neutral-200/90 opacity-75 hover:opacity-100 hover:border-neutral-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={credit?.caption || `${t.detail.thumbnail} ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Photo Credits Notice */}
      {currentCredit && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/70 text-[11px] text-neutral-600">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Info className="w-3.5 h-3.5 text-[#00A6A6] shrink-0" />
            <span className="font-semibold text-neutral-800">
              {language === 'es' ? 'Foto actual:' : 'Current photo:'}
            </span>
            <span className="italic">{currentCredit.caption || title}</span>
            <span className="text-neutral-400">·</span>
            <span>{language === 'es' ? 'Autor:' : 'Author:'} <strong>{currentCredit.author}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentCredit.licenseUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-[#00A6A6] underline"
            >
              {currentCredit.license}
            </a>
            <a
              href={currentCredit.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-600 underline"
            >
              <span>{language === 'es' ? 'Fuente oficial' : 'Source'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* High-Resolution Lightbox Modal */}
      {lightboxOpen && activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar inside Lightbox */}
          <div className="flex items-center justify-between text-white z-20 pb-2 border-b border-white/10">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FDBA2D]">
                  GIA Experiences
                </span>
                <span className="text-white/40">·</span>
                <span className="text-xs font-semibold text-white/80">
                  {selectedIdx + 1} de {safeImages.length}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                {title}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label={t.detail.closeGallery}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Main High-Res Image Area */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={currentCredit?.caption || `${title} - Fotografía ampliada ${selectedIdx + 1}`}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl select-none"
            />

            {/* Left and Right Navigation inside Lightbox */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label={t.detail.previousImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label={t.detail.nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xl"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Bar: Credits & Quick Thumbnails */}
          <div
            className="z-20 pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] text-white/70 max-w-lg text-center sm:text-left">
              {currentCredit ? (
                <>
                  <span className="font-semibold text-white">Autor:</span> {currentCredit.author} ·{' '}
                  <span className="font-semibold text-white">Licencia:</span> {currentCredit.license} ·{' '}
                  <a
                    href={currentCredit.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#20C5C7] underline hover:text-white"
                  >
                    Ver archivo original
                  </a>
                </>
              ) : (
                <span>Fotografía documental autorizada de El Salvador</span>
              )}
            </div>

            {/* Micro thumbnail strip inside Lightbox */}
            {hasMultipleImages && (
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                {safeImages.map((img, idx) => (
                  <button
                    key={`lb-thumb-${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`h-10 w-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedIdx === idx
                        ? 'border-[#20C5C7] scale-105 ring-2 ring-[#20C5C7]/50'
                        : 'border-white/20 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contribute / Upload Modal (Space prepared for manual upload / license verification) */}
      {uploadModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#00A6A6]" />
                <h3 className="text-base font-bold text-[#063A5B] font-display">
                  {language === 'es' ? 'Aportar fotografía autorizada' : 'Contribute authorized photo'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadModalOpen(false);
                  setUploadSuccess(false);
                }}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-neutral-900">
                  {language === 'es' ? '¡Fotografía recibida con éxito!' : 'Photo submitted successfully!'}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === 'es'
                    ? 'Nuestro equipo revisará la resolución, metadatos y condiciones de derechos de autor antes de incorporarla al catálogo oficial.'
                    : 'Our editorial team will verify resolution, copyright permissions, and destination accuracy.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setUploadSuccess(false);
                  }}
                  className="px-5 py-2.5 bg-[#063A5B] text-white text-xs font-bold rounded-xl"
                >
                  {language === 'es' ? 'Entendido' : 'Close'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setUploadSuccess(true);
                }}
                className="space-y-4"
              >
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === 'es'
                    ? `Espacio preparado para recibir fotografías reales de ${destinationName || title}. GIA Experiences solo publica imágenes auténticas con consentimiento o licencias Creative Commons verificadas.`
                    : `Space prepared for verified real photography of ${destinationName || title}.`}
                </p>

                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center space-y-2 hover:border-[#00A6A6] transition-colors cursor-pointer bg-neutral-50">
                  <UploadCloud className="w-8 h-8 text-[#00A6A6] mx-auto" />
                  <div className="text-xs font-semibold text-neutral-700">
                    {language === 'es' ? 'Arrastra tus fotos o haz clic aquí' : 'Drag photos or click to browse'}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    JPG, PNG o WebP en alta resolución (Mínimo 1920x1080)
                  </div>
                  <input type="file" accept="image/*" className="hidden" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    {language === 'es' ? 'Nombre del fotógrafo o titular:' : 'Photographer or copyright holder:'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Rivera / Archivo Local"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-xl focus:border-[#00A6A6] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 block">
                    {language === 'es' ? 'Licencia o autorización de uso:' : 'License or usage authorization:'}
                  </label>
                  <select className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-xl focus:border-[#00A6A6] focus:outline-hidden bg-white">
                    <option>Autorización directa para GIA Experiences</option>
                    <option>Creative Commons CC BY 4.0 / CC BY-SA</option>
                    <option>Dominio Público (CC0)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#00A6A6] hover:bg-[#009191] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {language === 'es' ? 'Enviar para verificación' : 'Submit for review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
