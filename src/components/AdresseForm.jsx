// 📁 src/components/AdresseForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { useAppContext } from '../context/AppContext';

// Replace with your Google Maps API key
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


// Formulaire de saisie d'adresse
const AdresseForm = () => {
  const [adresse, setAdresse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();
  const { setPosition } = useAppContext();


  // Charger Google Maps avec la clé API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places','geometry'] // Tu peux aussi charger 'places' si nécessaire
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoaded) {
      setErreur("Google Maps API non chargée.");
      return;
    }


    const geocoder = new window.google.maps.Geocoder();


    geocoder.geocode({ address: adresse }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        // Stocker la position dans le contexte global
        setPosition({ lat, lng });

        console.log("Position enregistrée dans le contexte:", { lat, lng });

        // Aller à la carte
        navigate('/map');
      } else {
        setErreur("Adresse introuvable. Vérifie ton entrée.");
      }
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Entrez votre adresse</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ex: 73 route de Mantes, Chambourcy"
          className="border rounded p-2"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        {erreur && <p className="text-red-500">{erreur}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Lancer le simulateur
        </button>
      </form>
    </div>
  );
};

export default AdresseForm;
