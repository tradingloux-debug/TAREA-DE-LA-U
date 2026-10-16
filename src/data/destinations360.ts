export type DestinationCategory = 'todos' | 'naturaleza' | 'playas' | 'cultura' | 'aventura';
export type DestinationViewMode = 'todos' | 'solo_360' | 'galeria_fotos';

export interface DestinationPhotoInfo {
  url: string;
  captionEs: string;
  captionEn: string;
  author: string;
  sourceUrl: string;
  license: string;
}

export interface Destination360 {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  departmentEs: string;
  departmentEn: string;
  category: 'naturaleza' | 'playas' | 'cultura' | 'aventura';
  shortDescEs: string;
  shortDescEn: string;
  fullDescEs: string;
  fullDescEn: string;
  hasReal360: boolean;
  panorama360Url?: string;
  coverImage: string;
  gallery: DestinationPhotoInfo[];
  sourceUrl: string;
  author: string;
  license: string;
  licenseDetails: string;
  commercialUseAllowed: boolean;
  status: '360_real' | 'galeria_documental';
  catalogSlug: string;
  catalogTitleEs: string;
  catalogTitleEn: string;
  highlightsEs: string[];
  highlightsEn: string[];
}

export const DESTINATIONS_360: Destination360[] = [
  // 1. VOLCÁN DE SANTA ANA (ILAMATEPEC) - 360 REAL
  {
    id: 'dest-santa-ana',
    slug: 'volcan-santa-ana',
    nameEs: 'Volcán de Santa Ana (Ilamatepec)',
    nameEn: 'Santa Ana Volcano (Ilamatepec)',
    departmentEs: 'Santa Ana',
    departmentEn: 'Santa Ana',
    category: 'naturaleza',
    shortDescEs: 'El volcán más alto de El Salvador (2,381 m) con su impactante cráter de aguas esmeralda sulfurosas.',
    shortDescEn: 'The highest volcano in El Salvador (2,381m) featuring a breathtaking turquoise crater lake.',
    fullDescEs: 'Ubicado en el Parque Nacional Los Volcanes, el volcán de Santa Ana o Ilamatepec es el coloso activo más imponente del país. Su cráter alberga una laguna verde esmeralda y ofrece vistas espectaculares del Lago de Coatepeque y el Volcán de Izalco.',
    fullDescEn: 'Located inside Los Volcanes National Park, Santa Ana or Ilamatepec is the nation’s highest active volcano. Its crater hosts a glowing turquoise sulfur lagoon with 360-degree vistas across Lake Coatepeque and Izalco Volcano.',
    hasReal360: true,
    panorama360Url: '/assets/panoramas/pano360_santa_ana_v2.jpg',
    coverImage: '/assets/destinations/santa_ana_1_santa_ana_volcano.usaf.c-130.1.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/santa_ana_1_santa_ana_volcano.usaf.c-130.1.jpg.jpg',
        captionEs: 'Vista aérea del cráter principal de Santa Ana',
        captionEn: 'Aerial view of Santa Ana primary summit crater',
        author: 'USAF / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Santa_Ana_volcano.usaf.c-130.1.jpg',
        license: 'Public Domain (US Gov)'
      },
      {
        url: '/assets/destinations/santa_ana_3_volcan_de_santa_ana_desde_cerro_verde_-_panoramio.jpg.jpg',
        captionEs: 'Silueta del coloso vista desde el mirador de Cerro Verde',
        captionEn: 'Silhouette of the giant seen from Cerro Verde lookout',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Volcan_de_Santa_Ana_desde_Cerro_Verde_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/santa_ana_4_volcan_izalco_desde_volcan_santa_ana_-_panoramio.jpg.jpg',
        captionEs: 'Perspectiva del cono de Izalco desde las faldas de Santa Ana',
        captionEn: 'Izalco volcano cone view from Santa Ana slopes',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Volcan_Izalco_desde_volcan_Santa_Ana_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Santa_Ana_Volcano',
    author: 'USAF & Colaboradores Wikimedia Commons',
    license: 'Public Domain / CC BY-SA 3.0',
    licenseDetails: 'Material fotográfico documental de uso libre con atribución comercial',
    commercialUseAllowed: true,
    status: '360_real',
    catalogSlug: 'senderismo-crater-volcan-santa-ana',
    catalogTitleEs: 'Senderismo al Cráter del Volcán de Santa Ana',
    catalogTitleEn: 'Santa Ana Volcano Crater Summit Hike',
    highlightsEs: ['Cráter con laguna esmeralda', 'Altitud 2,381 m s.n.m.', 'Vistas al Pacífico y Coatepeque'],
    highlightsEn: ['Emerald sulfur crater lake', 'Altitude 2,381 m', 'Views to Pacific & Coatepeque']
  },

  // 2. LAGO DE COATEPEQUE - 360 REAL
  {
    id: 'dest-coatepeque',
    slug: 'lago-coatepeque',
    nameEs: 'Lago de Coatepeque',
    nameEn: 'Lake Coatepeque',
    departmentEs: 'Santa Ana',
    departmentEn: 'Santa Ana',
    category: 'naturaleza',
    shortDescEs: 'Caldera volcánica milenaria con aguas cristalinas que cambian a tonos turquesas.',
    shortDescEn: 'Ancient volcanic caldera lake with clear waters that transform into vibrant turquoise.',
    fullDescEs: 'Coatepeque es uno de los lagos más hermosos de Centroamérica, situado en la caldera colapsada de un antiguo estrato-volcán. Sus aguas limpias permiten kayak, paddleboard y paseos en lancha con el cerro y volcanes en el horizonte.',
    fullDescEn: 'Coatepeque is recognized among Central America’s most stunning crater lakes. Formed in a collapsed volcanic caldera, it offers pristine conditions for kayaking, sailing, and admiring dramatic crater cliffs.',
    hasReal360: true,
    panorama360Url: '/assets/panoramas/pano360_coatepeque_v2.jpg',
    coverImage: '/assets/destinations/coatepeque_2_coatepeque_caldera.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/coatepeque_2_coatepeque_caldera.jpg.jpg',
        captionEs: 'Panorámica de la caldera volcánica de Coatepeque',
        captionEn: 'Panoramic view of Coatepeque volcanic caldera',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Coatepeque_caldera.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/coatepeque_3_teopan.jpg.jpg',
        captionEs: 'Isla Teopán en el corazón del lago',
        captionEn: 'Teopan Island in the lake heart',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Teopan.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/coatepeque_4_lago_de_coatepeque-el_salvador.jpg.jpg',
        captionEs: 'Orilla y tonalidades del agua de Coatepeque',
        captionEn: 'Shoreline and turquoise hue of Coatepeque waters',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lago_de_Coatepeque-El_Salvador.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Lake_Coatepeque',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0 / CC BY 2.0',
    licenseDetails: 'Fotografía documental bajo licencia Creative Commons comercial autorizada',
    commercialUseAllowed: true,
    status: '360_real',
    catalogSlug: 'kayak-aguas-termales-lago-coatepeque',
    catalogTitleEs: 'Expedición en Kayak y Aguas Termales en Lago de Coatepeque',
    catalogTitleEn: 'Coatepeque Volcanic Lake Kayak Expedition',
    highlightsEs: ['Caldera volcánica colapsada', 'Aguas termales en la orilla', 'Isla ceremonial Teopán'],
    highlightsEn: ['Collapsed volcanic caldera', 'Shoreline hot springs', 'Ancient Teopan Island']
  },

  // 3. PARQUE NACIONAL CERRO VERDE - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-cerro-verde',
    slug: 'cerro-verde',
    nameEs: 'Parque Nacional Cerro Verde',
    nameEn: 'Cerro Verde National Park',
    departmentEs: 'Santa Ana',
    departmentEn: 'Santa Ana',
    category: 'naturaleza',
    shortDescEs: 'Volcán extinto cubierto por un exuberante bosque nebuloso y miradores de primer nivel.',
    shortDescEn: 'Extinct volcano covered by dense cloud forest with first-class volcano viewpoints.',
    fullDescEs: 'Cerro Verde se eleva a 2,030 m s.n.m. y sirve como corazón del Complejo Los Volcanes. Sus senderos sombreados ofrecen avistamiento de aves endémicas y miradores frontales hacia el activo Izalco y el macizo de Santa Ana.',
    fullDescEn: 'Rising at 2,030 meters, Cerro Verde serves as the lush centerpiece of the Los Volcanes Complex. Shaded cloud-forest trails provide birdwatching and direct panoramic vistas to Izalco Volcano.',
    hasReal360: false,
    coverImage: '/assets/destinations/cerro_verde_1_volc_n_de_izalco.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/cerro_verde_1_volc_n_de_izalco.jpg.jpg',
        captionEs: 'Mirador frontal hacia el Volcán de Izalco desde Cerro Verde',
        captionEn: 'Frontal viewpoint to Izalco Volcano from Cerro Verde',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Volc%C3%A1n_de_Izalco.jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/cerro_verde_2_cerro_verde_national_park__el_salvador.jpg.jpg',
        captionEs: 'Bosque nebuloso y vegetación del parque nacional',
        captionEn: 'Cloud forest canopy in Cerro Verde National Park',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cerro_Verde_National_Park,_El_Salvador.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/cerro_verde_3_hotel_montana__cerro_verde_national_park__el_salvador.jp.jpg',
        captionEs: 'Histórico Hotel de Montaña y senderos interpretativos',
        captionEn: 'Historic Mountain Lodge and botanical interpretive trails',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hotel_Montana,_Cerro_Verde_National_Park.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Cerro_Verde_National_Park',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 4.0 / CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'senderismo-cerro-verde-mirador-izalco',
    catalogTitleEs: 'Ruta Cerro Verde y Miradores del Faro del Pacífico',
    catalogTitleEn: 'Cerro Verde Forest Trails & Izalco Lookout',
    highlightsEs: ['Bosque nebuloso de altura', 'Mirador directo a Izalco', 'Avistamiento de aves'],
    highlightsEn: ['High-altitude cloud forest', 'Direct Izalco volcano lookout', 'Endemic birding']
  },

  // 4. PLAYA EL TUNCO - 360 REAL
  {
    id: 'dest-el-tunco',
    slug: 'playa-el-tunco',
    nameEs: 'Playa El Tunco',
    nameEn: 'El Tunco Beach',
    departmentEs: 'La Libertad',
    departmentEn: 'La Libertad',
    category: 'playas',
    shortDescEs: 'La capital del surf salvadoreño con su icónica roca marina y atardeceres dorados.',
    shortDescEn: 'El Salvador’s world-renowned surf capital famous for its iconic sea stack rock and sunsets.',
    fullDescEs: 'Ubicada en Surf City La Libertad, El Tunco es famosa internacionalmente por su rompiente consistente para surfistas principiantes y avanzados, su vibrante malecón gastronómico y su formación rocosa distintiva sobre el Pacífico.',
    fullDescEn: 'Located at the heart of Surf City La Libertad, El Tunco is globally acclaimed for consistent surf breaks, seaside restaurants, lively culture, and dramatic volcanic rock formations bathed in golden Pacific sunsets.',
    hasReal360: true,
    panorama360Url: '/assets/panoramas/pano360_surf_tunco_v2.jpg',
    coverImage: '/assets/destinations/el_tunco_1_atardecer_en_el_tunco.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/el_tunco_1_atardecer_en_el_tunco.jpg.jpg',
        captionEs: 'Atardecer frente a la mítica roca de El Tunco',
        captionEn: 'Sunset in front of El Tunco iconic sea rock',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Atardecer_en_el_Tunco.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_tunco_3_bienvenidos_al_tunco.jpg.jpg',
        captionEs: 'Ambiente costero y acceso a la playa',
        captionEn: 'Coastal gateway and beach boardwalk in El Tunco',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bienvenidos_al_Tunco.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_tunco_4_turismo_en_el_tunco.jpg.jpg',
        captionEs: 'Oleaje del Pacífico salvadoreño',
        captionEn: 'Pacific surf swell on Salvadoran shoreline',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Turismo_en_el_Tunco.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Playa_El_Tunco',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental bajo licencia Creative Commons comercial autorizada',
    commercialUseAllowed: true,
    status: '360_real',
    catalogSlug: 'clase-surf-atardecer-el-tunco',
    catalogTitleEs: 'Clase de Surf y Sesión de Atardecer en Playa El Tunco',
    catalogTitleEn: 'Surf Clinic & Sunset Session at El Tunco',
    highlightsEs: ['Roca icónica de El Tunco', 'Olas de clase mundial', 'Atardeceres del Pacífico'],
    highlightsEn: ['Iconic sea-stack rock', 'World-class point breaks', 'Golden Pacific sunsets']
  },

  // 5. PLAYA EL ZONTE - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-el-zonte',
    slug: 'playa-el-zonte',
    nameEs: 'Playa El Zonte',
    nameEn: 'El Zonte Beach (Bitcoin Beach)',
    departmentEs: 'La Libertad',
    departmentEn: 'La Libertad',
    category: 'playas',
    shortDescEs: 'Ambiente relajado, cuevas marinas naturales y pionera en innovación digital comunitaria.',
    shortDescEn: 'Laid-back surf enclave with natural sea caves and pioneer community digital innovation.',
    fullDescEs: 'El Zonte combina la calidez de un pueblo de pescadores con una rompiente derecha de clase mundial. Cuando la marea baja, se revelan cuevas marinas accesibles a pie sobre la arena negra volcánica.',
    fullDescEn: 'El Zonte fuses quiet fishing village charm with a renowned right point break. At low tide, magnificent sea cliff caves open onto black volcanic sands.',
    hasReal360: false,
    coverImage: '/assets/destinations/el_zonte_1_pescadores__playa_el_zonte__01.2011__-_panoramio.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/el_zonte_1_pescadores__playa_el_zonte__01.2011__-_panoramio.jpg.jpg',
        captionEs: 'Pescadores artesanales en la playa de El Zonte',
        captionEn: 'Local artisanal fishermen at El Zonte beach',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pescadores,_playa_El_Zonte_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_zonte_2_el_zonte__01.2011__-_panoramio.jpg.jpg',
        captionEs: 'Península y rompiente de olas en El Zonte',
        captionEn: 'Peninsula point and wave swell in El Zonte',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Zonte_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_zonte_3_el_zonte__11-2011__-_panoramio.jpg.jpg',
        captionEs: 'Costa rocosa y formación de cuevas marinas',
        captionEn: 'Rocky coastline and sea caves at low tide',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Zonte_11-2011_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:El_Zonte',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'surf-cuevas-marinas-el-zonte',
    catalogTitleEs: 'Clínica de Surf y Cuevas Marinas en El Zonte',
    catalogTitleEn: 'Surf Clinic & Sea Caves Tour in El Zonte',
    highlightsEs: ['Cuevas marinas en marea baja', 'Rompiente derecha de surf', 'Comunidad costera auténtica'],
    highlightsEn: ['Low-tide sea caves', 'Classic right point break', 'Authentic beach town vibe']
  },

  // 6. RUTA DE LAS FLORES - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-ruta-flores',
    slug: 'ruta-de-las-flores',
    nameEs: 'Ruta de las Flores & Salcoatitán',
    nameEn: 'Flowers Route (Ruta de las Flores)',
    departmentEs: 'Sonsonate & Ahuachapán',
    departmentEn: 'Sonsonate & Ahuachapán',
    category: 'cultura',
    shortDescEs: 'Cadena de pintorescos pueblos de montaña rodeados de cafetales y clima templado.',
    shortDescEn: 'A string of colonial mountain towns nestled among coffee plantations and cool breezes.',
    fullDescEs: 'La Ruta de las Flores atraviesa la cordillera Apaneca-Ilamatepec uniendo pueblos coloniales como Salcoatitán, Juayúa, Apaneca y Ataco. Destaca por sus festivales gastronómicos, haciendas de café y cascadas naturales.',
    fullDescEn: 'The Flowers Route winds through the high Apaneca-Ilamatepec cordillera, linking heritage towns. Renowned for weekend culinary fairs, specialty coffee estates, and lush waterfalls.',
    hasReal360: false,
    coverImage: '/assets/destinations/ruta_flores_1_ataco__7185455734_.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/ruta_flores_1_ataco__7185455734_.jpg.jpg',
        captionEs: 'Calles tradicionales en la cordillera de la Ruta de las Flores',
        captionEn: 'Traditional streets along the Flowers Route cordillera',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ataco_(7185455734).jpg',
        license: 'CC BY 2.0'
      },
      {
        url: '/assets/destinations/ruta_flores_2_mirador_tur_stico_de_apaneca.jpg.jpg',
        captionEs: 'Mirador panorámico de Apaneca sobre los cafetales',
        captionEn: 'Apaneca mountain viewpoint over coffee forests',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mirador_tur%C3%ADstico_de_Apaneca.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/ruta_flores_4_ruta_de_las_flores_en_ataco._-_panoramio.jpg.jpg',
        captionEs: 'Paisaje montañoso y flora de la ruta',
        captionEn: 'Mountain landscape and mountain blossoms',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ruta_de_las_flores_en_Ataco._-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Ruta_de_las_Flores',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY 2.0 / CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'ruta-de-las-flores-cafe-aguas-termales',
    catalogTitleEs: 'Ruta de las Flores: Cafetales, Pueblos Vivos y Termales',
    catalogTitleEn: 'Flowers Route: Coffee Estates & Thermal Springs',
    highlightsEs: ['Pueblos coloniales de montaña', 'Café de estricta altura', 'Clima fresco y gastronomía'],
    highlightsEn: ['Highland colonial hamlets', 'Strictly high-grown coffee', 'Cool mountain climate']
  },

  // 7. CONCEPCIÓN DE ATACO - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-ataco',
    slug: 'concepcion-de-ataco',
    nameEs: 'Concepción de Ataco',
    nameEn: 'Concepción de Ataco',
    departmentEs: 'Ahuachapán',
    departmentEn: 'Ahuachapán',
    category: 'cultura',
    shortDescEs: 'Pueblo vivo célebre por sus murales artísticos, talleres de telares y café gourmet.',
    shortDescEn: 'Heritage town renowned for artistic street murals, artisan pedal looms, and specialty coffee.',
    fullDescEs: 'Ataco es un pintoresco destino empedrado en las alturas de Ahuachapán donde las paredes de casas centenarias están decoradas con murales de pintores salvadoreños. Sus artesanos continúan la tradición de telares de palanca.',
    fullDescEn: 'Ataco is a picturesque cobblestone mountain haven where historic colonial walls are adorned with colorful Salvadoran murals. Traditional textile craftsmen still operate centuries-old wooden foot looms.',
    hasReal360: false,
    coverImage: '/assets/destinations/ataco_1_concepcion_de_ataco_sign.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/ataco_1_concepcion_de_ataco_sign.jpg.jpg',
        captionEs: 'Acceso y letras escultóricas de Concepción de Ataco',
        captionEn: 'Sculptural town sign in Concepcion de Ataco',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Concepcion_de_Ataco_sign.jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/ataco_2_walking_in_concepcion_de_ataco.jpg.jpg',
        captionEs: 'Murales y arquitectura colonial en las calles de Ataco',
        captionEn: 'Art murals and colonial facades in Ataco',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Walking_in_Concepcion_de_Ataco.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/ataco_4_calle_en_concepci_n_de_ataco__12.2010__-_panoramio.jpg.jpg',
        captionEs: 'Calles empedradas tradicionales y faroles',
        captionEn: 'Cobblestone alleyways and colonial streetlights',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Calle_en_Concepci%C3%B3n_de_Ataco_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Concepci%C3%B3n_de_Ataco',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 4.0 / CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'ruta-de-las-flores-cafe-aguas-termales',
    catalogTitleEs: 'Recorrido Cultural de Ataco y Telares de Palanca',
    catalogTitleEn: 'Ataco Cultural Murals & Loom Workshop Tour',
    highlightsEs: ['Murales artísticos urbanos', 'Talleres de telares de madera', 'Cafeterías de especialidad'],
    highlightsEn: ['Artistic urban murals', 'Traditional wooden looms', 'Specialty coffee roasteries']
  },

  // 8. SUCHITOTO - 360 REAL
  {
    id: 'dest-suchitoto',
    slug: 'suchitoto',
    nameEs: 'Suchitoto Colonial',
    nameEn: 'Colonial Suchitoto',
    departmentEs: 'Cuscatlán',
    departmentEn: 'Cuscatlán',
    category: 'cultura',
    shortDescEs: 'La joya cultural y colonial de El Salvador, con vistas al tranquilo Lago Suchitlán.',
    shortDescEn: 'El Salvador’s cultural capital with cobblestone streets overlooking Lake Suchitlán.',
    fullDescEs: 'Suchitoto ("lugar del pájaro y la flor" en náhuat) conserva intacta su arquitectura española con techos de teja, la señorial Iglesia Santa Lucía de 1853 y un floreciente movimiento de talleres de añil y galerías de arte.',
    fullDescEn: 'Suchitoto preserves its Spanish colonial heritage with whitewashed walls, tile roofs, and the historic 1853 Santa Lucía Church. Set above scenic Lake Suchitlán, it is the center of Salvadoran indigo revival.',
    hasReal360: true,
    panorama360Url: '/assets/panoramas/pano360_suchitoto_v2.jpg',
    coverImage: '/assets/destinations/suchitoto_1_iglesia_de_suchitoto..jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/suchitoto_1_iglesia_de_suchitoto..jpg.jpg',
        captionEs: 'Iglesia Santa Lucía frente a la Plaza Central',
        captionEn: 'Santa Lucía Church on the Central Plaza of Suchitoto',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Iglesia_de_Suchitoto..jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/suchitoto_2_calles_de_suchitoto_agosto..jpg.jpg',
        captionEs: 'Calles coloniales empedradas y arquitectura preservada',
        captionEn: 'Cobblestone alleys and preserved colonial architecture',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Calles_de_Suchitoto_agosto..jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/suchitoto_3_canton_el_tablon__suchitoto__cuscatlan__el_salvador.jpg.jpg',
        captionEs: 'Mirador natural hacia el embalse del Lago Suchitlán',
        captionEn: 'Natural scenic viewpoint over Lake Suchitlan reservoir',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Canton_El_Tablon,_Suchitoto.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Suchitoto',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental bajo licencia Creative Commons comercial autorizada',
    commercialUseAllowed: true,
    status: '360_real',
    catalogSlug: 'suchitoto-colonial-historia-arte',
    catalogTitleEs: 'Suchitoto Colonial: Historia, Añil y Lago Suchitlán',
    catalogTitleEn: 'Colonial Suchitoto Heritage, Indigo & Lake Cruise',
    highlightsEs: ['Iglesia Santa Lucía de 1853', 'Talleres artesanales de añil', 'Paseos en lancha en Lago Suchitlán'],
    highlightsEn: ['Historic 1853 Santa Lucia Church', 'Artisanal indigo workshops', 'Lake Suchitlan scenic boat cruise']
  },

  // 9. CENTRO HISTÓRICO DE SAN SALVADOR - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-san-salvador',
    slug: 'centro-historico-san-salvador',
    nameEs: 'Centro Histórico de San Salvador',
    nameEn: 'Historic Downtown San Salvador',
    departmentEs: 'San Salvador',
    departmentEn: 'San Salvador',
    category: 'cultura',
    shortDescEs: 'Corazón arquitectónico e histórico con el Palacio Nacional, Catedral y plazas revitalizadas.',
    shortDescEn: 'Architectural heart featuring the National Palace, Cathedral, and revitalized grand plazas.',
    fullDescEs: 'El Centro Histórico de la capital ha sido renovado con amplias áreas peatonales iluminadas, el imponente Palacio Nacional de estilo neoclásico, la Catedral Metropolitana y la Iglesia El Rosario, obra maestra de vitrales.',
    fullDescEn: 'San Salvador’s Historic Center has undergone a major revival, featuring pedestrian plazas, the stately neoclassical National Palace, Metropolitan Cathedral, and the striking modernist El Rosario Church with stained glass.',
    hasReal360: false,
    coverImage: '/assets/destinations/san_salvador_1_centro_historico_san_salvador.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/san_salvador_1_centro_historico_san_salvador.jpg.jpg',
        captionEs: 'Plaza Gerardo Barrios y Palacio Nacional',
        captionEn: 'Gerardo Barrios Plaza and National Palace',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Centro_Historico_San_Salvador.jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/san_salvador_2_centro_de_san_salvador_de_noche.jpg.jpg',
        captionEs: 'Iluminación nocturna del Centro Histórico',
        captionEn: 'Night illumination of Historic Downtown San Salvador',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Centro_de_San_Salvador_de_noche.jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/san_salvador_3_centro_hist_rico_de_san_salvador_2.jpg.jpg',
        captionEs: 'Arquitectura cívica y plazas peatonales',
        captionEn: 'Civic architecture and open pedestrian boulevards',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Centro_Hist%C3%B3rico_de_San_Salvador_2.jpg',
        license: 'CC BY-SA 4.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Centro_Hist%C3%B3rico_de_San_Salvador',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'centro-historico-san-salvador-arquitectura',
    catalogTitleEs: 'Recorrido Cultural por el Centro Histórico de San Salvador',
    catalogTitleEn: 'Historic Downtown San Salvador Architectural Tour',
    highlightsEs: ['Palacio Nacional neoclásico', 'Iglesia El Rosario y vitrales', 'Plazas peatonales históricas'],
    highlightsEn: ['Neoclassical National Palace', 'El Rosario stained-glass marvel', 'Vibrant pedestrian plazas']
  },

  // 10. SITIO ARQUEOLÓGICO JOYA DE CERÉN - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-joya-ceren',
    slug: 'joya-de-ceren',
    nameEs: 'Sitio Arqueológico Joya de Cerén',
    nameEn: 'Joya de Cerén Archaeological Site',
    departmentEs: 'La Libertad',
    departmentEn: 'La Libertad',
    category: 'cultura',
    shortDescEs: 'La "Pompeya de América", declarada Patrimonio Mundial de la Humanidad por la UNESCO.',
    shortDescEn: 'The "Pompeii of the Americas", inscribed as a UNESCO World Heritage Site.',
    fullDescEs: 'Sepultada en el año 650 d.C. bajo capas de ceniza volcánica del volcán Loma Caldera, Joya de Cerén conserva de forma intacta la vida cotidiana, cultivos de maíz, vasijas y temazcales de una comunidad maya agrícola.',
    fullDescEn: 'Buried under volcanic ash around 650 AD, Joya de Cerén offers an unparalleled window into everyday Mayan village life, featuring preserved domestic complexes, kitchens, and an ancient sauna (temazcal).',
    hasReal360: false,
    coverImage: '/assets/destinations/joya_ceren_1_temazcal_en_joya_de_ceren.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/joya_ceren_1_temazcal_en_joya_de_ceren.jpg.jpg',
        captionEs: 'Estructura ceremonial del temazcal maya preservado',
        captionEn: 'Preserved Mayan sauna (temazcal) dome structure',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Temazcal_en_Joya_de_Ceren.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/joya_ceren_2_es_joya_ceren_05_2012_estructura_9_area_2_tamazcal_wide_a.jpg',
        captionEs: 'Área 2 con cubiertas protectoras sobre las ruinas',
        captionEn: 'Area 2 protective roofs over excavated archaeological remains',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:ES_Joya_Ceren_05_2012_Estructura_9_Area_2.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/joya_ceren_4_joya_de_cer_n__domestic_complex.jpg.jpg',
        captionEs: 'Complejo doméstico maya original intacto',
        captionEn: 'Original intact Mayan domestic living complex',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Joya_de_Cer%C3%A9n,_domestic_complex.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Joya_de_Cer%C3%A9n',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'sitio-arqueologico-joya-ceren-tazumal',
    catalogTitleEs: 'Ruta Maya: Joya de Cerén UNESCO y Pirámide de Tazumal',
    catalogTitleEn: 'Maya Heritage Route: Joya de Cerén & Tazumal Pyramid',
    highlightsEs: ['Patrimonio de la Humanidad UNESCO', 'Aldea maya conservada bajo ceniza', 'Temazcal abovedado intacto'],
    highlightsEn: ['UNESCO World Heritage Site', 'Intact everyday Mayan farming village', 'Well-preserved domed sauna']
  },

  // 11. SITIO ARQUEOLÓGICO TAZUMAL - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-tazumal',
    slug: 'tazumal',
    nameEs: 'Sitio Arqueológico Tazumal',
    nameEn: 'Tazumal Archaeological Site',
    departmentEs: 'Santa Ana (Chalchuapa)',
    departmentEn: 'Santa Ana (Chalchuapa)',
    category: 'cultura',
    shortDescEs: 'La pirámide prehispánica escalonada más monumental e importante de El Salvador.',
    shortDescEn: 'The most monumental Mayan stepped pyramid and ceremonial complex in El Salvador.',
    fullDescEs: 'Ubicado en Chalchuapa, Tazumal es el vestigio maya más representativo del país, habitado desde el periodo Clásico. Su estructura principal alcanza 24 metros de altura y cuenta con sistema de drenaje y museo arqueológico.',
    fullDescEn: 'Located in Chalchuapa, Tazumal is the country’s most celebrated Mayan settlement, inhabited across multiple classic eras. Its primary tiered temple reaches 24 meters, complemented by an on-site museum.',
    hasReal360: false,
    coverImage: '/assets/destinations/tazumal_2_tazumal_panoramica.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/tazumal_2_tazumal_panoramica.jpg.jpg',
        captionEs: 'Panorámica de la pirámide ceremonial de Tazumal',
        captionEn: 'Panoramic view of Tazumal ceremonial pyramid',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tazumal_panoramica.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/tazumal_1_tazumal_1.jpg.jpg',
        captionEs: 'Estructura principal escalonada de 24 metros',
        captionEn: 'Main 24-meter stepped pyramid structure',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tazumal_1.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/tazumal_3_el_tazumal__chalchuapa.jpg.jpg',
        captionEs: 'Detalle de plataformas y escalinatas en Chalchuapa',
        captionEn: 'Architectural detail of terraces and ancient stone steps',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Tazumal,_Chalchuapa.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Tazumal',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'sitio-arqueologico-joya-ceren-tazumal',
    catalogTitleEs: 'Ruta Maya: Exploración Arqueológica de Tazumal',
    catalogTitleEn: 'Maya Archaeology Tour at Tazumal Pyramid',
    highlightsEs: ['Pirámide maya de 24 metros', 'Antigua zona ceremonial de Chalchuapa', 'Museo de sitio Dr. Stanley Boggs'],
    highlightsEn: ['24-meter monumental pyramid', 'Chalchuapa ceremonial center', 'On-site archaeological museum']
  },

  // 12. BAHÍA DE JIQUILISCO - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-jiquilisco',
    slug: 'bahia-de-jiquilisco',
    nameEs: 'Bahía de Jiquilisco',
    nameEn: 'Jiquilisco Bay Biosphere Reserve',
    departmentEs: 'Usulután',
    departmentEn: 'Usulután',
    category: 'naturaleza',
    shortDescEs: 'La mayor reserva de manglares del país y santuario de la tortuga marina carey.',
    shortDescEn: 'The country’s largest mangrove wetland and critical sanctuary for hawksbill sea turtles.',
    fullDescEs: 'Declarada sitio RAMSAR y Reserva de la Biosfera por la UNESCO, la Bahía de Jiquilisco es un laberinto de canales, islas vírgenes y bosques salados que albergan el 40% de la anidación de la tortuga carey del Pacífico Oriental.',
    fullDescEn: 'Declared a UNESCO Biosphere Reserve and RAMSAR site, Jiquilisco Bay forms a labyrinth of marine mangrove canals and deserted sandy islands hosting 40% of the Eastern Pacific hawksbill turtle nesting.',
    hasReal360: false,
    coverImage: '/assets/destinations/jiquilisco_1_bah_a_de_jiquilisco__isla_de_m_ndez_.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/jiquilisco_1_bah_a_de_jiquilisco__isla_de_m_ndez_.jpg.jpg',
        captionEs: 'Canales de navegación e Isla de Méndez en Jiquilisco',
        captionEn: 'Mangrove navigation channels and Mendez Island',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bah%C3%ADa_de_Jiquilisco_(Isla_de_M%C3%A9ndez).jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/jiquilisco_2_isla_madre_sal.jpg.jpg',
        captionEs: 'Ecosistema de bosque salado e Isla Madre Sal',
        captionEn: 'Madre Sal Island and coastal estuary ecosystem',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Isla_Madre_Sal.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/jiquilisco_3_bahia_jiquilisco.jpg.jpg',
        captionEs: 'Aguas calmas y avistamiento de aves acuáticas',
        captionEn: 'Calm estuarine waters and coastal birdwatching',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bahia_Jiquilisco.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Bah%C3%ADa_de_Jiquilisco',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 4.0 / CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'expedicion-bahia-jiquilisco-tortugas',
    catalogTitleEs: 'Navegación en Manglares de Jiquilisco y Conservación de Tortugas',
    catalogTitleEn: 'Jiquilisco Bay Mangrove Cruise & Sea Turtle Conservation',
    highlightsEs: ['Reserva de Biosfera UNESCO', 'Santuario de tortuga carey', 'Islas vírgenes y canales salados'],
    highlightsEn: ['UNESCO Biosphere Reserve', 'Hawksbill turtle nesting sanctuary', 'Pristine islands & channels']
  },

  // 13. PLAYA EL CUCO - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-el-cuco',
    slug: 'playa-el-cuco',
    nameEs: 'Playa El Cuco',
    nameEn: 'El Cuco Beach',
    departmentEs: 'San Miguel',
    departmentEn: 'San Miguel',
    category: 'playas',
    shortDescEs: 'Extensa franja de arena volcánica oscura, oleaje suave y ambiente relajante en el oriente.',
    shortDescEn: 'Expansive dark volcanic sand beach with gentle surf and serene oriental Pacific vibes.',
    fullDescEs: 'Ubicada en el departamento de San Miguel, El Cuco destaca por su amplísima playa plana donde el mar retrocede decenas de metros con marea baja, ideal para caminatas al atardecer, paseos a caballo y mariscos frescos.',
    fullDescEn: 'Situated along the oriental coast of San Miguel, El Cuco is beloved for its vast flat volcanic sands that stretch out during low tide, offering serene sunset strolls and authentic fresh seafood.',
    hasReal360: false,
    coverImage: '/assets/destinations/el_cuco_1_el_cuco_san_miguel_el_salvador_playa_2011.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/el_cuco_1_el_cuco_san_miguel_el_salvador_playa_2011.jpg.jpg',
        captionEs: 'Playa El Cuco en la costa de San Miguel',
        captionEn: 'El Cuco beach along the San Miguel Pacific shore',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Cuco_San_Miguel_El_Salvador_Playa_2011.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_cuco_4_el_cuco__el_salvador_-_panoramio__2_.jpg.jpg',
        captionEs: 'Horizonte del Pacífico y arena negra volcánica',
        captionEn: 'Pacific horizon and fine black volcanic sand',
        author: 'Panoramio Contributor / Wikimedia Commons',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Cuco,_El_Salvador_-_panoramio.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:El_Cuco,_El_Salvador',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'oriente-salvadoreno-playa-el-cuco',
    catalogTitleEs: 'Escapada a Playa El Cuco y Costa Oriental',
    catalogTitleEn: 'El Cuco Beach & Eastern Coastline Escape',
    highlightsEs: ['Extensa arena volcánica negra', 'Mareas suaves para baño', 'Atardeceres despejados del oriente'],
    highlightsEn: ['Expansive volcanic sands', 'Gentle swimming surf', 'Clear eastern sunset skies']
  },

  // 14. LOS CÓBANOS - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-los-cobanos',
    slug: 'los-cobanos',
    nameEs: 'Área Marina Protegida Los Cóbanos',
    nameEn: 'Los Cóbanos Marine Protected Area',
    departmentEs: 'Sonsonate',
    departmentEn: 'Sonsonate',
    category: 'playas',
    shortDescEs: 'La mayor formación de arrecife rocoso y coralino del Pacífico centroamericano.',
    shortDescEn: 'The largest rocky and coral reef ecosystem on the Central American Pacific coast.',
    fullDescEs: 'Los Cóbanos es una joya ecológica marina en Sonsonate. Su playa dorada y arrecifes de origen volcánico albergan peces tropicales, corales duros y paso de ballenas jorobadas durante la temporada de migración invernal.',
    fullDescEn: 'Los Cóbanos is a marine sanctuary in Sonsonate. Its unique golden sands and volcanic reef platform protect tropical reef fish, hard corals, and migrating humpback whales during winter months.',
    hasReal360: false,
    coverImage: '/assets/destinations/los_cobanos_1_playa_los_c_banos__el_salvador_000_0025.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/los_cobanos_1_playa_los_c_banos__el_salvador_000_0025.jpg.jpg',
        captionEs: 'Playa dorada y plataforma arrecifal de Los Cóbanos',
        captionEn: 'Golden sandy beach and reef flat at Los Cobanos',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Playa_Los_C%C3%B3banos,_El_Salvador.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/los_cobanos_3_playa_los_c_banos.jpg.jpg',
        captionEs: 'Paisaje costero del área marina protegida',
        captionEn: 'Coastline of the marine protected sanctuary',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Playa_Los_Cobanos.jpg',
        license: 'CC BY-SA 4.0'
      },
      {
        url: '/assets/destinations/los_cobanos_4_coral_negro_myriopathes_panamensis_de_los_c_banos__el._s.jpg',
        captionEs: 'Vida marina y coral negro en los arrecifes sumergidos',
        captionEn: 'Marine biodiversity and black coral on submerged reefs',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Coral_negro_de_Los_C%C3%B3banos.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Los_C%C3%B3banos',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 4.0 / CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'snorkeling-arrecife-los-cobanos',
    catalogTitleEs: 'Snorkeling y Buceo en Arrecife de Los Cóbanos',
    catalogTitleEn: 'Snorkeling & Coral Reef Exploration at Los Cóbanos',
    highlightsEs: ['Único arrecife de coral del Pacífico salvadoreño', 'Avistamiento de ballenas jorobadas', 'Playas de arena dorada'],
    highlightsEn: ['Only coral reef on El Salvador’s Pacific', 'Humpback whale watching', 'Golden sand beaches']
  },

  // 15. PARQUE NACIONAL EL BOQUERÓN - GALERÍA FOTOGRÁFICA REAL (360 PENDIENTE)
  {
    id: 'dest-el-boqueron',
    slug: 'el-boqueron',
    nameEs: 'Parque Nacional El Boquerón',
    nameEn: 'El Boquerón National Park',
    departmentEs: 'San Salvador',
    departmentEn: 'San Salvador',
    category: 'naturaleza',
    shortDescEs: 'Cráter colosal de 1.5 km de diámetro y 558 m de profundidad sobre la capital.',
    shortDescEn: 'Colossal crater 1.5km wide and 558m deep towering directly above the capital city.',
    fullDescEs: 'En la cima del Volcán de San Salvador (1,893 m), El Boquerón ofrece senderos de bosque húmedo templado entre hortensias y begonias, con miradores hacia el gran abismo volcánico y el pequeño cono interior "El Boqueroncito".',
    fullDescEn: 'At the summit of San Salvador Volcano (1,893m), El Boquerón features cool pine-and-hydrangea trails leading to sheer rim lookouts over the 558-meter abyss and its inner mini-cone "El Boqueroncito".',
    hasReal360: false,
    coverImage: '/assets/destinations/el_boqueron_2_laguna_volcan_san_salvador.jpg.jpg',
    gallery: [
      {
        url: '/assets/destinations/el_boqueron_2_laguna_volcan_san_salvador.jpg.jpg',
        captionEs: 'Mirador al abismo y cono interior de El Boquerón',
        captionEn: 'Lookout over the crater abyss and interior cone',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Laguna_volcan_San_Salvador.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_boqueron_3_sansalvadorvolcano.jpg.jpg',
        captionEs: 'Vista del cráter y bosque protector de montaña',
        captionEn: 'Crater rim and protected mountain forest vegetation',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:SanSalvadorVolcano.jpg',
        license: 'CC BY-SA 3.0'
      },
      {
        url: '/assets/destinations/el_boqueron_1_san_salvador_downtown.jpg.jpg',
        captionEs: 'Panorámica de la cordillera volcánica de San Salvador',
        captionEn: 'Panoramic silhouette of San Salvador volcanic chain',
        author: 'Wikimedia Commons Contributor',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:San_Salvador_downtown.jpg',
        license: 'CC BY-SA 3.0'
      }
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:San_Salvador_(volcano)',
    author: 'Colaboradores Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseDetails: 'Fotografía documental auténtica de archivo verificada (recorrido 360° esférico pendiente)',
    commercialUseAllowed: true,
    status: 'galeria_documental',
    catalogSlug: 'tour-volcan-boqueron-san-salvador',
    catalogTitleEs: 'Caminata en el Cráter del Volcán El Boquerón',
    catalogTitleEn: 'El Boquerón Volcano Crater Rim Walk',
    highlightsEs: ['Cráter volcánico de 1.5 km de diámetro', 'Cono interior "Boqueroncito"', 'Vistas panorámicas del valle de San Salvador'],
    highlightsEn: ['1.5 km diameter crater rim', 'Mini interior cone "Boqueroncito"', 'Valley views over San Salvador']
  }
];
