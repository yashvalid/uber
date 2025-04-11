import React from 'react';

const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => { 

    const onSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') 
            setPickup(suggestion.description);
        else if (activeField === 'destination') 
            setDestination(suggestion.description);
        
    }
  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          onClick={() => onSuggestionClick(suggestion)}
          key={idx}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-3 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
