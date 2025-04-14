import React, { useState } from "react";
import GoogleMapComponent from "../../../components/GoogleMapComponent";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import MapFromUrl from "../../../components/MapFormUrl";

function Info() {
  const dispatch = useDispatch();
  const createBien = useSelector((state) => state.CreateBienReducer);
  const villes = useSelector((state) => state.VillesReducer);

  return (
    <div className="mx-8 my-2 flex space-x-1">
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
            Superficier d'annonce
          </label>
          <input
            type="text"
            name="superficier"
            placeholder="Veuillez entrer la superficier d'annonce"
            value={createBien.superficier || ""}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { ville: e.target.value },
              });
            }}
          >
            <option value="">seleter la ville </option>
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { type: e.target.value },
              });
            }}
          >
            <option value="">seleter le type </option>
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
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { typeAffaire: e.target.value },
              });
            }}
          >
            <option value="">seleter le type </option>
            <option value="Acheter">Acheter</option>
            <option value="Louer">Louer</option>
          </select>
        </div>
      </div>
      <div className="w-1/3 flex flex-col  space-y-9">
        <div>
          <label className="block text-sm font-medium mb-1">
            Map d'annonce (url)
          </label>
          <input
            type="url"
            name="map"
            value={createBien.mapUrl || ""}
            onChange={(e) => {
              dispatch({
                type: "SET_CREATE_BIEN",
                payload: { mapUrl: e.target.value },
              });
            }}
            placeholder="Veuillez entrer le lien de google map d'annonce"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <p>voir dans google map Simulateur</p>
          <span>
            <FontAwesomeIcon icon={faAnglesDown} />
          </span>
        </div>
        <MapFromUrl mapUrl={createBien.mapUrl} />
      </div>
    </div>
  );
}

export default Info;
