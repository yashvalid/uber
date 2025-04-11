import React, {useContext, useEffect, useRef, useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import axios from 'axios'; 
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../camponents/LocationSearchPanel';
import VehiclePanel from '../camponents/VehiclePanel';
import ConfirmRide from '../camponents/ConfirmRide';
import LookingForDriver from '../camponents/LookingForDriver';
import WaitingForFriver from '../camponents/WaitingForFriver';
import { SocketDataContext } from '../context/SocketContext';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../camponents/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [fares, setFares] = useState({});
  const [rideDetails, setRideDetails] = useState({});
  const [vehicleType, setVehicleType] = useState('');

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelReff = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDrivingRef = useRef(null);
  const navigate = useNavigate();

  const {socket} = useContext(SocketDataContext);
  const {user} = useContext(userDataContext);
  
  useEffect(() =>{
    socket.emit('join', {userId : user._id, userType : 'user'});
  }, [])

  socket.on('ride-confirmed', (data) => {
    setWaitingForDriver(true);
    setVehicleFound(false);
    setRideDetails(data);
  })

  socket.on('ride-started', ride =>{
    console.log("ride started", ride);
    setWaitingForDriver(false);
    navigate('/riding', {state : {ride}});
  })

  socket.on('ride-completed', ride =>{
    console.log("ride completed", ride);
    navigate('/home');
  })
  const handlePickup = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { address : e.target.value },
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setPickupSuggestions(response.data); 
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleDestination = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { address : e.target.value },
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDestinationSuggestions(response.data); 
      
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };


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

  async function findTrip() {
    setVehiclePanel(true);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fares`, 
        {params : {pickup, drop: destination},
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }});
      setFares(response.data.fares);
    } catch(err){ 
      console.log("error",err)
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
      pickup,
      drop: destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setRideDetails(response.data.ride);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

      <div className='h-screen w-screen'>
        <LiveTracking/>
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
                onClick={()=>{
                  setPanelOpen(true)
                  setActiveField('pickup');
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                type="text"
                value={pickup}
                onChange={
                  handlePickup
                }
                placeholder='Add a pick-up location'
            />
            <input
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                type="text"
                value={destination}
                onClick={()=>{
                  setPanelOpen(true)
                  setActiveField('destination');
                }}
                onChange={
                  handleDestination
                }
                placeholder='Enter your destination' />
          </form>
          <button onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
            <LocationSearchPanel 
            suggestions={activeField === 'pickup'? pickupSuggestions : destinationSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
             />
        </div>
      </div>
      <div ref={vehiclePanelReff} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <VehiclePanel 
        setConfirmRidePanel={setConfirmRidePanel} 
        setVehiclePanel={setVehiclePanel}
        setVehicleType={setVehicleType}
        fares={fares}
        
        />
      </div>
      <div ref={confirmRidePanelRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <ConfirmRide 
        setConfirmRidePanel={setConfirmRidePanel} 
        setVehicleFound={setVehicleFound}
        createRide={createRide}
        pickup={pickup}
        drop={destination}
        vehicleType={vehicleType}
        fares={fares[vehicleType]}
        />
      </div>
      <div ref={vehicleFoundRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <LookingForDriver 
        setVehicleFound={setVehicleFound}
        fares={fares}
        createRide={createRide}
        pickup={pickup}
        drop={destination}
        vehicleType={vehicleType}
        />
      </div>
      <div ref={waitingForDrivingRef} className='w-full bg-white fixed bottom-0 z-10 px-3 py-6'>
        <WaitingForFriver 
        setWaitingForDriver={setWaitingForDriver}
        rideDetails={rideDetails}
        setVehicleFound={setVehicleFound}
        />
      </div>
    </div>
  )
}

export default Home
