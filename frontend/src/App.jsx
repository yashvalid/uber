import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import{ userDataContext } from './context/UserContext'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRidding from './pages/CaptainRidding'


const App = () => {

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRidding/>} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout/>
          </CaptainProtectedWrapper>
        } />
      </Routes>
     
    </div>
  )
}

export default App
