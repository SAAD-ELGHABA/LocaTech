import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MapEmbed = ({ mapUrl }) => {
  const extractLatLng = (url) => {
    if (!url) return null;
    const match = url.match(/@([0-9.-]+),([0-9.-]+)/);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }
    return null;
  };

  const isGoogleAppUrl = mapUrl && mapUrl.includes("maps.app.goo.gl");
  const coords = isGoogleAppUrl ? null : extractLatLng(mapUrl);
  const embedUrl = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
    : mapUrl;

  return (
    <div className="justify-center w-full h-60 flex flex-col items-center text-center border rounded border-[#b1a7a6]">
      {mapUrl ? (
        embedUrl ? (
          isGoogleAppUrl ? (
            <p>
              Unable to extract location coordinates directly from this link.
              Displaying the link:
            </p>
          ) : (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          )
        ) : (
          <p>Invalid map URL</p>
        )
      ) : (
        <p className="flex space-x-2 items-center">
          <span>Veullir remplir le champs url</span>
          <FontAwesomeIcon icon={faMapLocationDot} />
        </p>
      )}

      <p className="text-sm text-gray-500">
        {isGoogleAppUrl ? (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        ) : null}
      </p>
    </div>
  );
};

export default MapEmbed;
