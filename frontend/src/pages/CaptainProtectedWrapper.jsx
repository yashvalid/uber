import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { captainDataContext } from '../context/CaptainContext';

const CaptainProtectedWrapper = ({children}) => {
    const {captain, setCaptain} = useContext(captainDataContext);
    const [isLoading , setIsloading] = useState(true);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!token)
            navigate("/captain-login");
    }, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, {withCredentials : true})
    .then((res)=>{
        if(res.status === 200){
            setCaptain(res.data.captain);
            setIsloading(false);
        }
    })
    .catch(err =>{
        localStorage.removeItem('token');
        console.log(err);
        navigate("/captain-login");
    })

    if(isLoading){
        return <div>Loading...</div>
    }


  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper
