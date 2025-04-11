import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WaitingForFriver = (props) => {
  const [captainDetails, setCaptainDetails] = useState({});

  useEffect(() =>{
    const fetchData = async () =>{
      const id = props.rideDetails.captain._id;
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/confirmed-captain/${id}`)
        setCaptainDetails(response.data.captain)
        console.log("captain details", response.data.captain)
      } catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [props.rideDetails])
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{captainDetails?.fullname?.firstname + " " + captainDetails?.fullname?.lastname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1 '>{captainDetails?.vehicle?.plate.toUpperCase()}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  {props.rideDetails.otp} </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetails?.pickup}</h3>
              <p className='text-sm -mt-1 text-gray-600'>pickup</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetails?.drop}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Drop</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.rideDetails?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForFriver
