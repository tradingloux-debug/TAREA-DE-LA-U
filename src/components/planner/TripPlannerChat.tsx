import React, { useState } from 'react';
import { MyTrip } from '../../types/trip';
import { Send, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';
import { trackEvent } from '../../services/analytics';

interface ChatMessage {
  id: string;
  sender: 'gia' | 'user';
  text: string;
  timestamp: string;
}

interface TripPlannerChatProps {
  currentTrip: MyTrip | null;
  onModifyTrip: (instruction: string) => void;
  onQuickPrompt: (prompt: string) => void;
  className?: string;
}

export const TripPlannerChat: React.FC<TripPlannerChatProps> = ({
  currentTrip,
  onModifyTrip,
  onQuickPrompt,
  className = '',
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'gia',
      text: '¡Hola! Soy tu asistente de viaje de GIA Experiences. Cuéntame cómo imaginas tu viaje a El Salvador y te ayudaré a diseñar una experiencia a tu medida.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    'Quiero aventura',
    'Viajo en pareja',
    'Quiero conocer El Salvador en 7 días',
    'Me interesa la gastronomía',
    'Quiero cultura y comunidades',
    'Viajo con niños',
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    trackEvent('trip_modified', { prompt: text });

    // Process tweak
    setTimeout(() => {
      onModifyTrip(text);

      let responseReply = `Entendido. He actualizado tu itinerario priorizando experiencias del catálogo oficial de GIA.`;
      if (text.toLowerCase().includes('menos playa')) {
        responseReply = 'He sustituido las actividades de costa por joyas culturales y lagos de montaña.';
      } else if (text.toLowerCase().includes('volcán')) {
        responseReply = '¡Listo! He incorporado el ascenso guiado al cráter de Santa Ana en el itinerario.';
      } else if (text.toLowerCase().includes('gastronomía')) {
        responseReply = 'Agregué una inmersión cafetalera y taller de pupusas artesanales en la Ruta de las Flores.';
      } else if (text.toLowerCase().includes('día libre')) {
        responseReply = 'He reservado un día completo para descanso y exploración relajada.';
      }

      const giaReply: ChatMessage = {
        id: 'm_' + Date.now(),
        sender: 'gia',
        text: responseReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, giaReply]);
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl border border-neutral-200/90 shadow-2xs overflow-hidden flex flex-col h-[520px] ${className}`}
    >
      {/* Top Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display">Diseñador de Viajes GIA</h4>
            <span className="text-[10px] text-teal-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Catálogo oficial verificado
            </span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-neutral-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-teal-700 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-neutral-200/80 shadow-2xs rounded-tl-xs'
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`text-[9px] mt-1 block ${
                  msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-neutral-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <span className="text-neutral-400 shrink-0 text-[10px] font-medium mr-1">Sugerencias:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              onQuickPrompt(p);
              handleSend(p);
            }}
            className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-200 text-neutral-700 border border-neutral-200/80 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu petición (ej. 'Quiero un volcán', 'Menos playa', 'Día libre')..."
          className="flex-1 py-2 px-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-700 text-slate-900 placeholder:text-neutral-400"
        />
        <button
          type="button"
          onClick={() => handleSend()}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-2xs transition-colors shrink-0"
          aria-label="Enviar mensaje"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
