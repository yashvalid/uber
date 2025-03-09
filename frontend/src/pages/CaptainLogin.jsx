import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function CaptainLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const handleSubmit = (e) =>{
        e.preventDefault();
        setCaptainData({
            email: email,
            password: password
        });
        console.log(captainData);
        setEmail('');
        setPassword('');
        setCaptainData({});
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 ml-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
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
