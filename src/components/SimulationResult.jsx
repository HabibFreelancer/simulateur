// 📁 src/components/SimulationResult.jsx
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const SimulationResult = () => {
  const {
    position,
    roofPoints,
    surface,
    inclination,
    consumption,
  } = useAppContext();
  const [estimatedPanels, setEstimatedPanels] = useState(null);
  const [installationCost, setInstallationCost] = useState(null);

  // Calculer une estimation des panneaux en fonction de la consommation et de la surface
  useEffect(() => {
    if (!surface || !consumption || !inclination) return;

    // Approximation de la capacité de production d'un panneau photovoltaïque par m²
    const efficiency = 0.15; // 15% d'efficacité par m² (valeur approximative)
    const panelPower = 300; // 300W par panneau (valeur approximative)
    const avgDailySunHours = 4; // En heures (valeur approximative)

    // Calculer la production totale en kWh/an
    const dailyProduction = surface * efficiency * avgDailySunHours * panelPower / 1000;
    const annualProduction = dailyProduction * 365;

    // Estimer le nombre de panneaux nécessaires pour couvrir la consommation
    const panelsNeeded = Math.ceil(consumption / annualProduction);
    setEstimatedPanels(panelsNeeded);

    // Estimer le coût d'installation basé sur le nombre de panneaux
    const costPerPanel = 2000; // Coût approximatif par panneau en €
    setInstallationCost(panelsNeeded * costPerPanel);
  }, [surface, consumption, inclination]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Résultat de la simulation</h2>

      <div className="w-full max-w-lg bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Résumé de votre installation photovoltaïque</h3>

        <div className="mb-4">
          <p><strong>Adresse : </strong>{`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`}</p>
          <p><strong>Surface de toiture : </strong>{surface} m²</p>
          <p><strong>Inclinaison : </strong>{inclination}°</p>
          <p><strong>Consommation annuelle : </strong>{consumption} kWh</p>
        </div>

        {estimatedPanels !== null && installationCost !== null ? (
          <>
            <div className="mb-4">
              <p><strong>Nombre de panneaux nécessaires : </strong>{estimatedPanels}</p>
              <p><strong>Coût estimé de l'installation : </strong>{installationCost.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            </div>
          </>
        ) : (
          <p>Calcul en cours...</p>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Refaire une simulation
        </button>
      </div>
    </div>
  );
};

export default SimulationResult;
