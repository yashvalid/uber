import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { captainDataContext } from '../context/CaptainContext'


function CaptainLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { captain, setCaptain} = useContext(captainDataContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const captainData = {
            email,
            password,
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData, {withCredentials : true});
        
        if(response.status === 201){
            setCaptain(response.data.captain);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/captain-home');
        }
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
            <form onSubmit={(e)=> handleSubmit(e)}>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder='example@gmail.com'
                    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                />
                <h3 className='text-lg font-medium mb-2'>password</h3>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                />
                <button type="submit" className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            </form>
            <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>
        </div>
        <div>
            <Link
                to='/user-login'
                className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as user
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
