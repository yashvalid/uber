import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'

function UserLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {user, setUser} = useContext(userDataContext)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const user = {
            email,
            password,
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
        
        if(response.status === 201){
            const data = response.data;
            setUser(data);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        }
        
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
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
                <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            </form>
            <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
        </div>
        <div>
            <Link
                to='/captain-login'
                className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as Captain
            </Link>
        </div>
    </div>
  )
}

export default UserLogin
