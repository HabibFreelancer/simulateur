// 📁 src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdresseForm from './components/AdresseForm';
import MapSelector from './components/MapSelector';
import RoofPolygonSelector from './components/RoofPolygonSelector';
import InclinationSelector from './components/InclinationSelector';
import ConsumptionForm from './components/ConsumptionForm';
import SimulationResult from './components/SimulationResult';
import { AppProvider } from './context/AppContext';

// App principal contenant la navigation entre les étapes de simulation
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Étape 1: Formulaire d'adresse */}
          <Route path="/" element={<AdresseForm />} />

          {/* Étape 2: Sélection de l'emplacement sur la carte */}
          <Route path="/map" element={<MapSelector />} />

          {/* Étape 3: Sélection du pan de toiture */}
          <Route path="/roof" element={<RoofPolygonSelector />} />

          {/* Étape 4: Choix de l'inclinaison */}
          <Route path="/inclination" element={<InclinationSelector />} />

          {/* Étape 5: Saisie de la consommation */}
          <Route path="/consumption" element={<ConsumptionForm />} />

          {/* Étape 6: Résultat final de la simulation */}
          <Route path="/result" element={<SimulationResult />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
