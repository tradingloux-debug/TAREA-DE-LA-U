/**
 * Comprehensive Spanish / English to Portuguese translator for GIA Experiences
 */

// Exact and phrase mappings for high-fidelity Portuguese translation
const DICTIONARY: Record<string, string> = {
  // Navigation & General UI
  'Inicio': 'Início',
  'Home': 'Início',
  'Explorar': 'Explorar',
  'Explore': 'Explorar',
  'Experiencias': 'Experiências',
  'Experiences': 'Experiências',
  'Todas las experiencias': 'Todas as experiências',
  'All experiences': 'Todas as experiências',
  'Rutas GIA': 'Rotas GIA',
  'GIA Routes': 'Rotas GIA',
  'Planea con GIA': 'Planeje com a GIA',
  'Plan with GIA': 'Planeje com a GIA',
  'Quiénes somos': 'Quem somos',
  'About us': 'Quem somos',
  'Más': 'Mais',
  'More': 'Mais',
  'Mis favoritos': 'Meus favoritos',
  'My favorites': 'Meus favoritos',
  'Mis reservas': 'Minhas reservas',
  'My bookings': 'Minhas reservas',
  'Mi cuenta': 'Minha conta',
  'My account': 'Minha conta',
  'Cuenta': 'Conta',
  'Account': 'Conta',
  'Contacto': 'Contato',
  'Contact': 'Contato',
  'Contacto (+503 7011-9564)': 'Contato (+503 7011-9564)',
  'Centro de Ayuda': 'Central de Ajuda',
  'Centro de Ayuda & FAQ': 'Central de Ajuda & FAQ',
  'Help Center & FAQ': 'Central de Ajuda & FAQ',
  'Crear mi viaje': 'Criar minha viagem',
  'Create my trip': 'Criar minha viagem',
  'Crear mi viaje personalizado': 'Criar minha viagem personalizada',
  'Create my custom trip': 'Criar minha viagem personalizada',
  'Abrir menú': 'Abrir menu',
  'Cerrar menú': 'Fechar menu',
  'Idioma:': 'Idioma:',
  'Language:': 'Idioma:',
  'Iniciar sesión / Crear cuenta': 'Entrar / Criar conta',
  'Log in / Sign up': 'Entrar / Criar conta',
  'Ver mi cuenta y beneficios →': 'Ver minha conta e benefícios →',
  'View my account & perks →': 'Ver minha conta e benefícios →',
  'Volver al inicio': 'Voltar ao início',
  'Back to Home': 'Voltar ao início',
  '← Volver al inicio': '← Voltar ao início',
  '← Back to Home': '← Voltar ao início',
  'Volver al catálogo': 'Voltar ao catálogo',
  '← Volver al catálogo': '← Voltar ao catálogo',
  'Categorías principales': 'Categorias principais',
  'Main categories': 'Categorias principais',
  'Experiencias locales': 'Experiências locais',
  'Local experiences': 'Experiências locais',
  'Comunidades y tradiciones': 'Comunidades e tradições',
  'Communities and traditions': 'Comunidades e tradições',
  'Experiencias con imágenes 360°': 'Experiências com imagens 360°',
  'Experiences with 360° images': 'Experiências com imagens 360°',
  'Exploración inmersiva': 'Exploração imersiva',
  'Immersive exploration': 'Exploração imersiva',
  'Experiencias inmersivas': 'Experiências imersivas',
  'Immersive experiences': 'Experiências imersivas',
  'Comparte GIA': 'Compartilhe a GIA',
  'Share GIA': 'Compartilhe a GIA',

  // Categories
  'Cultura': 'Cultura',
  'Culture': 'Cultura',
  'Gastronomía': 'Gastronomia',
  'Gastronomy': 'Gastronomia',
  'Food': 'Gastronomia',
  'Naturaleza': 'Natureza',
  'Nature': 'Natureza',
  'Aventura': 'Aventura',
  'Adventure': 'Aventura',
  'Playas & Costa': 'Praias e Costa',
  'Playas': 'Praias',
  'Beaches': 'Praias',
  'Beaches & Coast': 'Praias e Costa',
  'Paquetes Completos': 'Pacotes Completos',
  'Paquetes': 'Pacotes',
  'Packages': 'Pacotes',
  'Complete Packages': 'Pacotes Completos',

  // Cards & Catalog
  'Desde': 'A partir de',
  'From': 'A partir de',
  'por persona': 'por pessoa',
  'per person': 'por pessoa',
  'Ver experiencia': 'Ver experiência',
  'View experience': 'Ver experiência',
  'Ver detalles': 'Ver detalhes',
  'View details': 'Ver detalhes',
  'Dato Demo': 'Dado Demo',
  'Demo Data': 'Dado Demo',
  'Duración': 'Duração',
  'Duration': 'Duração',
  'Duración:': 'Duração:',
  'Duration:': 'Duração:',
  'Recomendada': 'Recomendada',
  'Recommended': 'Recomendada',
  'Recomendados': 'Recomendados',
  'Experiencia local': 'Experiência local',
  'Local experience': 'Experiência local',
  'Explorar 360°': 'Explorar 360°',
  'Explore 360°': 'Explorar 360°',
  'Explorar en 360°': 'Explorar em 360°',
  'Explore in 360°': 'Explorar em 360°',
  'Abrir imagen 360° interactiva': 'Abrir imagem 360° interativa',
  'Open interactive 360° image': 'Abrir imagem 360° interativa',
  'Precio por confirmar': 'Preço a confirmar',
  'Price to be confirmed': 'Preço a confirmar',
  'Consultar disponibilidad': 'Consultar disponibilidade',
  'Check availability': 'Consultar disponibilidade',
  'Quitar de favoritos': 'Remover dos favoritos',
  'Remove from favorites': 'Remover dos favoritos',
  'Guardar experiencia': 'Salvar experiência',
  'Save experience': 'Salvar experiência',
  'Guardada en favoritos': 'Salvo nos favoritos',
  'Saved to favorites': 'Salvo nos favoritos',
  'fotos': 'fotos',
  'photos': 'fotos',
  'Todos los tours': 'Todos os tours',
  'All tours': 'Todos os tours',
  'días': 'dias',
  'days': 'dias',
  'día': 'dia',
  'day': 'dia',
  'horas': 'horas',
  'hours': 'horas',
  'hora': 'hora',
  'hour': 'hora',
  'noches': 'noites',
  'nights': 'noites',
  'noche': 'noite',
  'night': 'noite',
  'personas': 'pessoas',
  'people': 'pessoas',

  // Filters & Search
  'Filtros de búsqueda': 'Filtros de busca',
  'Filters': 'Filtros',
  'Limpiar filtros': 'Limpar filtros',
  'Clear all': 'Limpar tudo',
  'Todas las categorías': 'Todas as categorias',
  'All categories': 'Todas as categorias',
  'Categoría': 'Categoria',
  'Category': 'Categoria',
  'Ubicación / Departamento': 'Localização / Departamento',
  'Location / Department': 'Localização / Departamento',
  'Todos los departamentos': 'Todos os departamentos',
  'All departments': 'Todos os departamentos',
  'Rango de precio': 'Faixa de preço',
  'Price range': 'Faixa de preço',
  'Todos los precios': 'Todos os preços',
  'All price tiers': 'Todos os preços',
  'Cualquier duración': 'Qualquer duração',
  'Any duration': 'Qualquer duração',
  'Tipo de grupo': 'Tipo de grupo',
  'Group type': 'Tipo de grupo',
  'Cualquier grupo': 'Qualquer grupo',
  'Any group size': 'Qualquer grupo',
  'Ordenar por': 'Ordenar por',
  'Sort by': 'Ordenar por',
  'Precio: menor a mayor': 'Preço: menor para maior',
  'Price: low to high': 'Preço: menor para maior',
  'Precio: mayor a menor': 'Preço: maior para menor',
  'Price: high to low': 'Preço: maior para menor',
  'Duración: menor a mayor': 'Duração: menor para maior',
  'Duration: short to long': 'Duração: menor para maior',
  'experiencias encontradas': 'experiências encontradas',
  'experiences found': 'experiências encontradas',
  'No encontramos experiencias con estos filtros': 'Nenhuma experiência encontrada com esses filtros',
  'No experiences found matching these filters': 'Nenhuma experiência encontrada com esses filtros',
  'Restablecer filtros': 'Redefinir filtros',
  'Reset filters': 'Redefinir filtros',
  'Filtrar experiencias': 'Filtrar experiências',
  'Filter experiences': 'Filtrar experiências',
  'Aplicar y cerrar': 'Aplicar e fechar',
  'Apply & close': 'Aplicar e fechar',

  // About Us Page
  'Conoce GIA Experiences': 'Conheça a GIA Experiences',
  'About GIA Experiences': 'Conheça a GIA Experiences',
  'Nuestra Misión': 'Nossa Missão',
  'Our Mission': 'Nossa Missão',
  'Nuestra Visión': 'Nossa Visão',
  'Our Vision': 'Nossa Visão',
  'Fundadoras de GIA Experiences': 'Fundadoras da GIA Experiences',
  'Founders of GIA Experiences': 'Fundadoras da GIA Experiences',
  'Liderazgo & Emprendimiento': 'Liderança & Empreendedorismo',
  'Leadership & Vision': 'Liderança & Visão',
  'Principios que nos guían': 'Princípios que nos guiam',
  'Core Principles': 'Princípios que nos guiam',
  'Nuestros valores': 'Nossos valores',
  'Our Values': 'Nossos valores',
  'Excelencia & Atención': 'Excelência & Cuidado',
  'Excellence & Care': 'Excelência & Cuidado',
  'Impacto Positivo Local': 'Impacto Positivo Local',
  'Positive Local Impact': 'Impacto Positivo Local',
  'Hablar con un asesor': 'Falar com um consultor',
  'Talk with an advisor': 'Falar com um consultor',
  '¿Listo para descubrir El Salvador?': 'Pronto para descobrir El Salvador?',
  'Ready to discover El Salvador?': 'Pronto para descobrir El Salvador?',
  'Descubre nuestras experiencias': 'Descubra nossas experiências',
  'Explore our experiences': 'Descubra nossas experiências',
  'Planea tu viaje': 'Planeje sua viagem',
  'Plan your trip': 'Planeje sua viagem',
  'RESPONSABILIDAD': 'RESPONSABILIDADE',
  'CALIDAD': 'QUALIDADE',
  'INNOVACIÓN': 'INOVAÇÃO',
  'RESPETO': 'RESPEITO',
  'COMPROMISO': 'COMPROMISSO',
  'AUTENTICIDAD': 'AUTENTICIDADE',

  // Routes Page
  'Rutas Turísticas de El Salvador': 'Rotas Turísticas de El Salvador',
  'Tourist Routes of El Salvador': 'Rotas Turísticas de El Salvador',
  'Itinerarios completos organizados por días para descubrir El Salvador sin preocuparte por la logística.':
    'Itinerários completos organizados por dias para descobrir El Salvador sem se preocupar com a logística.',
  '¿Quieres una ruta exclusiva?': 'Deseja uma rota exclusiva?',
  'Would you like a private route?': 'Deseja uma rota exclusiva?',
  'Diseña un viaje único con Planea con GIA': 'Projete uma viagem única com Planeje com a GIA',
  'Design a unique trip with Plan with GIA': 'Projete uma viagem única com Planeje com a GIA',
  'Alojamiento': 'Hospedagem',
  'Lodging': 'Hospedagem',
  'Movilidad': 'Mobilidade',
  'Transportation': 'Mobilidade e Transporte',
  'Alimentación': 'Alimentação',
  'Meals': 'Alimentação',
  'Asistencia': 'Suporte',
  'Support': 'Suporte e Coordenação',

  // Experience Detail & Booking
  'Sobre esta experiencia': 'Sobre esta experiência',
  'About this experience': 'Sobre esta experiência',
  'Lo que harás': 'O que você fará',
  'What you will do': 'O que você fará',
  'Qué incluye': 'O que inclui',
  "What's included": 'O que inclui',
  'No incluye': 'Não inclui',
  "What's not included": 'Não inclui',
  'Antes de reservar': 'Antes de reservar',
  'Before you book': 'Antes de reservar',
  'Punto de encuentro': 'Ponto de encontro',
  'Meeting point': 'Ponto de encontro',
  'Abrir ubicación en Google Maps': 'Abrir localização no Google Maps',
  'Open location in Google Maps': 'Abrir localização no Google Maps',
  'Tamaño del grupo': 'Tamanho do grupo',
  'Group size': 'Tamanho do grupo',
  'Idiomas disponibles': 'Idiomas disponíveis',
  'Languages': 'Idiomas disponíveis',
  'Resumen de costo': 'Resumo de valores',
  'Pricing breakdown': 'Resumo de valores',
  'Selecciona una fecha': 'Selecione uma data',
  'Select a date': 'Selecione uma data',
  'Número de viajeros': 'Número de viajantes',
  'Number of travelers': 'Número de viajantes',
  'Adultos': 'Adultos',
  'Adults': 'Adultos',
  'Niños (opcional)': 'Crianças (opcional)',
  'Children (optional)': 'Crianças (opcional)',
  'Total estimado': 'Total estimado',
  'Estimated total': 'Total estimado',
  'Continuar reserva': 'Continuar reserva',
  'Continue booking': 'Continuar reserva',
  'Solicitar reserva': 'Solicitar reserva',
  'Request booking': 'Solicitar reserva',
  'Compartir': 'Compartilhar',
  'Share': 'Compartilhar',
  'Enlace copiado': 'Link copiado',
  'Link copied': 'Link copiado',
  'Ubicación': 'Localização',
  'Location': 'Localização',
  'Anfitriones locales': 'Anfitriões locais',
  'Local hosts': 'Anfitriões locais',
  'Conoce a tus anfitriones': 'Conheça seus anfitriões',
  'Meet your hosts': 'Conheça seus anfitriões',
  'Cómo contribuye tu visita': 'Como sua visita contribui',
  'How your visit contributes': 'Como sua visita contribui',

  // FAQ & Help
  'Preguntas Frecuentes': 'Perguntas Frequentes',
  'Frequently Asked Questions': 'Perguntas Frequentes',
  'FAQ': 'Perguntas Frequentes',
  'Centro de Ayuda y Asistencia': 'Central de Ajuda e Assistência',
  'Help & Support Center': 'Central de Ajuda e Assistência',
  '¿Prefieres hablar con una persona?': 'Prefere falar com alguém de nossa equipe?',
  'Prefer to speak with our team?': 'Prefere falar com alguém de nossa equipe?',
  'Página de Contacto': 'Página de Contato',
  'Contact Page': 'Página de Contato',
  'Escribir por WhatsApp': 'Conversar pelo WhatsApp',
  'Chat on WhatsApp': 'Conversar pelo WhatsApp',
  'Ir a Contacto': 'Ir para Contato',
  'Go to Contact': 'Ir para Contato',
  '¿Tienes otra consulta específica?': 'Tem alguma dúvida específica?',
  'Have a specific question?': 'Tem alguma dúvida específica?',
};

// Word-level and phrase transformations for sentences
export const translateToPortuguese = (text: string): string => {
  if (!text || typeof text !== 'string') return text;

  const trimmed = text.trim();
  if (DICTIONARY[trimmed]) {
    return DICTIONARY[trimmed];
  }

  // Common replacements in text
  let translated = text
    .replace(/\bQuiénes somos\b/gi, 'Quem somos')
    .replace(/\bExperiencias locales\b/gi, 'Experiências locais')
    .replace(/\bMis reservas\b/gi, 'Minhas reservas')
    .replace(/\bMis favoritos\b/gi, 'Meus favoritos')
    .replace(/\bMi cuenta\b/gi, 'Minha conta')
    .replace(/\bPlanea con GIA\b/gi, 'Planeje com a GIA')
    .replace(/\bRutas GIA\b/gi, 'Rotas GIA')
    .replace(/\bPor qué GIA\b/gi, 'Por que a GIA')
    .replace(/\bpor persona\b/gi, 'por pessoa')
    .replace(/\bDesde\b/g, 'A partir de')
    .replace(/\bVer experiencia\b/gi, 'Ver experiência')
    .replace(/\bExplorar en 360°\b/gi, 'Explorar em 360°')
    .replace(/\bExplorar 360°\b/gi, 'Explorar 360°')
    .replace(/\bSolicitar reserva\b/gi, 'Solicitar reserva')
    .replace(/\bContinuar reserva\b/gi, 'Continuar reserva')
    .replace(/\bTotal estimado\b/gi, 'Total estimado')
    .replace(/\bNúmero de viajeros\b/gi, 'Número de viajantes')
    .replace(/\bSelecciona una fecha\b/gi, 'Selecione uma data')
    .replace(/\bPunto de encuentro\b/gi, 'Ponto de encontro')
    .replace(/\bQué incluye\b/gi, 'O que inclui')
    .replace(/\bNo incluye\b/gi, 'Não inclui')
    .replace(/\bAntes de reservar\b/gi, 'Antes de reservar')
    .replace(/\bLo que harás\b/gi, 'O que você fará')
    .replace(/\bSobre esta experiencia\b/gi, 'Sobre esta experiência')
    .replace(/\bAnfitriones locales\b/gi, 'Anfitriões locais')
    .replace(/\bConoce a tus anfitriones\b/gi, 'Conheça seus anfitriões')
    .replace(/\bCómo contribuye tu visita\b/gi, 'Como sua visita contribui')
    .replace(/\bCentro de Ayuda\b/gi, 'Central de Ajuda')
    .replace(/\bPreguntas Frecuentes\b/gi, 'Perguntas Frequentes')
    .replace(/\bTérminos y Condiciones\b/gi, 'Termos e Condições')
    .replace(/\bPolítica de Privacidad\b/gi, 'Política de Privacidade')
    .replace(/\bTodos los derechos reservados\b/gi, 'Todos os direitos reservados')
    .replace(/\bDescubre El Salvador\b/gi, 'Descubra El Salvador')
    .replace(/\bNuestra Misión\b/gi, 'Nossa Missão')
    .replace(/\bNuestra Visión\b/gi, 'Nossa Visão')
    .replace(/\bNuestros valores\b/gi, 'Nossos valores')
    .replace(/\bFundadoras de GIA\b/gi, 'Fundadoras da GIA')
    .replace(/\bhoras\b/gi, 'horas')
    .replace(/\bdías\b/gi, 'dias')
    .replace(/\bnoches\b/gi, 'noites');

  return translated;
};
