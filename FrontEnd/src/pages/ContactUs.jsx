import React from "react"; 
import { FiArrowRight } from 'react-icons/fi';
import contactImg from '../assets/contactUs.png';

const ContactUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="h-150 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 mt-12" // Espace entre navbar et image
        style={{
            backgroundImage: `url(${contactImg})`, // 🔄 Remplace par ton image
        }}
      >
      </div>

      {/* Contact Form */}
      <div className="flex justify-center -mt-20 px-4 z-20 relative">
        <div className="bg-white shadow-lg rounded w-full max-w-4xl p-8">
          <p className="mb-8 text-center text-gray-700">
            Afin de répondre au mieux à vos questions, nous vous invitons à compléter le formulaire ci-dessous.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">Vous êtes*</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
                  <option>Choisissez votre profil</option>
                  <option>Particulier</option>
                  <option>Professionnel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Vous souhaitez*</label>
                <select className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none">
                  <option>Choisissez votre demande</option>
                  <option>Acheter un bien</option>
                  <option>Louer un bien</option>
                  <option>Poser une question</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Votre message*</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Écrivez votre message ici..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">Votre prénom*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Votre nom*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1 font-medium">Votre code postal*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Votre e-mail*</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Votre téléphone</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <p className="text-xs text-center text-gray-500 mt-2">
              En cochant cette case, j’accepte le traitement de mes données selon la politique de confidentialité de
              LocaTech.
            </p>

            <button
              type="submit"
              className="bg-[#F44336] hover:bg-red-700 text-white py-2 px-6 rounded transition mx-auto block"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      {/* Footer newsletter */}
      <div className="py-10 bg-white-100">
        <p className="mb-2 text-lg font-medium text-center">Suivre l’actualité de LocaTech</p>
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Saisissez votre adresse e-mail"
              className="w-full border border-gray-300 rounded-full px-5 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FiArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Abonnez-vous à nos alertes personnalisées 📨
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
