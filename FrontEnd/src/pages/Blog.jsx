// components/Blog.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRegCalendarAlt,
  FaRegNewspaper,
  FaArrowRight,
  FaUserCheck,
  FaChartBar,
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
  // Added 3 new articles
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
];


const Blog = () => {
  return (
    <div className="min-h-screen bg-white pt-36 px-4 sm:px-12 mb-30">

      {/* ⬆️ HEADER */}
      <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
        🏡  Blog Immobilier de <span className="text-black-600">LocaTech</span>
      </h1>
      <p className="text-center text-lg text-black-500 mb-12 max-w-3xl mx-auto">
        Bienvenue sur notre espace de partage ! Chez <strong>LocaTech</strong>, nous croyons en une information accessible et utile pour tous les acteurs de l'immobilier. Retrouvez ici nos articles sur le marché, nos conseils d'experts et notre vision de l'avenir du logement au Maroc.
      </p>

      {/* 📰 ARTICLES */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-3 text-green-700">
              <FaRegNewspaper className="mr-2" />
              <h2 className="text-lg font-semibold">{article.title}</h2>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaRegCalendarAlt className="mr-2" />
              <span>{article.date}</span>
            </div>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <div className="text-green-600 flex items-center gap-1 hover:underline cursor-pointer">
              Lire plus <FaArrowRight />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📬 NEWSLETTER */}
      <section className="bg-gradient-to-r from-[#a4161a] via-[#ba181b] via-[#F44336] to-[#f5f3f4] text-white py-16 rounded-2xl text-center px-6">
        <h2 className="text-3xl font-bold mb-4">📰 Restez informé !</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">Inscrivez-vous à notre newsletter pour recevoir les dernières tendances immobilières, des conseils pratiques et des annonces exclusives.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="px-4 py-2 rounded-lg text-black w-full sm:w-2/3"
          />
          <button className="bg-white text-red-500 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            S’inscrire
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
