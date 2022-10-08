import { useDispatch, useSelector } from "react-redux";
import { deleteEventThunk, loadAllEvents } from "../../store/event";
import { useHistory, useParams, useLocation} from "react-router-dom";
import { loadEvent } from "../../store/event";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";



function EventDetailPage(){
    const sessionUser = useSelector(state => state.session.user)
    const groups = useSelector(state=> state.group)
    const dispatch = useDispatch()
    const history = useHistory()
    const {eventId} = useParams()
    const event = useSelector(state=> state.event.event)
    const events = useSelector(state => state.event)
    const event2 = events[eventId]
    const userId = sessionUser.id
    const {groupId} = event2
    const group = groups[groupId]
    const {organizerId} = group

    useEffect(()=>{
        dispatch(loadEvent(eventId))
      },[dispatch])

    const location = useLocation()

    useEffect(()=>{
        dispatch(loadAllEvents())
    },[dispatch, location.key])

    let editDeleteEvent;
    if (userId === organizerId){
        editDeleteEvent = (
            <div className="edit-delete-div">
                <NavLink className='edit-link' to={`/events/${eventId}/edit`}>Edit</NavLink>
                <button className="delete-link" onClick={(e)=>deleteEvent(e,eventId)}>Delete</button>
            </div>
        )
    }

    const deleteEvent = (e, eventId) =>{
         e.preventDefault()
         dispatch(deleteEventThunk(eventId))
        alert('Event has been deleted')
        return history.push('/')
    }
        return (
            <form className="group-detail-form">
                <div>
                    <img className='group-image-background' src={event2?.previewImage}/>
                </div>
                <div className="group-detail-div">
                    <h2 >{event?.name}</h2>
                    <h3>{event?.description}</h3>
                    <h3>Capacity: {event?.capacity} </h3>
                    <h3>Price: ${event?.price}</h3>
                    <h3>Number of Attendees: {event?.numAttending}</h3>
                    <h3>StartDate: {event?.startDate}</h3>
                    <h3>EndDate: {event?.endDate}</h3>
                </div>
                {editDeleteEvent}
            </form>
        )

}
export default EventDetailPage;