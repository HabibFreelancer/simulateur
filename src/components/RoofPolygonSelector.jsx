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
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    console.log('Nouveaux points:', newPoints);

    // Ajouter un marqueur à l'endroit cliqué
    const marker = new window.google.maps.Marker({
      position: newPoint,
      map: map,
      label: `${newPoints.length}`,
    });

    setMarkers((prev) => [...prev, marker]);

    console.log('Marqueurs:', markers);


  };

  useEffect(() => {
    if (map) {
      const listener = map.addListener('click', handleMapClick);
      return () => window.google.maps.event.removeListener(listener);
    }
  }, [map, points]);

  useEffect(() => {
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

    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Cliquez sur les 4 coins de votre toiture pour définir la surface.</h2>
      <div ref={mapRef} style={{ width: '100%', height: '80vh' }} className="w-full max-w-4xl" />
      {/* <div ref={mapRef} className="w-full h-full" /> */}
      {/* <p className="text-gray-600 mb-4">Cliquez sur les 4 coins de votre toiture pour définir la surface.</p> */}
      {points.length === 4 && (
        // <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
        <div className='bg-white p-4 rounded shadow-md mt-4 flex flex-col items-center'>
          <p className="font-semibold">Surface estimée : {Math.round(Number(surface))} m²</p>
          <button
            onClick={handleValidate}
            className="mt-4 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
          >
            Valider la surface de ma toiture
          </button>
        </div>
      )}

    </div>

    // <div className="h-screen relative">
    //   <div ref={mapRef} className="w-full h-full" />

    //   {points.length === 4 && (
    //     <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
    //       <p className="font-semibold">Surface estimée : {Math.round(Number(surface))} m²</p>
    //       <button
    //         onClick={handleValidate}
    //         className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
    //       >
    //         Valider la surface de ma toiture
    //       </button>
    //     </div>
    //   )}
    // </div>
  );
};

export default RoofPolygonSelector;
