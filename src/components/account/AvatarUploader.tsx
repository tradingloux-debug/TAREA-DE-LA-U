import React, { useRef, useState } from 'react';
import { Camera, Upload, Trash2, Check, Sparkles } from 'lucide-react';
import { PRESET_AVATARS } from '../../services/accountService';

import { SupportedLanguage } from '../../types/i18n';

interface AvatarUploaderProps {
  currentAvatar?: string;
  onSelectAvatar: (avatarUrl: string) => void;
  language?: SupportedLanguage;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  currentAvatar,
  onSelectAvatar,
  language = 'es',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [loading, setLoading] = useState(false);

  const t = {
    changePhoto: language === 'pt' ? 'Alterar foto' : language === 'es' ? 'Cambiar foto' : 'Change photo',
    uploadPhoto: language === 'pt' ? 'Enviar foto do seu dispositivo' : language === 'es' ? 'Subir foto desde tu dispositivo' : 'Upload from your device',
    choosePreset: language === 'pt' ? 'Ou escolha um avatar temático' : language === 'es' ? 'O elige un avatar temático' : 'Or choose a themed avatar',
    removePhoto: language === 'pt' ? 'Remover foto' : language === 'es' ? 'Quitar foto' : 'Remove photo',
    uploading: language === 'pt' ? 'Carregando imagem...' : language === 'es' ? 'Cargando imagen...' : 'Loading image...',
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize image to max 256x256 to keep localStorage footprint minimal
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onSelectAvatar(dataUrl);
        }
        setLoading(false);
      };
      img.onerror = () => {
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      setLoading(false);
    };

    reader.readAsDataURL(file);
    // Reset file input so user can pick same file again if desired
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar Preview */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-teal-500/30 bg-teal-50 shadow-md flex items-center justify-center">
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-teal-700 bg-teal-50/80">
                <Camera className="w-8 h-8 stroke-[1.5]" />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wider text-teal-800">
                  {language === 'es' ? 'Sin foto' : 'No photo'}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 bg-[#00A6A6] text-white rounded-full shadow-md hover:bg-[#008f8f] transition-transform active:scale-95 cursor-pointer"
            title={t.uploadPhoto}
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons / Controls */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-teal-200"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{loading ? t.uploading : t.uploadPhoto}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.choosePreset}</span>
            </button>

            {currentAvatar && (
              <button
                type="button"
                onClick={() => onSelectAvatar('')}
                className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.removePhoto}</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-neutral-500">
            {language === 'es'
              ? 'Formatos recomendados: JPG o PNG. Se ajustará automáticamente a formato circular.'
              : 'Recommended: JPG or PNG. Image will be automatically resized to fit.'}
          </p>
        </div>
      </div>

      {/* Preset avatars selection */}
      {showPresets && (
        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 animate-in fade-in duration-150 space-y-2">
          <p className="text-xs font-bold text-neutral-700">
            {language === 'es' ? 'Selecciona un avatar de El Salvador:' : 'Select an El Salvador avatar:'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRESET_AVATARS.map((preset) => {
              const isSelected = currentAvatar === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelectAvatar(preset.url);
                    setShowPresets(false);
                  }}
                  className={`group relative rounded-xl overflow-hidden border-2 p-1 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#00A6A6] bg-teal-50 ring-2 ring-teal-400/40'
                      : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-12 h-12 mx-auto rounded-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="block text-[10px] font-medium text-neutral-700 mt-1 truncate">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#00A6A6] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
