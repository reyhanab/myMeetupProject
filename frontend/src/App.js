import React ,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import CreateGroupPage from "./components/CreateGroupForm";
import { restoreUser } from "./store/session";
import Navigation from './components/Navigation'
import GroupsPage from "./components/GroupsForm";
import GroupDetailPage from "./components/GroupDetailForm";
import { loadGroups } from "./store/group";
import EditGroupPage from "./components/EditGroupForm";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    dispatch(restoreUser()).then(()=> setIsLoaded(true))
  },[dispatch])

  useEffect(()=>{
    dispatch(loadGroups())
},[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <NavLink to='/user/groups'>See all your groups</NavLink>
        {/* {isLoaded && ( */}
          <Switch>
            <Route path='/start/group'>
              <CreateGroupPage />
            </Route>
            <Route path='/user/groups'>
              <GroupsPage />
            </Route>
            <Route exact path='/groups/:groupId'>
              <GroupDetailPage />
            </Route>
            <Route path='/groups/:groupId/edit'>
                <EditGroupPage />
            </Route>

          </Switch>
        {/* )} */}
    </>
  );
}

export default App;
