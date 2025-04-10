<form className="p-6 text-sm space-y-4" onSubmit={handleRegister}>
  <div className="flex gap-6">
    <Input label="Nom Complet" name="nom_complet" required />
    <Input label="Email" name="email" type="email" required />
  </div>
  <div className="flex gap-6">
    <Input label="CIN" name="cin" required />
    <Input label="Téléphone" name="tele" required />
  </div>
  <div className="flex gap-6">
    <Input label="Nom Agence Rattachement" name="nom_agence_rattachement" />
    <Input label="Site Web" name="site_web" />
  </div>
  <div className="flex gap-6">
    <Input label="Années d'expérience" name="annees_experience" />
    <Input label="Type d'activité" name="type_activite" required />
  </div>
  <div className="flex gap-6">
    <Input label="Zone d'activité" name="zone_activite" required />
    <Input label="SEO" name="seo" />
  </div>
  <div className="flex gap-6">
    <Input
      label="Licence professionnelle"
      name="licence_professionnelle"
      required
    />
    <Input label="Brève présentation" name="breve_presentation" />
  </div>
  <div className="flex gap-6">
    <Input label="Mot de passe" name="password" type="password" required />
    <Input
      label="Confirmer mot de passe"
      name="password_confirmation"
      type="password"
    />
  </div>

  <div className="text-right pt-4 flex justify-between items-center">
    <span className="space-x-2 flex">
      <p>Vous avez déjà un compte ?</p>
      <Link to="/login" className="text-sm hover:underline text-green-500">
        Se connecter
      </Link>
    </span>
    <button
      type="submit"
      className={`text-sm w-1/3 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 flex items-center justify-center ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-red-600 cursor-pointer"
      }`}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      ) : (
        "S'inscrire"
      )}
    </button>
  </div>
</form>;
