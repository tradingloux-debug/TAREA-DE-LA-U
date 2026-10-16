import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('./src/data/verifiedImagesManifest.json', 'utf8'));

// Helper to get image URLs and credits safely
function getMedia(destKey, fallbackCount = 5) {
  const items = manifest[destKey] || [];
  const images = items.map(it => it.publicUrl);
  const credits = items.map(it => ({
    author: it.author || 'Fotografía de archivo documental',
    sourceUrl: it.sourceUrl || 'https://commons.wikimedia.org',
    license: it.license || 'Creative Commons',
    licenseUrl: it.licenseUrl || 'https://creativecommons.org/licenses/',
    caption: it.title || ''
  }));
  return { images, credits };
}

// Generate the complete TypeScript file
const experiencesCode = `import { Experience, Region } from '../types/experience';

// Local panoramic 360 images
import panoSantaAna from '../assets/images/pano360_santa_ana_v2.jpg';
import panoSurfTunco from '../assets/images/pano360_surf_tunco_v2.jpg';
import panoSuchitoto from '../assets/images/pano360_suchitoto_v2.jpg';
import panoCoatepeque from '../assets/images/pano360_coatepeque_v2.jpg';

export { panoSantaAna, panoSurfTunco, panoSuchitoto, panoCoatepeque };

export const DEPARTMENTS = [
  'Santa Ana',
  'Ahuachapán',
  'Sonsonate',
  'La Libertad',
  'San Salvador',
  'Cuscatlán',
  'La Paz',
  'San Vicente',
  'Usulután',
  'Morazán',
  'San Miguel'
];

export const REGIONS: Region[] = ['Occidente', 'Centro', 'Costa Pacífico', 'Oriente'];

export const DEMO_EXPERIENCES: Experience[] = [
  // ==========================================
  // NATURALEZA Y AVENTURA
  // ==========================================
  {
    id: 'exp-1',
    slug: 'ascenso-volcan-santa-ana-ilamatepec',
    titleEs: 'Ascenso al Cráter Turquesa del Volcán Santa Ana (Ilamatepec)',
    titleEn: 'Summit Trek to the Emerald Crater of Santa Ana Volcano',
    shortDescriptionEs: 'Camina entre bosques de niebla y lava volcánica hasta contemplar la laguna de azufre esmeralda a 2,381 msnm.',
    shortDescriptionEn: 'Hike through cloud forests and volcanic terrain to reach the spectacular steaming emerald crater lake at 2,381m.',
    descriptionEs: 'El volcán Ilamatepec es el punto más alto de El Salvador y una de las postales naturales más asombrosas de Centroamérica. En esta experiencia guiada ascenderemos a ritmo pausado y seguro desde el Parque Nacional Los Volcanes, atravesando tres pisos térmicos hasta coronar la caldera activa donde reposa una deslumbrante laguna de agua termal turquesa con vistas al Lago de Coatepeque.',
    descriptionEn: 'The Ilamatepec Volcano is El Salvador’s highest peak and one of Central America’s most striking natural landmarks. Led by certified mountain hosts, you will ascend through pine-oak forests, volcanic gravel, and crater ridges to stand above the steaming turquoise sulfur lagoon, offering 360-degree vistas over Lake Coatepeque.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'Parque Nacional Los Volcanes, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.8533, lng: -89.6306 },
    meetingPointEs: 'Entrada principal Parque Cerro Verde, Caseta de Guías Locales',
    meetingPointEn: 'Cerro Verde National Park main entrance, Local Guides kiosk',
    price: 45,
    currency: 'USD',
    priceRange: 'medio',
    duration: '5 horas',
    durationHours: 5,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('santa_ana').images)},
    imageCredits: ${JSON.stringify(getMedia('santa_ana').credits)},
    includedEs: [
      'Guía local certificado y guardaparque acompañante',
      'Entradas y permisos al Parque Nacional Los Volcanes',
      'Bastón de senderismo y kit básico de primeros auxilios',
      'Refrigerio ligero de frutas locales y agua purificada'
    ],
    includedEn: [
      'Certified local guide and national park escort',
      'National Park entrance fees and permits',
      'Trekking poles and basic first-aid support',
      'Light local fruit snack and refill water'
    ],
    notIncludedEs: [
      'Transporte hasta el Parque Cerro Verde',
      'Almuerzo completo posterior',
      'Propinas voluntarias al equipo'
    ],
    notIncludedEn: [
      'Transportation to Cerro Verde National Park',
      'Full lunch afterwards',
      'Voluntary gratuities'
    ],
    requirementsEs: [
      'Calzado cerrado con tracción (tenis de trail o botas de montaña)',
      'Chaqueta cortavientos o abrigo ligero para la cumbre (clima fresco y ventoso)',
      'Protector solar biodegradable y gafas de sol',
      'Condición física moderada (aprox. 8 km ida y vuelta con desnivel)'
    ],
    requirementsEn: [
      'Closed-toe footwear with grip (trail running shoes or hiking boots)',
      'Light windbreaker or layer for the windy summit',
      'Biodegradable sunscreen and sunglasses',
      'Moderate fitness level (approx. 8km roundtrip with elevation gain)'
    ],
    itinerary: [
      {
        time: '07:45',
        titleEs: 'Encuentro y registro en Cerro Verde',
        titleEn: 'Meet & briefing at Cerro Verde',
        descriptionEs: 'Bienvenida del guía, revisión de equipo y charla de seguridad previa.',
        descriptionEn: 'Welcome by lead guide, gear check, and safety briefing.'
      },
      {
        time: '08:15',
        titleEs: 'Inicio de la caminata hacia la base',
        titleEn: 'Trailhead hike towards the volcanic slope',
        descriptionEs: 'Descenso inicial por el bosque nuboso hacia la planicie de San Blas.',
        descriptionEn: 'Gentle descent through cloud forest towards the San Blas base.'
      },
      {
        time: '10:00',
        titleEs: 'Ascenso por la ladera rocosa',
        titleEn: 'Ascent along the rocky volcanic ridge',
        descriptionEs: 'Subida progresiva con paradas de hidratación y vistas panorámicas a Coatepeque.',
        descriptionEn: 'Progressive incline with hydration breaks and sweeping lake views.'
      },
      {
        time: '11:15',
        titleEs: 'Llegada al cráter y contemplación',
        titleEn: 'Summit crater arrival & viewpoint',
        descriptionEs: 'Tiempo para descansar, fotografías de la laguna turquesa y refrigerio.',
        descriptionEn: 'Rest time at the rim, panoramic photos of the sulfur lake, and trail snack.'
      },
      {
        time: '13:00',
        titleEs: 'Retorno seguro al punto de partida',
        titleEn: 'Safe descent back to Cerro Verde',
        descriptionEs: 'Regreso pausado y cierre de la experiencia.',
        descriptionEn: 'Guided descent back to the park baseline and wrap-up.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 42,
    has360: true,
    virtualTour360Url: panoSantaAna,
    isLocalExperience: false
  },
  {
    id: 'exp-cerro-verde',
    slug: 'parque-nacional-cerro-verde-senderos-izalco',
    titleEs: 'Exploración del Parque Nacional Cerro Verde y Mirador al Volcán de Izalco',
    titleEn: 'Cerro Verde National Park Nature Walk & Izalco Volcano Overlooks',
    shortDescriptionEs: 'Recorre senderos interpretativos entre orquídeas y aves de montaña con vistas directas al "Faro del Pacífico".',
    shortDescriptionEn: 'Stroll interpretive highland cloud forest trails with frontal vistas of the iconic Izalco volcano.',
    descriptionEs: 'Cerro Verde es un antiguo volcán extinto cubierto por un bosque nebuloso repleto de vida silvestre, colibríes y miradores naturales privilegiados. Este recorrido es ideal para familias y personas que desean disfrutar la frescura de la cordillera, admirar el cono perfecto del volcán de Izalco y el imponente Ilamatepec sin requerir caminatas extenuantes.',
    descriptionEn: 'Cerro Verde is an ancient extinct volcanic dome cloaked in cool mountain mist, wild orchids, and interpretive walking paths. Enjoy leisurely nature strolls overlooking the perfect conical silhouette of Izalco Volcano—once known worldwide as the Lighthouse of the Pacific—along with Lake Coatepeque panoramas.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'Parque Nacional Cerro Verde, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.8278, lng: -89.6264 },
    meetingPointEs: 'Mirador del antiguo Hotel de Montaña, Cerro Verde',
    meetingPointEn: 'Historic Mountain Hotel Observation Deck, Cerro Verde',
    price: 32,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 15,
    images: ${JSON.stringify(getMedia('cerro_verde').images)},
    imageCredits: ${JSON.stringify(getMedia('cerro_verde').credits)},
    includedEs: [
      'Guía naturalista certificado por el Ministerio de Turismo',
      'Pase de entrada al Parque Nacional Cerro Verde',
      'Uso de binoculares de avistamiento para el grupo',
      'Café de altura y quesadilla salvadoreña en mirador'
    ],
    includedEn: [
      'Certified naturalist guide',
      'Cerro Verde National Park admission fee',
      'Shared birdwatching binoculars',
      'Highland coffee and Salvadoran quesadilla snack at the overlook'
    ],
    notIncludedEs: [
      'Transporte terrestre interdepartamental',
      'Almuerzo a la carta en restaurante'
    ],
    notIncludedEn: [
      'Transit from other cities',
      'A la carte restaurant meal'
    ],
    requirementsEs: [
      'Calzado cómodo para caminar sobre tierra firme y adoquín',
      'Suéter o cortavientos ligero (clima fresco y niebla frecuente)'
    ],
    requirementsEn: [
      'Comfortable walking shoes',
      'Light sweater or fleece layer for mountain mist'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Bienvenida en el mirador histórico',
        titleEn: 'Welcome at the historic overlook',
        descriptionEs: 'Charla sobre la formación de los tres volcanes y orientación geográfica.',
        descriptionEn: 'Introduction to the volcanic triad and geographical orientation.'
      },
      {
        time: '09:45',
        titleEs: 'Sendero Las Flores y orquideario natural',
        titleEn: 'Las Flores botanical trail & orchid sanctuary',
        descriptionEs: 'Caminata botánica reconociendo epífitas, musgos y avifauna migratoria.',
        descriptionEn: 'Botanical walk identifying native bromeliads, mosses, and songbirds.'
      },
      {
        time: '11:00',
        titleEs: 'Mirador frontal de Izalco',
        titleEn: 'Frontal Izalco Volcano observation point',
        descriptionEs: 'Sesión fotográfica con el cono volcánico de fondo y descanso con café.',
        descriptionEn: 'Photo session with the black volcanic cone followed by local coffee.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 26,
    has360: true,
    virtualTour360Url: panoSantaAna
  },
  {
    id: 'exp-8',
    slug: 'kayak-aguas-termales-lago-coatepeque',
    titleEs: 'Expedición en Kayak y Aguas Termales en Lago de Coatepeque',
    titleEn: 'Coatepeque Volcanic Lake Kayak & Geothermal Hot Springs',
    shortDescriptionEs: 'Rema en las serenas aguas del lago de cráter volcánico y relájate en pozas termales naturales que brotan de la orilla.',
    shortDescriptionEn: 'Paddle across pristine volcanic crater waters and soak in naturally heated thermal vents along the shoreline.',
    descriptionEs: 'El lago de Coatepeque, formado en la caldera de un antiguo volcán colapsado, es famoso por sus aguas limpias y cambios de coloración turquesa. En esta tranquila aventura matutina navegaremos en kayaks dobles o individuales hacia ensenadas vírgenes donde afloran nacimientos de aguas termales volcánicas ricas en minerales curativos.',
    descriptionEn: 'Formed thousands of years ago in a collapsed volcanic caldera, Lake Coatepeque is renowned for its tranquil turquoise waters and majestic crater backdrop. Paddle double or single touring kayaks along quiet bay shorelines where mineral-rich geothermal hot springs bubble up directly through the sand.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'Lago de Coatepeque, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.8697, lng: -89.5539 },
    meetingPointEs: 'Muelle privado Eco-Lodge Coatepeque, Ribera Sur',
    meetingPointEn: 'Eco-Lodge Coatepeque private dock, South Shore',
    price: 49,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('coatepeque').images)},
    imageCredits: ${JSON.stringify(getMedia('coatepeque').credits)},
    includedEs: [
      'Kayak sit-on-top de travesía, remo ergonómico y chaleco salvavidas homologado',
      'Guía acuático e instructor de remada',
      'Acceso exclusivo a pozas de agua termal natural',
      'Plato de frutas frescas tropicales y agua mineral'
    ],
    includedEn: [
      'High-quality touring kayak, paddle, and certified PFD life vest',
      'Lead waterman guide and paddling coaching',
      'Exclusive access to geothermal lakefront pools',
      'Tropical fruit platter and mineral water'
    ],
    notIncludedEs: [
      'Comida o bebidas adicionales en el restaurante del muelle',
      'Transporte terrestre al lago'
    ],
    notIncludedEn: [
      'Additional restaurant meals or drinks at the dock',
      'Ground transit to the lake'
    ],
    requirementsEs: [
      'Ropa de baño y camiseta con protección UV',
      'Protector solar biodegradable (para no alterar el ecosistema del lago)',
      'Gorra con cordón de sujeción'
    ],
    requirementsEn: [
      'Swimwear and UV protective shirt',
      'Biodegradable sunscreen to protect the freshwater ecosystem',
      'Hat with chin strap'
    ],
    itinerary: [
      {
        time: '08:30',
        titleEs: 'Llegada al muelle e instrucciones de remada',
        titleEn: 'Dockside arrival & paddling instruction',
        descriptionEs: 'Ajuste de chalecos, técnica de paleo eficiente y normas de seguridad en el lago.',
        descriptionEn: 'Life vest fitting, stroke mechanics, and lake navigation rules.'
      },
      {
        time: '09:00',
        titleEs: 'Navegación por la ensenada sur',
        titleEn: 'Scenic paddle across the south bay',
        descriptionEs: 'Remada tranquila con aguas en calma y vista frontal al volcán Santa Ana.',
        descriptionEn: 'Smooth glide with mirror-like morning waters beneath volcanic peaks.'
      },
      {
        time: '10:00',
        titleEs: 'Desembarque en pozas termales naturales',
        titleEn: 'Landfall at natural geothermal thermal vents',
        descriptionEs: 'Baño de inmersión en aguas cálidas y descanso en la orilla volcánica.',
        descriptionEn: 'Relaxing soak in mineral waters bubbling right into the shore.'
      },
      {
        time: '11:15',
        titleEs: 'Remada de retorno y refrigerio de frutas',
        titleEn: 'Return glide & tropical fruit snacks',
        descriptionEs: 'Paseo de vuelta al muelle principal y tiempo de relajación con vistas.',
        descriptionEn: 'Gentle paddle back to the club deck for chilled fruit and refreshments.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 33,
    has360: true,
    virtualTour360Url: panoCoatepeque
  },
  {
    id: 'exp-ruta-flores',
    slug: 'circuito-panoramico-ruta-de-las-flores',
    titleEs: 'Recorrido Panorámico por la Ruta de las Flores: Pueblos Vivos y Cafetales',
    titleEn: 'Scenic Ruta de las Flores Day Circuit: Heritage Towns & High Peaks',
    shortDescriptionEs: 'Un viaje inolvidable entre Salcoatitán, Juayúa, Apaneca y Ataco, combinando historia, comida tradicional y paisajes de montaña.',
    shortDescriptionEn: 'A mountain journey linking colorful artisan villages, coffee culture, colonial churches, and cool breezes.',
    descriptionEs: 'La Ruta de las Flores serpentea por la sierra Apaneca-Ilamatepec, uniendo encantadores pueblos coloniales famosos por su hospitalidad, murales callejeros, orquídeas y café de clase mundial. En este tour guiado visitaremos la ceiba centenaria de Salcoatitán, las fuentes de Juayúa, el laberinto de Apaneca y los coloridos telares de Concepción de Ataco.',
    descriptionEn: 'The Ruta de las Flores winds along the volcanic mountain spine of western El Salvador. Explore historic church squares, taste street food, walk beneath mural-painted alleys in Ataco, and navigate Apaneca’s green maze, surrounded by cool mountain cloud forests.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'Sonsonate y Ahuachapán',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8667, lng: -89.7833 },
    meetingPointEs: 'Parque Central de Salcoatitán, fuente histórica',
    meetingPointEn: 'Salcoatitán Central Park, historic fountain',
    price: 58,
    currency: 'USD',
    priceRange: 'medio',
    duration: '7 horas',
    durationHours: 7,
    durationType: 'full_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('ruta_flores').images)},
    imageCredits: ${JSON.stringify(getMedia('ruta_flores').credits)},
    includedEs: [
      'Transporte turístico climatizado entre todos los pueblos del circuito',
      'Guía turístico bilingüe acreditado durante toda la jornada',
      'Degustación de yuca frita y café de altura en Salcoatitán',
      'Entradas y accesos a miradores y talleres artesanales'
    ],
    includedEn: [
      'Air-conditioned touring transit between all villages',
      'Accredited bilingual tour guide throughout the day',
      'Traditional yucca snack and specialty coffee tasting',
      'Admissions to viewpoints and artisan workshops'
    ],
    notIncludedEs: [
      'Almuerzo formal en Juayúa o Ataco (tiempo libre para elegir restaurante)',
      'Souvenirs o compras personales en tiendas locales'
    ],
    notIncludedEn: [
      'Sit-down lunch (free time to choose dining spot)',
      'Personal handicraft purchases'
    ],
    requirementsEs: [
      'Ropa casual cómoda y calzado apto para caminar sobre adoquín',
      'Chaqueta o suéter para la tarde montañosa'
    ],
    requirementsEn: [
      'Comfortable walking shoes for cobblestone streets',
      'Light jacket for cooler afternoon mountain breezes'
    ],
    itinerary: [
      {
        time: '08:30',
        titleEs: 'Salcoatitán y degustación tradicional',
        titleEn: 'Salcoatitán & ancestral yucca',
        descriptionEs: 'Visita a la iglesia colonial y degustación de yuca frita con chicharrón o pescaditas.',
        descriptionEn: 'Colonial church visit and traditional culinary tasting.'
      },
      {
        time: '10:30',
        titleEs: 'Apaneca: pueblo más alto de El Salvador',
        titleEn: 'Apaneca: El Salvador’s highest town',
        descriptionEs: 'Caminata entre casas de teja, café de exportación y mirador de la cordillera.',
        descriptionEn: 'Highland stroll tasting award-winning coffee varieties.'
      },
      {
        time: '12:30',
        titleEs: 'Juayúa y gastronomía local',
        titleEn: 'Juayúa food festival & square',
        descriptionEs: 'Parada gastronómica en la animada plaza con tiempo libre para almorzar.',
        descriptionEn: 'Lunch break exploring vibrant local food stalls.'
      },
      {
        time: '14:45',
        titleEs: 'Concepción de Ataco y telares artesanales',
        titleEn: 'Concepción de Ataco mural walk',
        descriptionEs: 'Paseo guiado por murales artísticos y demostración en telares de palanca de madera.',
        descriptionEn: 'Mural photography walk and handloom weaving demonstration.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 38
  },
  {
    id: 'exp-apaneca-aventura',
    slug: 'aventura-apaneca-laberinto-buggies-tirolesa',
    titleEs: 'Aventura en Apaneca: Laberinto de Cipreses, Cuatrimotos y Tirolesa',
    titleEn: 'Apaneca Mountain Adventure: Green Cypress Maze, Buggies & Zipline',
    shortDescriptionEs: 'Diviértete en el laberinto natural más grande de Centroamérica y recorre senderos volcánicos en vehículos todoterreno.',
    shortDescriptionEn: 'Get lost in Central America’s largest cypress hedge maze and ride off-road mountain buggies through coffee hills.',
    descriptionEs: 'Apaneca combina su clima fresco de altura con emocionantes opciones de aventura al aire libre. En esta jornada interactiva pondrás a prueba tu sentido de orientación dentro de los 2,000 m² del Laberinto de Albania, surcarás el dosel forestal en tirolesa panorámica y conducirás buggies o cuatrimotos hacia miradores de lagunas volcánicas.',
    descriptionEn: 'Perched in the high mountain zone, Apaneca offers outdoor thrills amidst pine and coffee plantations. Navigate the towering green cypress maze, fly over tree canopies on safety-certified ziplines, and steer mountain buggies on unpaved ridges toward scenic crater viewpoints.',
    category: 'aventura',
    region: 'Occidente',
    location: 'Apaneca, Ahuachapán',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8617, lng: -89.8039 },
    meetingPointEs: 'Entrada Parque de Aventura Albania, Apaneca',
    meetingPointEn: 'Albania Adventure Park Main Entrance, Apaneca',
    price: 49,
    currency: 'USD',
    priceRange: 'medio',
    duration: '4 horas',
    durationHours: 4,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('apaneca').images)},
    imageCredits: ${JSON.stringify(getMedia('apaneca').credits)},
    includedEs: [
      'Entrada general y pase completo al Laberinto de Cipreses',
      'Circuito de tirolesa con arnés, casco y mosquetones homologados',
      'Recorrido guiado en buggie/cuatrimoto con guía líder',
      'Agua purificada y asistencia técnica en todo momento'
    ],
    includedEn: [
      'Full day pass to the Cypress Hedge Maze',
      'Canopy zipline circuit with certified harness and helmet',
      'Guided mountain buggy/ATV trail ride with lead guide',
      'Hydration water and technical support'
    ],
    notIncludedEs: [
      'Almuerzo en cafetería del parque',
      'Transporte interdepartamental'
    ],
    notIncludedEn: [
      'Lunch at park bistro',
      'Inter-city transit'
    ],
    requirementsEs: [
      'Ropa deportiva que se pueda empolvar y calzado cerrado con cordones',
      'Licencia de conducir vigente para quienes manejen cuatrimoto o buggie'
    ],
    requirementsEn: [
      'Casual sportswear and closed-toe sneakers',
      'Valid driver license for buggy drivers'
    ],
    itinerary: [
      {
        time: '09:30',
        titleEs: 'Recepción y desafío del laberinto',
        titleEn: 'Maze challenge & orientation',
        descriptionEs: 'Bienvenida, instrucciones y desafío de encontrar el mirador central del laberinto verde.',
        descriptionEn: 'Welcome and navigation challenge to reach the center tower.'
      },
      {
        time: '11:00',
        titleEs: 'Vuelo en tirolesa de montaña',
        titleEn: 'Mountain canopy zipline',
        descriptionEs: 'Circuito aéreo sobre las copas de los árboles con vistas a los volcanes.',
        descriptionEn: 'Aerial glide over highland tree canopies.'
      },
      {
        time: '12:00',
        titleEs: 'Travesía en buggies por senderos cafetaleros',
        titleEn: 'Buggy ride through coffee trails',
        descriptionEs: 'Ruta todoterreno guiada entre fincas y miradores naturales.',
        descriptionEn: 'Off-road ride through shaded plantation trails.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 22
  },
  {
    id: 'exp-5',
    slug: 'cascadas-de-juayua-siete-cataratas',
    titleEs: 'Aventura en las Cascadas de Juayúa y Cañón Los Chorros de la Calera',
    titleEn: 'Juayúa Waterfalls Trek & Los Chorros de la Calera Canyon',
    shortDescriptionEs: 'Senderismo acuático entre cafetales, piscinas naturales de manantial y rappel ligero en cascadas escondidas.',
    shortDescriptionEn: 'Canyon trek through lush coffee ravines to hidden spring-fed pools and guided waterfall swimming.',
    descriptionEs: 'Una refrescante expedición de montaña en las laderas de Juayúa. Atravesaremos senderos rodeados de helechos gigantes y pozas de agua cristalina alimentadas por nacimientos subterráneos. Incluye baño en las famosas cascadas de Los Chorros de la Calera y degustación de platillos tradicionales en la plaza de Juayúa.',
    descriptionEn: 'A refreshing highland canyon hike along the riverbeds of Juayúa. Walk beneath emerald canopies to discover turquoise volcanic spring pools formed by rock wall seepage. Swim in natural freshwater grottoes and savor local market dishes in the lively colonial mountain town.',
    category: 'aventura',
    region: 'Occidente',
    location: 'Juayúa, Sonsonate',
    department: 'Sonsonate',
    coordinates: { lat: 13.8419, lng: -89.7469 },
    meetingPointEs: 'Parque Central de Juayúa, junto a la fuente de la sirena',
    meetingPointEn: 'Juayúa Central Plaza, beside the historic fountain',
    price: 35,
    currency: 'USD',
    priceRange: 'economico',
    duration: '4 horas',
    durationHours: 4,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('juayua').images)},
    imageCredits: ${JSON.stringify(getMedia('juayua').credits)},
    includedEs: [
      'Guía montañista local con equipo de cuerdas de apoyo',
      'Chaleco salvavidas para pozas profundas (opcional)',
      'Bolsa seca impermeable para celulares',
      'Degustación de tamal de elote o yuca frita en el pueblo'
    ],
    includedEn: [
      'Local wilderness guide with support ropes',
      'Life vests for deep pools (optional)',
      'Waterproof dry pouch for phones',
      'Tasting of local corn tamal or yucca snack'
    ],
    notIncludedEs: [
      'Ropa de cambio (debes traerla)',
      'Transporte desde San Salvador'
    ],
    notIncludedEn: [
      'Change of dry clothes',
      'Transportation from San Salvador'
    ],
    requirementsEs: [
      'Zapatos de agua o calzado deportivo que se pueda mojar con buena suela',
      'Traje de baño puesto bajo la ropa de caminata',
      'Toalla y ropa seca para cambiarse al terminar'
    ],
    requirementsEn: [
      'Water shoes or grippy sneakers you don’t mind soaking',
      'Swimsuit worn under light trekking clothes',
      'Towel and a dry change of clothes'
    ],
    itinerary: [
      {
        time: '08:30',
        titleEs: 'Punto de encuentro y revisión de calzado',
        titleEn: 'Meet & gear check in Juayúa',
        descriptionEs: 'Revisión de calzado para agua y entrega de bolsas impermeables.',
        descriptionEn: 'Check water footwear and distribute dry bags.'
      },
      {
        time: '09:00',
        titleEs: 'Descenso por el cañón de la Calera',
        titleEn: 'Canyon descent through coffee hills',
        descriptionEs: 'Caminata entre cafetales y senderos sombreados hacia las vertientes.',
        descriptionEn: 'Hike through shade plantations towards natural river springs.'
      },
      {
        time: '10:15',
        titleEs: 'Baño en pozas de manantial y cascadas',
        titleEn: 'Spring pool swim & waterfall exploration',
        descriptionEs: 'Tiempo libre para nadar bajo las cortinas de agua y saltos controlados.',
        descriptionEn: 'Time to swim beneath natural rock water walls in crystal waters.'
      },
      {
        time: '12:00',
        titleEs: 'Regreso y refrigerio gastronómico',
        titleEn: 'Town return & food tasting',
        descriptionEs: 'Caminata de retorno al pueblo y degustación tradicional de la zona.',
        descriptionEn: 'Gentle walk back to town for a traditional warm bite.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 29
  },
  {
    id: 'exp-6',
    slug: 'parque-el-imposible-bosque-tropical',
    titleEs: 'Travesía Guiada por el Parque Nacional El Imposible',
    titleEn: 'Deep Canopy Guided Trek in El Imposible National Park',
    shortDescriptionEs: 'Adéntrate en la mayor reserva de biodiversidad de El Salvador: ríos vírgenes, desfiladeros y avistamiento de fauna.',
    shortDescriptionEn: 'Venture into El Salvador’s richest rainforest reserve: pristine canyons, crystal rivers, and rare birdwatching.',
    descriptionEs: 'El Imposible protege el ecosistema de bosque tropical seco más importante del país. Bautizado así por el histórico y peligroso cañón que cruzaban los cafetaleros a principios del siglo XX, hoy es un santuario biológico con más de 500 especies de mariposas, cascadas ocultas y miradores donde en días despejados se divisa el océano Pacífico.',
    descriptionEn: 'El Imposible is El Salvador’s ecological crown jewel. Named after the treacherous historical gorge once traversed by pack mules, it is now a protected reserve sheltering emerald toucanets, crystal mountain streams, and dramatic hanging ridges with distant views toward the Pacific coastline.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'San Francisco Menéndez, Ahuachapán',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8294, lng: -89.9667 },
    meetingPointEs: 'Centro de Visitantes Mixtepe, Parque Nacional El Imposible',
    meetingPointEn: 'Mixtepe Visitor Center, El Imposible National Park',
    price: 55,
    currency: 'USD',
    priceRange: 'medio',
    duration: '6 horas',
    durationHours: 6,
    durationType: 'full_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'exigente',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 2,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('el_imposible').images)},
    imageCredits: ${JSON.stringify(getMedia('el_imposible').credits)},
    includedEs: [
      'Guía guardaparque nativo de la comunidad',
      'Pase de ingreso y permisos oficiales de conservación',
      'Bastones de apoyo para senderismo',
      'Almuerzo campestre con ingredientes orgánicos locales'
    ],
    includedEn: [
      'Certified community park ranger guide',
      'Official park conservation entry permits',
      'Trekking poles for rocky terrain',
      'Rustic picnic lunch made with organic local ingredients'
    ],
    notIncludedEs: [
      'Transporte 4x4 hasta el centro de visitantes (se puede coordinar por separado)'
    ],
    notIncludedEn: [
      '4x4 transit to the remote park gate'
    ],
    requirementsEs: [
      'Excelente condición física para caminatas con desniveles pronunciados',
      'Botas de montaña con buen agarre',
      'Al menos 2 litros de agua por persona y repelente de insectos'
    ],
    requirementsEn: [
      'Good physical fitness for steep canyon inclines',
      'Sturdy hiking footwear with lug soles',
      'At least 2 liters of drinking water per person and insect repellent'
    ],
    itinerary: [
      {
        time: '07:30',
        titleEs: 'Registro en el centro de interpretación',
        titleEn: 'Check-in at Mixtepe Interpretation Center',
        descriptionEs: 'Presentación del mapa ecológico y normas de no dejar rastro.',
        descriptionEn: 'Ecological map orientation and leave-no-trace briefing.'
      },
      {
        time: '08:15',
        titleEs: 'Caminata al Mirador El Mulo',
        titleEn: 'Hike to El Mulo Panoramic Ridge',
        descriptionEs: 'Ascenso entre árboles gigantes de ceiba y observación de aves.',
        descriptionEn: 'Canopy walk under ancient ceiba trees with morning bird listening.'
      },
      {
        time: '11:00',
        titleEs: 'Descenso a la poza Los Enganches',
        titleEn: 'Descent to Los Enganches river pool',
        descriptionEs: 'Llegada al punto donde convergen dos ríos prístinos. Baño refrescante.',
        descriptionEn: 'Arrive at the junction of two mountain rivers for a cool swim.'
      },
      {
        time: '12:30',
        titleEs: 'Almuerzo campestre en la orilla',
        titleEn: 'Riverside picnic lunch',
        descriptionEs: 'Descanso gastronómico y recarga de energías.',
        descriptionEn: 'Fresh rustic lunch beside the gentle running stream.'
      },
      {
        time: '14:00',
        titleEs: 'Retorno gradual hacia la salida',
        titleEn: 'Ascent back to park headquarters',
        descriptionEs: 'Subida a paso constante con pausas interpretativas de botánica local.',
        descriptionEn: 'Paced ascent with stops learning about medicinal plants.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 21
  },
  {
    id: 'exp-montecristo',
    slug: 'parque-nacional-montecristo-bosque-nebuloso-trifinio',
    titleEs: 'Parque Nacional Montecristo: Bosque Nebuloso y Sendero El Trifinio',
    titleEn: 'Montecristo National Park: Cloud Forest & Trifinio Summit',
    shortDescriptionEs: 'Explora un ecosistema primitivo de helechos gigantes, orquídeas endémicas y el hito donde convergen El Salvador, Guatemala y Honduras.',
    shortDescriptionEn: 'Ascend through moss-draped ancient cloud forests to the international tri-border peak overlooking three nations.',
    descriptionEs: 'Montecristo es la mayor joya de bosque nuboso de Centroamérica protegida bajo la Reserva de la Biosfera Trifinio Fraternidad. En este santuario vegetal de robles milenarios cubiertos de musgo y bromelias conviven tucanes verdes, venados cola blanca y pumas. Llegaremos hasta la cima del Trifinio a más de 2,400 msnm donde se tocan los territorios de El Salvador, Honduras y Guatemala.',
    descriptionEn: 'Montecristo National Park is part of the UNESCO Trifinio Fraternidad Biosphere Reserve. Walking under giant tree ferns and mossy oak canopies feels like stepping into a prehistoric wonderland. Hike with experienced wilderness rangers to the legendary Tri-Point peak where three Central American borders intersect.',
    category: 'naturaleza',
    region: 'Occidente',
    location: 'Metapán, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 14.4167, lng: -89.3667 },
    meetingPointEs: 'Centro de Información Los Planes, Parque Montecristo, Metapán',
    meetingPointEn: 'Los Planes Visitor Center, Montecristo National Park, Metapán',
    price: 65,
    currency: 'USD',
    priceRange: 'medio',
    duration: '7 horas',
    durationHours: 7,
    durationType: 'full_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'exigente',
    proposalNoteEs: 'Propuesta de expedición ecoturística sujeta a cupos diarios de conservación y permisos MARN.',
    proposalNoteEn: 'Conservation eco-expedition subject to daily visitor quotas and environmental permits.',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 2,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('montecristo').images)},
    imageCredits: ${JSON.stringify(getMedia('montecristo').credits)},
    includedEs: [
      'Guardarrecursos oficial y biólogo guía de la reserva',
      'Permiso de ingreso y conservación al área protegida',
      'Bastones de senderismo y equipo de comunicación por radio',
      'Almuerzo energizante de montaña y refrigerio de marcha'
    ],
    includedEn: [
      'Official park ranger and naturalist guide',
      'Conservation area entry permits',
      'Trekking poles and satellite radio support',
      'Highland picnic lunch and energy trail mix'
    ],
    notIncludedEs: [
      'Traslado 4x4 hasta el inicio del sendero (disponible bajo solicitud)',
      'Hospedaje en cabañas del parque'
    ],
    notIncludedEn: [
      '4x4 trailhead shuttle',
      'Cabin overnight stay'
    ],
    requirementsEs: [
      'Botas impermeables de montaña con buena tracción',
      'Chaqueta impermeable o poncho (lluvias y neblina frecuentes)',
      'Buena condición física para ascenso sostenido'
    ],
    requirementsEn: [
      'Waterproof hiking boots with rugged grip',
      'Waterproof shell jacket or rain poncho',
      'Good physical stamina for steady mountain climb'
    ],
    itinerary: [
      {
        time: '07:00',
        titleEs: 'Registro y ascenso en vehículo 4x4 a Los Planes',
        titleEn: 'Registration & 4x4 ascent to Los Planes base',
        descriptionEs: 'Control de ingreso, presentación de la biodiversidad de la reserva y preparación.',
        descriptionEn: 'Permit check, biodiversity briefing, and gear readiness.'
      },
      {
        time: '08:00',
        titleEs: 'Inmersión en el Bosque Nebuloso',
        titleEn: 'Cloud forest immersion trek',
        descriptionEs: 'Caminata bajo helechos arbóreos de 10 metros y jardines colgantes de orquídeas silvestres.',
        descriptionEn: 'Hike through 10-meter tree ferns and hanging wild orchid gardens.'
      },
      {
        time: '11:30',
        titleEs: 'Cumbre del Trifinio (2,418 msnm)',
        titleEn: 'Trifinio tri-border monument arrival',
        descriptionEs: 'Llegada al monolito internacional donde se unen tres países y almuerzo con vista panorámica.',
        descriptionEn: 'Stand at the stone monument where three borders meet with 360 vistas.'
      },
      {
        time: '14:30',
        titleEs: 'Descenso y visita al Jardín de las Cien Orquídeas',
        titleEn: 'Descent & Orchid Garden showcase',
        descriptionEs: 'Regreso pausado con parada en la colección botánica de orquídeas rescatadas.',
        descriptionEn: 'Paced descent with a stop at the botanical rescue nursery.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 14
  },
  {
    id: 'exp-boqueron',
    slug: 'volcan-san-salvador-boqueron-miradores',
    titleEs: 'Cráter de El Boquerón y Miradores del Volcán de San Salvador',
    titleEn: 'El Boquerón Crater Rim & San Salvador Volcano Overlooks',
    shortDescriptionEs: 'Observa el inmenso cráter de 1.5 km de diámetro y el conito "Boqueroncito" entre flores de hortensias y clima templado.',
    shortDescriptionEn: 'Peer down into the massive 1.5km-wide volcanic crater containing a miniature mini-cone at the center.',
    descriptionEs: 'A solo 25 minutos del centro de la capital se alza el volcán de San Salvador (Quezaltepeque). En su parque nacional coronaremos el borde de la caldera de El Boquerón, un cráter de 550 metros de profundidad que albergó una laguna hasta su erupción en 1917. El sendero está rodeado de plantaciones de café de altura, pinos y hortensias con miradores hacia el valle capitalino.',
    descriptionEn: 'Rising immediately above the capital city, San Salvador Volcano features the monumental El Boquerón crater. Walk along well-maintained pine-lined paths blooming with wild hydrangeas to viewpoints looking into the 550m-deep volcanic basin, followed by artisan coffee overlooking the city lights.',
    category: 'naturaleza',
    region: 'Centro',
    location: 'Santa Tecla, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.7372, lng: -89.2889 },
    meetingPointEs: 'Centro de Visitantes Parque Nacional El Boquerón, Santa Tecla',
    meetingPointEn: 'El Boquerón Visitor Center Main Gate, Santa Tecla',
    price: 28,
    currency: 'USD',
    priceRange: 'economico',
    duration: '2.5 horas',
    durationHours: 2.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 15,
    images: ${JSON.stringify(getMedia('el_boqueron').images)},
    imageCredits: ${JSON.stringify(getMedia('el_boqueron').credits)},
    includedEs: [
      'Guía turístico acreditado',
      'Pase de acceso al Parque Nacional El Boquerón',
      'Recorrido botánico interpretativo',
      'Café salvadoreño caliente y dulce típico en cafetería panorámica'
    ],
    includedEn: [
      'Accredited tour guide',
      'Park admission ticket',
      'Interpretive botanical walk',
      'Warm local coffee and traditional sweet snack with a view'
    ],
    notIncludedEs: [
      'Transporte hasta la cima del volcán'
    ],
    notIncludedEn: [
      'Ground transit up the mountain highway'
    ],
    requirementsEs: [
      'Ropa casual cómoda y calzado deportivo',
      'Abrigo ligero para la brisa de montaña'
    ],
    requirementsEn: [
      'Casual comfortable wear and sneakers',
      'Light layer for mountain breeze'
    ],
    itinerary: [
      {
        time: '14:30',
        titleEs: 'Encuentro e introducción en la caseta del parque',
        titleEn: 'Meet & crater history briefing',
        descriptionEs: 'Reseña de la erupción de 1917 y formación del Boqueroncito.',
        descriptionEn: 'Learn about the 1917 eruption and the inner cone formation.'
      },
      {
        time: '15:15',
        titleEs: 'Recorrido por los miradores del borde',
        titleEn: 'Crater rim boardwalk walk',
        descriptionEs: 'Caminata entre hortensias y bosques de pinos con vistas directas al fondo del cráter.',
        descriptionEn: 'Walk among blooming hydrangeas enjoying direct looks into the caldera floor.'
      },
      {
        time: '16:30',
        titleEs: 'Atardecer con vista a la ciudad',
        titleEn: 'Sunset coffee over the capital city',
        descriptionEs: 'Tiempo para descansar degustando café local mientras el valle se ilumina.',
        descriptionEn: 'Relax with single-origin coffee watching sunset colors over the city below.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 30
  },
  {
    id: 'exp-11',
    slug: 'parapente-sobre-lago-ilopango',
    titleEs: 'Vuelo Tándem en Parapente sobre la Caldera de Ilopango',
    titleEn: 'Tandem Paragliding Flight Over Ilopango Volcanic Crater',
    shortDescriptionEs: 'Siente la libertad de volar como un ave sobre el inmenso lago volcánico de Ilopango con pilotos instructores certificados.',
    shortDescriptionEn: 'Soar like a bird on thermal currents above the vast volcanic crater of Lake Ilopango with licensed tandem pilots.',
    descriptionEs: 'La caldera de Ilopango, generada por una de las mega-erupciones más potentes del planeta en la era clásica, hoy es un majestuoso espejo de agua rodeado de colinas verdes. Despegaremos desde una ladera de despegue natural en San Salvador Este para realizar un vuelo biplaza de 20 a 30 minutos aprovechando las corrientes térmicas, disfrutando de vistas cinematográficas de la capital y el lago.',
    descriptionEn: 'Formed by an ancient supervolcano explosion, Lake Ilopango is an expansive crater lake nestled against lush volcanic ridges. Launch from a scenic natural ridge in East San Salvador for a thrilling 20-30 minute tandem flight with a licensed pilot, soaring above blue water and verdant peaks.',
    category: 'aventura',
    region: 'Centro',
    location: 'San Salvador Este / Ilopango',
    department: 'San Salvador',
    coordinates: { lat: 13.6706, lng: -89.0558 },
    meetingPointEs: 'Mirador Panorámico La Herradura, Carretera Panorámica',
    meetingPointEn: 'La Herradura Overlook, Panoramic Mountain Highway',
    price: 85,
    currency: 'USD',
    priceRange: 'premium',
    duration: '2 horas',
    durationHours: 2,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas'],
    minPeople: 1,
    maxPeople: 4,
    images: ['/exp_ilopango_lago.jpg', ...${JSON.stringify(getMedia('coatepeque').images.slice(0, 4))}],
    includedEs: [
      'Piloto tándem profesional con licencia internacional FAI',
      'Equipo completo de vuelo homologado y paracaídas de emergencia',
      'Video en alta definición con cámara GoPro montada en selfie-stick',
      'Seguro de actividad y transporte de regreso al despegue'
    ],
    includedEn: [
      'Certified tandem flight pilot with international FAI credentials',
      'Safety harness, certified wing, and emergency backup parachute',
      'Full HD GoPro action video package included',
      'Activity liability insurance and ground shuttle back to launch ridge'
    ],
    notIncludedEs: [
      'Transporte desde hoteles de la ciudad hasta la rampa'
    ],
    notIncludedEn: [
      'Hotel pickup in downtown San Salvador'
    ],
    requirementsEs: [
      'Peso corporal entre 40 kg y 100 kg',
      'Ropa deportiva y tenis con agujetas cerrados',
      'No se requiere experiencia previa'
    ],
    requirementsEn: [
      'Passenger weight between 40kg (88lbs) and 100kg (220lbs)',
      'Sportswear and lace-up athletic sneakers',
      'No prior flight experience needed'
    ],
    itinerary: [
      {
        time: '13:00',
        titleEs: 'Recepción en la rampa de despegue',
        titleEn: 'Arrival at ridge launch platform',
        descriptionEs: 'Monitoreo de vientos, charla de despegue y ajuste de arnés.',
        descriptionEn: 'Wind analysis, safety briefing, and harness fitting.'
      },
      {
        time: '13:30',
        titleEs: 'Despegue y planeo sobre la caldera',
        titleEn: 'Launch & aerial glide over the crater',
        descriptionEs: 'Carrera suave de 5 pasos y vuelo de planeo sobre el espejo de agua.',
        descriptionEn: 'Short 5-step run into the wind, soaring across lake vistas.'
      },
      {
        time: '14:00',
        titleEs: 'Aterrizaje seguro y entrega de video',
        titleEn: 'Touchdown & video transfer',
        descriptionEs: 'Aterrizaje suave en el campo designado y descarga de archivos de video.',
        descriptionEn: 'Gentle touchdown on landing green and digital video transfer.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 18,
    has360: true,
    virtualTour360Url: panoCoatepeque
  },

  // ==========================================
  // PLAYAS Y TURISMO COSTERO
  // ==========================================
  {
    id: 'exp-3',
    slug: 'clase-surf-atardecer-el-tunco',
    titleEs: 'Clase de Surf y Sesión de Atardecer en Playa El Tunco',
    titleEn: 'Private Surf Clinic & Sunset Session at El Tunco Beach',
    shortDescriptionEs: 'Aprende o perfecciona tu técnica con instructores locales certificados sobre la legendaria costa de Surf City.',
    shortDescriptionEn: 'Catch Pacific waves with certified local surf coaches along El Salvador’s world-renowned Surf City coastline.',
    descriptionEs: 'La Libertad es uno de los epicentros de surf más aclamados del mundo gracias a sus rompientes constantes y aguas cálidas todo el año. Ya seas principiante absoluto o busques corregir postura en olas point break, nuestros entrenadores salvadoreños te enseñarán lectura de corrientes, remada y equilibrio en la arena antes de entrar al agua durante la mejor marea de la tarde.',
    descriptionEn: 'El Salvador’s coastline boasts world-class Pacific swells and bath-warm waters. Whether catching your first foam or refining takeoffs, this experience pairs you with experienced local wave riders who focus on ocean safety, paddling mechanics, and stance balance, timing the session to catch the golden Pacific sunset.',
    category: 'playa',
    region: 'Costa Pacífico',
    location: 'Playa El Tunco, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.4939, lng: -89.3842 },
    meetingPointEs: 'Club de Surf Bocana, frente a la playa El Tunco',
    meetingPointEn: 'Bocana Surf Shack, beachfront El Tunco',
    price: 38,
    currency: 'USD',
    priceRange: 'economico',
    duration: '2.5 horas',
    durationHours: 2.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 1,
    maxPeople: 6,
    images: ${JSON.stringify(getMedia('el_tunco').images)},
    imageCredits: ${JSON.stringify(getMedia('el_tunco').credits)},
    includedEs: [
      'Tabla de surf adecuada a tu estatura y nivel',
      'Licra de protección UV (rashguard)',
      'Instructor salvadoreño certificado (ratio máximo 1:3)',
      'Ducha de agua dulce y taquilla de seguridad',
      'Agua de coco fresca al finalizar'
    ],
    includedEn: [
      'Surfboard matched to your skill and size',
      'UV rashguard vest',
      'Certified local instructor (maximum 1:3 ratio)',
      'Freshwater rinse and secure lockers',
      'Fresh chilled coconut after the session'
    ],
    notIncludedEs: [
      'Fotografía profesional dentro del agua (disponible opcional in situ)',
      'Bebidas en bares de la playa',
      'Transporte desde San Salvador'
    ],
    notIncludedEn: [
      'In-water action photography (available as on-site add-on)',
      'Beachfront bar beverages',
      'Transit from San Salvador'
    ],
    requirementsEs: [
      'Saber nadar con soltura en aguas abiertas',
      'Traje de baño o short deportivo',
      'Protector solar apto para arrecifes (óxido de zinc)'
    ],
    requirementsEn: [
      'Comfortable swimming ability in open water',
      'Swimwear or athletic boardshorts',
      'Reef-safe sunscreen (mineral zinc)'
    ],
    itinerary: [
      {
        time: '15:30',
        titleEs: 'Ajuste de equipo y calentamiento',
        titleEn: 'Board fitting & sand warmup',
        descriptionEs: 'Elección de tabla según experiencia, calentamiento articular y seguridad marina.',
        descriptionEn: 'Board matching, dynamic stretching, and wave current safety briefing.'
      },
      {
        time: '16:00',
        titleEs: 'Práctica técnica en arena',
        titleEn: 'Sand pop-up mechanics',
        descriptionEs: 'Simulación del "pop-up", posición de pies y centro de gravedad.',
        descriptionEn: 'Drilling the take-off movement, stance alignment, and balance control.'
      },
      {
        time: '16:30',
        titleEs: 'Entrada al agua y captura de olas',
        titleEn: 'In-water coached surf session',
        descriptionEs: 'Práctica guiada en el agua con asistencia personalizada en cada serie de olas.',
        descriptionEn: 'Coached ocean session with hands-on wave pushing and real-time guidance.'
      },
      {
        time: '17:45',
        titleEs: 'Cierre al atardecer y coco frío',
        titleEn: 'Sunset cool down & fresh coconut',
        descriptionEs: 'Regreso a la orilla para disfrutar la puesta de sol sobre el peñón de El Tunco.',
        descriptionEn: 'Relax on the black sand beach with chilled coconut water at sunset.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 39,
    has360: true,
    virtualTour360Url: panoSurfTunco
  },
  {
    id: 'exp-el-zonte',
    slug: 'escapada-playa-el-zonte-cuevas-surf-bohemio',
    titleEs: 'Escapada a Playa El Zonte: Cuevas Marinas, Surf Relajado y Espíritu Comunitario',
    titleEn: 'El Zonte Beach Escape: Sea Caves, Mellow Point Break & Bitcoin Village',
    shortDescriptionEs: 'Descubre la magia relajada de El Zonte: camina por cuevas volcánicas en marea baja y disfruta de su vibra bohemia y olas nobles.',
    shortDescriptionEn: 'Experience the laid-back coastal vibe of El Zonte: explore low-tide sea grottoes and ride friendly right-hand waves.',
    descriptionEs: 'El Zonte es el refugio favorito de viajeros que buscan un ritmo más sereno frente al Pacífico. Con su desembocadura de río, peñones volcánicos y famosas cuevas marinas que solo se revelan en marea baja, este pueblo costero es célebre tanto por su ola noble de clase mundial como por su modelo comunitario de economía circular. Disfrutaremos de una caminata costera guiada y tiempo libre en clubes de playa ecológicos.',
    descriptionEn: 'Famous worldwide for its pioneering Bitcoin Beach circular economy and pristine coastal landscape, El Zonte offers a serene alternative to the bustle of neighboring beaches. Walk into dramatic basalt sea caverns at low tide, watch local groms glide on long right waves, and savor artisan iced coffee overlooking the ocean.',
    category: 'playa',
    region: 'Costa Pacífico',
    location: 'Playa El Zonte, Chiltiupán, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.4981, lng: -89.4447 },
    meetingPointEs: 'Plaza del puente de El Zonte, entrada a la playa',
    meetingPointEn: 'El Zonte Bridge Plaza, beach entrance',
    price: 42,
    currency: 'USD',
    priceRange: 'medio',
    duration: '4 horas',
    durationHours: 4,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('el_zonte').images)},
    imageCredits: ${JSON.stringify(getMedia('el_zonte').credits)},
    includedEs: [
      'Guía local de la comunidad costera',
      'Caminata guiada por las cuevas marinas (coordinada según tabla de mareas)',
      'Acceso de día a deck frente al mar con hamacas y regaderas',
      'Bebida artesanal de bienvenida (café frío de especialidad o coco natural)'
    ],
    includedEn: [
      'Local host from the beach village',
      'Tide-timed guided sea caves exploration walk',
      'Day access pass to a beachfront deck with loungers and showers',
      'Welcome artisanal cold brew coffee or fresh young coconut'
    ],
    notIncludedEs: [
      'Clase de surf o alquiler de tabla (disponible como adicional)',
      'Almuerzo en los restaurantes del pueblo'
    ],
    notIncludedEn: [
      'Surfboard rental or coached lesson',
      'Village seafood lunch'
    ],
    requirementsEs: [
      'Sandalias de agua o calzado apto para caminar sobre rocas marinas',
      'Traje de baño y toalla'
    ],
    requirementsEn: [
      'Water sandals or footwear suited for wet tidal rocks',
      'Swimsuit and beach towel'
    ],
    itinerary: [
      {
        time: '14:00',
        titleEs: 'Encuentro en el pueblo de El Zonte',
        titleEn: 'Meet in El Zonte village',
        descriptionEs: 'Bienvenida, breve historia del pueblo costero y paseo por sus callejones peatonales.',
        descriptionEn: 'Welcome, orientation, and stroll through pedestrian sandy paths.'
      },
      {
        time: '15:00',
        titleEs: 'Exploración de cuevas marinas en marea baja',
        titleEn: 'Low-tide sea cave expedition',
        descriptionEs: 'Caminata por la arena negra hacia los arcos rocosos y cuevas de marea.',
        descriptionEn: 'Walk across volcanic sands to investigate natural sea tunnels.'
      },
      {
        time: '16:30',
        titleEs: 'Descanso frente a las olas y atardecer',
        titleEn: 'Sunset wave watching & relaxation',
        descriptionEs: 'Tiempo libre en deck con vistas al point break mientras el sol se oculta en el horizonte.',
        descriptionEn: 'Relax on the ocean deck admiring surfers at golden hour.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 28
  },
  {
    id: 'exp-puerto-libertad',
    slug: 'muelle-artesanal-mercado-del-mar-puerto-libertad',
    titleEs: 'Recorrido por el Muelle de Pescadores, Mercado del Mar y Sunset Park',
    titleEn: 'Puerto de La Libertad: Historic Pier, Seafood Market & Boardwalk',
    shortDescriptionEs: 'Vive el latido pesquero del icónico muelle de 1869, degusta mariscos recién sacados del mar y camina por el malecón moderno.',
    shortDescriptionEn: 'Witness lively Pacific artisanal fishing along the historic 1869 pier and savor ultra-fresh coastal seafood.',
    descriptionEs: 'El Puerto de La Libertad es el corazón marítimo más histórico de El Salvador. En este recorrido sensorial caminaremos por el muelle elevado donde las lanchas de pescadores son izadas con poleas y cables sobre las olas del Pacífico. Visitaremos el Mercado del Mar para conocer especies locales de peces, camarones y ostras, seguido de una degustación de cóctel de camarón fresco y un paseo por el moderno malecón turístico Sunset Park.',
    descriptionEn: 'The historic port town of La Libertad offers an authentic glimpse into centuries-old maritime culture. Walk down the famous iron pier where brightly painted wooden fishing skiffs are winched above Pacific breakers. Explore the bustling Mercado del Mar, sample fresh shrimp ceviche, and stroll the modern oceanfront malecón.',
    category: 'playa',
    region: 'Costa Pacífico',
    location: 'Puerto de La Libertad, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.4883, lng: -89.3222 },
    meetingPointEs: 'Plaza del Malecón, frente a la entrada del Muelle Histórico',
    meetingPointEn: 'Malecón Plaza, in front of the Historic Pier entrance',
    price: 30,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('puerto_libertad').images)},
    imageCredits: ${JSON.stringify(getMedia('puerto_libertad').credits)},
    includedEs: [
      'Guía local de la comunidad marítima',
      'Pase de acceso al muelle histórico de pescadores',
      'Degustación de coctel de camarón fresco con salsa criolla',
      'Agua de coco fría o bebida refrescante'
    ],
    includedEn: [
      'Local maritime community guide',
      'Historic pier access pass',
      'Fresh shrimp cocktail tasting with house lime-herb dressing',
      'Chilled young coconut or refreshing tropical beverage'
    ],
    notIncludedEs: [
      'Entradas a juegos mecánicos de Sunset Park',
      'Transporte hasta el Puerto de La Libertad'
    ],
    notIncludedEn: [
      'Rides inside Sunset Park amusement area',
      'Transit to Puerto de La Libertad'
    ],
    requirementsEs: [
      'Gorra o sombrero y protector solar',
      'Calzado cerrado o sandalias cómodas para caminar sobre tablones de madera'
    ],
    requirementsEn: [
      'Sun hat and sunscreen',
      'Comfortable walking shoes or sandals for wooden boardwalk planks'
    ],
    itinerary: [
      {
        time: '15:00',
        titleEs: 'Encuentro en el malecón histórico',
        titleEn: 'Meet at the harbor malecón',
        descriptionEs: 'Introducción a la historia del puerto fundado a mediados del siglo XIX.',
        descriptionEn: 'Introduction to 19th-century port heritage and maritime trade.'
      },
      {
        time: '15:30',
        titleEs: 'Paseo por el muelle de madera y hierro',
        titleEn: 'Walk the historic timber pier',
        descriptionEs: 'Observación del izado de lanchas y comercio de pesca artesanal directo con pescadores.',
        descriptionEn: 'Watch skiff winching mechanics and speak directly with local fishermen.'
      },
      {
        time: '16:30',
        titleEs: 'Mercado del Mar y degustación costera',
        titleEn: 'Mercado del Mar & ceviche tasting',
        descriptionEs: 'Degustación de cóctel de mariscos recién preparado con vista al océano.',
        descriptionEn: 'Taste fresh seafood ceviche prepared right on the coastal promenade.'
      },
      {
        time: '17:30',
        titleEs: 'Atardecer en Sunset Park',
        titleEn: 'Sunset Park boardwalk stroll',
        descriptionEs: 'Paseo libre por el malecón iluminado al anochecer frente al mar.',
        descriptionEn: 'Enjoy the oceanfront lights and sunset breeze.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.7,
    demoReviewsCount: 25
  },
  {
    id: 'exp-costa-del-sol',
    slug: 'estero-de-jaltepeque-y-playas-de-la-costa-del-sol',
    titleEs: 'Navegación en el Estero de Jaltepeque y Relajación en Costa del Sol',
    titleEn: 'Jaltepeque Estuary Boat Cruise & Costa del Sol Beach Club',
    shortDescriptionEs: 'Navega en lancha por canales de manglares repletos de garzas y disfruta de extensas playas de arena fina frente al Pacífico.',
    shortDescriptionEn: 'Cruise calm mangrove channels teeming with seabirds and unwind on kilometers of open golden sands.',
    descriptionEs: 'La Costa del Sol es la franja costera más extensa de El Salvador, flanqueada por un lado por el impresionante Estero de Jaltepeque y por el otro por el mar abierto del océano Pacífico. En esta experiencia combinada abordaremos una lancha techada para explorar canales de manglares protegidos, observar aves marinas y llegar a la bocana donde el estero se une con el mar, culminando con un descanso en club de playa.',
    descriptionEn: 'Costa del Sol is celebrated for its wide golden beaches and the protected Jaltepeque Estuary. Board a covered boat to cruise past mangrove forests where herons and kingfishers roost, visit sandbars at low tide, and spend the afternoon swimming in peaceful ocean waters with full beach club amenities.',
    category: 'playa',
    region: 'Costa Pacífico',
    location: 'Costa del Sol, San Luis La Herradura, La Paz',
    department: 'La Paz',
    coordinates: { lat: 13.3167, lng: -88.9833 },
    meetingPointEs: 'Muelle Turístico La Puntilla, extremo sur de Costa del Sol',
    meetingPointEn: 'La Puntilla Pier, southern tip of Costa del Sol',
    price: 52,
    currency: 'USD',
    priceRange: 'medio',
    duration: '5 horas',
    durationHours: 5,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('costa_del_sol').images)},
    imageCredits: ${JSON.stringify(getMedia('costa_del_sol').credits)},
    includedEs: [
      'Paseo privado en lancha motora con toldo por el estero de Jaltepeque',
      'Pase de día en club de playa con piscina, vestidores y sombras',
      'Guía lanchero local conocedor de aves y canales',
      'Bebida de coco o refresco natural'
    ],
    includedEn: [
      'Covered motorboat tour through Jaltepeque estuary',
      'Beach club day pass with swimming pool, cabanas, and showers',
      'Experienced local boat captain and bird guide',
      'Fresh coconut water or tropical fruit drink'
    ],
    notIncludedEs: [
      'Almuerzo a base de mariscos en restaurante de la playa',
      'Transporte terrestre hasta San Luis La Herradura'
    ],
    notIncludedEn: [
      'Restaurant lunch on the beach',
      'Ground transit from San Salvador'
    ],
    requirementsEs: [
      'Traje de baño, toalla y bloqueador solar biodegradable',
      'Ropa fresca de secado rápido'
    ],
    requirementsEn: [
      'Swimsuit, towel, and biodegradable sunscreen',
      'Light quick-dry clothes'
    ],
    itinerary: [
      {
        time: '09:30',
        titleEs: 'Zarpada desde La Puntilla',
        titleEn: 'Boat launch from La Puntilla',
        descriptionEs: 'Abordaje de la lancha y salida hacia los canales de mangle del estero.',
        descriptionEn: 'Board the boat and cruise into calm estuary channels.'
      },
      {
        time: '10:30',
        titleEs: 'Bocana de Cordoncillo e islotes',
        titleEn: 'Cordoncillo sandbar & bird colonies',
        descriptionEs: 'Pausa en bancos de arena para fotografiar garzas y pelícanos.',
        descriptionEn: 'Stop at temporary sandbars to observe pelicans and coastal herons.'
      },
      {
        time: '12:00',
        titleEs: 'Llegada al club de playa en Costa del Sol',
        titleEn: 'Arrival at oceanfront beach club',
        descriptionEs: 'Tiempo para nadar en el mar o piscina, descanso en hamacas y almuerzo.',
        descriptionEn: 'Relax on sun loungers, swim in Pacific surf, and enjoy lunch.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 20
  },
  {
    id: 'exp-9',
    slug: 'taller-gastronomico-mariscos-bahia-jiquilisco',
    titleEs: 'Pesca Artesanal Sostenible y Cocina de Mar en Bahía de Jiquilisco',
    titleEn: 'Sustainable Mangrove Fishery & Coastal Seafood Masterclass',
    shortDescriptionEs: 'Navega entre canales de manglares protegidos, acompaña a pescadores locales y cocina un ceviche de curil salvadoreño.',
    shortDescriptionEn: 'Navigate protected mangrove esteros with local artisanal fishermen and cook traditional curil ceviche.',
    descriptionEs: 'La Bahía de Jiquilisco es el mayor estuario del Pacífico salvadoreño y un sitio protegido RAMSAR. En este viaje culinario y ecológico, abordaremos una lancha tradicional con una cooperativa comunitaria para recolectar curiles y camarón de estanque de forma sostenible. Luego, en una enramada junto al agua, prepararemos un auténtico ceviche negro marinado con limón criollo, cebolla morada y salsa inglesa.',
    descriptionEn: 'Jiquilisco Bay is El Salvador’s largest Pacific wetland estuary and a designated UNESCO Biosphere Reserve. In partnership with a local community cooperative, journey through winding mangrove tunnels to witness sustainable clam foraging. Back on a palapa deck, prepare fresh black curil ceviche with Persian limes and local coastal herbs.',
    category: 'playa',
    region: 'Costa Pacífico',
    location: 'Bahía de Jiquilisco, Usulután',
    department: 'Usulután',
    coordinates: { lat: 13.2167, lng: -88.5500 },
    meetingPointEs: 'Embarcadero Puerto El Triunfo, Cooperativa Manglares',
    meetingPointEn: 'Puerto El Triunfo Main Pier, Mangrove Cooperative Kiosk',
    price: 68,
    currency: 'USD',
    priceRange: 'premium',
    duration: '5 horas',
    durationHours: 5,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('jiquilisco').images)},
    imageCredits: ${JSON.stringify(getMedia('jiquilisco').credits)},
    includedEs: [
      'Paseo privado en lancha techada por canales de manglares',
      'Acompañamiento de pescador artesanal de la comunidad',
      'Ingredientes completos para el taller de ceviche y mariscada',
      'Bebidas refrescantes de coco natural y cerveza artesanal salvadoreña',
      'Aporte directo al fondo de conservación de tortugas marinas'
    ],
    includedEn: [
      'Private covered boat tour through mangrove channels',
      'Accompaniment by an artisanal community fisher',
      'All fresh ingredients for the black ceviche cooking class',
      'Fresh coconut water and local craft beer',
      'Direct contribution to the local sea turtle conservation initiative'
    ],
    notIncludedEs: [
      'Transporte terrestre hasta Puerto El Triunfo'
    ],
    notIncludedEn: [
      'Ground transit to Puerto El Triunfo'
    ],
    requirementsEs: [
      'Repelente para mosquitos amigable con la fauna acuática',
      'Gorra o sombrero de ala ancha',
      'Ropa ligera de secado rápido'
    ],
    requirementsEn: [
      'Eco-friendly insect repellent',
      'Wide-brimmed sun hat',
      'Quick-drying casual wear'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Zarpada desde Puerto El Triunfo',
        titleEn: 'Boat departure from Puerto El Triunfo',
        descriptionEs: 'Navegación lenta hacia los canales de mangle rojo y avistamiento de aves marinas.',
        descriptionEn: 'Cruise into red mangrove channels spotting herons and osprey.'
      },
      {
        time: '10:15',
        titleEs: 'Demostración de pesca tradicional con atarraya',
        titleEn: 'Traditional cast-net fishing demonstration',
        descriptionEs: 'Aprende cómo los pobladores pescan sin alterar el lecho marino.',
        descriptionEn: 'Learn traditional net throwing with zero bottom trawling impact.'
      },
      {
        time: '11:30',
        titleEs: 'Taller de ceviche negro y curiles en la isla',
        titleEn: 'Island curil ceviche masterclass',
        descriptionEs: 'Apertura de moluscos frescos y preparación de la receta secreta costera.',
        descriptionEn: 'Hands-on shucking of fresh bivalves and balancing citrus notes.'
      },
      {
        time: '13:00',
        titleEs: 'Almuerzo frente al estuario y retorno',
        titleEn: 'Waterfront lunch & return cruise',
        descriptionEs: 'Disfruta tu platillo recién preparado frente a la bahía antes del regreso.',
        descriptionEn: 'Savor your freshly crafted meal on the dock before cruising back.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 24,
    has360: true,
    virtualTour360Url: panoSurfTunco,
    isLocalExperience: true,
    localCategory: 'gastronomia_local',
    hostStory: {
      name: 'Cooperativa de Pescadores Los Manglares',
      community: 'Puerto El Triunfo, Bahía de Jiquilisco',
      storyEs: 'Pescadores artesanales dedicados a la recolección selectiva y no destructiva de moluscos en el humedal RAMSAR, combinando tradición costera con conservación.',
      storyEn: 'Artisanal fishing collective practicing selective non-trawling bivalve harvesting in RAMSAR wetlands, fusing coastal heritage with marine conservation.',
      impactEs: 'Financia patrullajes comunitarios contra la tala de mangle y rescate de nidos de tortuga carey.',
      impactEn: 'Funds community patrols against mangrove logging and hawksbill sea turtle nest protection.'
    }
  },
  {
    id: 'exp-el-cuco',
    slug: 'escapada-playa-el-cuco-y-las-flores-oriente',
    titleEs: 'Arenas Negras y Olas Legendarias en Playa El Cuco y Las Flores',
    titleEn: 'Black Sand Shores & World-Class Waves at El Cuco & Las Flores',
    shortDescriptionEs: 'Explora la costa indómita del oriente salvadoreño: kilómetros de arena volcánica y el famoso point-break de Las Flores.',
    shortDescriptionEn: 'Journey to eastern El Salvador’s wild Pacific: vast black sand beaches and the legendary Las Flores wave.',
    descriptionEs: 'El oriente de El Salvador alberga una costa mágica donde la arena volcánica oscura refleja los dorados atardeceres del Pacífico como un espejo gigante. Playa El Cuco es el epicentro de la vida costera de San Miguel, ideal para caminatas al amanecer, degustación de mariscos frescos y conexión con Playa Las Flores, considerada por surfistas de todo el planeta como una de las mejores olas derechas del continente.',
    descriptionEn: 'San Miguel’s coastline in eastern El Salvador presents dramatic contrasts—vast sweeps of silky black volcanic sands bordered by cliffside headlands. Playa El Cuco offers peaceful beach walks and seafood ramadas, while neighboring Playa Las Flores boasts an internationally revered sand-bottom point break.',
    category: 'playa',
    region: 'Oriente',
    location: 'Playa El Cuco, Chirilagua, San Miguel',
    department: 'San Miguel',
    coordinates: { lat: 13.1750, lng: -88.1067 },
    meetingPointEs: 'Parqueo Turístico Central de Playa El Cuco',
    meetingPointEn: 'El Cuco Central Beachside Parking',
    price: 45,
    currency: 'USD',
    priceRange: 'medio',
    duration: '5 horas',
    durationHours: 5,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('el_cuco').images)},
    imageCredits: ${JSON.stringify(getMedia('el_cuco').credits)},
    includedEs: [
      'Guía turístico local del oriente salvadoreño',
      'Paseo en lancha costera hacia los acantilados de Las Flores',
      'Almuerzo típico playero con pescado frito fresco o mariscada',
      'Agua de coco fría y sombrilla de playa'
    ],
    includedEn: [
      'Local eastern El Salvador guide',
      'Coastal boat ride towards Las Flores headland cliffs',
      'Traditional beach lunch with fried fresh catch or seafood soup',
      'Chilled coconut water and beach umbrella setup'
    ],
    notIncludedEs: [
      'Alquiler de tablas de surf en Las Flores',
      'Transporte terrestre desde San Salvador o San Miguel'
    ],
    notIncludedEn: [
      'Surfboard rentals at Las Flores',
      'Long-distance vehicle shuttle'
    ],
    requirementsEs: [
      'Ropa de playa, traje de baño y toalla',
      'Protector solar y gafas de sol'
    ],
    requirementsEn: [
      'Beachwear, swimwear, and towel',
      'Sunscreen and sunglasses'
    ],
    itinerary: [
      {
        time: '10:00',
        titleEs: 'Llegada y bienvenida en El Cuco',
        titleEn: 'Meet on El Cuco beachfront',
        descriptionEs: 'Caminata descalzos sobre la amplia playa de arena volcánica oscura.',
        descriptionEn: 'Barefoot walk along expansive dark volcanic sands.'
      },
      {
        time: '11:30',
        titleEs: 'Navegación hacia la bahía de Las Flores',
        titleEn: 'Boat run to Las Flores surf bay',
        descriptionEs: 'Paseo en lancha frente a los acantilados rocosos y observación de surfistas en el point break.',
        descriptionEn: 'Scenic boat cruise beneath headland cliffs watching surfers on the point.'
      },
      {
        time: '13:00',
        titleEs: 'Almuerzo de mar y descanso en hamacas',
        titleEn: 'Oceanfront lunch & hammock rest',
        descriptionEs: 'Almuerzo tradicional frente al oleaje con mariscos del día.',
        descriptionEn: 'Savor freshly cooked catch of the day under palm-thatched palapas.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 19
  },
  {
    id: 'exp-los-cobanos',
    slug: 'snorkel-arrecife-coral-los-cobanos',
    titleEs: 'Snorkel y Aventura Marina en el Arrecife de Coral de Los Cóbanos',
    titleEn: 'Los Cóbanos Reef Snorkel & Marine Conservation Eco-Tour',
    shortDescriptionEs: 'Sumérgete en la única formación de arrecife coralino rocoso de El Salvador, hogar de peces de colores y tortugas marinas.',
    shortDescriptionEn: 'Snorkel over El Salvador’s sole coral and rocky reef marine sanctuary, alive with colorful tropical fish.',
    descriptionEs: 'El Área Natural Protegida Los Cóbanos es un paraíso marino singular en el Pacífico centroamericano. Su formación rocosa y colonias de coral albergan estrellas de mar, erizos, rayas y peces loro. En temporada entre diciembre y marzo, las aguas circundantes son zona de paso para avistamiento de ballenas jorobadas. Esta experiencia guiada incluye equipo de snorkel y navegación en lancha con guías conservacionistas.',
    descriptionEn: 'Los Cóbanos Marine Protected Area safeguards Central America’s northernmost Pacific rocky reef formations. Snorkel across volcanic ledges covered in brain corals and sea fans, guided by certified local marine hosts. During winter months, migrating humpback whales frequent offshore waters, making boat runs exceptionally memorable.',
    category: 'playa',
    region: 'Occidente',
    location: 'Los Cóbanos, Acajutla, Sonsonate',
    department: 'Sonsonate',
    coordinates: { lat: 13.5289, lng: -89.8058 },
    meetingPointEs: 'Playa Principal de Los Cóbanos, Cooperativa de Turismo Marino',
    meetingPointEn: 'Los Cóbanos Main Beachfront, Marine Tourism Cooperative Deck',
    price: 48,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('los_cobanos').images)},
    imageCredits: ${JSON.stringify(getMedia('los_cobanos').credits)},
    includedEs: [
      'Paseo en lancha certificada con capitán marinero local',
      'Equipo completo de snorkel (máscara, tubo y aletas desinfectadas)',
      'Chaleco salvavidas flotante de apoyo en el agua',
      'Refrigerio de frutas frescas tropicales y agua purificada',
      'Charla de conservación marina y respeto al arrecife'
    ],
    includedEn: [
      'Certified marine boat outing with local skipper',
      'Full sanitized snorkel gear (mask, snorkel, and fins)',
      'High-buoyancy snorkel vest for effortless floating',
      'Fresh tropical fruit snacks and drinking water',
      'Reef conservation and marine life orientation'
    ],
    notIncludedEs: [
      'Transporte terrestre hasta Los Cóbanos'
    ],
    notIncludedEn: [
      'Ground transit to Los Cóbanos'
    ],
    requirementsEs: [
      'Saber nadar con confianza en mar abierto',
      'Uso obligatorio de protector solar 100% amigable con arrecifes (sin oxibenzona)'
    ],
    requirementsEn: [
      'Basic swimming competence in open ocean',
      'Reef-safe mineral sunscreen mandatory'
    ],
    itinerary: [
      {
        time: '08:30',
        titleEs: 'Encuentro y charla de biodiversidad marina',
        titleEn: 'Meet & marine conservation briefing',
        descriptionEs: 'Ajuste de máscara y aletas en la playa dorada de Los Cóbanos.',
        descriptionEn: 'Gear sizing on the golden beach and reef ethics orientation.'
      },
      {
        time: '09:15',
        titleEs: 'Navegación hacia la zona de arrecife interior',
        titleEn: 'Boat transit to the inner reef gardens',
        descriptionEs: 'Salida en lancha hacia las crestas rocosas protegidas del oleaje fuerte.',
        descriptionEn: 'Short boat ride to sheltered volcanic ridges with crystal clarity.'
      },
      {
        time: '09:45',
        titleEs: 'Sesión guiada de snorkel y observación',
        titleEn: 'Guided reef snorkeling session',
        descriptionEs: 'Inmersión guiada observando peces ángel, estrellas de mar y corales.',
        descriptionEn: 'Supervised swim observing damselfish, rays, and sea anemones.'
      },
      {
        time: '11:15',
        titleEs: 'Retorno y frutas tropicales en la orilla',
        titleEn: 'Return cruise & beachside fruit snack',
        descriptionEs: 'Descanso en la playa con frutas frescas de temporada.',
        descriptionEn: 'Relax on the sand with cold watermelon and pineapple.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 22
  },

  // ==========================================
  // CULTURA, HISTORIA Y TRADICIONES
  // ==========================================
  {
    id: 'exp-4',
    slug: 'suchitoto-historico-taller-indigo-anil',
    titleEs: 'Suchitoto Colonial y Taller Ancestral de Añil (Índigo)',
    titleEn: 'Heritage Suchitoto Walk & Ancestral Indigo Dyeing Workshop',
    shortDescriptionEs: 'Recorre calles empedradas de casas coloniales, vista al Lago Suchitlán y tiñe tu propia bufanda con oro azul salvadoreño.',
    shortDescriptionEn: 'Stroll cobblestone colonial streets above Lake Suchitlán and dye your own textile with Maya blue gold.',
    descriptionEs: 'Suchitoto es la capital cultural indiscutible de El Salvador. En este recorrido a pie descubriremos historias de arte, arquitectura colonial preservada y leyendas locales. Visitaremos un taller artesanal dedicado al rescate del añil (oro azul de los mayas), donde utilizarás extracto natural de la planta xiquilite para crear patrones tradicionales de teñido en una bufanda de algodón que te llevarás a casa.',
    descriptionEn: 'Suchitoto is El Salvador’s colonial and artistic crown jewel. Stroll quiet cobblestone streets lined with bougainvillea and historic portales overlooking Lake Suchitlán. At an artisan atelier, discover the ancient Maya alchemy of indigo (xiquilite). Learn fold-resist shibori techniques and dip-dye your own pure cotton keepsake in organic fermentation vats.',
    category: 'cultura',
    region: 'Centro',
    location: 'Suchitoto, Cuscatlán',
    department: 'Cuscatlán',
    coordinates: { lat: 13.9383, lng: -89.0278 },
    meetingPointEs: 'Frente a la Iglesia Santa Lucía, Plaza Central de Suchitoto',
    meetingPointEn: 'Santa Lucía Church steps, Central Plaza of Suchitoto',
    price: 48,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('suchitoto').images)},
    imageCredits: ${JSON.stringify(getMedia('suchitoto').credits)},
    includedEs: [
      'Caminata cultural guiada por historiador local',
      'Taller práctico de teñido en añil 100% orgánico',
      'Bufanda o pañuelo de algodón puro para cada participante (te lo llevas)',
      'Degustación de café gourmet y quesadilla salvadoreña artesanal',
      'Acceso al mirador privado sobre el Lago Suchitlán'
    ],
    includedEn: [
      'Guided historical stroll with local cultural host',
      'Hands-on organic indigo dyeing workshop',
      'Pure cotton scarf/bandana to dye and take home',
      'Artisanal coffee tasting & traditional quesadilla cake',
      'Access to scenic Lake Suchitlán panorama overlook'
    ],
    notIncludedEs: [
      'Paseo en lancha por el lago (opcional disponible)',
      'Transporte ida y vuelta desde San Salvador'
    ],
    notIncludedEn: [
      'Lake boat ride (optional add-on)',
      'Inter-city transit from San Salvador'
    ],
    requirementsEs: [
      'Calzado cómodo para caminar sobre empedrado',
      'Ropa que no sea de gran valor (proporcionamos delantal protector para el teñido)',
      'Cámara fotográfica'
    ],
    requirementsEn: [
      'Comfortable walking shoes for cobblestones',
      'Casual clothes (protective aprons provided for dyeing)',
      'Camera or smartphone'
    ],
    itinerary: [
      {
        time: '09:30',
        titleEs: 'Punto de partida en la plaza colonial',
        titleEn: 'Meet at the colonial square',
        descriptionEs: 'Historia de la fundación de Suchitoto y visita a la emblemática iglesia Santa Lucía.',
        descriptionEn: 'Introduction to Suchitoto’s history and visit to Santa Lucía church.'
      },
      {
        time: '10:15',
        titleEs: 'Paseo por galerías y arquitectura',
        titleEn: 'Art galleries & architectural walk',
        descriptionEs: 'Exploración de casas señoriales, balcones de forja y leyendas del pueblo.',
        descriptionEn: 'Explore historic mansions, iron balconies, and local legends.'
      },
      {
        time: '11:00',
        titleEs: 'Taller de teñido con añil natural',
        titleEn: 'Indigo vatting & dyeing laboratory',
        descriptionEs: 'Aprende las técnicas de amarre y sumerge tu tejido en los toneles de tinte vegetal.',
        descriptionEn: 'Learn binding and shibori techniques, dipping your textile into the natural blue vat.'
      },
      {
        time: '12:30',
        titleEs: 'Lavado, revelado y merienda local',
        titleEn: 'Rinse reveal & local treat',
        descriptionEs: 'Desdoble de tu diseño único acompañado de café caliente y quesadilla tradicional.',
        descriptionEn: 'Unfold your blue pattern while enjoying warm coffee and Salvadoran quesadilla.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 35,
    has360: true,
    virtualTour360Url: panoSuchitoto,
    isLocalExperience: true,
    localCategory: 'artesanias',
    hostStory: {
      name: 'Colectivo Artesanas del Añil',
      community: 'Suchitoto, Cuscatlán',
      storyEs: 'Mujeres artesanas que rescataron la técnica del xiquilite preservada desde tiempos precolombinos para fomentar el empleo digno en la comunidad.',
      storyEn: 'Women artisan cooperative reviving pre-Columbian xiquilite indigo extraction to generate dignified rural employment.',
      impactEs: 'Preservación de técnicas textiles originarias y sustento a artesanas locales.',
      impactEn: 'Preservation of indigenous natural textile arts and sustainable artisan livelihoods.'
    }
  },
  {
    id: 'exp-joya-ceren',
    slug: 'joya-de-ceren-pompeya-de-america-unesco',
    titleEs: 'Joya de Cerén: La Pompeya de América (Patrimonio Mundial UNESCO)',
    titleEn: 'Joya de Cerén: The Pompeii of the Americas (UNESCO World Heritage)',
    shortDescriptionEs: 'Camina por la única aldea campesina prehispánica de Mesoamérica conservada intacta bajo ceniza volcánica.',
    shortDescriptionEn: 'Explore the only ancient Maya farming village frozen in time beneath volcanic ash 1,400 years ago.',
    descriptionEs: 'Declarada Patrimonio de la Humanidad por la UNESCO en 1993, Joya de Cerén no es un centro ceremonial de reyes, sino el hogar real de los campesinos mayas. Sepultada en el año 650 d.C. bajo 14 capas de ceniza expulsada por la erupción de Loma Caldera, conservó casas de bajareque, bodegas, cocinas, dormitorios, un sauna temazcal y campos de siembra exactamente como los dejaron sus habitantes.',
    descriptionEn: 'A UNESCO World Heritage landmark, Joya de Cerén provides an extraordinary snapshot of everyday Maya village life frozen by volcanic tephra from the Loma Caldera eruption around 650 AD. Walk alongside preserved thatched dormitories, kitchens with ceramic pots intact, storerooms, and an ancient communal temazcal sweat bath.',
    category: 'cultura',
    region: 'Centro',
    location: 'San Juan Opico, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.8267, lng: -89.3622 },
    meetingPointEs: 'Centro de Interpretación y Museo de Sitio Joya de Cerén',
    meetingPointEn: 'Joya de Cerén Museum and Visitors Center Entrance',
    price: 36,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('joya_ceren').images)},
    imageCredits: ${JSON.stringify(getMedia('joya_ceren').credits)},
    includedEs: [
      'Entrada oficial al Parque Arqueológico Joya de Cerén',
      'Guía acreditado especializado en arqueología e historia prehispánica',
      'Recorrido por las 4 áreas de excavación techadas y museo de sitio',
      'Bebida refrescante de horchata artesanal'
    ],
    includedEn: [
      'Official Joya de Cerén archaeological park entry ticket',
      'Accredited heritage guide specialized in Mesoamerican archaeology',
      'Guided walk through all 4 sheltered excavation complexes and museum',
      'Cold traditional horchata drink'
    ],
    notIncludedEs: [
      'Transporte hasta el parque arqueológico',
      'Almuerzo formal'
    ],
    notIncludedEn: [
      'Transportation to archaeological park',
      'Sit-down lunch'
    ],
    requirementsEs: [
      'Calzado cerrado y cómodo para caminar sobre senderos adoquinados',
      'Gorra y gafas de sol'
    ],
    requirementsEn: [
      'Closed-toe walking shoes',
      'Sun hat and sunglasses'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Introducción en el Museo de Sitio',
        titleEn: 'Museum exhibits orientation',
        descriptionEs: 'Visualización de vasijas, herramientas de obsidiana y restos botánicos rescatados de la ceniza.',
        descriptionEn: 'View obsidian tools, intact ceramic pots, and fossilized seeds recovered from the ash.'
      },
      {
        time: '09:45',
        titleEs: 'Estructuras domésticas y cocina comunitaria',
        titleEn: 'Domestic quarters & ancient kitchen',
        descriptionEs: 'Observación de las técnicas de construcción de bajareque y fogones prehispánicos.',
        descriptionEn: 'Examine earthquake-resistant bajareque architecture and ancient hearths.'
      },
      {
        time: '11:00',
        titleEs: 'El Temazcal maya y casa del chamán',
        titleEn: 'Maya temazcal sauna & shaman’s house',
        descriptionEs: 'Estructura circular de vapor con cúpula de barro donde se realizaban rituales curativos.',
        descriptionEn: 'Inspect the circular domed steam bath and ceremonial medicine house.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 31
  },
  {
    id: 'exp-10',
    slug: 'arqueologia-maya-tazumal-joya-de-ceren',
    titleEs: 'Mundo Maya: Acrópolis Ceremonial de Tazumal y Pirámides de Chalchuapa',
    titleEn: 'Maya Legacy: The Grand Pyramids of Tazumal & Casa Blanca',
    shortDescriptionEs: 'Contempla la estructura ceremonial prehispánica más alta de El Salvador y aprende sobre la milenaria cultura de Chalchuapa.',
    shortDescriptionEn: 'Stand before El Salvador’s largest ceremonial stepped pyramid and explore the ancient trading crossroads of Chalchuapa.',
    descriptionEs: 'Tazumal es la mayor joya arquitectónica ceremonial maya en territorio salvadoreño. Ubicado en Chalchuapa, este sitio estuvo habitado ininterrumpidamente durante más de un milenio. Su pirámide principal de 24 metros de altura refleja complejos sistemas de drenaje, tumbas ceremoniales y una vibrante relación comercial con Teotihuacán y Copán. Complementaremos con el parque Casa Blanca y sus talleres de añil.',
    descriptionEn: 'Located in Chalchuapa, Tazumal features the most imposing pre-Columbian architecture in El Salvador. Its primary 24-meter-tall stepped pyramid, ball court, and drainage networks showcase sophisticated Maya engineering that traded extensively with Copán and Teotihuacán. Tour includes site museum relics and nearby Casa Blanca grounds.',
    category: 'cultura',
    region: 'Occidente',
    location: 'Chalchuapa, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.9789, lng: -89.6744 },
    meetingPointEs: 'Entrada del Museo Arqueológico Stanley H. Boggs, Tazumal, Chalchuapa',
    meetingPointEn: 'Stanley H. Boggs Museum Entrance, Tazumal, Chalchuapa',
    price: 38,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('tazumal').images)},
    imageCredits: ${JSON.stringify(getMedia('tazumal').credits)},
    includedEs: [
      'Entradas oficiales a Tazumal y Parque Arqueológico Casa Blanca',
      'Guía acreditado especializado en patrimonio cultural maya',
      'Degustación de atol de elote salvadoreño recién hecho',
      'Visita guiada al museo de sitio Stanley Boggs'
    ],
    includedEn: [
      'Official admission to Tazumal and Casa Blanca archaeological parks',
      'Accredited cultural heritage guide',
      'Warm traditional sweetcorn atol beverage',
      'Guided walkthrough of the Stanley Boggs on-site museum'
    ],
    notIncludedEs: [
      'Transporte entre San Salvador y Chalchuapa',
      'Almuerzo formal'
    ],
    notIncludedEn: [
      'Transit to Chalchuapa',
      'Sit-down restaurant lunch'
    ],
    requirementsEs: [
      'Calzado cerrado y cómodo',
      'Sombrero o sombrilla para protección solar'
    ],
    requirementsEn: [
      'Closed-toe walking shoes',
      'Sun hat or umbrella'
    ],
    itinerary: [
      {
        time: '09:30',
        titleEs: 'Encuentro y museo de sitio Tazumal',
        titleEn: 'Meet at Tazumal site museum',
        descriptionEs: 'Observación de la escultura del Dios Desollado (Xipe Tótec) y joyas de jade prehispánicas.',
        descriptionEn: 'View jade ornaments, ceremonial pottery, and the iconic Xipe Tótec life-sized effigy.'
      },
      {
        time: '10:30',
        titleEs: 'Recorrido alrededor de la Gran Pirámide B1-1',
        titleEn: 'Great stepped pyramid B1-1 tour',
        descriptionEs: 'Caminata alrededor de las terrazas ceremoniales y explicación del juego de pelota.',
        descriptionEn: 'Walk the perimeter of the ancient stepped acropolis and ball court.'
      },
      {
        time: '11:45',
        titleEs: 'Traslado y visita a Casa Blanca',
        titleEn: 'Casa Blanca archaeological park visit',
        descriptionEs: 'Exploración de pirámides cubiertas de grama y taller tradicional de añil.',
        descriptionEn: 'Explore grass-covered mounds and living indigo garden.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 27
  },
  {
    id: 'exp-ataco-cultura',
    slug: 'muralismo-telares-concepcion-de-ataco',
    titleEs: 'Muralismo, Telares de Palanca y Tradición en Concepción de Ataco',
    titleEn: 'Concepción de Ataco: Vibrant Murals, Heritage Handlooms & Mountain Charm',
    shortDescriptionEs: 'Pasea entre cientos de coloridos murales urbanos, aprende el tejido en madera con maestros artesanos y cata café de estricta altura.',
    shortDescriptionEn: 'Wander lively mural-painted streets, watch traditional wooden handloom weaving, and cup high-altitude coffee.',
    descriptionEs: 'Concepción de Ataco es el pueblo más bohemio y artístico de la cordillera occidental salvadoreña. En esta caminata cultural recorreremos callejones empedrados donde las fachadas coloniales narran leyendas indígenas y escenas de la vida rural en murales llenos de color. En un taller patrimonial veremos a los tejedores operar centenarios telares de palanca de madera.',
    descriptionEn: 'Nestled high in the misty mountain range, Concepción de Ataco is famous for its rainbow urban murals and vibrant artisan crafts. Guided by a local community storyteller, discover the folklore behind the street art, visit historic wooden handlooms creating bright woven blankets, and finish with a cupping of freshly roasted Pacamara beans.',
    category: 'cultura',
    region: 'Occidente',
    location: 'Concepción de Ataco, Ahuachapán',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8703, lng: -89.8489 },
    meetingPointEs: 'Parque Central de Ataco, frente a la Iglesia de la Inmaculada Concepción',
    meetingPointEn: 'Ataco Central Square, front steps of the Immaculate Conception Church',
    price: 34,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('ataco').images)},
    imageCredits: ${JSON.stringify(getMedia('ataco').credits)},
    includedEs: [
      'Guía cultural local nativo de Concepción de Ataco',
      'Paseo guiado explicativo por la ruta de murales artísticos',
      'Demostración interactiva en taller de telares tradicionales',
      'Degustación de café de altura con pan dulce tradicional de canela'
    ],
    includedEn: [
      'Local cultural storyteller native to Ataco',
      'Guided narrative walk through the celebrated mural corridors',
      'Hands-on pedal loom textile weaving demonstration',
      'Highland coffee tasting paired with artisan cinnamon sweet bread'
    ],
    notIncludedEs: [
      'Compras en tiendas artesanales',
      'Transporte hasta el pueblo'
    ],
    notIncludedEn: [
      'Handicraft purchases',
      'Inter-city transit'
    ],
    requirementsEs: [
      'Zapatos cómodos para caminar sobre calles empedradas',
      'Suéter para el clima fresco de la tarde'
    ],
    requirementsEn: [
      'Comfortable flat shoes for cobblestone streets',
      'Light jacket for cool mountain afternoons'
    ],
    itinerary: [
      {
        time: '14:00',
        titleEs: 'Encuentro en el parque y recorrido de murales',
        titleEn: 'Meet at town square & mural circuit',
        descriptionEs: 'Lectura visual de murales que relatan leyendas como el Cipitío y la Siguanaba.',
        descriptionEn: 'Walk through street art celebrating Salvadoran folklore and coffee heritage.'
      },
      {
        time: '15:15',
        titleEs: 'Taller de telares artesanales Dicona',
        titleEn: 'Dicona handloom weaving atelier',
        descriptionEs: 'Observación y práctica en los telares de madera para tejer manteles y hamacas.',
        descriptionEn: 'Watch master weavers work wooden treadle looms and try weaving a thread row.'
      },
      {
        time: '16:15',
        titleEs: 'Café de especialidad en mirador',
        titleEn: 'Mountain coffee tasting',
        descriptionEs: 'Degustación de café cosechado en las laderas del volcán Chingo con pan dulce recién horneado.',
        descriptionEn: 'Savor mountain-grown coffee with freshly baked artisan sweet bread.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 33
  },
  {
    id: 'exp-12',
    slug: 'ruta-historica-morazan-paz-memoria',
    titleEs: 'Ruta de la Paz y Memoria Viva en las Montañas de Morazán',
    titleEn: 'Peace Route & Living Mountain Memory in Morazán',
    shortDescriptionEs: 'Visita Perquín, el Museo de la Revolución y trincheras históricas guiado por pobladores que hoy promueven la paz.',
    shortDescriptionEn: 'Travel the pine-covered highlands of Perquín, the Peace Museum, and nature trails guided by local peacemakers.',
    descriptionEs: 'Las montañas nororientales de Morazán guardan una de las memorias históricas más profundas del país y hoy son un ejemplo conmovedor de reconciliación y turismo comunitario. Guiado por habitantes de la zona que vivieron el conflicto armado, visitarás el Museo de la Revolución de Perquín, los antiguos campamentos subterráneos y las cascadas cristalinas del río Sapo.',
    descriptionEn: 'Morazán’s pine-clad highlands tell a profound story of historical resilience and living reconciliation. Guided by local community hosts who lived through the peace accords, visit Perquín’s museum, walk preserved mountain trails, and swim in the emerald waters of the Rio Sapo protected valley.',
    category: 'cultura',
    region: 'Oriente',
    location: 'Perquín y Río Sapo, Morazán',
    department: 'Morazán',
    coordinates: { lat: 13.9564, lng: -88.1611 },
    meetingPointEs: 'Museo de la Revolución, Perquín, Morazán',
    meetingPointEn: 'Museum of the Revolution Entrance, Perquín',
    price: 50,
    currency: 'USD',
    priceRange: 'medio',
    duration: '5.5 horas',
    durationHours: 5.5,
    durationType: 'full_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'moderado',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('perquin').images)},
    imageCredits: ${JSON.stringify(getMedia('perquin').credits)},
    includedEs: [
      'Guía comunitario con memoria testimonial viva',
      'Ingreso al Museo de la Revolución y cerro El Pericón',
      'Visita y tiempo de descanso en la reserva natural del Río Sapo',
      'Almuerzo campesino en restaurante comunitario'
    ],
    includedEn: [
      'Local community testimonial guide',
      'Entry tickets to the Museum and El Pericón hill',
      'Visit and swim time at the protected Río Sapo natural reserve',
      'Traditional homestyle lunch at community-run eatery'
    ],
    notIncludedEs: [
      'Transporte hasta el departamento de Morazán'
    ],
    notIncludedEn: [
      'Transportation to Morazán department'
    ],
    requirementsEs: [
      'Ropa cómoda y suéter para el clima de montaña',
      'Calzado adecuado para senderos de tierra y pino',
      'Actitud de respeto y empatía hacia los testimonios comunitarios'
    ],
    requirementsEn: [
      'Comfortable clothing and a light sweater for pine forest breezes',
      'Walking shoes suited for unpaved forest trails',
      'Respectful and open-minded attitude for community dialogue'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Encuentro y bienvenida en Perquín',
        titleEn: 'Meet & orientation in Perquín',
        descriptionEs: 'Bienvenida por parte de los guías comunitarios y reseña geográfica.',
        descriptionEn: 'Welcome by local community hosts and historical setting.'
      },
      {
        time: '09:30',
        titleEs: 'Visita guiada al Museo de la Revolución',
        titleEn: 'Museum of the Revolution guided tour',
        descriptionEs: 'Recorrido por archivos fotográficos, transmisiones históricas de Radio Venceremos y objetos de época.',
        descriptionEn: 'Walk through archive rooms, field radio artifacts, and peace accord memorabilia.'
      },
      {
        time: '11:30',
        titleEs: 'Caminata hacia trincheras y túneles',
        titleEn: 'Nature walk to preserved hillside shelters',
        descriptionEs: 'Exploración de veredas entre pinares donde se organizaban los campamentos comunitarios.',
        descriptionEn: 'Forest walk along pine trails highlighting natural camouflage techniques.'
      },
      {
        time: '13:00',
        titleEs: 'Almuerzo local y descanso en Río Sapo',
        titleEn: 'Homestyle lunch & Río Sapo freshwater swim',
        descriptionEs: 'Comida típica de Morazán y descanso en las aguas turquesas del río más limpio del país.',
        descriptionEn: 'Hearty local meal followed by a visit to the turquoise waters of Río Sapo.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 16,
    has360: true,
    virtualTour360Url: panoSuchitoto,
    isLocalExperience: true,
    localCategory: 'historia_local',
    hostStory: {
      name: 'Asociación de Guías Comunitarios de Perquín',
      community: 'Perquín y Río Sapo, Morazán',
      storyEs: 'Habitantes locales que vivieron el conflicto civil salvadoreño y hoy canalizan su memoria hacia la educación para la paz y la protección del río más limpio del país.',
      storyEn: 'Local villagers who lived through El Salvador’s peace accords, now channeling oral history into peace education and clean river basin protection.',
      impactEs: 'Mantenimiento de bibliotecas comunitarias y viveros de reforestación de pino nativo en Morazán.',
      impactEn: 'Supports rural community youth libraries and native pine reforestation nurseries in Morazán.'
    }
  },
  {
    id: 'exp-rio-sapo',
    slug: 'reserva-natural-rio-sapo-pozas-cristalinas',
    titleEs: 'Pozas Turquesas y Senderismo en la Reserva Protegida de Río Sapo',
    titleEn: 'Turquoise Waters & Nature Swimming in Río Sapo Reserve',
    shortDescriptionEs: 'Báñate en las aguas más limpias y cristalinas de El Salvador, rodeado de pinares, formaciones rocosas y fauna silvestre.',
    shortDescriptionEn: 'Swim in the clearest river waters in El Salvador, framed by pine-oak forests and volcanic boulder pools.',
    descriptionEs: 'El Río Sapo, en las montañas de Morazán, es considerado el afluente más prístino y protegido del país. Sus aguas de un hipnótico color verde esmeralda y turquesa corren sobre lechos de roca volcánica formando pozas naturales ideales para nadar con seguridad en medio de un silencio sobrecogedor. Una experiencia de reconexión con la naturaleza pura guiada por guardaparques comunitarios.',
    descriptionEn: 'Nestled between Morazán’s dramatic ravines, Río Sapo is widely celebrated as El Salvador’s cleanest freshwater river. Fed by untouched mountain springs, its calm emerald pools offer world-class wild swimming, bird watching, and peaceful pine forest trail walks led by local river stewards.',
    category: 'naturaleza',
    region: 'Oriente',
    location: 'Arambala, Morazán',
    department: 'Morazán',
    coordinates: { lat: 13.9167, lng: -88.1000 },
    meetingPointEs: 'Puente colgante de Río Sapo, Carretera a Perquín',
    meetingPointEn: 'Río Sapo Suspension Bridge, Arambala road to Perquín',
    price: 36,
    currency: 'USD',
    priceRange: 'economico',
    duration: '4 horas',
    durationHours: 4,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('rio_sapo').images)},
    imageCredits: ${JSON.stringify(getMedia('rio_sapo').credits)},
    includedEs: [
      'Guía ecológico comunitario de Arambala',
      'Pase de acceso y conservación al área protegida de Río Sapo',
      'Chaleco salvavidas para nadar en pozas profundas (opcional)',
      'Refrigerio de frutas tropicales y agua fresca'
    ],
    includedEn: [
      'Local eco-guide from Arambala',
      'Protected river reserve access permit',
      'Safety life vest for deep water swimming (optional)',
      'Fresh fruit snacks and cold water'
    ],
    notIncludedEs: [
      'Transporte hasta Arambala / Morazán',
      'Toalla y ropa de cambio'
    ],
    notIncludedEn: [
      'Transit to Arambala',
      'Towels and dry clothes'
    ],
    requirementsEs: [
      'Traje de baño puesto bajo la ropa de caminata',
      'Zapatos de agua o calzado deportivo que se pueda mojar',
      'Uso obligatorio de bloqueador solar libre de químicos contaminantes'
    ],
    requirementsEn: [
      'Swimwear under light hiking clothing',
      'Water shoes or sturdy sneakers suitable for wet rocks',
      'Chemical-free biodegradable sunscreen'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Encuentro en el puente de Río Sapo',
        titleEn: 'Meet at Río Sapo bridge',
        descriptionEs: 'Bienvenida del guía local y presentación del ecosistema fluvial.',
        descriptionEn: 'Welcome by local river keeper and watershed overview.'
      },
      {
        time: '09:30',
        titleEs: 'Caminata entre pinares hacia la Poza del Sapo',
        titleEn: 'Pine forest walk to main river pool',
        descriptionEs: 'Sendero suave sombreado por pinos y robles escuchando el rumor del agua.',
        descriptionEn: 'Gentle shaded forest stroll to the most scenic natural pool.'
      },
      {
        time: '10:30',
        titleEs: 'Baño libre en aguas turquesas',
        titleEn: 'Wild river swimming in emerald pools',
        descriptionEs: 'Tiempo para nadar, flotar y descansar sobre las lajas de piedra soleadas.',
        descriptionEn: 'Swim, float, and sunbathe on warm river boulders.'
      },
      {
        time: '12:30',
        titleEs: 'Refrigerio frutal y retorno',
        titleEn: 'Tropical fruit snack & return walk',
        descriptionEs: 'Pausa para compartir fruta fresca antes de regresar al punto de partida.',
        descriptionEn: 'Enjoy chilled fruit before a leisurely return stroll.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 20
  },
  {
    id: 'exp-7',
    slug: 'centro-historico-san-salvador-arquitectura',
    titleEs: 'Renacer del Centro Histórico de San Salvador y Café Patrimonial',
    titleEn: 'San Salvador Historic District Walking Tour & Heritage Coffee',
    shortDescriptionEs: 'Descubre el Palacio Nacional, el Teatro, la colorida Iglesia El Rosario y tertulias en cafeterías de los años 30.',
    shortDescriptionEn: 'Explore the refurbished National Palace, National Theatre, stained-glass Rosario Church, and historic 1930s cafés.',
    descriptionEs: 'El Centro Histórico de San Salvador vive un renacimiento cultural vibrante. En este recorrido a pie con arquitectos e historiadores urbanos, recorrerás plazas abiertas, la revolucionaria iglesia El Rosario con su juego hipnótico de vitrales de colores, el majestuoso Palacio Nacional y las criptas históricas, culminando con café de altura en una terraza con vista a la Catedral.',
    descriptionEn: 'San Salvador’s historic downtown is experiencing a vibrant urban cultural renaissance. Led by local architecture storytellers, discover pedestrian plazas, the world-renowned El Rosario church illuminated by rainbow stained glass concrete arches, the National Palace halls, and a heritage rooftop espresso bar overlooking the Metropolitan Cathedral.',
    category: 'cultura',
    region: 'Centro',
    location: 'Centro Histórico, San Salvador',
    department: 'San Salvador',
    coordinates: { lat: 13.6989, lng: -89.1914 },
    meetingPointEs: 'Plaza Gerardo Barrios, frente a la estatua ecuestre',
    meetingPointEn: 'Gerardo Barrios Plaza, in front of the equestrian monument',
    price: 32,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 15,
    images: ${JSON.stringify(getMedia('san_salvador').images)},
    imageCredits: ${JSON.stringify(getMedia('san_salvador').credits)},
    includedEs: [
      'Guía profesional especializado en historia urbana y arquitectura',
      'Entrada al Palacio Nacional y salas de exposición',
      'Entrada y visita explicativa a la Iglesia El Rosario',
      'Café de especialidad o bebida refrescante en terraza panorámica'
    ],
    includedEn: [
      'Professional guide specialized in urban history & architecture',
      'Entry tickets to the restored National Palace',
      'Entry and architectural tour of El Rosario Church',
      'Specialty coffee or cold craft drink on a scenic rooftop'
    ],
    notIncludedEs: [
      'Consumos adicionales en librerías o mercados de artesanías',
      'Transporte al punto de encuentro'
    ],
    notIncludedEn: [
      'Purchases at artisan craft markets',
      'Transit to downtown meeting point'
    ],
    requirementsEs: [
      'Ropa fresca, gorra o sombrero y gafas de sol',
      'Calzado cómodo para caminar en zonas peatonales'
    ],
    requirementsEn: [
      'Light breathable clothing, sunhat, and sunglasses',
      'Comfortable walking shoes for paved plazas'
    ],
    itinerary: [
      {
        time: '14:30',
        titleEs: 'Punto de encuentro en Plaza Gerardo Barrios',
        titleEn: 'Meet at Plaza Gerardo Barrios',
        descriptionEs: 'Introducción al trazado fundacional de la capital y sus transformaciones.',
        descriptionEn: 'Introduction to the historical civic layout and modern revitalizations.'
      },
      {
        time: '15:15',
        titleEs: 'Recorrido interior del Palacio Nacional',
        titleEn: 'National Palace staterooms tour',
        descriptionEs: 'Visita a los salones Rojo, Azul y Amarillo y sus patios interiores de estilo renacentista.',
        descriptionEn: 'Walk through the Red, Blue, and Yellow halls and neoclassical gardens.'
      },
      {
        time: '16:15',
        titleEs: 'Luz y arquitectura en Iglesia El Rosario',
        titleEn: 'Light & concrete sculpture at El Rosario',
        descriptionEs: 'Explicación del diseño del arquitecto Rubén Martínez y el efecto solar de sus vitrales.',
        descriptionEn: 'Learn about master sculptor Rubén Martínez’s iconic brutalist rainbow vault.'
      },
      {
        time: '17:00',
        titleEs: 'Atardecer con café en terraza patrimonial',
        titleEn: 'Rooftop golden hour coffee',
        descriptionEs: 'Conversación abierta degustando café salvadoreño con vista a las cúpulas de la ciudad.',
        descriptionEn: 'Casual conversation enjoying single-origin espresso with city plaza views.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 35,
    has360: true,
    virtualTour360Url: panoSuchitoto
  },
  {
    id: 'exp-san-sebastian',
    slug: 'tradicion-textil-telares-san-sebastian',
    titleEs: 'Tradición Textil y Hamacas Artesanales en San Sebastián',
    titleEn: 'Heritage Loom Weaving & Cotton Hammocks of San Sebastián',
    shortDescriptionEs: 'Visita la capital textil de El Salvador: observa familias de tejedores creando telas multicolores en telares ancestrales de madera.',
    shortDescriptionEn: 'Visit El Salvador’s historic textile capital and watch families craft vivid cotton hammocks on ancient wooden looms.',
    descriptionEs: 'San Sebastián, en el departamento de San Vicente, es mundialmente reconocido por su secular tradición en la confección de hamacas, colchas y mantelería en telares artesanales de lanzadera. Al caminar por el pueblo se escucha el rítmico traqueteo de la madera donde familias enteras conservan secretos de urdido y tintorería transmitidos de padres a hijos durante más de un siglo.',
    descriptionEn: 'San Sebastián in the San Vicente region is Central America’s premier artisan textile center. Walk through quiet streets resounding with the rhythmic click-clack of wooden flying shuttle looms. Meet multi-generational artisan families who spin, dye, and weave the finest 100% cotton hammocks, tapestries, and bedspreads.',
    category: 'cultura',
    region: 'Centro',
    location: 'San Sebastián, San Vicente',
    department: 'San Vicente',
    coordinates: { lat: 13.7333, lng: -88.8333 },
    meetingPointEs: 'Parque Central de San Sebastián, frente a la Iglesia Parroquial',
    meetingPointEn: 'San Sebastián Central Park, in front of the Parish Church',
    price: 35,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('san_sebastian').images)},
    imageCredits: ${JSON.stringify(getMedia('san_sebastian').credits)},
    includedEs: [
      'Guía local de la cooperativa artesanal de San Sebastián',
      'Visita a dos talleres familiares de tejido en telar de lanzadera',
      'Taller interactivo de urdido de hilos de algodón',
      'Refrigerio tradicional con quesadilla y café salvadoreño'
    ],
    includedEn: [
      'Local artisan cooperative guide',
      'Visits to two multi-generational family loom workshops',
      'Hands-on cotton thread warping and weaving exercise',
      'Traditional afternoon snack with quesadilla and coffee'
    ],
    notIncludedEs: [
      'Compras directas de hamacas o manteles (opcionales con los artesanos)',
      'Transporte hasta San Sebastián'
    ],
    notIncludedEn: [
      'Direct purchase of woven hammocks',
      'Transit to San Sebastián'
    ],
    requirementsEs: [
      'Calzado cómodo para caminar',
      'Efectivo si deseas adquirir textiles directamente con los productores'
    ],
    requirementsEn: [
      'Comfortable walking shoes',
      'Cash for purchasing directly from family workshops'
    ],
    itinerary: [
      {
        time: '10:00',
        titleEs: 'Bienvenida en el centro histórico de San Sebastián',
        titleEn: 'Meet in San Sebastián historic center',
        descriptionEs: 'Introducción a la historia de la industria artesanal algodonera en San Vicente.',
        descriptionEn: 'Introduction to 19th-century cotton weaving heritage.'
      },
      {
        time: '10:45',
        titleEs: 'Taller familiar de telar de lanzadera',
        titleEn: 'Loom workshop demonstration',
        descriptionEs: 'Demostración de cómo se entrelazan hasta 1,200 hilos para crear patrones geométricos.',
        descriptionEn: 'Watch master weavers guide shuttle threads creating intricate geometric textiles.'
      },
      {
        time: '12:00',
        titleEs: 'Práctica de tejido y descanso',
        titleEn: 'Hands-on weaving tryout & coffee break',
        descriptionEs: 'Los viajeros pueden probar el pedal del telar y degustar café con quesadilla.',
        descriptionEn: 'Try pressing the loom pedals yourself and enjoy warm coffee.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 17,
    isLocalExperience: true,
    localCategory: 'artesanias',
    hostStory: {
      name: 'Familia Morales y Tejedores de San Sebastián',
      community: 'San Sebastián, San Vicente',
      storyEs: 'Cuatro generaciones de artesanos que conservan los telares de pedal de madera, tejiendo hilo por hilo hamacas de algodón que son emblema nacional.',
      storyEn: 'Four generations of artisan weavers preserving wooden treadle looms, handcrafting durable heirloom cotton hammocks.',
      impactEs: 'Ingreso directo a talleres familiares rurales salvadoreños sin cadenas de intermediación.',
      impactEn: 'Direct economic livelihood to rural craft families without middlemen.'
    }
  },

  // ==========================================
  // GASTRONOMÍA Y EXPERIENCIAS LOCALES
  // ==========================================
  {
    id: 'exp-ruta-pupusas',
    slug: 'ruta-de-la-pupusa-olocuilta-arroz-maiz',
    titleEs: 'Ruta Suprema de la Pupusa: Olocuilta vs. Tradición de Maíz',
    titleEn: 'The Ultimate Pupusa Trail: Olocuilta Rice Flour vs. Heirloom Maize',
    shortDescriptionEs: 'Degusta el platillo rey de El Salvador en los mejores pupusódromos del país y aprende la técnica de palmeado con cocineras maestras.',
    shortDescriptionEn: 'Taste El Salvador’s national culinary treasure at heritage pupusódromos and master hand-patting with seasoned pupuseras.',
    descriptionEs: 'No hay viaje completo a El Salvador sin rendir culto a la pupusa. En este recorrido gastronómico guiado por gastrónomos salvadoreños descubriremos el debate histórico entre la pupusa de arroz nacida en Olocuilta y la clásica pupusa de maíz nixtamalizado. Degustarás variedades tradicionales (revueltas, chicharrón, queso con loroco) y combinaciones campesinas como frijol con chipilín y ayote.',
    descriptionEn: 'The pupusa is El Salvador’s undisputed culinary identity. On this guided food tour, compare Olocuilta’s famous fluffy rice-flour pupusas with traditional heirloom nixtamalized corn recipes. Learn the chemistry behind fermenting crisp curtido cabbage and crafting fire-roasted tomato salsa, then step up to the comal to hand-pat your own creation.',
    category: 'gastronomia',
    region: 'Centro',
    location: 'Olocuilta (La Paz) y Antiguo Cuscatlán (La Libertad)',
    department: 'La Paz',
    coordinates: { lat: 13.5689, lng: -89.1178 },
    meetingPointEs: 'Pupusódromo El Manguito, Olocuilta, Carretera a Comalapa',
    meetingPointEn: 'El Manguito Pupusa Pavilion, Olocuilta',
    price: 32,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3 horas',
    durationHours: 3,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('pupusas').images)},
    imageCredits: ${JSON.stringify(getMedia('pupusas').credits)},
    includedEs: [
      'Degustación guiada de 4 variedades de pupusas (arroz y maíz)',
      'Taller práctico de palmeado de pupusas con pupusera profesional',
      'Bebida tradicional ilimitada (horchata salvadoreña de morro o fresco de ensalada)',
      'Explicación cultural del curtido y salsa de tomate casera'
    ],
    includedEn: [
      'Guided tasting of 4 pupusa varieties (rice and heirloom maize)',
      'Hands-on pupusa patting masterclass with a veteran pupusa chef',
      'Unlimited traditional beverage (Salvadoran horchata or chopped fruit punch)',
      'Cultural guide to homemade curtido and fire-roasted salsa balancing'
    ],
    notIncludedEs: [
      'Transporte entre pupusódromos (se coordinan traslados cortos)',
      'Bebidas alcohólicas'
    ],
    notIncludedEn: [
      'Transit to starting pavilion',
      'Beer or alcoholic drinks'
    ],
    requirementsEs: [
      'Buen apetito y avisar si existen restricciones dietéticas (opciones vegetarianas disponibles)'
    ],
    requirementsEn: [
      'Hearty appetite (vegetarian options gladly provided upon advance notice)'
    ],
    itinerary: [
      {
        time: '11:00',
        titleEs: 'Llegada a Olocuilta, cuna de la pupusa de arroz',
        titleEn: 'Meet in Olocuilta, home of rice pupusas',
        descriptionEs: 'Introducción a cómo nació la técnica de la harina de arroz en los años setenta.',
        descriptionEn: 'Learn how rice-flour pupusas originated during the 1970s commodity shifts.'
      },
      {
        time: '11:30',
        titleEs: 'Taller de palmeado y cocción en comal',
        titleEn: 'Hands-on comal patting class',
        descriptionEs: 'Aprende a bolear la masa, ahuecar el centro, rellenar y palmear sin romper los bordes.',
        descriptionEn: 'Master rounding dough, pocketing cheese and loroco, and patting it thin.'
      },
      {
        time: '12:30',
        titleEs: 'Degustación comparativa y curtidos artesanales',
        titleEn: 'Comparative tasting session',
        descriptionEs: 'Disfruta pupusas calientes recién salidas del comal con curtido de orégano y salsa criolla.',
        descriptionEn: 'Savor hot pupusas straight off the hotplate with oregano curtido.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 45,
    isLocalExperience: true,
    localCategory: 'cocina_tradicional'
  },
  {
    id: 'exp-2',
    slug: 'ruta-del-cafe-apaneca-pupusa-workshop',
    titleEs: 'Ruta del Café de Especialidad y Masterclass de Pupusas',
    titleEn: 'Specialty Coffee Farm Cupping & Hands-on Pupusa Workshop',
    shortDescriptionEs: 'Recorre un beneficio tradicional en Apaneca, aprende a catar café Pacamara y prepara pupusas en comal de barro.',
    shortDescriptionEn: 'Tour a heritage high-altitude coffee farm, cup award-winning Pacamara beans, and craft pupusas over a clay comal.',
    descriptionEs: 'Una inmersión íntima en el corazón cafetalero de la cordillera Apaneca-Ilamatepec. Comenzaremos entre cafetos de sombra aprendiendo el proceso de cosecha y tostado artesanal, guiados por un catador certificado. Luego, en la cocina campestre de una familia local, aprenderás la técnica tradicional de palmear pupusas con maíz nixtamalizado y queso artesanal de la región.',
    descriptionEn: 'A sensory immersion into El Salvador’s highland coffee belt along the Ruta de las Flores. Guided by a certified roaster, explore shade-grown Pacamara fields and participate in a guided cupping table. Later, join a local culinary host to hand-knead and griddle traditional pupusas using heirloom maize on a wood-fired clay hearth.',
    category: 'gastronomia',
    region: 'Occidente',
    location: 'Apaneca, Ruta de las Flores',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8617, lng: -89.8039 },
    meetingPointEs: 'Café La Concordia, Parque Central de Apaneca',
    meetingPointEn: 'La Concordia Coffee Bar, Apaneca Central Plaza',
    price: 52,
    currency: 'USD',
    priceRange: 'medio',
    duration: '4 horas',
    durationHours: 4,
    durationType: 'half_day',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('apaneca').images.slice(0, 5))},
    imageCredits: ${JSON.stringify(getMedia('apaneca').credits.slice(0, 5))},
    includedEs: [
      'Visita guiada a finca cafetalera sostenible',
      'Sesión de cata y degustación de 3 métodos de extracción',
      'Taller práctico de pupusas con ingredientes frescos e ilimitados',
      'Bebida tradicional de temporada (horchata de morro o fresco de ensalada)',
      'Bolsa conmemorativa de 250g de café tostado en grano'
    ],
    includedEn: [
      'Guided walk through sustainable coffee plantation',
      'Cupping session & 3 artisan brew methods',
      'Hands-on pupusa making class with fresh ingredients',
      'Traditional seasonal beverage',
      'Take-home 250g bag of roasted specialty coffee'
    ],
    notIncludedEs: [
      'Transporte interdepartamental',
      'Bebidas alcohólicas adicionales',
      'Compras en tienda de souvenirs'
    ],
    notIncludedEn: [
      'Inter-department transit',
      'Additional alcoholic drinks',
      'Souvenir store purchases'
    ],
    requirementsEs: [
      'Ropa cómoda y suéter ligero (clima fresco en las montañas de Apaneca)',
      'Informar alergias alimentarias con anticipación (opciones vegetarianas y sin gluten disponibles)'
    ],
    requirementsEn: [
      'Comfortable casual clothing and light sweater (cool mountain weather)',
      'Advise dietary preferences in advance (vegetarian & gluten-free corn options available)'
    ],
    itinerary: [
      {
        time: '09:00',
        titleEs: 'Bienvenida con café de bienvenida',
        titleEn: 'Warm welcome brew in Apaneca',
        descriptionEs: 'Recepción en el parque y breve caminata hacia la finca patrimonial.',
        descriptionEn: 'Meet at the town plaza and short walk to the heritage farm.'
      },
      {
        time: '09:30',
        titleEs: 'Recorrido por los cafetales y secado',
        titleEn: 'Shade-grown plantation walk & drying patios',
        descriptionEs: 'Explicación del terroir volcánico, variedades Pacamara y secado en camas africanas.',
        descriptionEn: 'Learn about volcanic soil influence, bean varieties, and drying techniques.'
      },
      {
        time: '11:00',
        titleEs: 'Taller de cata y perfiles de sabor',
        titleEn: 'Barista cupping session',
        descriptionEs: 'Degustación guiada de notas florales y achocolatadas del grano salvadoreño.',
        descriptionEn: 'Interactive cupping exploring floral and caramel roast profiles.'
      },
      {
        time: '12:00',
        titleEs: 'Masterclass de pupusas en comal de barro',
        titleEn: 'Pupusa making class on wood-fired comal',
        descriptionEs: 'Aprende a palmear la masa, rellenar y cocinar con curtido artesanal y salsa casera.',
        descriptionEn: 'Master the hand-patting technique, stuffing, and eating with house-made curtido.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 42,
    has360: true,
    virtualTour360Url: panoCoatepeque,
    isLocalExperience: true,
    localCategory: 'cafe',
    hostStory: {
      name: 'Doña Rosa y Familia Magaña',
      community: 'Apaneca, Ahuachapán',
      storyEs: 'Cultivadores de café de tercera generación en las faldas de la cordillera. Abren su casa para compartir la técnica tradicional del tueste y la receta familiar de pupusas de maíz criollo.',
      storyEn: 'Third-generation coffee farmers on mountain slopes. They welcome guests into their family kitchen to share ancestral roasting and hand-patted heirloom pupusas.',
      impactEs: 'Ingreso directo para familias productoras de café de altura sin intermediarios.',
      impactEn: 'Direct income to smallholder highland coffee farming families.'
    }
  },
  {
    id: 'exp-quesadilla-taller',
    slug: 'taller-quesadilla-salvadorena-horno-leña',
    titleEs: 'Taller de Quesadilla Salvadoreña Artesanal en Horno de Leña y Atoles',
    titleEn: 'Wood-Fired Salvadoran Quesadilla Baking Class & Traditional Atoles',
    shortDescriptionEs: 'Aprende a hornear la auténtica quesadilla con queso duro-blando y semillas de ajonjolí en una cocina campestre tradicional.',
    shortDescriptionEn: 'Bake genuine Salvadoran quesadilla sweet cheese cake in a wood-fired brick oven and taste warm sweetcorn atol.',
    descriptionEs: 'A diferencia de la quesadilla mexicana, en El Salvador la quesadilla es un exquisito pan dulce horneado elaborado con harina de arroz, crema fresca de ordeño, mantequilla de lavado y el característico queso duro-blando artesanal, coronado con ajonjolí tostado. En este taller en una finca rural aprenderás la receta ancestral de familia y hornearás tu propio molde en un horno de cúpula de barro a la leña.',
    descriptionEn: 'In El Salvador, the quesadilla is a beloved rich sweet cake made with rice flour, rich dairy cream, butter, and cured artisan cheese, sprinkled with toasted sesame seeds. Roll up your sleeves in a countryside kitchen to mix the heritage batter from scratch and bake it inside a wood-fired brick oven.',
    category: 'gastronomia',
    region: 'Occidente',
    location: 'Atiquizaya, Ahuachapán',
    department: 'Ahuachapán',
    coordinates: { lat: 13.9767, lng: -89.7533 },
    meetingPointEs: 'Plaza Central de Atiquizaya, Casa Cultural',
    meetingPointEn: 'Atiquizaya Central Plaza, Cultural House',
    price: 38,
    currency: 'USD',
    priceRange: 'economico',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 10,
    images: ${JSON.stringify(getMedia('ruta_flores').images.slice(0, 4))},
    imageCredits: ${JSON.stringify(getMedia('ruta_flores').credits.slice(0, 4))},
    includedEs: [
      'Ingredientes completos de primera calidad (crema de ordeño, queso duro y ajonjolí)',
      'Tu propia quesadilla horneada entera para degustar y llevarte a casa',
      'Degustación de atol de elote recién preparado en olla de barro',
      'Café de olla campesino endulzado con dulce de atado'
    ],
    includedEn: [
      'All high-grade ingredients (fresh dairy cream, aged artisan cheese, sesame)',
      'Your own freshly baked whole quesadilla cake to take home',
      'Tasting of warm sweetcorn atol cooked in a clay vessel',
      'Clay-pot coffee sweetened with raw cane panela sugar'
    ],
    notIncludedEs: [
      'Transporte hasta Atiquizaya'
    ],
    notIncludedEn: [
      'Transit to Atiquizaya'
    ],
    requirementsEs: [
      'Ganas de cocinar y ropa casual cómoda'
    ],
    requirementsEn: [
      'Enthusiasm for baking and casual comfortable attire'
    ],
    itinerary: [
      {
        time: '14:00',
        titleEs: 'Bienvenida y encendido del horno de leña',
        titleEn: 'Meet & brick oven stoking',
        descriptionEs: 'Explicación del tipo de leña de café y temperatura adecuada del horno.',
        descriptionEn: 'Learn about coffee wood ember heating and oven temperature control.'
      },
      {
        time: '14:45',
        titleEs: 'Mezcla y batido tradicional de ingredientes',
        titleEn: 'Batter mixing with aged cheese',
        descriptionEs: 'Rallado del queso duro-blando, integración de cremas y vertido en moldes metálicos.',
        descriptionEn: 'Grate local cheese, fold in fresh cream, and pour into baking pans.'
      },
      {
        time: '15:45',
        titleEs: 'Horneado y elaboración del atol',
        titleEn: 'Baking & sweetcorn atol preparation',
        descriptionEs: 'Introducción al horno con pala de madera mientras se cuece el atol de elote.',
        descriptionEn: 'Slide pans into the embers while stirring fresh sweetcorn atol.'
      },
      {
        time: '16:45',
        titleEs: 'Degustación calientita al atardecer',
        titleEn: 'Fresh warm tasting & coffee',
        descriptionEs: 'Probar la quesadilla dorada y crujiente recién salida del fuego.',
        descriptionEn: 'Cut into golden crusted warm quesadilla with fresh coffee.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 23,
    isLocalExperience: true,
    localCategory: 'cocina_tradicional'
  },
  {
    id: 'exp-mercado-juayua',
    slug: 'mercado-tradicional-antojitos-juayua',
    titleEs: 'Ruta de Sabores en el Mercado Tradicional y Festival de Juayúa',
    titleEn: 'Juayúa Market Flavors & Culinary Weekend Street Food Walk',
    shortDescriptionEs: 'Degusta cortes a la parrilla, tamales de elote, riguas con cuajada y postres tradicionales en el epicentro gastronómico del occidente.',
    shortDescriptionEn: 'Sample grilled meats, fresh sweetcorn riguas with fresh cheese, and heritage desserts in Juayúa’s lively culinary square.',
    descriptionEs: 'Juayúa es pionero del turismo gastronómico en El Salvador gracias a su icónico festival culinario de fin de semana. En este tour a pie recorreremos el bullicioso mercado municipal para conocer hierbas silvestres como el chipilín, frutas nativas y luego nos sumergiremos en los puestos gastronómicos donde cocineros locales preparan carnes a la brasa, conejos, chorizos criollos y riguas.',
    descriptionEn: 'Every week, the cobblestone streets around Juayúa’s church turn into an outdoor culinary celebration. Walk through the fresh produce market learning about indigenous wild herbs, tropical zapotes, and jocotes, followed by curated tastings at family food stands serving charcoal-grilled specialties, traditional corn cakes, and handmade sweets.',
    category: 'gastronomia',
    region: 'Occidente',
    location: 'Juayúa, Sonsonate',
    department: 'Sonsonate',
    coordinates: { lat: 13.8419, lng: -89.7469 },
    meetingPointEs: 'Atrio de la Iglesia Santa Lucía, Juayúa',
    meetingPointEn: 'Santa Lucía Church steps, Juayúa',
    price: 30,
    currency: 'USD',
    priceRange: 'economico',
    duration: '2.5 horas',
    durationHours: 2.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 12,
    images: ${JSON.stringify(getMedia('juayua').images.slice(0, 5))},
    imageCredits: ${JSON.stringify(getMedia('juayua').credits.slice(0, 5))},
    includedEs: [
      'Guía gastrónomo local de Juayúa',
      'Paseo guiado por el mercado campesino y puestos de especias',
      'Degustación de 3 bocadillos tradicionales (rigua con queso, tamal de elote y dulce artesanal)',
      'Bebida refrescante de chilate o fresco de ensalada'
    ],
    includedEn: [
      'Local culinary guide from Juayúa',
      'Guided walk through farmers market and spice stalls',
      'Tastings of 3 heritage bites (sweetcorn rigua, tamal, and handmade sweet)',
      'Chilled chopped fruit drink or traditional warm chilate'
    ],
    notIncludedEs: [
      'Almuerzo formal completo de plato fuerte',
      'Transporte interdepartamental'
    ],
    notIncludedEn: [
      'Full sit-down restaurant main course',
      'Inter-city transit'
    ],
    requirementsEs: [
      'Calzado cómodo para caminar entre puestos peatonales'
    ],
    requirementsEn: [
      'Comfortable walking shoes'
    ],
    itinerary: [
      {
        time: '11:00',
        titleEs: 'Encuentro e introducción en la plaza',
        titleEn: 'Meet at church square',
        descriptionEs: 'Historia del festival gastronómico fundado en 1997.',
        descriptionEn: 'Introduction to Juayúa’s culinary pioneering history.'
      },
      {
        time: '11:30',
        titleEs: 'Recorrido por el mercado municipal',
        titleEn: 'Municipal farmers market walk',
        descriptionEs: 'Conoce tubérculos locales, chiles y queso artesanal de capas.',
        descriptionEn: 'Learn about indigenous herbs, chili varieties, and fresh layered cheeses.'
      },
      {
        time: '12:30',
        titleEs: 'Degustación de antojitos callejeros',
        titleEn: 'Street food sampling circuit',
        descriptionEs: 'Paradas en puestos seleccionados de familias cocineras de tradición.',
        descriptionEn: 'Sample fresh sweetcorn riguas and fruit drinks at vetted family stalls.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.8,
    demoReviewsCount: 28,
    isLocalExperience: true,
    localCategory: 'gastronomia_local'
  },
  {
    id: 'exp-alfareria-guatajiagua',
    slug: 'alfareria-negra-ancestral-guatajiagua',
    titleEs: 'Alfarería Negra Ancestral con Tinte de Nacascolo en Guatajiagua',
    titleEn: 'Ancestral Black Clay Pottery & Nacascolo Dye in Guatajiagua',
    shortDescriptionEs: 'Modela el barro a mano y descubre la técnica lenca prehispánica que tiñe las piezas de un negro brillante con la semilla de nacascolo.',
    shortDescriptionEn: 'Shape clay alongside indigenous Lenca potters and witness the pre-Hispanic organic black dyeing process.',
    descriptionEs: 'En el pueblo de Guatajiagua, Morazán, la comunidad preserva viva una técnica alfarera única en Mesoamérica: la alfarería negra lenca. Sin utilizar tornos eléctricos ni esmaltes químicos, las artesanas moldean comales, ollas y figuras únicamente con sus manos y piedras pulidoras de río. El color negro característico se logra al extraer la pieza al rojo vivo del horno y bañarla de inmediato con infusión de la vaina del árbol de nacascolo.',
    descriptionEn: 'In Guatajiagua in eastern Morazán, indigenous Lenca artisans preserve one of Mesoamerica’s oldest ceramic traditions. Crafted entirely without potter’s wheels, vessels are smoothed using river stones. When removed red-hot from outdoor wood kilns, they are plunged into natural dye extracted from the nacascolo seedpod, producing a lustrous, durable black finish.',
    category: 'gastronomia',
    region: 'Oriente',
    location: 'Guatajiagua, Morazán',
    department: 'Morazán',
    coordinates: { lat: 13.6833, lng: -88.1833 },
    meetingPointEs: 'Casa de la Cultura y Taller Comunitario de Guatajiagua',
    meetingPointEn: 'House of Culture & Community Pottery Studio, Guatajiagua',
    price: 40,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3.5 horas',
    durationHours: 3.5,
    durationType: 'hours',
    availabilityStatus: 'disponible_inmediato',
    difficulty: 'facil',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 1,
    maxPeople: 8,
    images: ${JSON.stringify(getMedia('perquin').images.slice(0, 4))},
    imageCredits: ${JSON.stringify(getMedia('perquin').credits.slice(0, 4))},
    includedEs: [
      'Maestra alfarera de la comunidad indígena de Guatajiagua',
      'Materiales de barro natural y herramientas tradicionales',
      'Taller práctico de modelado donde creas tu propia pieza',
      'Demostración del teñido con infusión de semilla de nacascolo',
      'Refrigerio campesino con fruta y bebida tradicional'
    ],
    includedEn: [
      'Master potter from the local indigenous collective',
      'Natural clay clay bodies and traditional smoothing river stones',
      'Hands-on shaping workshop creating your own ceramic piece',
      'Live demonstration of the organic nacascolo pod dye bath',
      'Homestyle snack and local drink'
    ],
    notIncludedEs: [
      'Transporte hasta Guatajiagua / Morazán'
    ],
    notIncludedEn: [
      'Transit to Guatajiagua'
    ],
    requirementsEs: [
      'Ropa que se pueda manchar con arcilla natural (fácil de lavar)'
    ],
    requirementsEn: [
      'Casual clothing you don’t mind getting clay dust on'
    ],
    itinerary: [
      {
        time: '09:30',
        titleEs: 'Bienvenida en el taller comunitario',
        titleEn: 'Meet at community artisan studio',
        descriptionEs: 'Historia de la tradición lenca y preparación de la arcilla local.',
        descriptionEn: 'Introduction to Lenca pottery heritage and natural clay processing.'
      },
      {
        time: '10:15',
        titleEs: 'Modelado manual y pulido con piedra',
        titleEn: 'Hand-shaping & river stone polishing',
        descriptionEs: 'Técnica de rollo y alisado con agua creando un comalito o cuenco tradicional.',
        descriptionEn: 'Learn pinch and coil methods, polishing surfaces with river pebbles.'
      },
      {
        time: '11:45',
        titleEs: 'Demostración del teñido al rojo vivo con nacascolo',
        titleEn: 'Kiln firing & nacascolo black dye dunk',
        descriptionEs: 'Extracción de piezas calientes y reacción química natural con el extracto vegetal.',
        descriptionEn: 'Watch hot fired pieces bathed in natural nacascolo tannin extract turning jet black.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 15,
    isLocalExperience: true,
    localCategory: 'artesanias',
    hostStory: {
      name: 'Asociación de Mujeres Alfareras de Guatajiagua',
      community: 'Guatajiagua, Morazán',
      storyEs: 'Comunidad de mujeres herederas del conocimiento milenario del barro negro lenca, que sostienen a sus familias a través de piezas utilitarias y decorativas libres de químicos.',
      storyEn: 'Indigenous women preserving the millennium-old Lenca black pottery tradition, sustaining rural households through chemical-free craft.',
      impactEs: 'Preserva una técnica precolombina en riesgo de extinción y aporta ingresos directos a mujeres cabeza de hogar.',
      impactEn: 'Preserves an endangered pre-Hispanic pottery method while delivering direct earnings to women heads of household.'
    }
  },

  // ==========================================
  // ESCAPADAS Y PAQUETES COMPLETOS (Section 4)
  // ==========================================
  {
    id: 'pkg-fin-de-semana-flores',
    slug: 'paquete-fin-de-semana-ruta-de-las-flores-termales',
    titleEs: 'Paquete Fin de Semana: Montañas, Pueblos Vivos & Termales (2 Días / 1 Noche)',
    titleEn: 'Weekend Mountain Getaway: Ruta de las Flores & Geothermal Springs (2D / 1N)',
    shortDescriptionEs: 'Una escapada completa con transporte turístico, guía certificado, pueblos coloniales, cata de café y relajación en aguas termales.',
    shortDescriptionEn: 'A curated 2-day highland package featuring private touring transport, certified guide, coffee cupping, and natural hot springs.',
    descriptionEs: 'Diseñado para quienes buscan desconectar de la rutina y sumergirse en la frescura de la cordillera occidental. Este paquete coordinado por GIA Experiences combina transporte turístico cómodo, paradas en Salcoatitán, Juayúa, Apaneca y Ataco, visita a una finca de café de altura, cena campestre y una velada de relajación en las pozas de aguas termales naturales de Santa Teresa.',
    descriptionEn: 'Designed for travelers craving fresh mountain air and charming colonial architecture without the hassle of planning logistics. This organized weekend getaway packages private tourist transit, certified guidance across 4 picturesque highland villages, specialty coffee cupping, and a tranquil evening soak in natural geothermal volcanic springs.',
    category: 'paquetes',
    region: 'Occidente',
    location: 'Ruta de las Flores (Ahuachapán y Sonsonate)',
    department: 'Ahuachapán',
    coordinates: { lat: 13.8667, lng: -89.8000 },
    meetingPointEs: 'Punto de encuentro central en San Salvador (Pick-up coordinado en hotel) o inicio en Juayúa',
    meetingPointEn: 'Central San Salvador hotel pickup or meet in Juayúa',
    price: 185,
    currency: 'USD',
    priceRange: 'premium',
    duration: '2 días / 1 noche',
    durationHours: 32,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'facil',
    isPackage: true,
    packageDays: 2,
    packageServices: {
      transportIncluded: true,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: true,
      communityVisit: true
    },
    proposalNoteEs: 'Propuesta de paquete turístico todo incluido. El alojamiento se cotiza en hotel boutique o posada de montaña asociada según categoría preferida.',
    proposalNoteEn: 'Custom all-inclusive package proposal. Lodging coordinated with vetted partner mountain lodges based on guest tier preference.',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: [
      ...${JSON.stringify(getMedia('ruta_flores').images.slice(0, 3))},
      ...${JSON.stringify(getMedia('apaneca').images.slice(0, 2))}
    ],
    imageCredits: [
      ...${JSON.stringify(getMedia('ruta_flores').credits.slice(0, 3))},
      ...${JSON.stringify(getMedia('apaneca').credits.slice(0, 2))}
    ],
    includedEs: [
      'Transporte turístico privado con aire acondicionado durante los 2 días completos',
      '1 noche de hospedaje en hotel boutique o posada campestre en la zona (habitación doble)',
      'Guía turístico bilingüe acreditado acompañando todo el itinerario',
      'Alimentación: 1 desayuno de montaña, 2 almuerzos tradicionales y 1 cena campestre',
      'Entradas oficiales a Termales de Santa Teresa y Laberinto de Albania',
      'Taller y degustación de café de especialidad Pacamara'
    ],
    includedEn: [
      'Private air-conditioned tourist vehicle with professional driver for 2 full days',
      '1 night lodging at a vetted highland boutique hotel (double occupancy)',
      'Certified bilingual guide accompanying the entire circuit',
      'Meals: 1 highland breakfast, 2 traditional lunches, 1 dinner',
      'Official admissions to Santa Teresa Thermal Springs and Albania Green Maze',
      'Pacamara specialty coffee cupping workshop'
    ],
    notIncludedEs: [
      'Bebidas alcohólicas no detalladas en el menú',
      'Gastos personales en tiendas artesanales'
    ],
    notIncludedEn: [
      'Extra alcoholic beverages not on set menu',
      'Personal souvenir shopping'
    ],
    requirementsEs: [
      'Ropa casual cómoda y calzado apto para caminar',
      'Traje de baño para las aguas termales',
      'Abrigo para la noche fresca de montaña'
    ],
    requirementsEn: [
      'Comfortable walking clothes and shoes',
      'Swimwear for thermal pools',
      'Fleece or jacket for cool highland evenings'
    ],
    itinerary: [
      {
        time: 'Día 1 - 08:00',
        titleEs: 'Salida hacia la cordillera y Salcoatitán',
        titleEn: 'Day 1: Departure towards the mountain belt',
        descriptionEs: 'Pick-up en transporte privado y primera parada en Salcoatitán para degustar antojitos de yuca.',
        descriptionEn: 'Private shuttle pickup and first stop in Salcoatitán for traditional yucca treats.'
      },
      {
        time: 'Día 1 - 11:00',
        titleEs: 'Apaneca: Finca de café y Laberinto de Albania',
        titleEn: 'Day 1: Coffee finca walk & Albania green maze',
        descriptionEs: 'Recorrido entre cafetos de sombra y desafío lúdico en el laberinto de cipreses.',
        descriptionEn: 'Tour shade-grown coffee trees followed by the cypress maze challenge.'
      },
      {
        time: 'Día 1 - 17:30',
        titleEs: 'Check-in y relajación en aguas termales de Santa Teresa',
        titleEn: 'Day 1: Thermal springs evening soak',
        descriptionEs: 'Baño nocturno en pozas minerales calientes ricas en azufre natural y cena típica.',
        descriptionEn: 'Evening soak in volcanic mineral pools under the stars followed by local dinner.'
      },
      {
        time: 'Día 2 - 08:30',
        titleEs: 'Desayuno y paseo colonial por Ataco',
        titleEn: 'Day 2: Breakfast & Ataco mural stroll',
        descriptionEs: 'Visita a los murales artísticos y talleres de telares de madera.',
        descriptionEn: 'Morning walk through mural streets and historic textile workshops.'
      },
      {
        time: 'Día 2 - 13:00',
        titleEs: 'Almuerzo en Juayúa y retorno panorámico',
        titleEn: 'Day 2: Juayúa market lunch & return',
        descriptionEs: 'Almuerzo tradicional en Juayúa antes de emprender el viaje de regreso.',
        descriptionEn: 'Traditional highland lunch before our scenic afternoon drive back.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 29
  },
  {
    id: 'pkg-surf-costa',
    slug: 'paquete-surf-and-relax-el-tunco-el-zonte',
    titleEs: 'Paquete Costa & Surf: Surf Camp & Sunset Sessions (3 Días / 2 Noches)',
    titleEn: 'Surf & Coast Package: Surf Camp & Sunset Sessions (3D / 2N)',
    shortDescriptionEs: 'Sumérgete en la cultura de Surf City con alojamiento frente a la playa, 3 clínicas de surf personalizadas y traslados privados.',
    shortDescriptionEn: 'Live the authentic Surf City lifestyle with beachfront lodging, 3 coached surf clinics, and private ocean transfers.',
    descriptionEs: 'El Salvador posee algunas de las olas más consistentes y amigables del planeta. Este paquete de 3 días está diseñado tanto para quienes sueñan con pararse en su primera ola como para surfistas intermedios que buscan perfeccionar su estilo en rompientes legendarias como El Tunco, El Sunzal y El Zonte, acompañados por entrenadores certificados y fotógrafo de acción.',
    descriptionEn: 'El Salvador’s warm Pacific waves are legendary. This 3-day surf camp package brings together beachfront accommodation, 3 coached sessions tailored to your skill level, board rentals, ocean safety theory, video/photo analysis, and visits to coastal sunset spots in El Tunco and El Zonte.',
    category: 'paquetes',
    region: 'Costa Pacífico',
    location: 'Surf City: El Tunco & El Zonte, La Libertad',
    department: 'La Libertad',
    coordinates: { lat: 13.4939, lng: -89.3842 },
    meetingPointEs: 'Recepción en aeropuerto o pick-up en hotel en San Salvador',
    meetingPointEn: 'Airport arrival pickup or San Salvador hotel transfer',
    price: 295,
    currency: 'USD',
    priceRange: 'premium',
    duration: '3 días / 2 noches',
    durationHours: 54,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'moderado',
    isPackage: true,
    packageDays: 3,
    packageServices: {
      transportIncluded: true,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: false,
      communityVisit: true
    },
    proposalNoteEs: 'Propuesta de Surf Camp personalizable según nivel de surf y tipo de alojamiento (hotel frente a la playa o lodge ecológico).',
    proposalNoteEn: 'Customizable surf package tailored to surfer experience level and chosen lodge category.',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'grupos'],
    minPeople: 1,
    maxPeople: 6,
    images: [
      ...${JSON.stringify(getMedia('el_tunco').images.slice(0, 3))},
      ...${JSON.stringify(getMedia('el_zonte').images.slice(0, 3))}
    ],
    imageCredits: [
      ...${JSON.stringify(getMedia('el_tunco').credits.slice(0, 3))},
      ...${JSON.stringify(getMedia('el_zonte').credits.slice(0, 3))}
    ],
    includedEs: [
      'Traslado privado ida y vuelta (Aeropuerto/San Salvador - La Libertad)',
      '2 noches de alojamiento en hotel de playa seleccionado con piscina y A/C',
      '3 clases o clínicas de surf personalizadas (2 horas por sesión) con instructor certificado',
      'Uso ilimitado de tabla de surf y licra durante los 3 días completos',
      'Desayunos saludables diarios incluidos',
      'Paquete digital de fotos y video de tus mejores olas'
    ],
    includedEn: [
      'Round-trip private shuttle (Airport/San Salvador - Beachfront)',
      '2 nights lodging at a vetted beach lodge with pool and AC',
      '3 coached surf clinics (2 hours each) with certified local coach',
      'Unlimited surfboard and rashguard gear use for the 3 days',
      'Daily energizing coastal breakfasts',
      'Digital action photo and video package of your waves'
    ],
    notIncludedEs: [
      'Almuerzos y cenas (tiempo libre para explorar restaurantes locales)',
      'Propinas a instructores'
    ],
    notIncludedEn: [
      'Lunches and dinners (open dining across town)',
      'Gratuities for surf coaches'
    ],
    requirementsEs: [
      'Saber nadar en piscina o mar abierto',
      'Traje de baño o shorts de baño y protector solar mineral'
    ],
    requirementsEn: [
      'Basic swimming ability',
      'Swimwear and reef-safe mineral sunscreen'
    ],
    itinerary: [
      {
        time: 'Día 1 - 14:00',
        titleEs: 'Llegada a El Tunco, check-in y primera sesión de marea baja',
        titleEn: 'Day 1: Arrival, check-in & afternoon surf session',
        descriptionEs: 'Ajuste de tabla según tu nivel, calentamiento en arena y primera entrada al agua al atardecer.',
        descriptionEn: 'Board matching, sand pop-up fundamentals, and sunset session in warm water.'
      },
      {
        time: 'Día 2 - 07:00',
        titleEs: 'Sesión matutina en El Sunzal y corrección de postura',
        titleEn: 'Day 2: Early morning session & video review',
        descriptionEs: 'Olas suaves y largas con análisis fotográfico para mejorar balance y virajes.',
        descriptionEn: 'Catch clean morning rights followed by video breakdown of your pop-up.'
      },
      {
        time: 'Día 2 - 16:00',
        titleEs: 'Escapada a cuevas de El Zonte y puesta de sol',
        titleEn: 'Day 2: El Zonte sea caves & golden hour',
        descriptionEs: 'Visita guiada a El Zonte para explorar sus cuevas y disfrutar de café helado frente al mar.',
        descriptionEn: 'Short drive to explore El Zonte’s sea caverns and coastal sunset vibe.'
      },
      {
        time: 'Día 3 - 07:30',
        titleEs: 'Tercera clínica de surf libre y entrega de fotos',
        titleEn: 'Day 3: Final coached session & media delivery',
        descriptionEs: 'Última sesión en el agua consolidando la técnica antes del check-out y traslado.',
        descriptionEn: 'Last ocean session putting skills into practice before check-out transfer.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 24
  },
  {
    id: 'pkg-circuito-esencial',
    slug: 'circuito-el-salvador-esencial-volcanes-pueblos-costa',
    titleEs: 'Circuito El Salvador Esencial: Volcanes, Pueblos Vivos & Pacífico (4 Días / 3 Noches)',
    titleEn: 'Essential El Salvador Grand Circuit: Volcanoes, Heritage & Pacific (4D / 3N)',
    shortDescriptionEs: 'El recorrido integral definitivo para conocer lo mejor del país: Volcán Santa Ana, Joya de Cerén, Suchitoto colonial y costa de La Libertad.',
    shortDescriptionEn: 'The definitive cross-country circuit: Santa Ana Volcano crater, UNESCO Maya ruins, colonial Suchitoto, and Pacific coast.',
    descriptionEs: 'Un viaje completo diseñado para viajeros nacionales e internacionales que desean experimentar la diversidad condensada de El Salvador sin preocuparse por la logística de traslados ni horarios. Acompañado por un guía privado, ascenderás al cráter turquesa de Santa Ana, descenderás a la aldea maya de Joya de Cerén, teñirás textiles en añil en Suchitoto y culminarás relajándote frente a los atardeceres del Pacífico.',
    descriptionEn: 'The signature showcase circuit designed to experience El Salvador’s extraordinary geographical and cultural richness in 4 well-orchestrated days. From the emerald volcanic caldera of Ilamatepec and UNESCO-listed Joya de Cerén to colonial Suchitoto and Pacific black sand beaches, this journey provides a seamless, immersive travel experience.',
    category: 'paquetes',
    region: 'Centro',
    location: 'Santa Ana, Suchitoto y La Libertad',
    department: 'San Salvador',
    coordinates: { lat: 13.6989, lng: -89.1914 },
    meetingPointEs: 'Aeropuerto Internacional San Óscar Arnulfo Romero o hotel en San Salvador',
    meetingPointEn: 'San Salvador International Airport or downtown hotel pickup',
    price: 460,
    currency: 'USD',
    priceRange: 'premium',
    duration: '4 días / 3 noches',
    durationHours: 76,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'moderado',
    isPackage: true,
    packageDays: 4,
    packageServices: {
      transportIncluded: true,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: true,
      communityVisit: true
    },
    proposalNoteEs: 'Propuesta de circuito turístico integral. Los hoteles y opciones de alimentación se adaptan al perfil del viajero (hoteles boutique o estándar turístico superior).',
    proposalNoteEn: 'Curated signature tour package. Hotels and meals customized to traveler preferences.',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: [
      ...${JSON.stringify(getMedia('santa_ana').images.slice(0, 2))},
      ...${JSON.stringify(getMedia('suchitoto').images.slice(0, 2))},
      ...${JSON.stringify(getMedia('el_tunco').images.slice(0, 2))}
    ],
    imageCredits: [
      ...${JSON.stringify(getMedia('santa_ana').credits.slice(0, 2))},
      ...${JSON.stringify(getMedia('suchitoto').credits.slice(0, 2))},
      ...${JSON.stringify(getMedia('el_tunco').credits.slice(0, 2))}
    ],
    includedEs: [
      'Transporte turístico privado con conductor profesional durante los 4 días completos',
      '3 noches de hospedaje con desayunos (1 noche en Santa Ana, 1 noche en Suchitoto, 1 noche en La Libertad)',
      'Guía turístico privado bilingüe acreditado para todo el circuito',
      'Todas las entradas a parques nacionales (Volcanes, Joya de Cerén, Palacio Nacional)',
      'Taller privado de añil en Suchitoto con bufanda conmemorativa',
      'Almuerzos típicos incluidos en cada jornada'
    ],
    includedEn: [
      'Private air-conditioned touring vehicle with dedicated driver for 4 days',
      '3 nights accommodation with breakfasts (1 night Santa Ana, 1 night Suchitoto, 1 night Beach)',
      'Accredited private bilingual tour leader throughout the trip',
      'All national park and monument entrance permits (Los Volcanes, Joya de Cerén, National Palace)',
      'Hands-on indigo workshop in Suchitoto with keepsake cotton scarf',
      'Curated daily traditional lunches'
    ],
    notIncludedEs: [
      'Cenas (tiempo libre para disfrutar la oferta nocturna de cada destino)',
      'Vuelos internacionales o seguros médicos de viaje'
    ],
    notIncludedEn: [
      'Dinners (freedom to sample evening restaurant scenes)',
      'International airfare or medical travel insurance'
    ],
    requirementsEs: [
      'Pasaporte vigente para visitantes internacionales',
      'Calzado de caminata y ropa tanto para clima fresco de montaña como para playa caliente'
    ],
    requirementsEn: [
      'Valid passport for international visitors',
      'Hiking shoes and apparel for both cool mountain peaks and warm tropical coast'
    ],
    itinerary: [
      {
        time: 'Día 1',
        titleEs: 'Centro Histórico de San Salvador y Joya de Cerén',
        titleEn: 'Day 1: Historic San Salvador & UNESCO Joya de Cerén',
        descriptionEs: 'Recorrido por el Palacio Nacional, Iglesia El Rosario y traslado a las ruinas mayas congeladas en ceniza. Noche en Santa Ana.',
        descriptionEn: 'Explore downtown architecture and UNESCO-listed Maya structures. Overnight in Santa Ana.'
      },
      {
        time: 'Día 2',
        titleEs: 'Ascenso al Volcán Santa Ana y Lago de Coatepeque',
        titleEn: 'Day 2: Santa Ana Volcano Crater & Lake Coatepeque',
        descriptionEs: 'Caminata matutina al cráter esmeralda y almuerzo con vista panorámica a la caldera lacustre. Noche en Suchitoto.',
        descriptionEn: 'Hike to the turquoise volcanic sulfur crater followed by lakefront lunch. Overnight in Suchitoto.'
      },
      {
        time: 'Día 3',
        titleEs: 'Suchitoto colonial, taller de añil y traslado a la costa',
        titleEn: 'Day 3: Colonial Suchitoto, indigo dyeing & Pacific transfer',
        descriptionEs: 'Caminata por calles empedradas, taller del oro azul y viaje escénico hacia la costa de Surf City. Noche en la playa.',
        descriptionEn: 'Cobblestone architecture, natural blue dye class, and scenic drive to the Pacific. Overnight at the beach.'
      },
      {
        time: 'Día 4',
        titleEs: 'Mañana de playa, ceviche en el muelle y despedida',
        titleEn: 'Day 4: Pacific morning, coastal seafood & airport transfer',
        descriptionEs: 'Tiempo para caminar por la arena, visita al Muelle de La Libertad y traslado de salida.',
        descriptionEn: 'Relax by the ocean, visit the historic fishing pier, and final transfer to airport or city.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 37
  },
  {
    id: 'pkg-romantico-coatepeque',
    slug: 'escapada-romantica-coatepeque-sunset-cabana',
    titleEs: 'Escapada Romántica en Pareja: Sunset Privado en Lago Coatepeque & Cabaña Panorámica (2 Días / 1 Noche)',
    titleEn: 'Romantic Couples Getaway: Private Coatepeque Sunset Cruise & Scenic Lodge (2D / 1N)',
    shortDescriptionEs: 'Un fin de semana íntimo: navegación privada al atardecer, cena gourmet frente al agua y hospedaje boutique con vista al volcán.',
    shortDescriptionEn: 'An intimate couples retreat: private golden-hour boat cruise, waterfront dining, and boutique lake lodge stay.',
    descriptionEs: 'Diseñado para aniversarios, lunas de miel o celebraciones en pareja. Esta experiencia premium te invita a disfrutar la serenidad del Lago de Coatepeque con absoluta privacidad. Incluye un crucero privado al atardecer en pontón o lancha clásica con tabla de quesos y vino, cena a la luz de las velas junto al agua y noche en una cabaña de madera con balcón panorámico hacia la caldera volcánica.',
    descriptionEn: 'Tailored for couples seeking a peaceful, romantic sanctuary. Sail the turquoise waters of Lake Coatepeque on a private sunset cruise complete with artisan cheese board and chilled wine. Indulge in a candlelit lakefront dinner, followed by an overnight stay at a boutique eco-lodge offering uninterrupted views of Santa Ana volcano.',
    category: 'paquetes',
    region: 'Occidente',
    location: 'Lago de Coatepeque, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.8697, lng: -89.5539 },
    meetingPointEs: 'Eco-Resort Ribera del Lago de Coatepeque (coordinación previa)',
    meetingPointEn: 'Lake Coatepeque Waterfront Eco-Resort',
    price: 240,
    currency: 'USD',
    priceRange: 'premium',
    duration: '2 días / 1 noche',
    durationHours: 26,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'facil',
    isPackage: true,
    packageDays: 2,
    packageServices: {
      transportIncluded: false,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: true,
      communityVisit: false
    },
    proposalNoteEs: 'Propuesta de escapada romántica para parejas. El tipo de cabaña o suite se confirma según disponibilidad de los lodges boutique del lago.',
    proposalNoteEn: 'Couples getaway proposal. Cabin or suite category confirmed based on boutique partner lodge availability.',
    languages: ['ES', 'EN'],
    groupType: ['parejas'],
    minPeople: 2,
    maxPeople: 2,
    images: ${JSON.stringify(getMedia('coatepeque').images.slice(0, 5))},
    imageCredits: ${JSON.stringify(getMedia('coatepeque').credits.slice(0, 5))},
    includedEs: [
      '1 noche de hospedaje en cabaña o suite boutique con vista al lago y cama King',
      'Paseo privado en lancha/pontón al atardecer (1.5 horas) exclusivo para la pareja',
      'Tabla de quesos artesanales salvadoreños, frutas y botella de vino seleccionada',
      'Cena romántica de 3 tiempos servida en terraza privada junto al lago',
      'Desayuno a la carta con café de especialidad servido en el balcón'
    ],
    includedEn: [
      '1 night lodging in a boutique lakefront cabin/suite with panoramic king bed',
      '1.5-hour private sunset pontoon boat cruise exclusive to the couple',
      'Artisan local cheese platter, fresh fruits, and curated bottle of wine',
      '3-course candlelit dinner served on a private waterfront terrace',
      'A la carte breakfast with specialty coffee served on your balcony'
    ],
    notIncludedEs: [
      'Transporte terrestre hasta el Lago de Coatepeque (se puede añadir como extra)',
      'Bebidas alcohólicas adicionales'
    ],
    notIncludedEn: [
      'Ground transit to Lake Coatepeque (available as an optional add-on)',
      'Additional cocktails or alcoholic beverages'
    ],
    requirementsEs: [
      'Informar preferencias dietéticas y detalles de la celebración con anticipación'
    ],
    requirementsEn: [
      'Inform dietary preferences or celebration details in advance'
    ],
    itinerary: [
      {
        time: 'Día 1 - 15:00',
        titleEs: 'Check-in y bienvenida con cóctel en la cabaña',
        titleEn: 'Day 1: Check-in & welcome cocktail',
        descriptionEs: 'Llegada al resort lacustre y acomodación en la suite panorámica.',
        descriptionEn: 'Arrive at the lake lodge and settle into your panoramic suite.'
      },
      {
        time: 'Día 1 - 16:30',
        titleEs: 'Crucero privado de atardecer y brindis',
        titleEn: 'Day 1: Private sunset boat cruise',
        descriptionEs: 'Navegación lenta por las ensenadas del lago volcánico con vino y tabla de quesos.',
        descriptionEn: 'Glide across caldera waters with wine and snacks as the sky turns gold.'
      },
      {
        time: 'Día 1 - 19:30',
        titleEs: 'Cena a la luz de las velas',
        titleEn: 'Day 1: Candlelit waterfront dinner',
        descriptionEs: 'Cena romántica de tres tiempos en muelle privado bajo las estrellas.',
        descriptionEn: '3-course intimate dinner on a private dock under mountain stars.'
      },
      {
        time: 'Día 2 - 08:30',
        titleEs: 'Desayuno en el balcón y mañana de relax',
        titleEn: 'Day 2: Balcony breakfast & lazy morning',
        descriptionEs: 'Desayuno gourmet con vista a las aguas turquesas y tiempo para kayaks o piscina.',
        descriptionEn: 'Gourmet breakfast with caldera views, followed by paddleboards or pool.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 19
  },
  {
    id: 'pkg-familiar-eco',
    slug: 'eco-aventura-familiar-volcanes-cerro-verde-coatepeque',
    titleEs: 'Eco-Aventura Familiar: Volcanes, Senderos Lúdicos y Lago (3 Días / 2 Noches)',
    titleEn: 'Family Eco-Adventure: Volcanic Trails, Wildlife & Lake Fun (3D / 2N)',
    shortDescriptionEs: 'Un viaje seguro y entretenido para todas las edades: caminatas suaves en Cerro Verde, taller de chocolate y diversión náutica en Coatepeque.',
    shortDescriptionEn: 'A safe, fun multi-generation family trip: easy cloud forest walks, artisan chocolate workshop, and lake kayaking.',
    descriptionEs: 'Viajar en familia por El Salvador es una experiencia enriquecedora y segura. Este paquete está especialmente diseñado con ritmos adaptados para niños y adultos mayores, combinando actividades lúdicas al aire libre: observación de aves y volcanes en senderos accesibles de Cerro Verde, taller de elaboración de chocolate artesanal y una jornada divertida de kayaks y paseos en lancha en las tranquilas aguas de Coatepeque.',
    descriptionEn: 'Tailored for families with children or seniors, this relaxed 3-day itinerary balances light nature exploration with engaging hands-on cultural activities. Walk gentle trails with direct views of Izalco volcano, participate in a kid-friendly cacao and chocolate-making workshop, and swim or kayak in Lake Coatepeque with certified family safety equipment.',
    category: 'paquetes',
    region: 'Occidente',
    location: 'Cerro Verde & Lago de Coatepeque, Santa Ana',
    department: 'Santa Ana',
    coordinates: { lat: 13.8400, lng: -89.6000 },
    meetingPointEs: 'San Salvador (pick-up familiar en domicilio u hotel)',
    meetingPointEn: 'San Salvador hotel or private family residence pickup',
    price: 320,
    currency: 'USD',
    priceRange: 'medio',
    duration: '3 días / 2 noches',
    durationHours: 52,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'facil',
    isPackage: true,
    packageDays: 3,
    packageServices: {
      transportIncluded: true,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: true,
      communityVisit: true
    },
    proposalNoteEs: 'Propuesta de viaje familiar con adaptaciones para niños y adultos mayores. Se coordina en cabañas familiares o habitaciones comunicadas.',
    proposalNoteEn: 'Family-friendly package proposal with accommodations in adjoining family suites or private cabins.',
    languages: ['ES', 'EN'],
    groupType: ['familias', 'grupos'],
    minPeople: 3,
    maxPeople: 10,
    images: [
      ...${JSON.stringify(getMedia('cerro_verde').images.slice(0, 3))},
      ...${JSON.stringify(getMedia('coatepeque').images.slice(0, 3))}
    ],
    imageCredits: [
      ...${JSON.stringify(getMedia('cerro_verde').credits.slice(0, 3))},
      ...${JSON.stringify(getMedia('coatepeque').credits.slice(0, 3))}
    ],
    includedEs: [
      'Transporte turístico privado para todo el grupo familiar durante los 3 días',
      '2 noches de alojamiento en hotel familiar campestre con áreas verdes y piscina',
      'Guía turístico especializado en grupos familiares y dinamización lúdica',
      'Desayunos y almuerzos completos incluidos adaptados a gustos infantiles',
      'Taller interactivo de cacao y chocolate maya para toda la familia',
      'Paseo en lancha y uso de kayaks seguros con chalecos para todas las tallas'
    ],
    includedEn: [
      'Private air-conditioned family van transit with professional driver for 3 days',
      '2 nights in a family-friendly country lodge with gardens and pool',
      'Family-focused tour guide and activities coordinator',
      'Full breakfasts and family lunches with child-friendly menu options',
      'Hands-on ancestral cacao and chocolate molding workshop',
      'Safe lake boat cruise and kayak use with children life vests provided'
    ],
    notIncludedEs: [
      'Cenas (tiempo libre para cenar en los restaurantes del lago o pueblo)'
    ],
    notIncludedEn: [
      'Dinners (flexibility to dine at lakefront restaurants)'
    ],
    requirementsEs: [
      'Ropa cómoda para niños y adultos, protector solar y gorras',
      'Trajes de baño y calzado de repuesto'
    ],
    requirementsEn: [
      'Casual clothing, sun hats, and sunscreen',
      'Swimwear and extra dry clothes'
    ],
    itinerary: [
      {
        time: 'Día 1 - 09:00',
        titleEs: 'Salida hacia Cerro Verde y Sendero de las Flores',
        titleEn: 'Day 1: Drive to Cerro Verde & gentle nature trail',
        descriptionEs: 'Caminata suave de 45 minutos accesible para niños entre bosques de niebla y mirador de Izalco.',
        descriptionEn: '45-minute easy walk suitable for all ages with volcano viewpoints.'
      },
      {
        time: 'Día 1 - 13:00',
        titleEs: 'Almuerzo campestre y check-in en lodge del lago',
        titleEn: 'Day 1: Country lunch & lake lodge check-in',
        descriptionEs: 'Tiempo para descansar y nadar en la piscina del hotel.',
        descriptionEn: 'Time to settle in and enjoy the lodge pool and green lawns.'
      },
      {
        time: 'Día 2 - 10:00',
        titleEs: 'Taller de chocolate maya y degustación',
        titleEn: 'Day 2: Maya chocolate making class',
        descriptionEs: 'Los niños y adultos muelen semillas de cacao tostadas y moldean sus propias tabletas de chocolate.',
        descriptionEn: 'Kids and parents grind roasted cacao nibs and mold their own chocolate bars.'
      },
      {
        time: 'Día 2 - 15:30',
        titleEs: 'Paseo en lancha y pozas de aguas termales',
        titleEn: 'Day 2: Lake boat ride & thermal springs soak',
        descriptionEs: 'Navegación familiar segura por el lago de Coatepeque y baño en aguas cálidas.',
        descriptionEn: 'Relaxing lake cruise with a stop at natural warm water shoreline pools.'
      },
      {
        time: 'Día 3 - 10:00',
        titleEs: 'Mañana libre de juegos acuáticos y regreso',
        titleEn: 'Day 3: Water sports & afternoon return',
        descriptionEs: 'Paseos en kayak y paddleboard antes de disfrutar el almuerzo y regresar a casa.',
        descriptionEn: 'Morning lake swimming and lunch before the afternoon drive home.'
      }
    ],
    featured: false,
    active: true,
    demoRating: 4.9,
    demoReviewsCount: 21
  },
  {
    id: 'pkg-internacional-gran-tour',
    slug: 'gran-tour-internacional-tesoros-de-cuscatlan',
    titleEs: 'Gran Tour Internacional: Tesoros de Cuscatlán (5 Días / 4 Noches)',
    titleEn: 'Grand International Tour: Treasures of Cuscatlán (5D / 4N)',
    shortDescriptionEs: 'El circuito más completo de El Salvador: Joya de Cerén, Volcán Santa Ana, Ruta del Café, Suchitoto colonial y Surf City.',
    shortDescriptionEn: 'The definitive 5-day cultural and natural expedition covering UNESCO Maya sites, volcanoes, coffee culture, colonial towns, and Pacific waves.',
    descriptionEs: 'Diseñado específicamente para viajeros internacionales que visitan El Salvador por primera vez y desean un recorrido riguroso, cómodo y enriquecedor. Este circuito de 5 días abarca los cuatro pilares turísticos del país: arqueología maya prehispánica, imponentes paisajes volcánicos y lacustres, pueblos coloniales vivos con tradiciones centenarias de café y añil, y las legendarias costas del océano Pacífico.',
    descriptionEn: 'A high-touch 5-day expedition crafted for international explorers desiring a seamless journey across El Salvador. Experience the nation’s 4 cornerstone identities: ancient Maya civilizations preserved under volcanic ash, active volcanoes and volcanic lakes, vibrant living heritage towns, and warm Pacific surf breaks.',
    category: 'paquetes',
    region: 'Centro',
    location: 'Circuito Nacional Multidestino',
    department: 'San Salvador',
    coordinates: { lat: 13.6989, lng: -89.1914 },
    meetingPointEs: 'Aeropuerto Internacional de El Salvador (SAL) - Servicio de bienvenida en sala de llegadas',
    meetingPointEn: 'El Salvador International Airport (SAL) - VIP arrival hall greeting',
    price: 580,
    currency: 'USD',
    priceRange: 'premium',
    duration: '5 días / 4 noches',
    durationHours: 96,
    durationType: 'multi_day',
    availabilityStatus: 'propuesta_a_medida',
    difficulty: 'moderado',
    isPackage: true,
    packageDays: 5,
    packageServices: {
      transportIncluded: true,
      accommodationIncluded: true,
      mealsIncluded: true,
      guidesIncluded: true,
      ticketsIncluded: true,
      communityVisit: true
    },
    proposalNoteEs: 'Propuesta de circuito turístico receptivo internacional. Se confirma con hoteles asociados de 4 estrellas o posadas boutique patrimoniales según disponibilidad de fechas.',
    proposalNoteEn: 'International inbound travel proposal. Accommodations confirmed at vetted 4-star boutique or heritage partner hotels based on group travel dates.',
    languages: ['ES', 'EN'],
    groupType: ['individual', 'parejas', 'familias', 'grupos'],
    minPeople: 2,
    maxPeople: 12,
    images: [
      ...${JSON.stringify(getMedia('santa_ana').images.slice(0, 2))},
      ...${JSON.stringify(getMedia('suchitoto').images.slice(0, 2))},
      ...${JSON.stringify(getMedia('el_tunco').images.slice(0, 2))}
    ],
    imageCredits: [
      ...${JSON.stringify(getMedia('santa_ana').credits.slice(0, 2))},
      ...${JSON.stringify(getMedia('suchitoto').credits.slice(0, 2))},
      ...${JSON.stringify(getMedia('el_tunco').credits.slice(0, 2))}
    ],
    includedEs: [
      'Transporte turístico privado con chofer profesional y WiFi a bordo durante todo el itinerario',
      '4 noches de alojamiento con desayunos (1 noche en San Salvador, 1 noche en Santa Ana, 1 noche en Suchitoto, 1 noche en La Libertad)',
      'Guía turístico privado bilingüe acreditado por el Ministerio de Turismo durante los 5 días',
      'Todas las entradas y pases oficiales a parques arqueológicos y reservas naturales',
      'Almuerzos diarios en restaurantes de gastronomía típica y cocina costera seleccionados',
      'Taller privado de añil en Suchitoto y cata de café de especialidad en finca de altura'
    ],
    includedEn: [
      'Private air-conditioned coach with professional driver and onboard WiFi for the entire trip',
      '4 nights accommodation with breakfasts (San Salvador, Santa Ana, Suchitoto, Beach)',
      'Accredited private bilingual tour leader for the 5 days',
      'All admissions and national park permits included',
      'Curated daily lunches showcasing authentic Salvadoran gastronomy',
      'Private organic indigo workshop and highland specialty coffee cupping'
    ],
    notIncludedEs: [
      'Boleto aéreo internacional',
      'Cenas (tiempo libre para disfrutar restaurantes locales en cada destino)',
      'Seguro de viaje internacional'
    ],
    notIncludedEn: [
      'International flights',
      'Dinners (evening leisure to explore dining scene)',
      'International travel insurance'
    ],
    requirementsEs: [
      'Pasaporte vigente con al menos 6 meses de validez',
      'Ropa fresca y calzado de senderismo'
    ],
    requirementsEn: [
      'Valid passport with at least 6 months validity',
      'Casual breathable attire and comfortable hiking shoes'
    ],
    itinerary: [
      {
        time: 'Día 1',
        titleEs: 'Llegada, bienvenida y Centro Histórico de San Salvador',
        titleEn: 'Day 1: Arrival & Historic Downtown San Salvador',
        descriptionEs: 'Recepción en el aeropuerto, check-in en hotel y recorrido guiado por el Palacio Nacional, plazas históricas y café en terraza.',
        descriptionEn: 'Airport welcome, hotel check-in, and walking tour of the refurbished National Palace and historic squares.'
      },
      {
        time: 'Día 2',
        titleEs: 'Joya de Cerén (UNESCO), Tazumal y atardecer en Santa Ana',
        titleEn: 'Day 2: Maya Civilization: Joya de Cerén & Tazumal',
        descriptionEs: 'Exploración de la aldea maya preservada bajo ceniza y la gran pirámide de Tazumal. Noche en Santa Ana.',
        descriptionEn: 'Explore pre-Columbian domestic compounds frozen under tephra, followed by Tazumal acropolis. Overnight in Santa Ana.'
      },
      {
        time: 'Día 3',
        titleEs: 'Parque Nacional Los Volcanes y Lago de Coatepeque',
        titleEn: 'Day 3: Volcanoes National Park & Lake Coatepeque',
        descriptionEs: 'Senderismo con vistas al cráter de Santa Ana y cono de Izalco, almuerzo en el lago y traslado a Suchitoto. Noche en Suchitoto.',
        descriptionEn: 'Morning walk in Cerro Verde and volcanic overlooks, lakefront lunch, and drive to colonial Suchitoto. Overnight in Suchitoto.'
      },
      {
        time: 'Día 4',
        titleEs: 'Suchitoto colonial, taller de añil y traslado a Surf City',
        titleEn: 'Day 4: Suchitoto culture, indigo dyeing & Pacific coast',
        descriptionEs: 'Caminata entre casas señoriales, taller de teñido artesanal con oro azul y viaje escénico hacia el Pacífico. Noche en la playa.',
        descriptionEn: 'Heritage streets, hands-on organic indigo dyeing atelier, and scenic drive down to the Pacific coastline.'
      },
      {
        time: 'Día 5',
        titleEs: 'Mañana en el mar, Muelle de La Libertad y traslado al aeropuerto',
        titleEn: 'Day 5: Pacific beach relaxation & airport farewell',
        descriptionEs: 'Tiempo para disfrutar de las olas de El Tunco, visita al muelle pesquero de La Libertad y traslado al aeropuerto para vuelo de salida.',
        descriptionEn: 'Morning ocean stroll, visit to the historic fishing pier, and on-time private transfer to the international airport.'
      }
    ],
    featured: true,
    active: true,
    demoRating: 5.0,
    demoReviewsCount: 34
  }
];
`;

fs.writeFileSync('./src/data/experiences.ts', experiencesCode);
console.log('Successfully written 36 comprehensive experiences to ./src/data/experiences.ts');
