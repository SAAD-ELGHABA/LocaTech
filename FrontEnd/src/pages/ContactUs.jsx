import React, { useState } from "react"; 
import { FiArrowRight, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';
import contactImg from '../assets/contactUs.png';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    profile: "",
    request: "",
    message: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });  // ولات تعمر كل مرة تلمس فيها الشامب
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        validationErrors[field] = "Ce champ est obligatoire";
      }
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // هنا تتبع الإجراءات الأخرى ديال الإرسال، مثل emailjs...
  
      const serviceID = 'service_ob448ie';
      const templateID = 'template_wb5anxy';
      const publicKey = 'VT45WTgA23GdfOX5Z';

      emailjs.send(serviceID, templateID, formData, publicKey)
        .then(() => {
          alert("✅ Votre demande a été envoyée à LocaTech avec succès !");
          localStorage.setItem('submissionMessage', 'Votre demande a été envoyée à LocaTech. Nous reviendrons vers vous dans les plus brefs délais !');
          setTimeout(() => {
            navigate('/');
          }, 1000);
          setFormData({
            profile: "",
            request: "",
            message: "",
            firstName: "",
            lastName: "",
            postalCode: "",
            email: "",
            phone: "",
          });
          setTouchedFields({});
        }, (err) => {
          console.log('FAILED...', err);
          alert("❌ Une erreur est survenue. Veuillez réessayer.");
        });
    }
  };

  const renderInputIcon = (field) => {
    // هنا كنديرو check واش القيمة خاوية ولا لا من بعد ما تدير submit
    if (errors[field]) {  // إذا كان عندنا خطأ فالشامب
      return <FiXCircle className="text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />;
    } else if (formData[field]) {  // إلا كانت القيمة معمّرة
      return <FiCheckCircle className="text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />;
    }
    return null; // إلا ما كانش خطأ وما كانتش القيمة، ما كيظهر والو
  };
  

  return (
    <div className="bg-white">
      <div className="h-150 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 mt-12" style={{ backgroundImage: `url(${contactImg})` }}></div>

      <div className="flex justify-center -mt-20 px-4 z-20 relative">
        <div className="bg-white shadow-lg rounded w-full max-w-4xl p-8">
          <p className="mb-8 text-center text-gray-700">
            Afin de répondre au mieux à vos questions, nous vous invitons à compléter le formulaire ci-dessous.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* profile & request */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile */}
              <div>
                <label className="block text-sm mb-1 font-medium">Vous êtes*</label>
                <div className="relative">
                  <select
                    name="profile"
                    className={`w-full border ${errors.profile ? 'border-red-500' : formData.profile ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.profile}
                    onChange={handleInputChange}
                  >
                    <option value="">Choisissez votre profil</option>
                    <option value="Particulier">Particulier</option>
                    <option value="Professionnel">Professionnel</option>
                  </select>
                  {renderInputIcon('profile')}
                </div>
                {errors.profile && <p className="text-red-500 text-sm text-center mt-1">{errors.profile}</p>}
              </div>

              {/* Request */}
              <div>
                <label className="block text-sm mb-1 font-medium">Vous souhaitez*</label>
                <div className="relative">
                  <select
                    name="request"
                    className={`w-full border ${errors.request ? 'border-red-500' : formData.request ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.request}
                    onChange={handleInputChange}
                  >
                    <option value="">Choisissez votre demande</option>
                    <option value="Acheter un bien">Acheter un bien</option>
                    <option value="Louer un bien">Louer un bien</option>
                    <option value="Poser une question">Poser une question</option>
                  </select>
                  {renderInputIcon('request')}
                </div>
                {errors.request && <p className="text-red-500 text-sm text-center mt-1">{errors.request}</p>}
              </div>
            </div>

            {/* message */}
            <div>
              <label className="block text-sm mb-1 font-medium">Votre message*</label>
              <div className="relative">
                <textarea
                  name="message"
                  rows="4"
                  className={`w-full border ${errors.message ? 'border-red-500' : formData.message ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                  placeholder="Écrivez votre message ici..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {renderInputIcon('message')}
              </div>
              {errors.message && <p className="text-red-500 text-sm text-center mt-1">{errors.message}</p>}
            </div>

            {/* first & last name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm mb-1 font-medium">Votre prénom*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    className={`w-full border ${errors.firstName ? 'border-red-500' : formData.firstName ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('firstName')}
                </div>
                {errors.firstName && <p className="text-red-500 text-sm text-center mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm mb-1 font-medium">Votre nom*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    className={`w-full border ${errors.lastName ? 'border-red-500' : formData.lastName ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('lastName')}
                </div>
                {errors.lastName && <p className="text-red-500 text-sm text-center mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* postal code & email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Postal Code */}
              <div>
                <label className="block text-sm mb-1 font-medium">Votre code postal*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="postalCode"
                    className={`w-full border ${errors.postalCode ? 'border-red-500' : formData.postalCode ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('postalCode')}
                </div>
                {errors.postalCode && <p className="text-red-500 text-sm text-center mt-1">{errors.postalCode}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1 font-medium">Votre e-mail*</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className={`w-full border ${errors.email ? 'border-red-500' : formData.email ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {renderInputIcon('email')}
                </div>
                {errors.email && <p className="text-red-500 text-sm text-center mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* phone */}
            <div>
              <label className="block text-sm mb-1 font-medium">Votre téléphone*</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  className={`w-full border ${errors.phone ? 'border-red-500' : formData.phone ? 'border-green-500' : 'border-gray-300'} rounded px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {renderInputIcon('phone')}
              </div>
              {errors.phone && <p className="text-red-500 text-sm text-center mt-1">{errors.phone}</p>}
            </div>

            <p className="text-xs text-center text-gray-500 mt-2">
              En cochant cette case, j’accepte le traitement de mes données selon <span className="text-stone-400 cursor-pointer">la politique de confidentialité</span> de LocaTech.
            </p>

            <button
              type="submit"
              className="bg-[#F44336] hover:bg-red-700 text-white cursor-pointer py-2 px-6 rounded transition mx-auto block"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

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
