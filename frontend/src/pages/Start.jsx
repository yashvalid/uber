import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.pexels.com/photos/4543112/pexels-photo-4543112.jpeg?auto=compress&cs=tinysrgb&w=600)] h-screen pt-8 w-full bg-red-500 flex justify-between flex-col'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <div className='bg-white pb-7 py-4 px-4'>
            <h1 className='text-3xl font-bold'>Getting started with Uber</h1>
            <Link to="/user-login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
