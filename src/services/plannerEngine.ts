import { Experience } from '../types/experience';
import { TourRoute } from '../types/routes';
import { MyTrip, TripDayPlan, PlannerPreferences, TripPace } from '../types/trip';
import { DEMO_EXPERIENCES } from '../data/experiences';
import { DEMO_ROUTES } from '../data/routes';

export const plannerEngine = {
  /**
   * Generates a realistic custom itinerary strictly using real catalog experiences.
   */
  generateTrip(
    preferences: PlannerPreferences,
    baseRoute?: TourRoute | null
  ): MyTrip {
    const daysCount = Math.min(10, Math.max(2, preferences.daysCount || 5));
    const title = baseRoute
      ? `Ruta Personalizada: ${baseRoute.titleEs}`
      : `Viaje a Tu Medida en El Salvador (${daysCount} Días)`;

    // Candidate experiences based on interests
    let catalog = [...DEMO_EXPERIENCES];

    const days: TripDayPlan[] = [];

    // Destinations rotation tailored to El Salvador's geographic flow
    const flowDestinations = [
      { name: 'San Salvador y Centro Histórico', dept: 'San Salvador', expId: 'exp-7' },
      { name: 'Santa Ana y Volcán Ilamatepec', dept: 'Santa Ana', expId: 'exp-1' },
      { name: 'Ruta de las Flores (Apaneca y Juayúa)', dept: 'Ahuachapán', expId: 'exp-2' },
      { name: 'Lago de Coatepeque', dept: 'Santa Ana', expId: 'exp-8' },
      { name: 'Surf City (Playa El Tunco)', dept: 'La Libertad', expId: 'exp-3' },
      { name: 'Suchitoto y Lago Suchitlán', dept: 'Cuscatlán', expId: 'exp-4' },
      { name: 'Parque Nacional El Imposible', dept: 'Ahuachapán', expId: 'exp-6' },
      { name: 'Bahía de Jiquilisco', dept: 'Usulután', expId: 'exp-9' },
      { name: 'Joya de Cerén y Sitios Mayas', dept: 'La Libertad', expId: 'exp-10' },
      { name: 'Montañas de Morazán', dept: 'Morazán', expId: 'exp-12' },
    ];

    let totalBudget = 0;

    for (let d = 1; d <= daysCount; d++) {
      const destInfo = flowDestinations[(d - 1) % flowDestinations.length];
      const matchedExp = catalog.find(e => e.id === destInfo.expId) || catalog[(d - 1) % catalog.length];

      // Second experience if pace is intense
      const dayExperiences: Experience[] = [matchedExp];
      if (preferences.pace === 'intenso' && d % 2 === 0) {
        const extraExp = catalog.find(e => e.id !== matchedExp.id && e.department === matchedExp.department);
        if (extraExp) dayExperiences.push(extraExp);
      }

      const dayTotal = dayExperiences.reduce((sum, e) => sum + e.price, 0);
      totalBudget += dayTotal;

      days.push({
        dayNumber: d,
        destination: destInfo.name,
        themeEs: `Día ${d}: ${destInfo.name}`,
        themeEn: `Day ${d}: ${destInfo.name}`,
        experiences: dayExperiences,
        isFreeDay: false,
        notes: d === daysCount ? 'Día de cierre y compras de artesanías locales.' : undefined,
      });
    }

    // Multiply estimated experience cost by travelers count
    const travelers = preferences.travelersCount || 2;
    const estimatedTotal = totalBudget * travelers;

    return {
      id: 'trip_' + Date.now(),
      title,
      daysCount,
      travelersCount: travelers,
      travelerType: preferences.travelerType,
      budgetTier: preferences.budgetTier,
      pace: preferences.pace,
      interests: preferences.interests,
      destinations: Array.from(new Set(days.map(d => d.destination))),
      days,
      estimatedTotal,
      currency: 'USD',
      status: 'PLANNED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Applies conversational modifications ("Quiero menos playa", "Agrega un volcán", etc.)
   */
  modifyTripByInstruction(currentTrip: MyTrip, instruction: string): MyTrip {
    const text = instruction.toLowerCase().trim();
    const updatedDays = [...currentTrip.days];

    // Intent 1: "menos playa"
    if (text.includes('menos playa') || text.includes('no playa') || text.includes('quitar playa')) {
      const mountainExp = DEMO_EXPERIENCES.find(e => e.category === 'cultura' || e.category === 'naturaleza') || DEMO_EXPERIENCES[0];
      updatedDays.forEach((day, idx) => {
        if (day.destination.includes('Tunco') || day.destination.includes('Playa') || day.destination.includes('Surf')) {
          updatedDays[idx] = {
            ...day,
            destination: 'Suchitoto Colonial y Lago Suchitlán',
            themeEs: `Día ${day.dayNumber}: Patrimonio Histórico y Artesanal`,
            themeEn: `Day ${day.dayNumber}: Historic Heritage & Crafts`,
            experiences: [mountainExp],
          };
        }
      });
    }

    // Intent 2: "agrega un volcán"
    else if (text.includes('volcán') || text.includes('volcan') || text.includes('santa ana')) {
      const volcanoExp = DEMO_EXPERIENCES.find(e => e.id === 'exp-1') || DEMO_EXPERIENCES[0];
      if (updatedDays.length > 1) {
        updatedDays[1] = {
          ...updatedDays[1],
          destination: 'Parque Nacional Los Volcanes',
          themeEs: `Día ${updatedDays[1].dayNumber}: Ascenso al Cráter Santa Ana`,
          themeEn: `Day ${updatedDays[1].dayNumber}: Santa Ana Volcano Hike`,
          experiences: [volcanoExp],
          isFreeDay: false,
        };
      }
    }

    // Intent 3: "más gastronomía"
    else if (text.includes('gastronomía') || text.includes('gastronomia') || text.includes('café') || text.includes('pupusa')) {
      const gastroExp = DEMO_EXPERIENCES.find(e => e.id === 'exp-2') || DEMO_EXPERIENCES[1];
      if (updatedDays.length > 2) {
        updatedDays[2] = {
          ...updatedDays[2],
          destination: 'Ruta de las Flores (Apaneca)',
          themeEs: `Día ${updatedDays[2].dayNumber}: Café de Especialidad y Pupusas`,
          themeEn: `Day ${updatedDays[2].dayNumber}: Coffee Tasting & Pupusa Class`,
          experiences: [gastroExp],
          isFreeDay: false,
        };
      }
    }

    // Intent 4: "día libre"
    else if (text.includes('día libre') || text.includes('dia libre') || text.includes('descanso')) {
      const targetIdx = Math.min(2, updatedDays.length - 1);
      updatedDays[targetIdx] = {
        ...updatedDays[targetIdx],
        themeEs: `Día ${updatedDays[targetIdx].dayNumber}: Día Libre de Descanso y Exploración Personal`,
        themeEn: `Day ${updatedDays[targetIdx].dayNumber}: Leisure & Free Exploration Day`,
        experiences: [],
        isFreeDay: true,
        notes: 'Día sugerido para relajarse en el hotel, pasear sin prisa por mercadillos o disfrutar la piscina.',
      };
    }

    // Intent 5: "más relajado"
    else if (text.includes('relajado') || text.includes('tranquilo') || text.includes('menos intenso')) {
      updatedDays.forEach((day, idx) => {
        updatedDays[idx] = {
          ...day,
          experiences: day.experiences.slice(0, 1),
          notes: 'Ritmo suave con tardes libres para contemplar el paisaje.',
        };
      });
    }

    // Intent 6: "experiencias locales"
    else if (text.includes('local') || text.includes('comunid') || text.includes('artesan')) {
      const localExps = DEMO_EXPERIENCES.filter(e => e.isLocalExperience);
      updatedDays.forEach((day, idx) => {
        if (localExps[idx % localExps.length]) {
          updatedDays[idx] = {
            ...day,
            experiences: [localExps[idx % localExps.length]],
          };
        }
      });
    }

    // Recalculate budget
    const totalExpCost = updatedDays.reduce(
      (sum, d) => sum + d.experiences.reduce((eSum, e) => eSum + e.price, 0),
      0
    );
    const estimatedTotal = totalExpCost * currentTrip.travelersCount;

    return {
      ...currentTrip,
      days: updatedDays,
      estimatedTotal,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Manual actions
   */
  swapDayExperience(currentTrip: MyTrip, dayNumber: number, newExperienceId: string): MyTrip {
    const newExp = DEMO_EXPERIENCES.find(e => e.id === newExperienceId);
    if (!newExp) return currentTrip;

    const days = currentTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          destination: newExp.location,
          themeEs: `Día ${dayNumber}: ${newExp.titleEs}`,
          themeEn: `Day ${dayNumber}: ${newExp.titleEn}`,
          experiences: [newExp],
          isFreeDay: false,
        };
      }
      return d;
    });

    const totalExpCost = days.reduce(
      (sum, d) => sum + d.experiences.reduce((eSum, e) => eSum + e.price, 0),
      0
    );

    return {
      ...currentTrip,
      days,
      estimatedTotal: totalExpCost * currentTrip.travelersCount,
      updatedAt: new Date().toISOString(),
    };
  },

  setFreeDay(currentTrip: MyTrip, dayNumber: number): MyTrip {
    const days = currentTrip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          isFreeDay: true,
          themeEs: `Día ${dayNumber}: Día Libre para Descanso Personal`,
          themeEn: `Day ${dayNumber}: Leisure Free Day`,
          experiences: [],
          notes: 'Tiempo para descansar, recorrer cafeterías locales o relajarse.',
        };
      }
      return d;
    });

    const totalExpCost = days.reduce(
      (sum, d) => sum + d.experiences.reduce((eSum, e) => eSum + e.price, 0),
      0
    );

    return {
      ...currentTrip,
      days,
      estimatedTotal: totalExpCost * currentTrip.travelersCount,
      updatedAt: new Date().toISOString(),
    };
  },
};
