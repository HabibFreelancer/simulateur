// 📁 src/components/InclinationSelector.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const InclinationSelector = () => {
  const { setInclination } = useAppContext();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const options = [0, 15, 30, 45];

  const handleValidate = () => {
    if (selected === null) {
      alert("Veuillez sélectionner une inclinaison.");
      return;
    }

    setInclination(selected); // Enregistrer l'inclinaison dans le contexte
    navigate('/consumption'); // Passer à l'étape suivante
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Quelle est l'inclinaison de votre toiture ?</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((angle) => (
          <button
            key={angle}
            onClick={() => setSelected(angle)}
            className={`py-2 px-4 rounded border text-lg ${
              selected === angle ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            {angle}°
          </button>
        ))}
      </div>

      <button
        onClick={handleValidate}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Valider l’inclinaison de ma toiture
      </button>
    </div>
  );
};

export default InclinationSelector;
