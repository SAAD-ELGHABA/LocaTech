import axios from "axios";

// Your environment variables
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const APP_URL_FRONT_END = import.meta.env.VITE_APP_URL_FRONT_END;

/**
 * Example main handler
 * @param {string} message - The input message from user
 * @param {Function} findBiens - A function to find properties in your DB
 * @returns {Promise<{ reply: string, suggestions: Array, parsed: Object }>}
 */
export async function handleMessageAssistant(message, findBiens) {
  if (!message || typeof message !== "string") {
    throw new Error("Invalid input: message is required");
  }

  try {
    // === 1) Call DeepSeek to parse ===
    const parseResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gryphe/mythomax-l2-13b",
        messages: [
          {
            role: "system",
            content:
              'Vous êtes un assistant immobilier IA. Extrayez la ville, le type (villa ou appartement ou maison) et typeAffaire(louer ou acheter) et le prix maximal en MAD (si ne est pas mentionner donc : metter à null) du message. Répondez UNIQUEMENT en JSON : {"ville":"", "type":"", "typeAffaire":"","max_price":""}',
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "HTTP-Referer": APP_URL_FRONT_END,
          "X-Title": "LocaTech",
        },
      }
    );

    const parsedRaw = parseResponse.data.choices[0].message.content;
    const parsed = JSON.parse(parsedRaw);

    // === 2) Query your DB for properties ===
    const suggestions = await findBiens({
      ville: parsed.ville,
      typeAffaire: parsed.typeAffaire,
      type: parsed.type,
      maxPrice: parsed.max_price,
      limit: 5,
    });

    // === 3) Call DeepSeek to format the final reply ===
    const propertiesArray = suggestions.map((item) => ({
      title: item.title,
      budget: item.budget,
      ville: item.ville,
      type: item.type,
      typeAffaire: item.typeAffaire,
    }));

    const replyResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gryphe/mythomax-l2-13b",
        messages: [
          {
            role: "system",
            content:
              "Vous êtes un assistant immobilier. Formulez une réponse claire en français avec: 1) Les critères demandés, 2) Le nombre de biens trouvés, 3) Une liste concise des propriétés avec titre et prix. Soyez naturel et amical. si tu n'a pas trouvé des immobiliers (biens suggestions) donc donner une message d'excuse sur vous n'avez trouvé aucune ..",
          },
          {
            role: "user",
            content: JSON.stringify(
              {
                critères: parsed,
                biens: propertiesArray,
              },
              null,
              2
            ),
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const reply = replyResponse.data.choices[0].message.content;

    return {
      reply,
      suggestions,
      parsed,
    };
  } catch (error) {
    console.error("DeepSeek handler error:", error.message);
    throw error;
  }
}
