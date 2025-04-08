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
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-12 mb-24">

      {/* ⬆️ HEADER */}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        🏡  Blog Immobilier de <span className="text-black-600">Loca</span><span className="text-green-600">Tech</span>
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

      {/* 📈 STATS */}
      <section className="bg-gray-100 py-16 rounded-2xl mb-24">
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-10">📊 Quelques chiffres clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center px-8">
          <div>
            <FaUserCheck size={40} className="text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">+25,000 utilisateurs</h3>
            <p className="text-gray-600">Nous accompagnons acheteurs et locataires au Maroc</p>
          </div>
          <div>
            <FaChartBar size={40} className="text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">+10,000 annonces actives</h3>
            <p className="text-gray-600">Des biens immobiliers vérifiés chaque jour</p>
          </div>
          <div>
            <FaRegNewspaper size={40} className="text-red-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold">+100 articles</h3>
            <p className="text-gray-600">Des conseils et études du marché marocain</p>
          </div>
        </div>
      </section>

      {/* 💬 TÉMOIGNAGES */}
      <section className="mb-24">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">💬 Ce que disent nos utilisateurs</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white border rounded-xl p-6 shadow">
            <p className="italic">"Grâce à LocaTech, j’ai trouvé un appartement à Rabat en moins d’une semaine. Simple, rapide et efficace."</p>
            <p className="text-right font-semibold mt-4 text-green-700">— Samira B.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow">
            <p className="italic">"La plateforme est moderne et intuitive, j’ai pu comparer plusieurs biens très facilement."</p>
            <p className="text-right font-semibold mt-4 text-green-700">— Anas M.</p>
          </div>
        </div>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-16 rounded-2xl text-center px-6">
        <h2 className="text-3xl font-bold mb-4">📰 Restez informé !</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">Inscrivez-vous à notre newsletter pour recevoir les dernières tendances immobilières, des conseils pratiques et des annonces exclusives.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="px-4 py-2 rounded-lg text-black w-full sm:w-2/3"
          />
          <button className="bg-white text-green-600 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            S’inscrire
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
