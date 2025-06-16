import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Info() {
  const dispatch = useDispatch();
  const createBien = useSelector((state) => state.CreateBienReducer);
  const villes = useSelector((state) => state.VillesReducer);
  const [quartiesVille, setQuartiersVille] = useState([]);
  const fetchQuartiersVille = async (ville) => {
    try {
      const res = await axios.get(`/api/get-quartier-ville/${ville}`);
      console.log(res);
      setQuartiersVille(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchQuartiersVille(createBien?.ville);
  }, [createBien?.ville]);
  return (
    <div className="mx-8 my-2 flex space-x-6 overflow-y-auto">
      <div className="w-1/3 flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Titre d'annonce
          </label>
          <input
            type="text"
            name="titre"
            placeholder="Veuillez entrer le titre d'annonce"
            value={createBien.title || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { title: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Description d'annonce
          </label>
          <textarea
            name=""
            id=""
            rows={12}
            placeholder="Veuillez entrer la description d'annonce"
            value={createBien.description || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { description: e.target.value },
              });
            }}
          ></textarea>
        </div>
      </div>
      <div className="w-1/3 flex flex-col space-y-6 ">
        <div>
          <label className="block text-sm font-medium mb-1">
            Budget d'annonce
          </label>
          <input
            type="number"
            name="budget"
            placeholder="Veuillez entrer le budget d'annonce"
            value={createBien.budget || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { budget: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Superficie d'annonce
          </label>
          <input
            type="number"
            name="superficier"
            placeholder="Veuillez entrer la superficier d'annonce"
            value={createBien.superficier || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { superficier: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Ville d'annonce
          </label>
          <select
            name=""
            id=""
            value={createBien.ville || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { ville: e.target.value },
              });
            }}
          >
            <option value="">Sélectionner la ville </option>
            {villes &&
              villes.map((ville) => (
                <option value={ville.nom} key={ville.id}>
                  {ville.nom}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Type d'annonce
          </label>
          <select
            name=""
            id=""
            value={createBien.type || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { type: e.target.value },
              });
            }}
          >
            <option value="">Sélectionner le type de bien </option>
            <option value="appartement">appartement</option>
            <option value="maison">maison</option>
            <option value="villa">villa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Type d'affaire
          </label>
          <select
            name=""
            id=""
            value={createBien.typeAffaire || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { typeAffaire: e.target.value },
              });
            }}
          >
            <option value="">Sélectionner le type d'affaire</option>
            <option value="acheter">Acheter</option>
            <option value="louer">Louer</option>
          </select>
        </div>
      </div>
      <div className="w-1/3 flex flex-col  space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre de chambres
          </label>
          <input
            type="number"
            name="chambres"
            placeholder="Veuillez entrer le Nombre de chambres"
            value={createBien.chambres || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { chambres: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre de salles de bain
          </label>
          <input
            type="number"
            name="salles_de_bain"
            placeholder="Veuillez entrer le Nombre de salles de bain"
            value={createBien.salles_de_bain || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { salles_de_bain: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Étage (si applicable)
          </label>
          <input
            type="number"
            name="etage"
            placeholder="Veuillez entrer le Nombre d'Étage"
            value={createBien.etage || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { etage: e.target.value },
              });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quartier</label>
          {/* <input
            type="text"
            name="Quartier"
            placeholder="Veuillez entrer la Quartier de bien"
            value={createBien.quartier || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { quartier: e.target.value },
              });
            }}
          /> */}
          <select
            id=""
            name="Quartier"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { quartier: e.target.value },
              });
            }}
            value={quartiesVille?.find(q=>q?.nom===createBien.quartier)?.nom}
          >
            {quartiesVille?.length > 0 ? (
              quartiesVille?.map((q) => (
                <option value={q?.nom} selected={createBien.quartier=== q?.nom && true}>{q?.nom}</option>
              ))
            ) : (
              <option value="">vous devez d'abord choisir la ville</option>
            )}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium mb-1">
            Meublé
            <span className="text-gray-600 ms-2 ">
              (veuillez coucher ce case à cocher si la bein est meublé)
            </span>
          </label>
          <input
            type="checkbox"
            name="meublé"
            checked={createBien.meuble || false}
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { meuble: e.target.checked },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Info;
