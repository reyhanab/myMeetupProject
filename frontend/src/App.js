import React ,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import CreateGroupPage from "./components/CreateGroupForm";
import { restoreUser } from "./store/session";
import Navigation from './components/Navigation'
import GroupsPage from "./components/GroupsForm";
import GroupDetailPage from "./components/GroupDetailForm";
import { loadGroups } from "./store/group";
import EditGroupPage from "./components/EditGroupForm";
import Homepage from "./components/HomePage";
import { loadAllEvents, loadEvent} from "./store/event";
import EventsPage from "./components/EventsForm";
import EventDetailPage from "./components/EventDetailForm";
import CreateEventPage from "./components/CreateEventForm";
import GroupEventsPage from "./components/GroupEventsForm";
import EditEventPage from "./components/EditEventForm";


function App() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    dispatch(restoreUser()).then(()=> setIsLoaded(true))
  },[dispatch])

  useEffect(()=>{
    dispatch(loadGroups())
},[dispatch])


  useEffect(()=>{
    dispatch(loadAllEvents())
  },[dispatch])
//   useEffect(()=>{
//     dispatch(loadEvents())
// },[dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded}/>

        {/* {isLoaded && ( */}
          <Switch>
            <Route exact path='/'>
              <Homepage />
            </Route>
            <Route path='/start/group'>
              <CreateGroupPage />
            </Route>
            <Route path='/user/groups'>
              <GroupsPage />
            </Route>
            <Route path='/groups/:groupId/edit'>
                <EditGroupPage />
            </Route>
            <Route path='/groups/:groupId/event'>
              <CreateEventPage />
            </Route>
            {/* <Route path='/groups/:groupId/events'>
              <GroupEventsPage />
            </Route> */}
            <Route path='/groups/:groupId'>
              <GroupDetailPage />
            </Route>
            <Route path='/events/:eventId/edit'>
              <EditEventPage />
            </Route>
            <Route path='/events/:eventId'>
              <EventDetailPage />
            </Route>
            <Route path='/events'>
              <EventsPage />
            </Route>
          </Switch>
        {/* )} */}
    </>
  );
}

export default App;
