import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import{ userDataContext } from './context/UserContext'


const App = () => {

  const result = useContext(userDataContext);
  console.log(result)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
      </Routes>
     
    </div>
  )
}

export default App
