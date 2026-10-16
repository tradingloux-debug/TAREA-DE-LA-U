import { TourRoute } from '../types/routes';

import routeEsencial from '../assets/images/route_esencial_elsalvador_1791259912258.jpg';
import routeCostaVolcanes from '../assets/images/route_costa_volcanes_1791259922631.jpg';
import routeSabores from '../assets/images/route_sabores_salvador_1791259932966.jpg';
import panoSantaAna from '../assets/images/pano360_santa_ana_v2.jpg';
import panoSurfTunco from '../assets/images/pano360_surf_tunco_v2.jpg';
import panoSuchitoto from '../assets/images/pano360_suchitoto_v2.jpg';
import panoCoatepeque from '../assets/images/pano360_coatepeque_v2.jpg';

export const DEMO_ROUTES: TourRoute[] = [
  {
    id: 'route-1',
    slug: 'el-salvador-esencial-5-dias',
    titleEs: 'El Salvador Esencial: Volcanes, Pueblos y Olas',
    titleEn: 'Essential El Salvador: Volcanoes, Heritage & Coastline',
    descriptionEs: 'La travesía definitiva de 5 días para conocer los contrastes de El Salvador. Desde la cumbre esmeralda del volcán Santa Ana y las calles coloniales de Suchitoto, hasta los cafetales de altura en Apaneca y el atardecer en las playas de Surf City.',
    descriptionEn: 'The definitive 5-day itinerary balancing El Salvador’s vibrant contrasts. Ascend the emerald volcanic caldera of Santa Ana, stroll colonial Suchitoto, sip Pacamara coffee in mountain towns, and unwind on Pacific surf breaks.',
    days: 5,
    destinations: ['San Salvador', 'Santa Ana', 'Apaneca', 'Suchitoto', 'El Tunco'],
    departments: ['San Salvador', 'Santa Ana', 'Ahuachapán', 'Cuscatlán', 'La Libertad'],
    experiences: ['exp-1', 'exp-2', 'exp-3', 'exp-4', 'exp-7'],
    images: [routeEsencial, routeCostaVolcanes],
    has360: true,
    virtualTour360Url: panoSantaAna,
    price: 385,
    currency: 'USD',
    includedEs: [
      'Transporte privado con aire acondicionado y conductor certificado entre todos los destinos',
      '4 noches de alojamiento en hoteles boutique y eco-lodges seleccionados',
      'Todas las entradas a parques nacionales y monumentos históricos',
      'Guías locales especializados en cada región',
      'Desayunos típicos salvadoreños diarios y degustaciones en talleres'
    ],
    includedEn: [
      'Private air-conditioned shuttle with certified driver between all regions',
      '4 nights in curated boutique hotels and eco-lodges',
      'All national park conservation passes and heritage site tickets',
      'Specialist local guides in each department',
      'Daily traditional breakfasts and workshop tastings'
    ],
    notIncludedEs: [
      'Vuelos internacionales',
      'Almuerzos y cenas no especificados',
      'Propinas voluntarias a guías y transportistas'
    ],
    notIncludedEn: [
      'International airfare',
      'Unspecified lunches and dinners',
      'Voluntary gratuities'
    ],
    recommendedForEs: ['Parejas', 'Viajeros independientes', 'Primer viaje a El Salvador'],
    recommendedForEn: ['Couples', 'Solo Explorers', 'First-time visitors'],
    itinerary: [
      {
        day: 1,
        destination: 'San Salvador y Centro Histórico',
        department: 'San Salvador',
        coordinates: { lat: 13.6989, lng: -89.1914 },
        titleEs: 'Día 1: Bienvenida en la Capital y Arquitectura Patrimonial',
        titleEn: 'Day 1: Capital Arrival & Historic Architectural Stroll',
        descriptionEs: 'Recepción y recorrido guiado por el renacido Centro Histórico, Iglesia El Rosario y terraza con café de especialidad.',
        descriptionEn: 'Arrival reception and walking tour of the revitalized historic center, El Rosario church, and rooftop coffee.',
        experienceIds: ['exp-7']
      },
      {
        day: 2,
        destination: 'Complejo Los Volcanes y Lago Coatepeque',
        department: 'Santa Ana',
        coordinates: { lat: 13.8533, lng: -89.6306 },
        titleEs: 'Día 2: Cumbre del Volcán Santa Ana y Atardecer en Coatepeque',
        titleEn: 'Day 2: Santa Ana Volcano Summit & Coatepeque Sunset',
        descriptionEs: 'Ascenso matutino a la laguna de azufre del cráter Ilamatepec, seguido de almuerzo con vista panorámica al lago.',
        descriptionEn: 'Morning trek to Ilamatepec turquoise sulfur lake followed by lakeside lunch overlooking Lake Coatepeque.',
        experienceIds: ['exp-1', 'exp-8']
      },
      {
        day: 3,
        destination: 'Ruta de las Flores (Apaneca y Juayúa)',
        department: 'Ahuachapán',
        coordinates: { lat: 13.8617, lng: -89.8039 },
        titleEs: 'Día 3: Cafetales de Altura, Taller de Pupusas y Cascadas',
        titleEn: 'Day 3: Highland Coffee Farm, Pupusa Making & Waterfalls',
        descriptionEs: 'Inmersión en Apaneca aprendiendo cata de café Pacamara y elaboración de pupusas, con tarde en las cascadas de Juayúa.',
        descriptionEn: 'Hands-on Pacamara coffee cupping and pupusa masterclass in Apaneca, followed by refreshing falls in Juayúa.',
        experienceIds: ['exp-2', 'exp-5']
      },
      {
        day: 4,
        destination: 'Suchitoto y Lago Suchitlán',
        department: 'Cuscatlán',
        coordinates: { lat: 13.9383, lng: -89.0278 },
        titleEs: 'Día 4: Calles Coloniales y Taller Ancestral de Añil',
        titleEn: 'Day 4: Cobblestone Heritage & Ancestral Indigo Dyeing',
        descriptionEs: 'Caminata por la capital cultural de El Salvador y teñido de bufandas con índigo natural orgánico.',
        descriptionEn: 'Walk through colonial balconies, cobblestone alleys, and natural indigo dye workshop overlooking the lake.',
        experienceIds: ['exp-4']
      },
      {
        day: 5,
        destination: 'Surf City (Playa El Tunco)',
        department: 'La Libertad',
        coordinates: { lat: 13.4939, lng: -89.3842 },
        titleEs: 'Día 5: Olas del Pacífico, Mariscada y Despedida al Atardecer',
        titleEn: 'Day 5: Pacific Swell, Coastal Seafood & Sunset Farewell',
        descriptionEs: 'Clase guiada de surf o relajación en las arenas volcánicas de El Tunco antes del traslado de salida.',
        descriptionEn: 'Coached surf clinic or leisurely black sand relaxation before airport transfer.',
        experienceIds: ['exp-3']
      }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-2',
    slug: 'costa-volcanes-y-cultura-7-dias',
    titleEs: 'Costa, Volcanes y Cultura Maya: 7 Días Inmersivos',
    titleEn: 'Coast, Volcanoes & Maya Heritage: 7-Day Journey',
    descriptionEs: 'Una semana completa recorriendo la riqueza arqueológica de Joya de Cerén, los cráteres volcánicos, los esteros de manglares y las rompientes marinas más famosas de Centroamérica.',
    descriptionEn: 'A full immersive 7-day circuit taking you from UNESCO archaeological ruins to volcano ridges, mangrove estuaries, and Pacific surf.',
    days: 7,
    destinations: ['San Salvador', 'Joya de Cerén', 'Santa Ana', 'Juayúa', 'El Tunco', 'Jiquilisco'],
    departments: ['San Salvador', 'La Libertad', 'Santa Ana', 'Sonsonate', 'Usulután'],
    experiences: ['exp-1', 'exp-2', 'exp-3', 'exp-5', 'exp-9', 'exp-10'],
    images: [routeCostaVolcanes, routeEsencial],
    has360: true,
    virtualTour360Url: panoSurfTunco,
    price: 540,
    currency: 'USD',
    includedEs: [
      'Transporte interdepartamental exclusivo con asistencia bilingüe',
      '6 noches en alojamientos auténticos locales',
      'Todas las experiencias y talleres programados con equipo',
      'Paseos en lancha privada en lago y manglares'
    ],
    includedEn: [
      'Private dedicated inter-regional ground transit',
      '6 nights in vetted local boutique accommodations',
      'All scheduled experiences and workshop materials',
      'Private boat charters on lakes and coastal estuaries'
    ],
    notIncludedEs: ['Vuelos internacionales', 'Seguro de viaje'],
    notIncludedEn: ['International airfare', 'Personal travel insurance'],
    recommendedForEs: ['Familias', 'Grupos de amigos', 'Viajeros culturales'],
    recommendedForEn: ['Families', 'Friend groups', 'Cultural enthusiasts'],
    itinerary: [
      {
        day: 1,
        destination: 'Centro Histórico',
        department: 'San Salvador',
        coordinates: { lat: 13.6989, lng: -89.1914 },
        titleEs: 'Día 1: Arquitectura y Vida Urbana',
        titleEn: 'Day 1: Urban Architecture & Night Plazas',
        descriptionEs: 'Paseo guiado por el centro histórico y cena salvadoreña contemporánea.',
        descriptionEn: 'Guided downtown walk and modern Salvadoran dinner.',
        experienceIds: ['exp-7']
      },
      {
        day: 2,
        destination: 'Joya de Cerén y Tazumal',
        department: 'La Libertad',
        coordinates: { lat: 13.8267, lng: -89.3622 },
        titleEs: 'Día 2: Huellas Mayas bajo Ceniza Volcánica',
        titleEn: 'Day 2: Maya Footprints Preserved in Volcanic Ash',
        descriptionEs: 'Exploración de la "Pompeya de América" y la pirámide de Tazumal.',
        descriptionEn: 'UNESCO World Heritage visit to ancient farm village and ceremonial pyramid.',
        experienceIds: ['exp-10']
      },
      {
        day: 3,
        destination: 'Volcán de Santa Ana y Coatepeque',
        department: 'Santa Ana',
        coordinates: { lat: 13.8533, lng: -89.6306 },
        titleEs: 'Día 3: Conquista del Cráter Ilamatepec',
        titleEn: 'Day 3: Crater Summit Conquest',
        descriptionEs: 'Caminata de cumbre hacia la laguna turquesa.',
        descriptionEn: 'Summit trail to the steaming turquoise volcanic lagoon.',
        experienceIds: ['exp-1']
      },
      {
        day: 4,
        destination: 'Ruta de las Flores (Apaneca)',
        department: 'Ahuachapán',
        coordinates: { lat: 13.8617, lng: -89.8039 },
        titleEs: 'Día 4: Aromas de Café y Tradición de Maíz',
        titleEn: 'Day 4: Specialty Coffee Roasts & Heirloom Maize',
        descriptionEs: 'Visita a finca cafetalera y taller gastronómico familiar.',
        descriptionEn: 'Plantation cupping session and authentic pupusa workshop.',
        experienceIds: ['exp-2']
      },
      {
        day: 5,
        destination: 'Juayúa y Cascadas',
        department: 'Sonsonate',
        coordinates: { lat: 13.8419, lng: -89.7469 },
        titleEs: 'Día 5: Cañonismo en Pozas de Manantial',
        titleEn: 'Day 5: Spring Grotto Canyoning & Highland Falls',
        descriptionEs: 'Ruta por los Chorros de la Calera.',
        descriptionEn: 'Trek along crystal springs in Juayúa.',
        experienceIds: ['exp-5']
      },
      {
        day: 6,
        destination: 'Bahía de Jiquilisco',
        department: 'Usulután',
        coordinates: { lat: 13.2167, lng: -88.5500 },
        titleEs: 'Día 6: Manglares Vírgenes y Pesca Comunitaria',
        titleEn: 'Day 6: Protected Mangroves & Community Marine Life',
        descriptionEs: 'Navegación en esteros protegidos y taller de ceviche negro.',
        descriptionEn: 'Cruise protected RAMSAR canals with local fishers.',
        experienceIds: ['exp-9']
      },
      {
        day: 7,
        destination: 'Surf City (El Tunco)',
        department: 'La Libertad',
        coordinates: { lat: 13.4939, lng: -89.3842 },
        titleEs: 'Día 7: Sesión de Surf y Despedida Costera',
        titleEn: 'Day 7: Surf Session & Coastal Farewell',
        descriptionEs: 'Clase en olas cálidas y atardecer en el Pacífico.',
        descriptionEn: 'Warm ocean waves and sunset beach dinner.',
        experienceIds: ['exp-3']
      }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-3',
    slug: 'sabores-de-el-salvador-3-dias',
    titleEs: 'Sabores de El Salvador: Ruta Culinaria y Cafetalera (3 Días)',
    titleEn: 'Flavors of El Salvador: Culinary & Coffee Trail (3 Days)',
    descriptionEs: 'Una escapada gastronómica diseñada para los paladares curiosos: café de exportación, maíz nixtamalizado criollo, mariscos en bahías protegidas y cocina de mercado.',
    descriptionEn: 'A weekend culinary escape celebrating El Salvador’s terroir: specialty Pacamara coffee, heirloom pupusas, coastal black clams, and market gastronomy.',
    days: 3,
    destinations: ['Apaneca', 'Juayúa', 'Bahía de Jiquilisco'],
    departments: ['Ahuachapán', 'Sonsonate', 'Usulután'],
    experiences: ['exp-2', 'exp-5', 'exp-9'],
    images: [routeSabores, routeEsencial],
    has360: true,
    virtualTour360Url: panoCoatepeque,
    price: 240,
    currency: 'USD',
    includedEs: [
      'Transporte gourmet durante los 3 días',
      '2 noches en posadas de montaña y costa',
      'Todos los talleres culinarios con ingredientes locales incluidos',
      'Bolsa conmemorativa de café tostado'
    ],
    includedEn: [
      'Dedicated transport across all culinary stops',
      '2 nights in boutique mountain and coastal inns',
      'All culinary masterclasses with fresh local provisions',
      'Commemorative single-origin coffee souvenir'
    ],
    notIncludedEs: ['Bebidas alcohólicas fuera de las degustaciones'],
    notIncludedEn: ['Alcoholic drinks outside guided tastings'],
    recommendedForEs: ['Amantes de la gastronomía', 'Parejas', 'Fotógrafos de comida'],
    recommendedForEn: ['Food lovers', 'Couples', 'Culinary travelers'],
    itinerary: [
      {
        day: 1,
        destination: 'Apaneca',
        department: 'Ahuachapán',
        coordinates: { lat: 13.8617, lng: -89.8039 },
        titleEs: 'Día 1: Café Pacamara y Pupusas en Comal de Barro',
        titleEn: 'Day 1: Pacamara Coffee Farm & Hearth-baked Pupusas',
        descriptionEs: 'Taller completo de cata y elaboración tradicional.',
        descriptionEn: 'Hands-on cupping and traditional comal griddling.',
        experienceIds: ['exp-2']
      },
      {
        day: 2,
        destination: 'Juayúa',
        department: 'Sonsonate',
        coordinates: { lat: 13.8419, lng: -89.7469 },
        titleEs: 'Día 2: Recorrido por Mercadillos y Cascadas Dulces',
        titleEn: 'Day 2: Market Food Festival & Sweet Mountain Falls',
        descriptionEs: 'Tamales de elote, yuca frita y baño en manantiales.',
        descriptionEn: 'Local street tastings and freshwater natural canyon bath.',
        experienceIds: ['exp-5']
      },
      {
        day: 3,
        destination: 'Bahía de Jiquilisco',
        department: 'Usulután',
        coordinates: { lat: 13.2167, lng: -88.5500 },
        titleEs: 'Día 3: Mariscos Costeros y Ceviche Negro en Manglares',
        titleEn: 'Day 3: Coastal Shellfish & Black Ceviche in the Estuary',
        descriptionEs: 'Cosecha de moluscos con pescadores y ceviche artesanal.',
        descriptionEn: 'Artisanal mangrove bivalve harvesting and lime ceviche.',
        experienceIds: ['exp-9']
      }
    ],
    active: true,
    featured: false
  },
  {
    id: 'route-4',
    slug: 'aventura-por-el-salvador-2-dias',
    titleEs: 'Aventura por El Salvador: Volcán y Surf City (2 Días)',
    titleEn: 'El Salvador Adventure: Volcano Summit & Surf City (2 Days)',
    descriptionEs: 'Una escapada intensa de fin de semana para conquistar el cráter turquesa de Santa Ana el sábado y cabalgar olas en El Tunco el domingo con hospedaje frente al mar.',
    descriptionEn: 'An action-packed 2-day getaway conquering Santa Ana volcano crater lake on Saturday and riding Pacific breaks at El Tunco on Sunday.',
    days: 2,
    destinations: ['Santa Ana', 'El Tunco'],
    departments: ['Santa Ana', 'La Libertad'],
    experiences: ['exp-1', 'exp-3'],
    images: [routeCostaVolcanes, routeEsencial],
    has360: true,
    virtualTour360Url: panoSurfTunco,
    price: 185,
    currency: 'USD',
    includedEs: [
      'Transporte privado con conductor certificado durante todo el fin de semana',
      '1 noche en hotel costero en El Tunco',
      'Pase al Parque Nacional Los Volcanes con guía de montaña',
      'Clase de surf personalizada de 2 horas con instructor y tabla',
      'Desayuno típico frente al mar'
    ],
    includedEn: [
      'Private dedicated transport throughout the 2-day trip',
      '1 night beachfront lodge in El Tunco',
      'Volcanoes National Park entry with alpine guide',
      'Personalized 2-hour surf session with board & coach',
      'Traditional beachfront breakfast'
    ],
    notIncludedEs: ['Cenas y bebidas adicionales'],
    notIncludedEn: ['Dinner and extra beverages'],
    recommendedForEs: ['Jóvenes aventureros', 'Amigos', 'Viajeros con poco tiempo'],
    recommendedForEn: ['Weekend warriors', 'Friends', 'Short layover travelers'],
    itinerary: [
      {
        day: 1,
        destination: 'Volcán de Santa Ana y El Tunco',
        department: 'Santa Ana',
        coordinates: { lat: 13.8533, lng: -89.6306 },
        titleEs: 'Día 1: Ascenso al Cráter Ilamatepec y Atardecer en la Costa',
        titleEn: 'Day 1: Santa Ana Crater Trek & Coastal Sunset',
        descriptionEs: 'Caminata matutina al cráter humeante y traslado por la tarde hacia la playa para el atardecer.',
        descriptionEn: 'Morning crater rim hike followed by afternoon transfer to the Pacific coast for sunset.',
        experienceIds: ['exp-1']
      },
      {
        day: 2,
        destination: 'Surf City (El Tunco)',
        department: 'La Libertad',
        coordinates: { lat: 13.4939, lng: -89.3842 },
        titleEs: 'Día 2: Sesión de Surf en Olas del Pacífico y Regreso',
        titleEn: 'Day 2: Pacific Surf Clinic & Coastal Wrap-up',
        descriptionEs: 'Clase guiada en el point break de arena negra y almuerzo marinero antes de salir.',
        descriptionEn: 'Guided surf coaching on volcanic black sand and seafood lunch before departure.',
        experienceIds: ['exp-3']
      }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-5',
    slug: 'el-salvador-en-10-dias-gran-travesia',
    titleEs: 'Gran Travesía: El Salvador Completo en 10 Días',
    titleEn: 'Grand Traverse: Complete El Salvador in 10 Days',
    descriptionEs: 'El viaje definitivo de inmersión por El Salvador. De este a oeste: la capital histórica, las calderas volcánicas, los cafetales de altura, la herencia colonial de Suchitoto, los manglares vírgenes de Jiquilisco y las olas legendarias de Oriente y Surf City.',
    descriptionEn: 'The ultimate 10-day expedition across El Salvador from East to West, spanning volcanic peaks, coffee plantations, colonial towns, mangrove canals, and world-class surf.',
    days: 10,
    destinations: ['San Salvador', 'Santa Ana', 'Apaneca', 'Juayúa', 'Suchitoto', 'Jiquilisco', 'El Cuco', 'El Tunco'],
    departments: ['San Salvador', 'Santa Ana', 'Ahuachapán', 'Sonsonate', 'Cuscatlán', 'Usulután', 'San Miguel', 'La Libertad'],
    experiences: ['exp-1', 'exp-2', 'exp-3', 'exp-4', 'exp-5', 'exp-7', 'exp-9', 'exp-10'],
    images: [routeEsencial, routeCostaVolcanes, routeSabores],
    has360: true,
    virtualTour360Url: panoSuchitoto,
    price: 890,
    currency: 'USD',
    includedEs: [
      'Transporte privado con aire acondicionado y chofer certificado durante los 10 días',
      '9 noches en hoteles boutique, fincas de café y lodges frente al mar',
      'Todos los accesos a parques nacionales, reservas ecológicas y museos',
      'Guías locales especializados en cada departamento',
      'Desayunos diarios y 4 cenas temáticas tradicionales',
      'Paseos en lancha privada en lago Suchitlán y manglares de Jiquilisco'
    ],
    includedEn: [
      'Private dedicated transit with certified driver for all 10 days',
      '9 nights in curated boutique inns, coffee estates & coastal lodges',
      'All national park conservation passes and museum admissions',
      'Departmental local specialist guides',
      'Daily breakfasts and 4 themed traditional dinners',
      'Private boat charters on Lake Suchitlán and Jiquilisco Bay'
    ],
    notIncludedEs: ['Vuelos internacionales', 'Seguro de viaje personal'],
    notIncludedEn: ['International flights', 'Personal travel insurance'],
    recommendedForEs: ['Viajeros que quieren conocer todo el país', 'Parejas', 'Fotógrafos'],
    recommendedForEn: ['Comprehensive travelers', 'Couples', 'Photographers'],
    itinerary: [
      {
        day: 1,
        destination: 'San Salvador',
        department: 'San Salvador',
        coordinates: { lat: 13.6989, lng: -89.1914 },
        titleEs: 'Día 1: Bienvenida en el Centro Histórico',
        titleEn: 'Day 1: Historic Center Welcome',
        descriptionEs: 'Llegada y paseo cultural por la capital renaciente.',
        descriptionEn: 'Arrival and walking tour of capital architecture.',
        experienceIds: ['exp-7']
      },
      {
        day: 2,
        destination: 'Santa Ana y Joya de Cerén',
        department: 'Santa Ana',
        coordinates: { lat: 13.8267, lng: -89.3622 },
        titleEs: 'Día 2: Huellas Arqueológicas Mayas y Ciudad Colonial',
        titleEn: 'Day 2: Maya Archaeology & Santa Ana Cathedral',
        descriptionEs: 'Visita a Joya de Cerén y centro histórico de Santa Ana.',
        descriptionEn: 'Explore Joya de Cerén UNESCO site and Santa Ana.',
        experienceIds: ['exp-10']
      },
      {
        day: 3,
        destination: 'Volcán de Santa Ana y Coatepeque',
        department: 'Santa Ana',
        coordinates: { lat: 13.8533, lng: -89.6306 },
        titleEs: 'Día 3: Cumbre del Volcán Ilamatepec',
        titleEn: 'Day 3: Ilamatepec Crater Summit',
        descriptionEs: 'Ascenso a la caldera volcánica esmeralda.',
        descriptionEn: 'Trek to the turquoise sulfur caldera.',
        experienceIds: ['exp-1']
      },
      {
        day: 4,
        destination: 'Ruta de las Flores (Apaneca y Juayúa)',
        department: 'Ahuachapán',
        coordinates: { lat: 13.8617, lng: -89.8039 },
        titleEs: 'Día 4: Cafetales y Cascadas de Montaña',
        titleEn: 'Day 4: Mountain Coffee & Cascades',
        descriptionEs: 'Cata de café Pacamara y baño en manantiales.',
        descriptionEn: 'Highland cupping and natural mountain springs.',
        experienceIds: ['exp-2', 'exp-5']
      },
      {
        day: 5,
        destination: 'Suchitoto',
        department: 'Cuscatlán',
        coordinates: { lat: 13.9383, lng: -89.0278 },
        titleEs: 'Día 5: Ciudad Colonial de Suchitoto y Añil',
        titleEn: 'Day 5: Colonial Suchitoto & Natural Indigo',
        descriptionEs: 'Calles empedradas y taller de tinción natural.',
        descriptionEn: 'Cobblestone streets and natural indigo dyeing.',
        experienceIds: ['exp-4']
      },
      {
        day: 6,
        destination: 'Lago Suchitlán y Cinquera',
        department: 'Cabañas',
        coordinates: { lat: 13.8833, lng: -88.9667 },
        titleEs: 'Día 6: Navegación en Suchitlán y Memoria Histórica',
        titleEn: 'Day 6: Lake Suchitlán Cruise & Historic Forest',
        descriptionEs: 'Paseo en lancha y caminata en bosque ecológico.',
        descriptionEn: 'Boat cruise and historical forest walk.',
        experienceIds: ['exp-4']
      },
      {
        day: 7,
        destination: 'Bahía de Jiquilisco',
        department: 'Usulután',
        coordinates: { lat: 13.2167, lng: -88.5500 },
        titleEs: 'Día 7: Reserva de Biosfera y Manglares',
        titleEn: 'Day 7: Biosphere Reserve & Mangrove Canals',
        descriptionEs: 'Canales marinos protegidos y tortugas carey.',
        descriptionEn: 'Protected marine canals and hawksbill turtles.',
        experienceIds: ['exp-9']
      },
      {
        day: 8,
        destination: 'Oriente Salvaje (El Cuco y Las Flores)',
        department: 'San Miguel',
        coordinates: { lat: 13.1700, lng: -88.0800 },
        titleEs: 'Día 8: Playas Vírgenes del Oriente',
        titleEn: 'Day 8: Pristine Eastern Coastlines',
        descriptionEs: 'Playas volcánicas amplias y descanso absoluto.',
        descriptionEn: 'Expansive volcanic beaches and coastal solitude.',
        experienceIds: ['exp-3']
      },
      {
        day: 9,
        destination: 'Surf City (Playa El Tunco)',
        department: 'La Libertad',
        coordinates: { lat: 13.4939, lng: -89.3842 },
        titleEs: 'Día 9: Surf, Gastronomía Marina y Música',
        titleEn: 'Day 9: Surf, Seafood & Coastal Vibe',
        descriptionEs: 'Clases de surf en el Pacífico y cena con mariscada.',
        descriptionEn: 'Surf session in the Pacific and coastal banquet.',
        experienceIds: ['exp-3']
      },
      {
        day: 10,
        destination: 'La Libertad y Despedida',
        department: 'La Libertad',
        coordinates: { lat: 13.4883, lng: -89.3217 },
        titleEs: 'Día 10: Muelle del Puerto y Despedida',
        titleEn: 'Day 10: Historic Wharf & Farewell',
        descriptionEs: 'Paseo por el puerto de La Libertad y traslado al aeropuerto.',
        descriptionEn: 'Visit to port pier and airport transfer.',
        experienceIds: ['exp-7']
      }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-6',
    slug: 'escapada-romantica-lagos-flores-4-dias',
    titleEs: 'Escapada Romántica: Lagos, Flores y Atardeceres (4 Días)',
    titleEn: 'Romantic Escape: Lakes, Highlands & Sunsets (4 Days)',
    descriptionEs: 'Un viaje privado para dos que combina la calma del Lago de Coatepeque, el encanto de la Ruta de las Flores, café de altura y una noche frente al Pacífico. GIA coordina cada traslado, alojamiento y experiencia.',
    descriptionEn: 'A private journey for two combining Lake Coatepeque, the charm of the Ruta de las Flores, highland coffee, and a Pacific beachfront night. GIA coordinates every transfer, stay, and experience.',
    days: 4,
    destinations: ['Lago de Coatepeque', 'Apaneca', 'Ataco', 'El Tunco'],
    departments: ['Santa Ana', 'Ahuachapán', 'La Libertad'],
    experiences: ['exp-1', 'exp-2', 'exp-3'],
    images: [routeSabores, routeCostaVolcanes],
    has360: true,
    virtualTour360Url: panoCoatepeque,
    price: 495,
    currency: 'USD',
    packageStyleEs: 'Privado para parejas · ritmo relajado',
    packageStyleEn: 'Private for couples · relaxed pace',
    accommodationEs: '3 noches en hotel boutique de montaña, alojamiento junto al lago y hotel costero',
    accommodationEn: '3 nights in a mountain boutique hotel, lakeside stay, and coastal hotel',
    mobilityEs: 'Vehículo privado con conductor y traslados puerta a puerta',
    mobilityEn: 'Private vehicle with driver and door-to-door transfers',
    mealsEs: 'Desayunos diarios, degustación de café y una cena especial',
    mealsEn: 'Daily breakfast, coffee tasting, and one special dinner',
    includedEs: [
      'Transporte privado durante los 4 días y traslado de llegada o salida',
      '3 noches de alojamiento seleccionado con desayuno',
      'Recorrido privado por Lago de Coatepeque y miradores',
      'Experiencia cafetalera y taller gastronómico en Apaneca',
      'Paseo guiado por Ataco y sesión de atardecer en El Tunco',
      'Asistencia de GIA antes y durante el viaje'
    ],
    includedEn: [
      'Private transportation throughout the 4-day tour plus arrival or departure transfer',
      '3 nights in selected lodging with breakfast',
      'Private Lake Coatepeque and scenic viewpoints tour',
      'Coffee estate and culinary workshop in Apaneca',
      'Guided Ataco walk and El Tunco sunset experience',
      'GIA support before and during the trip'
    ],
    notIncludedEs: ['Vuelos', 'Seguro de viaje', 'Almuerzos y cenas no detallados en el itinerario'],
    notIncludedEn: ['Flights', 'Travel insurance', 'Lunches and dinners not specified in the itinerary'],
    recommendedForEs: ['Parejas', 'Lunas de miel', 'Aniversarios'],
    recommendedForEn: ['Couples', 'Honeymoons', 'Anniversaries'],
    itinerary: [
      { day: 1, destination: 'Lago de Coatepeque', department: 'Santa Ana', coordinates: { lat: 13.8642, lng: -89.5450 }, titleEs: 'Día 1: Bienvenida junto al lago', titleEn: 'Day 1: Lakeside welcome', descriptionEs: 'Recepción, traslado privado, miradores panorámicos y tarde libre frente al lago.', descriptionEn: 'Arrival reception, private transfer, panoramic viewpoints, and a relaxed lakeside afternoon.', experienceIds: ['exp-8'] },
      { day: 2, destination: 'Apaneca y Ataco', department: 'Ahuachapán', coordinates: { lat: 13.8617, lng: -89.8039 }, titleEs: 'Día 2: Café, sabores y pueblos de montaña', titleEn: 'Day 2: Coffee, flavors, and mountain towns', descriptionEs: 'Cata de café, taller de pupusas y paseo por murales y tiendas artesanales.', descriptionEn: 'Coffee cupping, pupusa workshop, and a walk among murals and artisan shops.', experienceIds: ['exp-2'] },
      { day: 3, destination: 'El Tunco', department: 'La Libertad', coordinates: { lat: 13.4939, lng: -89.3842 }, titleEs: 'Día 3: Costa del Pacífico y cena al atardecer', titleEn: 'Day 3: Pacific coast and sunset dinner', descriptionEs: 'Traslado a la costa, tarde de playa y cena especial coordinada frente al mar.', descriptionEn: 'Coastal transfer, beach afternoon, and a coordinated sunset dinner.', experienceIds: ['exp-3'] },
      { day: 4, destination: 'La Libertad', department: 'La Libertad', coordinates: { lat: 13.4883, lng: -89.3217 }, titleEs: 'Día 4: Mañana relajada y traslado de salida', titleEn: 'Day 4: Relaxed morning and departure transfer', descriptionEs: 'Desayuno, tiempo libre y traslado coordinado al aeropuerto o San Salvador.', descriptionEn: 'Breakfast, free time, and coordinated transfer to the airport or San Salvador.', experienceIds: [] }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-7',
    slug: 'el-salvador-en-familia-6-dias',
    titleEs: 'El Salvador en Familia: Naturaleza, Cultura y Playa (6 Días)',
    titleEn: 'Family El Salvador: Nature, Culture & Beach (6 Days)',
    descriptionEs: 'Un circuito familiar de ritmo equilibrado con actividades adaptables, traslados privados, habitaciones familiares y acompañamiento local. Combina arqueología, lago, pueblos de montaña, talleres y costa.',
    descriptionEn: 'A balanced family circuit with adaptable activities, private transfers, family lodging, and local support. It combines archaeology, a crater lake, mountain towns, workshops, and the coast.',
    days: 6,
    destinations: ['San Salvador', 'Joya de Cerén', 'Coatepeque', 'Apaneca', 'Suchitoto', 'Costa del Sol'],
    departments: ['San Salvador', 'La Libertad', 'Santa Ana', 'Ahuachapán', 'Cuscatlán'],
    experiences: ['exp-2', 'exp-4', 'exp-7', 'exp-10'],
    images: [routeEsencial, routeSabores],
    has360: true,
    virtualTour360Url: panoSuchitoto,
    price: 675,
    currency: 'USD',
    packageStyleEs: 'Familiar · actividades adaptables',
    packageStyleEn: 'Family friendly · adaptable activities',
    accommodationEs: '5 noches en hoteles con opciones de habitación familiar',
    accommodationEn: '5 nights in hotels with family-room options',
    mobilityEs: 'Miniván privada con conductor y espacio para equipaje',
    mobilityEn: 'Private minivan with driver and luggage space',
    mealsEs: 'Desayunos diarios y tres almuerzos incluidos',
    mealsEn: 'Daily breakfast and three included lunches',
    includedEs: [
      'Miniván privada con conductor durante todo el circuito',
      '5 noches de alojamiento seleccionado con desayuno',
      'Entradas a sitios arqueológicos, parques y talleres programados',
      'Guías locales y actividades ajustables para diferentes edades',
      'Tres almuerzos y refrigerios en días de excursión',
      'Asistencia de GIA y coordinación diaria'
    ],
    includedEn: [
      'Private minivan and driver throughout the circuit',
      '5 nights in selected lodging with breakfast',
      'Admission to archaeological sites, parks, and scheduled workshops',
      'Local guides and age-adaptable activities',
      'Three lunches and snacks on excursion days',
      'GIA support and daily coordination'
    ],
    notIncludedEs: ['Vuelos', 'Seguro de viaje', 'Cenas y consumos personales'],
    notIncludedEn: ['Flights', 'Travel insurance', 'Dinners and personal purchases'],
    recommendedForEs: ['Familias con niños', 'Familias multigeneracionales', 'Primer viaje al país'],
    recommendedForEn: ['Families with children', 'Multigenerational families', 'First-time visitors'],
    itinerary: [
      { day: 1, destination: 'San Salvador', department: 'San Salvador', coordinates: { lat: 13.6989, lng: -89.1914 }, titleEs: 'Día 1: Llegada y bienvenida cultural', titleEn: 'Day 1: Arrival and cultural welcome', descriptionEs: 'Recepción y paseo suave por el Centro Histórico.', descriptionEn: 'Arrival reception and an easy-paced Historic Center walk.', experienceIds: ['exp-7'] },
      { day: 2, destination: 'Joya de Cerén y Coatepeque', department: 'La Libertad', coordinates: { lat: 13.8267, lng: -89.3622 }, titleEs: 'Día 2: Historia maya y tarde en el lago', titleEn: 'Day 2: Maya heritage and lake afternoon', descriptionEs: 'Visita arqueológica guiada y tiempo recreativo junto al lago.', descriptionEn: 'Guided archaeological visit and recreational lakeside time.', experienceIds: ['exp-10', 'exp-8'] },
      { day: 3, destination: 'Apaneca', department: 'Ahuachapán', coordinates: { lat: 13.8617, lng: -89.8039 }, titleEs: 'Día 3: Café, pupusas y juegos de montaña', titleEn: 'Day 3: Coffee, pupusas, and mountain fun', descriptionEs: 'Taller gastronómico familiar y recorrido por finca.', descriptionEn: 'Family culinary workshop and farm tour.', experienceIds: ['exp-2'] },
      { day: 4, destination: 'Suchitoto', department: 'Cuscatlán', coordinates: { lat: 13.9383, lng: -89.0278 }, titleEs: 'Día 4: Arte, añil y calles coloniales', titleEn: 'Day 4: Art, indigo, and colonial streets', descriptionEs: 'Taller creativo de añil y paseo cultural.', descriptionEn: 'Creative indigo workshop and cultural walk.', experienceIds: ['exp-4'] },
      { day: 5, destination: 'Costa del Sol', department: 'La Paz', coordinates: { lat: 13.3138, lng: -88.9381 }, titleEs: 'Día 5: Día de playa en familia', titleEn: 'Day 5: Family beach day', descriptionEs: 'Traslado privado, tiempo de playa y almuerzo costero.', descriptionEn: 'Private transfer, beach time, and coastal lunch.', experienceIds: [] },
      { day: 6, destination: 'San Salvador', department: 'San Salvador', coordinates: { lat: 13.6929, lng: -89.2182 }, titleEs: 'Día 6: Desayuno y salida coordinada', titleEn: 'Day 6: Breakfast and coordinated departure', descriptionEs: 'Mañana libre y traslado al aeropuerto.', descriptionEn: 'Free morning and airport transfer.', experienceIds: [] }
    ],
    active: true,
    featured: true
  },
  {
    id: 'route-8',
    slug: 'bienestar-naturaleza-premium-4-dias',
    titleEs: 'Bienestar y Naturaleza Premium: Volcán, Lago y Café (4 Días)',
    titleEn: 'Premium Wellness & Nature: Volcano, Lake & Coffee (4 Days)',
    descriptionEs: 'Una experiencia de descanso activo con hospedajes de categoría superior, movilidad privada, naturaleza, gastronomía y espacios libres. Diseñada para viajeros que priorizan comodidad y atención personalizada.',
    descriptionEn: 'An active-rest experience with higher-category lodging, private mobility, nature, gastronomy, and unhurried free time. Designed for travelers who value comfort and personalized care.',
    days: 4,
    destinations: ['San Salvador', 'Santa Ana', 'Lago de Coatepeque', 'Apaneca'],
    departments: ['San Salvador', 'Santa Ana', 'Ahuachapán'],
    experiences: ['exp-1', 'exp-2', 'exp-8'],
    images: [routeCostaVolcanes, routeSabores],
    has360: true,
    virtualTour360Url: panoSantaAna,
    price: 620,
    currency: 'USD',
    packageStyleEs: 'Premium · grupos pequeños',
    packageStyleEn: 'Premium · small groups',
    accommodationEs: '3 noches en alojamientos boutique de categoría superior',
    accommodationEn: '3 nights in higher-category boutique accommodations',
    mobilityEs: 'SUV o vehículo ejecutivo privado con conductor',
    mobilityEn: 'Private SUV or executive vehicle with driver',
    mealsEs: 'Desayunos, dos almuerzos y una cena de autor',
    mealsEn: 'Breakfast, two lunches, and one signature dinner',
    includedEs: [
      'Vehículo ejecutivo privado y conductor durante todo el recorrido',
      '3 noches en alojamientos boutique seleccionados con desayuno',
      'Guía privado para volcán, lago y finca cafetalera',
      'Entradas, equipos, hidratación y refrigerios',
      'Dos almuerzos y una cena de autor',
      'Asistencia prioritaria de GIA'
    ],
    includedEn: [
      'Private executive vehicle and driver throughout the route',
      '3 nights in selected boutique lodging with breakfast',
      'Private guide for volcano, lake, and coffee estate',
      'Admissions, equipment, hydration, and snacks',
      'Two lunches and one signature dinner',
      'Priority GIA support'
    ],
    notIncludedEs: ['Vuelos', 'Seguro de viaje', 'Servicios de spa opcionales', 'Bebidas premium adicionales'],
    notIncludedEn: ['Flights', 'Travel insurance', 'Optional spa services', 'Additional premium beverages'],
    recommendedForEs: ['Parejas', 'Viajeros de bienestar', 'Grupos privados pequeños'],
    recommendedForEn: ['Couples', 'Wellness travelers', 'Small private groups'],
    itinerary: [
      { day: 1, destination: 'San Salvador', department: 'San Salvador', coordinates: { lat: 13.6989, lng: -89.1914 }, titleEs: 'Día 1: Recepción privada y cena de bienvenida', titleEn: 'Day 1: Private arrival and welcome dinner', descriptionEs: 'Traslado ejecutivo, registro y cena salvadoreña contemporánea.', descriptionEn: 'Executive transfer, check-in, and contemporary Salvadoran dinner.', experienceIds: ['exp-7'] },
      { day: 2, destination: 'Volcán de Santa Ana y Coatepeque', department: 'Santa Ana', coordinates: { lat: 13.8533, lng: -89.6306 }, titleEs: 'Día 2: Naturaleza activa y descanso junto al lago', titleEn: 'Day 2: Active nature and lakeside rest', descriptionEs: 'Ascenso guiado adaptable y tarde tranquila en Coatepeque.', descriptionEn: 'Adaptable guided hike and a quiet afternoon at Coatepeque.', experienceIds: ['exp-1', 'exp-8'] },
      { day: 3, destination: 'Apaneca', department: 'Ahuachapán', coordinates: { lat: 13.8617, lng: -89.8039 }, titleEs: 'Día 3: Café de altura y gastronomía local', titleEn: 'Day 3: Highland coffee and local gastronomy', descriptionEs: 'Recorrido privado de finca, cata y experiencia culinaria.', descriptionEn: 'Private farm tour, cupping, and culinary experience.', experienceIds: ['exp-2'] },
      { day: 4, destination: 'San Salvador', department: 'San Salvador', coordinates: { lat: 13.6929, lng: -89.2182 }, titleEs: 'Día 4: Mañana libre y salida', titleEn: 'Day 4: Free morning and departure', descriptionEs: 'Desayuno sin prisa y traslado privado de salida.', descriptionEn: 'Unhurried breakfast and private departure transfer.', experienceIds: [] }
    ],
    active: true,
    featured: true
  }
];
