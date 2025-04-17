import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apropos1 from '../assets/Apropos1.png';
import Apropos2 from '../assets/Apropos2.png';
import {Globe,Building2,Users,House,CalendarDays,Phone,MapPin} from 'lucide-react';

const Apropos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/merci'); // redirection vers page merci
    }, 3000); // simulation 3s d'envoi
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 mt-28">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-20">
          LES LEADERS DE LA LOCATION IMMOBILIÈRE <span className='text-red-500'>LOCATECH</span> AU MAROC
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[500px]">
          {/* Contenu Textuel - Left */}
          <div className="space-y-4 text-gray-700 text-left h-full">
            <p className="leading-relaxed">
              <b>LocaTech</b> est une agence immobilière innovante spécialisée dans la location de propriétés haut de gamme intégrant les dernières technologies au Maroc. Notre expertise couvre les principales villes du royaume, notamment Marrakech, Casablanca, Rabat et Tanger.
            </p>
            <p className="leading-relaxed">
              LocaTech accompagne propriétaires et locataires, locaux et internationaux, dans leurs projets immobiliers intelligents et connectés.
            </p>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Nos services principaux :</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Location courte et longue durée de propriétés équipées de technologies avancées (domotique, sécurité intelligente, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Gestion technique et maintenance des biens connectés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Conseils en optimisation technologique pour les propriétaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Solutions clés en main pour locataires exigeants</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tswira - Right */}
          <div className="w-full h-full flex items-stretch">
            <img 
              src={Apropos2}
              alt="LocaTech Smart Home" 
              className="rounded shadow-lg w-full object-cover h-full"
            />
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="my-16">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">CHIFFRES CLÉS</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <Globe className="text-red-500 text-3xl mx-auto mb-3 "/>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">5</h3>
            <p className="text-gray-700">Langues parlées par notre équipe pour servir une clientèle internationale</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <Building2 className="text-red-500 text-3xl mx-auto mb-3 "/>

            <h3 className="text-4xl font-bold text-gray-800 mb-2">10</h3>
            <p className="text-gray-700">Villes couvertes au Maroc avec des propriétés high-tech disponibles</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <Users className="text-red-500 text-3xl mx-auto mb-3 "/>

            <h3 className="text-4xl font-bold text-gray-800 mb-2">50+</h3>
            <p className="text-gray-700">Nationalités différentes parmi nos clients</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <House className="text-red-500 text-3xl mx-auto mb-3 "/>

            <h3 className="text-4xl font-bold text-gray-800 mb-2">300</h3>
            <p className="text-gray-700">Propriétés intelligentes gérées par LocaTech</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <CalendarDays className="text-red-500 text-3xl mx-auto mb-3"/>

            <h3 className="text-4xl font-bold text-gray-800 mb-2">2020</h3>
            <p className="text-gray-700">Pionniers de l'immobilier connecté au Maroc</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
          <Globe className="text-red-500 text-3xl mx-auto mb-3 "/>

            <h3 className="text-4xl font-bold text-gray-800 mb-2">15,000</h3>
            <p className="text-gray-700">Visiteurs mensuels sur notre plateforme</p>
          </div>
        </div>
      </section>

      {/* Hero Section Reverse */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-20">
          UNE NOUVELLE VISION POUR L’IMMOBILIER CONNECTÉ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]">
          {/* Image - Left */}
          <div className="w-full h-full flex items-stretch">
            <img 
              src={Apropos1}
              alt="Technologie immobilière moderne" 
              className="rounded shadow-lg w-full object-cover h-full"
            />
          </div>

          {/* Contenu Textuel - Right */}
          <div className="space-y-4 text-gray-700 text-left h-full">
            <p className="leading-relaxed">
              Chez <b>LocaTech</b>, nous croyons que la technologie peut révolutionner la manière de vivre, louer et gérer des biens immobiliers. Nous mettons l’innovation au cœur de chaque projet.
            </p>
            <p className="leading-relaxed">
              Grâce à des systèmes domotiques, une gestion à distance et une expertise locale, nous créons des expériences locatives uniques, pratiques et sécurisées pour chaque client.
            </p>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pourquoi choisir LocaTech ?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Intégration intelligente pour un confort quotidien</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Accompagnement personnalisé selon vos besoins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Engagement pour un immobilier plus durable et digital</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✔</span>
                  <span>Support technique réactif et multilingue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-16 mb-16">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">COMMENT POUVONS-NOUS VOUS AIDER ?</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="bg-[#f5f3f4] p-6 rounded shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input 
          type="text" 
          placeholder="Nom" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input 
          type="email" 
          placeholder="Adresse électronique" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
          required 
        />
      </div>
      <div>
        <textarea 
          placeholder="Comment pouvons-nous vous aider ?" 
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
          required
        />
      </div>
      <div className="flex flex-col items-end space-y-2 w-full">
  <div className="relative">
    <button
      type="submit"
      disabled={loading}
      className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition w-fit cursor-pointer"
    >
      {loading ? "Envoi en cours..." : "Envoyer un message"}
    </button>

    {loading && (
      <div className="absolute left-0 bottom-0 w-full">
        <div className="h-1 w-full bg-gray-300 overflow-hidden">
          <div className="h-full bg-gray-500 animate-loadingBar"></div>
        </div>
      </div>
    )}
  </div>
</div>

    </form>
          </div>

          {/* Infos de Contact */}
          <div className="bg-[#f5f3f4] p-6 rounded shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contactez-nous</h3>
              <p className="text-gray-700">Notre équipe dynamique et multilingue est à votre écoute pour répondre à vos besoins.</p>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="text-red-500 text-xl mt-1"/>
              <div>
                <h4 className="font-medium text-gray-800">Téléphone</h4>
                <p className="text-gray-700">+212 5 21 22 05 99</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="text-red-500 text-xl mt-1"/>
              <div>
                <h4 className="font-medium text-gray-800">Adresse</h4>
                <p className="text-gray-700">
                  LocaTech Maroc<br />
                  3ème étage, Résidence TechPark<br />
                  Avenue Mohammed VI, Marrakech 40000, Maroc
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Apropos;
