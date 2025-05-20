// 📁 src/context/AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Création du contexte global
const AppContext = createContext();

// Hook pour utiliser le contexte facilement
export const useAppContext = () => useContext(AppContext);

// Provider qui englobe toute l'application
export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null); // { lat, lng }
  const [roofPoints, setRoofPoints] = useState([]); // Liste des 4 coins de toiture
  const [surface, setSurface] = useState(0); // Surface en m²
  const [orientation, setOrientation] = useState(''); // Exemple : "Sud-Est"
  const [inclination, setInclination] = useState(null); // 0, 15, 30, 45
  const [consumption, setConsumption] = useState(''); // kWh/an
  const [suggestion, setSuggestion] = useState(null); // Résultat final de simulation

  return (
    <AppContext.Provider
      value={{
        address,
        setAddress,
        position,
        setPosition,
        roofPoints,
        setRoofPoints,
        surface,
        setSurface,
        orientation,
        setOrientation,
        inclination,
        setInclination,
        consumption,
        setConsumption,
        suggestion,
        setSuggestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
