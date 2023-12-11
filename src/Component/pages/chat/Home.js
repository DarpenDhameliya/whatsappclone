// import React, { useContext , useEffect } from 'react'
// import SocketContext from '../../../Context';
import React ,{useEffect} from 'react';
import LeftHome from './LeftHome';
import RightHome from './RightHome';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  // const socket = useContext(SocketContext);
useEffect(() => {
  let data = localStorage.getItem('whatsapp_user')
  if(!data){
    history.pushState('/')
  }
}, [])

  return (
    <>
      <div className='whatsapp_main'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <LeftHome />
            </div>
            <div className='col-md-8'>
              <RightHome />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home