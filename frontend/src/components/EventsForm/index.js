import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import './EventsPage.css'
import { useEffect } from "react";
import { loadAllEvents } from "../../store/event";

function EventsPage(){

    // const location = useLocation()
    // const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(loadAllEvents())
    // },[dispatch, location.key])


    const events = useSelector(state=> state.event)
    if (events.event){
        delete events.event
    }
    const eventsArr = Object.values(events)

    return(
        <>
        <h2 className="your-groups">Events</h2>
        <form className="your-groups-container">

                {eventsArr?.map((event,i)=>(
                        <div key={i} className='group-div'>
                            <p className='group-name'>{event.name}</p>
                            <NavLink  to={`/events/${event.id}`}>
                            <img className="group-image group" src={event.previewImage} />
                            </NavLink>
                            {/* <NavLink key={i} to={`/groups/${group.id}`} >{group.name}</NavLink> */}
                        </div>
                    ))
                }

        </form>
    </>
    )

}
export default EventsPage;


