import React, {useRef, useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../camponents/LocationSearchPanel';
import VehiclePanel from '../camponents/VehiclePanel';
import ConfirmRide from '../camponents/ConfirmRide';
import LookingForDriver from '../camponents/LookingForDriver';
import WaitingForFriver from '../camponents/WaitingForFriver';

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelReff = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDrivingRef = useRef(null);

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height : '70%',
        padding : 20,
      })
      gsap.to(panelCloseRef.current,{
        opacity : 1
      })
    } else {
      gsap.to(panelRef.current,{
        height : '0%',
        padding : 0
      })
      gsap.to(panelCloseRef.current,{
        opacity : 0
      })
    }
  }, [panelOpen]);

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelReff.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(vehiclePanelReff.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDrivingRef.current, {
        transform : "translateY(0)",
      })
    } else {
      gsap.to(waitingForDrivingRef.current, {
        transform : 'translateY(100%)',
      })
    }
  }, [waitingForDriver])

  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' />
      </div>

      <div className='flex flex-col justify-end h-screen top-0 w-full absolute'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef}
          onClick={()=> {setPanelOpen(false)
            setVehiclePanel(false);
          }}
           className='absolute right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className='text-2xl font-semibold'>Find a trip</h3>
          <form className='relative py-3' onSubmit={e => handleSubmit(e)}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
                onClick={()=>{setPanelOpen(true)}}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                type="text"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                placeholder='Add a pick-up location'
            />
            <input
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                type="text"
                value={destination}
                onClick={()=>{setPanelOpen(true)}}
                onChange={(e)=> setDestination(e.target.value)}
                placeholder='Enter your destination' />
          </form>
          <button onClick={()=> setVehiclePanel(true)}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
            <LocationSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclePanelReff} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <ConfirmRide setWaitingForDriver={setWaitingForDriver} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <LookingForDriver setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div ref={waitingForDrivingRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <WaitingForFriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
