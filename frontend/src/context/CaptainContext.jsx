import React, {useState} from 'react'
import { createContext } from 'react'

export const captainDataContext = createContext();

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({
        fullname : {
            firstname : "",
            lastname : "",
        },
        email : "",
        password : "",
        vehicle : {
            color : "",
            plate : "",
            capacity : "",
            vehicleType : ""
        }
    });

    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) =>{
        setCaptain(captainData);
    }

    const value = {
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsloading,
        error,
        setError
    }

  return (
    <div>
        <captainDataContext.Provider value={value}>
            {children}
        </captainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
