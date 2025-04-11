import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../camponents/CaptainDetails'
import RidePopUp from '../camponents/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePop from '../camponents/ConfirmRidePop'
import {SocketDataContext} from '../context/SocketContext'
import { captainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {

  const [ride, setRide] = useState(null);
  const [ridePopUpPanel , setRidePopUpPanel] = useState(false);
  const [confirmRidePopPanel , setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopPanelRef = useRef(null);

  const {socket} = useContext(SocketDataContext);
  const {captain} = useContext(captainDataContext);

  useEffect(() =>{
    socket.emit('join', {userId : captain._id, userType : 'captain'});

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          
          socket.emit('update-location-captain', {
            userId : captain._id,
            location : {
              ltd : position.coords.longitude,
              lng : position.coords.latitude,
            }
          })
        })
      }
    }
    const updatedLoc = setInterval(updateLocation(), 5000); 
    updateLocation();
  },[])

  socket.on('new-ride', (data) => {
    console.log("new ride", data);
    setRide(data);
    setRidePopUpPanel(true);
  })

  async function confirmRide(){
    try{
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
        rideId : ride._id
      }, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);
      setConfirmRidePopUpPanel(true);
      
    }
    catch(err){
      console.log(err);
    }
  }
  
  useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function(){
    if(confirmRidePopPanel){
      gsap.to(confirmRidePopPanelRef.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(confirmRidePopPanelRef.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [confirmRidePopPanel]);


  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
              <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
      </div>
      <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-2/5 p-6'>
          <CaptainDetails/>
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <RidePopUp 
            setRidePopUpPanel={setRidePopUpPanel} 
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            ride={ride}
            confirmRide={confirmRide}
          />
      </div>
      <div ref={confirmRidePopPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white    px-3 py-10 pt-12'>
          <ConfirmRidePop 
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
            setRidePopUpPanel={setRidePopUpPanel}
            ride={ride}
          />
      </div>
  </div>
  )
}

export default CaptainHome
