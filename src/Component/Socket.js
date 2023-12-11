// import { io } from "socket.io-client";

// const socket = io("http://192.168.0.103:8002");

// export default socket;

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function SocketComponent() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://192.168.0.103:8002');
    setSocket(newSocket);

    // You can listen to socket events here
    newSocket.on('connect', () => console.log('Connected to server'));

    return () => newSocket.disconnect();
  }, []);

  return null; // This component doesn't need to render anything
}

export default SocketComponent;