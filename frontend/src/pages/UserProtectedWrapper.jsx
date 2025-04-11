import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'



const UserProtectedWrapper = ({children}) => {
    const {user, setUser} = useContext(userDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() =>{
        if(!token){
            navigate("/user-login");
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
            }
        },)
        .then((res)=>{
          if(res.status === 200){
            setUser(res.data);
            setIsLoading(false);
          }
        })
        .catch(err =>{
            localStorage.removeItem('token');
            console.log(err);
            navigate("/user-login");
        })
    }, [token])


    if(isLoading){
        return <div>Loading...</div>
    }
    
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper
