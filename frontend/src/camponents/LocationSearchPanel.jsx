import React from 'react'

const LocationSearchPanel = ({setVehiclePanel, setPanelOpen}) => {

    const locations = [
        "221B Baker Street, London, Greater London, NW1 6XE, United Kingdom",
        "1600 Amphitheatre Parkway, Mountain View, California, 94043, United States",
        "Nariman Point, Mumbai, Maharashtra, 400021, India",
        "Shibuya Crossing, Tokyo, Tokyo Metropolis, 150-0002, Japan"
      ];
      
  return (
    <div>
        {locations.map((ele,idx)=>
            <div onClick={()=>{
                setVehiclePanel(true)
                setPanelOpen(false);
            }} key={idx} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-3 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'>{ele}</h4>
            </div>
        )}
    </div>
    
  )
}

export default LocationSearchPanel
