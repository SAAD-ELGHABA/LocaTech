import Router from '../../routes/route';

// Fonction pour extraire les paths mn les routes
const extractRoutes = (routes) => {
  let paths = [];

  routes.forEach(route => {
    if (route.path) {
      paths.push(route.path);
    }
    if (route.children) {
      paths = paths.concat(extractRoutes(route.children));
    }
  });

  return paths;
};

const allPaths = extractRoutes(Router.routes);

// ✅ Fonction li katgénérer le prompt dynamiquement
const generatePrompt = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
  
    const wantsRoutes =
      lowerMessage.includes('routes') ||
      lowerMessage.includes('navigation') ||
      lowerMessage.includes('pages') ||
      lowerMessage.includes('navigate') ||
      lowerMessage.includes('pages disponibles') ||
      lowerMessage.includes('fin n9der') ||
      lowerMessage.includes('fin nqder');
  
    // ✅ questions générales (Darija w Français)
    const generalQuestions =
      lowerMessage.includes('salut') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('ach taydir had site') ||
      lowerMessage.includes('i3tini des liens') ||
      lowerMessage.includes('shno katdir') ||
      lowerMessage.includes('shno hada') ||
      lowerMessage.includes('bonjour');
  
    return `
  Nta wahed l'assistant dyal LocaTech, kay3awn les utilisateurs.
  
  Voici la demande :
  "${userMessage}"
  
  ${wantsRoutes ? `Voici les routes disponibles dans l'application :\n${allPaths.join('\n')}` : ''}
  ${generalQuestions ? `Salam! LocaTech huwa site kay3awn lik bach t7ell 3la l'immobilier f lmaghrib. Kaymchi m3a l'achat, l3ayar w l7okoma dyal biens immobiliers. Bghiti tla3 l9ame3a m3a les pages li kaynin f site: 'Acheter', 'Louer', 'Blog', 'À propos' w bzzaf akhriin.\n\n**Bonjour! LocaTech est un site qui aide à trouver des biens immobiliers au Maroc. Il couvre l'achat, la location et la gestion des biens immobiliers. Vous pouvez explorer des pages comme 'Acheter', 'Louer', 'Blog', 'À propos' et bien plus encore.` : ''}
  Réponds dima b darija ou français, b style simple w mfhoum.
  
  Dima, ila bghiti route précisé, ghan3tiha lik li m3ak. Kolchi fchi haja n9dar njawbak li dertih. 
  `;
  };
  
  

export default generatePrompt;
