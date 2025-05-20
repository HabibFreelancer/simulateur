// 📁 src/components/MapSelector.jsx
import React, { useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Replace with your Google Maps API key
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '80vh'
};


const MapSelector = () => {

  const { position, setPosition } = useAppContext();
  const navigate = useNavigate();
  const [mapRef, setMapRef] = useState(null);
  const [loading, setLoading] = useState(false);



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places', 'geometry'] // Tu peux aussi charger 'places' si nécessaire
  });

  // Callback déclenché au chargement de la carte
  const onLoad = (map) => {
    setMapRef(map);
  };


  const onDragEnd = useCallback(() => {
    if (mapRef) {
      setPosition(mapRef.getCenter().toJSON()); // Mettre à jour le centre après le déplacement
    }
  }, [mapRef]);

  // Récupérer le centre actuel de la carte
  const handleValidate = () => {
    if (mapRef) {
      const center = mapRef.getCenter();
      const newLat = center.lat();
      const newLng = center.lng();

      setPosition({ lat: newLat, lng: newLng }); // Mise à jour du contexte
      navigate('/roof'); // Aller à l'étape suivante
    }
  };

  if (!isLoaded || !position) return <p>Chargement de la carte...</p>;



  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Positionnez votre toiture sous le marqueur</h2>
      <div className="w-full max-w-4xl">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={20}
          onLoad={onLoad}
          onDragEnd={onDragEnd} // Écouter l'événement de fin de déplacement de la carte
          options={{
            mapTypeId: 'satellite',
            streetViewControl: false,
            mapTypeControl: true, // Afficher le contrôle pour changer le type de carte
            fullscreenControl: false,
          }}
        >
          {/* Marqueur fixe au centre */}
          <Marker position={position} />
        </GoogleMap>
      </div>
      <button
        onClick={handleValidate}
        className="mt-4 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
      >
        Valider mon emplacement
      </button>
    </div>

  );
};

export default MapSelector;
