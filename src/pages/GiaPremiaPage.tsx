import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { useAccount } from '../context/AccountContext';
import { referralService } from '../services/referralService';
import { BackButton } from '../components/common/BackButton';
import {
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  CalendarCheck,
  Coins,
  ShieldCheck,
  Calculator,
  Users,
  Compass,
  Percent,
  Check,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const GiaPremiaPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language, loc } = useLanguage();
  const { profile } = useAccount();

  // Calculator interactive state
  const [calcFriends, setCalcFriends] = useState<number>(3);
  const [calcAvgDays, setCalcAvgDays] = useState<number>(3);

  const estimatedRewardPerFriend = calcAvgDays >= 7 ? 5.0 : [0.5, 1.0, 1.5, 2.0, 3.0, 4.0][calcAvgDays - 1] || 1.5;
  const estimatedTotalCredits = Math.round(calcFriends * estimatedRewardPerFriend * 100) / 100;

  // Reward table mandated by GIA Premia
  const durationTiers = [
    { days: loc('1 día', '1 day'), reward: '$0.50 USD', desc: loc('Tours de un día (volcanes, lagos, cultura)', 'Day tours (volcanoes, lakes, culture)') },
    { days: loc('2 días', '2 days'), reward: '$1.00 USD', desc: loc('Escapadas de fin de semana (Ruta de las Flores)', 'Weekend getaways (Flower Route)') },
    { days: loc('3 días', '3 days'), reward: '$1.50 USD', desc: loc('Circuitos de 3 días y 2 noches', '3 days & 2 nights circuits') },
    { days: loc('4 días', '4 days'), reward: '$2.00 USD', desc: loc('Viajes combinados montaña y playa', 'Combined highland & coastal breaks') },
    { days: loc('5 días', '5 days'), reward: '$3.00 USD', desc: loc('Gran Tour El Salvador Imprescindible', 'Essential El Salvador Grand Tour') },
    { days: loc('6 días', '6 days'), reward: '$4.00 USD', desc: loc('Circuitos occidentales y orientales', 'Western & Eastern comprehensive tours') },
    { days: loc('7 días o más', '7 days or more'), reward: '$5.00 USD', desc: loc('Gran Circuito Nacional Transversal (Máximo por reserva)', 'National Grand Circuit (Max per booking)') },
  ];

  const steps = [
    {
      num: '1',
      title: loc('Paso 1. Vive tu primera experiencia', 'Step 1. Live your first experience'),
      desc: loc(
        'Reserva y completa tu primera experiencia con GIA Experiences.',
        'Book and complete your first experience with GIA Experiences.'
      ),
      icon: Compass,
    },
    {
      num: '2',
      title: loc('Paso 2. Recibe tu código', 'Step 2. Receive your code'),
      desc: loc(
        'Al finalizar tu primera experiencia, recibirás automáticamente un código personal de fidelización (ej. GIA-CLIENTE25).',
        'Upon completing your first trip, you will automatically receive your personal loyalty code (e.g., GIA-CLIENT25).'
      ),
      icon: Gift,
    },
    {
      num: '3',
      title: loc('Paso 3. Vuelve a viajar', 'Step 3. Travel again'),
      desc: loc(
        'Utiliza tu código para obtener un 10 % de descuento en tu segunda reserva elegible.',
        'Use your personal code to get a 10% discount on your second eligible booking.'
      ),
      icon: Percent,
    },
    {
      num: '4',
      title: loc('Paso 4. Comparte con tus amigos', 'Step 4. Share with friends'),
      desc: loc(
        'Comparte tu código con nuevos clientes. Ellos recibirán un 5 % de descuento en su primera reserva elegible.',
        'Share your code with new travelers. They will receive a 5% discount on their first eligible booking.'
      ),
      icon: Share2,
    },
    {
      num: '5',
      title: loc('Paso 5. Acumula recompensas', 'Step 5. Accumulate rewards'),
      desc: loc(
        'Cuando un amigo complete una experiencia elegible utilizando tu código, recibirás crédito GIA que podrás utilizar en futuras reservas.',
        'When a friend completes an eligible experience using your code, you receive GIA promotional credits for your next trips.'
      ),
      icon: Coins,
    },
  ];

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10 sm:py-14 pb-24 selection:bg-[#00B8C8]/20 selection:text-[#173B59]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation */}
        <div>
          <BackButton fallbackPath="/" label={loc('Volver al inicio', 'Back to Home')} />
        </div>

        {/* 1. Header / Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#173B59] via-[#103450] to-[#00B8C8] text-white p-8 sm:p-12 shadow-xl border border-teal-800/40">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC857] text-[#173B59] text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GIA PREMIA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-[1.12]">
              {loc('Viaja, comparte y gana con GIA Premia', 'Travel, share, and earn with GIA Premia')}
            </h1>

            <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed max-w-2xl">
              {loc(
                'En GIA Experiences creemos que cada aventura merece una recompensa. Por eso, cuando viajas con nosotros, puedes obtener beneficios especiales para tus próximos viajes y compartirlos con otras personas.',
                'At GIA Experiences we believe every adventure deserves a reward. When you travel with us, earn exclusive benefits for your next journeys and share them with fellow travelers.'
              )}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(profile ? '/mi-cuenta' : '/mi-cuenta')}
                className="px-7 py-3.5 bg-[#FF6B57] hover:bg-[#E85541] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{profile ? loc('Ver Mi GIA Premia', 'View My GIA Premia') : loc('Consultar mi código en Mi Cuenta', 'Check my code in My Account')}</span>
                <ArrowRight className="w-4 h-4 text-[#FFC857]" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/experiencias')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <span>{loc('Explorar experiencias elegibles', 'Explore eligible experiences')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Three Core Pillars Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-amber-100/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B57]/10 border border-[#FF6B57]/20 flex items-center justify-center text-[#FF6B57]">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#173B59] font-display">
              {loc('10 % de descuento', '10% Discount')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {loc(
                'Por regresar y reservar tu segunda experiencia elegible con GIA. Un beneficio exclusivo para clientes que vuelven a viajar.',
                'For returning and booking your second eligible experience with GIA. An exclusive perk for returning travelers.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-amber-100/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00B8C8]/10 border border-[#00B8C8]/20 flex items-center justify-center text-[#00B8C8]">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#173B59] font-display">
              {loc('5 % para tus amigos', '5% for your friends')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {loc(
                'Comparte tu código personal y permite que nuevos viajeros disfruten un descuento en su primera experiencia elegible.',
                'Share your personal code and allow new travelers to enjoy a welcome discount on their first eligible tour.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-amber-100/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC857]/20 border border-[#FFC857]/40 flex items-center justify-center text-[#B8860B]">
              <Coins className="w-6 h-6 text-[#173B59]" />
            </div>
            <h3 className="text-xl font-bold text-[#173B59] font-display">
              {loc('Gana recompensas', 'Earn rewards')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {loc(
                'Acumula crédito GIA cuando otras personas completen experiencias utilizando tu código personal. Aplícalo como saldo en tus próximos viajes.',
                'Earn GIA promotional credits whenever someone completes a trip using your code. Redeem it toward future tours.'
              )}
            </p>
          </div>
        </section>

        {/* 3. Section: ¿Cómo funciona? (5 Pasos) */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-100/90 shadow-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#00B8C8] uppercase tracking-wider block">
              {loc('Paso a paso', 'Step-by-step')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#173B59] font-display tracking-tight">
              {loc('¿Cómo funciona?', 'How does it work?')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
              {loc(
                'Un programa transparente, sin membresías ni suscripciones. Se activa automáticamente con tu primer viaje.',
                'A transparent program with zero membership fees. Automatically activates upon your first completed journey.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.num} className="p-5 rounded-2xl bg-[#FFFDF8] border border-amber-100 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#173B59] text-white text-xs font-bold font-mono flex items-center justify-center">
                        {st.num}
                      </span>
                      <Icon className="w-4 h-4 text-[#00B8C8]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#173B59] font-display leading-snug">
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-[11.5px] text-neutral-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Reward Schedule by Duration Table */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-100/90 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF6B57] uppercase tracking-wider block">
              {loc('Tabla Oficial de Créditos GIA', 'Official GIA Credit Table')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#173B59] font-display tracking-tight">
              {loc('Recompensas por recomendaciones', 'Rewards for Recommendations')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              {loc(
                'Las recompensas se calculan en función de la duración de la experiencia completada por la persona referida, en paquetes seleccionados con suficiente margen de contribución. Máximo $5.00 USD por reserva.',
                'Rewards are calculated based on the trip duration completed by your referred friend, on selected packages with sustainable contribution margin. Up to $5.00 USD per booking.'
              )}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-amber-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#173B59] text-white text-[11px] font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">{loc('Duración de la experiencia', 'Experience Duration')}</th>
                  <th className="py-3.5 px-4">{loc('Recompensa en crédito GIA', 'GIA Credit Reward')}</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">{loc('Ejemplo de experiencia', 'Experience Example')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 bg-white">
                {durationTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#173B59]">{tier.days}</td>
                    <td className="py-3 px-4 font-mono font-black text-[#00B8C8] text-sm">{tier.reward}</td>
                    <td className="py-3 px-4 text-neutral-500 hidden sm:table-cell">{tier.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Interactive Simulator */}
        <section className="rounded-3xl bg-gradient-to-br from-[#173B59] via-[#103450] to-[#00B8C8] text-white p-8 sm:p-10 shadow-lg border border-teal-900/50 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFC857] uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>{loc('Simulador Interactivo', 'Interactive Simulator')}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            {loc('Calcula cuánto crédito puedes acumular', 'Calculate how much credit you could earn')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            <div className="space-y-5">
              {/* Slider Friends */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{loc('Amigos que viajan con tu código:', 'Friends traveling with your code:')}</span>
                  <span className="font-mono text-[#FFC857] text-sm">{calcFriends} {loc('amigos', 'friends')}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calcFriends}
                  onChange={(e) => setCalcFriends(Number(e.target.value))}
                  className="w-full accent-[#FFC857] cursor-pointer"
                />
              </div>

              {/* Slider Duration */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{loc('Duración promedio del viaje de tus amigos:', 'Average trip duration of your friends:')}</span>
                  <span className="font-mono text-[#FFC857] text-sm">{calcAvgDays} {calcAvgDays === 1 ? loc('día', 'day') : loc('días', 'days')}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={calcAvgDays}
                  onChange={(e) => setCalcAvgDays(Number(e.target.value))}
                  className="w-full accent-[#00B8C8] cursor-pointer"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-2">
              <span className="text-xs text-slate-200 font-mono uppercase tracking-wider block">
                {loc('Crédito acumulado estimado', 'Estimated accumulated credit')}
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#FFC857]">
                ${estimatedTotalCredits.toFixed(2)} USD
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed max-w-xs mx-auto">
                {loc(
                  'Saldo promocional listo para descontar de tu próxima aventura con GIA Experiences.',
                  'Promotional credit ready to apply directly on your next GIA Experiences adventure.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Terms & Transparencies */}
        <section className="bg-white rounded-3xl p-8 border border-amber-100/90 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#173B59] font-display flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00B8C8]" />
            <span>{loc('Términos y condiciones esenciales', 'Essential terms and conditions')}</span>
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('El 10% de uso personal se habilita en tu segunda reserva tras completar la primera.', 'The 10% personal discount unlocks on your second booking after completing the first.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('El 5% para referidos aplica únicamente a clientes nuevos en su primera experiencia elegible.', 'The 5% referral discount applies strictly to new travelers on their first eligible tour.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('Los descuentos no son acumulables entre sí ni con otras promociones simultáneas.', 'Discounts cannot be combined with each other or with other concurrent offers.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('Las recompensas se acreditan tras el pago y la finalización exitosa de la experiencia referida.', 'Rewards are credited after payment and successful completion of the referred experience.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('El crédito acumulado se utiliza para futuras reservas y no es canjeable por dinero en efectivo.', 'Accumulated balance serves as booking credits and cannot be withdrawn as cash.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#39B98A] shrink-0 mt-0.5" />
              <span>{loc('Aplica a paquetes seleccionados con margen de contribución aprobado por la operadora.', 'Applies to selected packages with an approved tour operator contribution margin.')}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
