import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🏡 Le Blog Immobilier de LocaTech
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Bienvenue sur notre espace de partage ! Chez <strong>LocaTech</strong>, nous croyons en une information accessible et utile pour tous les acteurs de l'immobilier. Retrouvez ici nos articles sur le marché, nos conseils d'experts et notre vision de l'avenir du logement au Maroc.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="shadow-md rounded-2xl"
          >
            <Card className="rounded-2xl border-gray-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-[#0a1c3d]">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <p className="text-gray-700 text-base">{article.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
