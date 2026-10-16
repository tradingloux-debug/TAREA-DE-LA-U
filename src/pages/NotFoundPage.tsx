import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { goBack } = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-widest block">
          Error 404
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
          Página no encontrada
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          La ruta que buscas no existe o ha sido trasladada. Regresa a nuestro inicio para continuar explorando experiencias en El Salvador.
        </p>
        <button
          type="button"
          onClick={() => goBack('/')}
          className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver atrás / Inicio</span>
        </button>
      </div>
    </div>
  );
};
