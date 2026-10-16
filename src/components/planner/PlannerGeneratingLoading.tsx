import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Compass, Route, CheckCircle2 } from 'lucide-react';

interface PlannerGeneratingLoadingProps {
  onComplete?: () => void;
}

export const PlannerGeneratingLoading: React.FC<PlannerGeneratingLoadingProps> = ({
  onComplete,
}) => {
  const steps = [
    { text: 'Entendiendo tus preferencias...', icon: Bot, progress: 25 },
    { text: 'Buscando experiencias que encajen contigo...', icon: Compass, progress: 55 },
    { text: 'Organizando los mejores días para tu ruta...', icon: Route, progress: 85 },
    { text: 'Preparando tu viaje GIA...', icon: Sparkles, progress: 100 },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onComplete]);

  const activeStep = steps[currentStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-lg p-8 sm:p-12 text-center space-y-8 animate-in fade-in duration-300">
      {/* Icon Badge */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#00A6A6]/20 animate-ping" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#063A5B] to-[#00A6A6] text-white flex items-center justify-center shadow-lg">
          <StepIcon className="w-8 h-8 text-[#FDBA2D] animate-pulse" />
        </div>
      </div>

      {/* Dynamic Step Text */}
      <div className="space-y-2 max-w-md mx-auto">
        <span className="text-xs font-mono font-bold text-[#00A6A6] uppercase tracking-wider">
          Travel Designer en Acción · Paso {currentStepIndex + 1} de {steps.length}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-[#063A5B] font-display min-h-[64px] flex items-center justify-center">
          {activeStep.text}
        </h3>
        <p className="text-xs text-neutral-500">
          Analizando el catálogo auténtico de El Salvador para coordinar distancias y horarios.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-xs mx-auto space-y-2">
        <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden border border-neutral-200">
          <div
            className="bg-gradient-to-r from-[#00A6A6] via-[#20C5C7] to-[#FDBA2D] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${activeStep.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-neutral-400">
          <span>Personalizando</span>
          <span>{activeStep.progress}%</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="max-w-sm mx-auto space-y-2 text-left pt-2 border-t border-neutral-100">
        {steps.map((s, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-colors ${
                isDone
                  ? 'text-emerald-700 font-semibold'
                  : isCurrent
                  ? 'text-[#063A5B] font-bold'
                  : 'text-neutral-400 font-normal'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-800'
                    : isCurrent
                    ? 'bg-[#00A6A6] text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
              </div>
              <span className="truncate">{s.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
