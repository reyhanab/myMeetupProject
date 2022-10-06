import { useSelector,useDispatch  } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { loadEvents } from "../../store/event";



function GroupEventsPage(){
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(loadEvents())
    // },[dispatch])

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
                            <NavLink className='group-name group' to={`/events/${event.id}`}>{event.name}
                            <img className="group-image group" src={event.previewImage} />
                            </NavLink>

                        </div>
                    ))
                }

        </form>
    </>
    )

}
export default GroupEventsPage;