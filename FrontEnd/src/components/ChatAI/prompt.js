const generatePrompt = (userMessage, Biens) => {
  const lowerMessage = userMessage.toLowerCase();

  const routes = {
    acheter: "/acheter",
    louer: "/louer",
    blog: "/blog",
    "à propos": "/Apropos",
    contact: "/contactUs"
  };

  // Format the Biens data into a readable string for the AI
  const formattedBiens = Biens.map(bien => `- Titre: ${bien.title}, Ville With The Area: ${bien.ville}+${bien.quartier}, Type: ${bien.type}, Budget: ${bien.budget}, ID: ${bien.id}, Description: ${bien.description}, Type Of Business: ${bien.description},
    Number Of Rooms: ${bien.chambres},
    Number Of BathRooms: ${bien.salles_de_bain},
    Number Of Floor: ${bien.etage},
    `).join("\n");

    const secure = `    Si la question de l'utilisateur concerne une recherche de bien immobilier (maison, appartement, ville, prix, caractéristiques, etc.), utilise les informations sur les biens que je t'ai fournies pour générer des liens vers les pages de détails de biens similaires. **Utilise le format suivant pour les liens de biens : <link>Titre du Bien(/details-bien-client/:id)</link>**, en remplaçant ':id' par l'ID réel du bien. Chaque lien doit apparaître sur une nouvelle ligne. Limite le nombre de suggestions de biens à quelques résultats pertinents.

    Voici les informations sur les biens disponibles :
    ${formattedBiens}`

  const prompt = `
    Tu es un assistant virtuel pour le site immobilier LocaTech. Ton rôle est d'aider les utilisateurs à naviguer sur le site et à trouver des biens immobiliers.

    Voici les pages disponibles et leurs liens relatifs : (fais pas changer les liens + generer des liens de ces ..)
    - 🔗 Acheter(/acheter)
    - 🔗 Louer(/louer)
    - 🔗 Blog(/blog)
    - 🔗 À propos(/Apropos)
    - 🔗 Contact(/contactUs)
    - 🔗 Crée un Compte en tant que courtier pour deposer des bien(/courtier-signup)
    - 🔗 Crée un Compte en tant que client(/register)
    - 🔗 se connecter (/login)

    Quand un utilisateur pose une question qui concerne une de ces pages, **réponds en incluant un lien cliquable vers cette page en utilisant le format suivant : <link>[Nom de la Page](lien-relatif)</link> , en ajoutant une icône "🔗" avant le nom du lien**.



    Si l'utilisateur demande un bien spécifique, analyse sa requête pour identifier les critères (ville, type, budget, mots-clés dans la description). Recherche dans les informations sur les biens disponibles ceux qui correspondent le mieux à ces critères. Si tu trouves des correspondances, génère un lien vers la page de détails du bien en utilisant le format : <link>[Titre du Bien](/details-bien-client/{ID_DU_BIEN})</link>.

    Voici la question de l'utilisateur :
    "${lowerMessage}"
  `;

  return prompt;
};

export default generatePrompt;