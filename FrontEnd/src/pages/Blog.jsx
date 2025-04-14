import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaRegCalendarAlt,
  FaRegNewspaper,
  FaArrowRight,
} from 'react-icons/fa';
import '../index.css';

const articles = [
  {
    title: '🚀 LocaTech : Révolutionner la recherche immobilière au Maroc',
    date: 'Avril 2025',
    content:
      'LocaTech est bien plus qu’une simple plateforme : c’est une vision moderne de l’immobilier marocain. Grâce à une technologie intuitive, des filtres avancés et une expérience fluide, notre objectif est de simplifier la recherche de biens immobiliers pour tous les Marocains.',
  },
  {
    title: '🌍 Notre mission chez LocaTech',
    date: 'Avril 2025',
    content:
      'Nous croyons en un accès équitable à l’immobilier. Notre mission est de connecter vendeurs, acheteurs, locataires et professionnels via une plateforme simple, sécurisée et transparente, adaptée au marché marocain.',
  },
  {
    title: '💡 Innovation et digitalisation du secteur immobilier',
    date: 'Mars 2025',
    content:
      'LocaTech digitalise le secteur en introduisant des cartes interactives, des outils de comparaison de prix, et un système de gestion d’annonces intelligent. Notre approche permet un gain de temps et une prise de décision plus éclairée.',
  },
  {
    title: '🏘️ Conseils pour les utilisateurs de LocaTech',
    date: 'Mars 2025',
    content:
      'Optimisez votre expérience sur LocaTech : utilisez les filtres avancés, créez une alerte pour ne rater aucune offre, et consultez notre blog pour des conseils en immobilier au Maroc.',
  },
  {
    title: '📊 Tendances du marché immobilier au Maroc',
    date: 'Février 2025',
    content:
      'Découvrez les dernières tendances des prix, les quartiers les plus recherchés et les perspectives d’évolution du marché immobilier marocain en 2025.',
  },
  {
    title: '🔑 Guide pour acheter votre premier appartement',
    date: 'Janvier 2025',
    content:
      'Un premier achat immobilier est une étape importante. Ce guide vous explique les démarches à suivre, les aides disponibles et les pièges à éviter pour réussir votre projet.',
  },
  {
    title: '🏡 Comment choisir le bon quartier pour acheter votre maison',
    date: 'Mars 2025',
    content:
      'Choisir le bon quartier est essentiel pour votre futur bien immobilier. Découvrez les critères à prendre en compte, comme la proximité des transports, des écoles et des commerces.',
  },
  {
    title: '🔍 L’importance de la visite virtuelle dans la recherche immobilière',
    date: 'Février 2025',
    content:
      'La visite virtuelle est désormais un atout majeur pour les acheteurs et les locataires. Apprenez comment elle transforme la manière de découvrir un bien immobilier à distance.',
  },
  {
    title: '🏙️ Les quartiers en pleine évolution à Casablanca',
    date: 'Janvier 2025',
    content:
      'Casablanca connaît un développement rapide de ses quartiers. Découvrez les zones à suivre de près pour un investissement immobilier prometteur.',
  },
  // Nouveaux articles ajoutés
  {
    title: '🏘️ Les meilleures stratégies d’investissement immobilier au Maroc',
    date: 'Avril 2025',
    content:
      'Découvrez les stratégies gagnantes pour investir dans l’immobilier au Maroc. Apprenez à identifier les meilleures opportunités, à négocier efficacement et à optimiser votre rentabilité.',
  },
  {
    title: '🔑 Comment bien préparer son dossier pour obtenir un crédit immobilier',
    date: 'Mars 2025',
    content:
      'Obtenir un crédit immobilier est une étape cruciale pour tout acheteur. Ce guide vous montre comment constituer un dossier solide et maximiser vos chances d’obtenir un prêt à des conditions avantageuses.',
  },
  {
    title: '💡 Les avantages de l’immobilier locatif au Maroc',
    date: 'Février 2025',
    content:
      'Investir dans l’immobilier locatif peut être une source de revenus stable. Découvrez les avantages fiscaux, les tendances du marché et comment choisir le bien idéal pour la location.',
  },
  {
    title: '🌍 L’impact des nouvelles technologies sur le secteur immobilier',
    date: 'Janvier 2025',
    content:
      'Les nouvelles technologies, comme l’intelligence artificielle et la blockchain, transforment le secteur immobilier. Apprenez comment ces innovations rendent les transactions plus transparentes et plus rapides.',
  },
  {
    title: '🏙️ Les quartiers les plus prisés pour investir à Marrakech',
    date: 'Janvier 2025',
    content:
      'Marrakech est une ville dynamique avec de nombreux quartiers en pleine croissance. Découvrez les zones les plus populaires pour l’investissement immobilier et les perspectives de rentabilité.',
  },
  {
    title: '🔍 Comment évaluer la rentabilité d’un bien immobilier',
    date: 'Décembre 2024',
    content:
      'Avant d’investir, il est crucial d’évaluer la rentabilité d’un bien. Apprenez les critères à prendre en compte pour déterminer si un bien immobilier est un bon investissement à long terme.',
  },
];


const Blog = () => {
  const [showMore, setShowMore] = useState(false);

  // Fonction pour afficher plus d'articles
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Articles à afficher en fonction de l'état showMore
  const articlesToDisplay = showMore ? articles : articles.slice(0, 6);

  return (
    <div className="min-h-screen bg-white pt-36 px-4 sm:px-12 mb-30">
      {/* ⬆️ HEADER */}
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
        Blog Immobilier de <span className="text-black-600">LocaTech</span>
      </h1>
      <p className="text-center text-lg text-black-500 mb-12 max-w-3xl mx-auto">
        Bienvenue sur notre espace de partage ! Chez <strong>LocaTech</strong>, nous croyons en une information accessible et utile pour tous les acteurs de l'immobilier. Retrouvez ici nos articles sur le marché, nos conseils d'experts et notre vision de l'avenir du logement au Maroc.
      </p>

      {/* 📰 ARTICLES */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
        {articlesToDisplay.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-3 text-[#6eac60]">
              <FaRegNewspaper className="mr-2" />
              <h2 className="text-lg font-semibold">{article.title}</h2>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaRegCalendarAlt className="mr-2" />
              <span>{article.date}</span>
            </div>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <div className="text-[#6eac60] flex items-center gap-1 hover:underline cursor-pointer">
              Lire plus <FaArrowRight />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Voir plus / Moins Button */}
      <div className="text-center mt-8">
        <button
          onClick={toggleShowMore}
          className="bg-[#6eac60] text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-[#5c9a56] transition"
        >
          {showMore ? 'Voir moins' : 'Voir plus'}
        </button>
      </div>
    </div>
  );
};

export default Blog;










{/* 📬 NEWSLETTER */}
      {/* <section className="bg-gradient-to-r from-[#a4161a] via-[#ba181b] via-[#F44336] to-[#f5f3f4] text-white py-16 rounded-2xl text-center px-6">
        <h2 className="text-3xl font-bold mb-4">📰 Restez informé !</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">Inscrivez-vous à notre newsletter pour recevoir les dernières tendances immobilières, des conseils pratiques et des annonces exclusives.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="px-4 py-2 rounded-lg text-black w-full sm:w-2/3"
          />
          <Link to='/'>
          <button className="bg-white text-red-500 font-bold px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-100 transition">
            S’inscrire
          </button>
          </Link>
        </div>
      </section> */}