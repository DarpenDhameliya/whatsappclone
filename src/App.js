import { useState ,useEffect} from 'react';
import './App.css';
import SocketContext, { SocketProvider } from './Context';
import Index from './Component/Index';
import { io } from "socket.io-client";
import { store } from './Store'
import { Provider } from 'react-redux'
function App() {
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   setSocket(io("http://192.168.0.103:8002"))
  // }, [])
  return (
   <>
     {/* <SocketContext.Provider value={ socket }>
      <Index />
    </SocketContext.Provider> */}
    <SocketProvider>
    <Provider store={store}>
      <Index />
    </Provider>
    </SocketProvider>
   </>
  );
}

export default App;