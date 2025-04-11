import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePop = (props) => {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        console.log("button clicked")
        if(otp === "")
            alert("Please enter OTP");
        
            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
                    params  : {
                        rideId : props.ride._id,
                        otp : otp
                    } , 
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                } )
                console.log("response", response.data);
                navigate("/captain-riding", {state : {ride : props.ride}})
            } catch(err){
                console.log("error",err)
            }
    }
  return (
    <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopUpPanel(false);
                props.setConfirmRidePopUpPanel(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullname.firstname + "  " + props.ride?.user?.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-sm font-medium'>{props.ride?.pickup}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>Pickup</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-sm font-medium'>{props.ride?.drop}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>drop</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-sm font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-xs -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-3 w-full'>
                    <form onSubmit={handleSubmit}>
                        <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button  className='w-full mt-4 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
                            Confirm
                        </button>
                        
                        <button 
                        onClick={()=>{
                            props.setConfirmRidePopUpPanel(false);
                            props.setRidePopUpPanel(false);
                        }}
                        className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>
                    
                </div>
            </div>
        </div>
  )
}

export default ConfirmRidePop
