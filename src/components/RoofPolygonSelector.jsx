// 📁 src/components/RoofPolygonSelector.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RoofPolygonSelector = () => {
  const { position, surface, setRoofPoints, setSurface } = useAppContext();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    debugger
    if (!position) {
      navigate('/map'); // Rediriger si pas de coordonnées définies
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 20,
      mapTypeId: 'satellite' // Ajouter cette ligne pour la vue satellite par défaut

    });

    setMap(mapInstance);
  }, [position, navigate]);

  // Fonction appelée à chaque clic sur la carte
  const handleMapClick = (event) => {
    if (points.length >= 4) return; // Limiter à 4 coins

    const newPoints = [...points, { lat: event.latLng.lat(), lng: event.latLng.lng() }];
    setPoints(newPoints);
    console.log('Nouveaux points:', newPoints);
  };

  useEffect(() => {
    debugger
    if (map) {
      const listener = map.addListener('click', handleMapClick);
      return () => window.google.maps.event.removeListener(listener);
    }
  }, [map, points]);

  useEffect(() => {
    debugger
    if (polygon) polygon.setMap(null); // Effacer le précédent polygon

    if (points.length === 4 && map) {
      const newPolygon = new window.google.maps.Polygon({
        paths: points,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map,
      });
      setPolygon(newPolygon);
      debugger
      // Calculer la surface approximative
      const area = window.google.maps.geometry.spherical.computeArea(newPolygon.getPath());
      setSurface(area.toFixed(2));
    }
  }, [points, map]);

  const handleValidate = () => {
    if (points.length !== 4) {
      alert('Veuillez sélectionner 4 coins de toiture.');
      return;
    }

    setRoofPoints(points); // Sauvegarder les coins
    navigate('/inclination'); // Étape suivante
  };

  return (
    <div className="h-screen relative">
      <div ref={mapRef} className="w-full h-full" />

      {points.length === 4 && (
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
          <p className="font-semibold">Surface estimée : {Math.round(Number(surface))} m²</p>
          <button
            onClick={handleValidate}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Valider la surface de ma toiture
          </button>
        </div>
      )}
    </div>
  );
};

export default RoofPolygonSelector;
