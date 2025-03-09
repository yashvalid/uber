import React, {useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CaptainLogout = () => {

    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {withCredentials : true})
        .then((res)=>{
            if(res.status === 200){
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        })
        .catch(err =>{
            console.log(err);
        })
  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
