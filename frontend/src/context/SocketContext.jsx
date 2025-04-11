import React, {createContext, useEffect} from 'react'
import {io} from 'socket.io-client'

export const SocketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

function SocketContext({children}) {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        
    },[]);

  return (
    <div>
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    </div>
    
  )
}

export default SocketContext
