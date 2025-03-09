import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogout = () => {

    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        withCredentials : true
    })
    .then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate("/user-login");
        }
    })
    .catch(err =>{
        console.log(err);
    })

  return (
    <div>
      logout
    </div>
  )
}

export default UserLogout
