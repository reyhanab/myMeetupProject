import React ,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import { restoreUser } from "./store/session";
import Navigation from './components/Navigation'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    dispatch(restoreUser()).then(()=> setIsLoaded(true))
  },[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
        {/* {isLoaded && ( */}
          <Switch>
           
          </Switch>
        {/* )} */}
    </>
  );
}

export default App;
