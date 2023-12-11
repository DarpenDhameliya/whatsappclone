import React from 'react'
import { Switch ,Route, useHistory} from "react-router-dom";
import Home from './pages/chat/Home';


const Api = () => {
  return (
    <>
      {/* <Login /> */}
      <Switch>
      <Route path="/app/home">
        <Home />
      </Route>
      </Switch>      
    </>
  )
}

export default Api