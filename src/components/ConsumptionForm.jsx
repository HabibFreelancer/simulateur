// 📁 src/components/ConsumptionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ConsumptionForm = () => {
  const { setConsumption } = useAppContext();
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue <= 0) {
      alert('Veuillez entrer une consommation valide en kWh/an.');
      return;
    }

    setConsumption(numericValue);
    navigate('/result'); // Aller à l'étape finale
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Votre consommation électrique annuelle</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <label htmlFor="consumption" className="block mb-2 text-lg">
          Entrez votre consommation (kWh/an) :
        </label>
        <input
          type="number"
          id="consumption"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex : 4500"
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Valider ma consommation
        </button>
      </form>
    </div>
  );
};

export default ConsumptionForm;
