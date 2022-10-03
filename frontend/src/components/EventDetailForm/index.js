import { useDispatch, useSelector } from "react-redux";
import { deleteEventThunk } from "../../store/event";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadEvent } from "../../store/event";


function EventDetailPage(){
    const sessionUser = useSelector(state => state.session.user)
    // const {id} = sessionUser
    const dispatch = useDispatch()
    const history = useHistory()
    const {eventId} = useParams()
    const event = useSelector(state=> state.event.event)
    const events = useSelector(state => state.event)
    const eventForImage = events[eventId]
    

    useEffect(()=>{
        dispatch(loadEvent(eventId))
      },[dispatch])

    const deleteEvent = async(eventId) =>{
        await dispatch(deleteEventThunk(eventId))
        // return history.push('/events')
    }

        return (

            <form className="group-detail-form">
                <div>
                    <img className='group-image-background' src={eventForImage?.previewImage}/>
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
        {/*
                <div className="edit-delete-div">

                    <NavLink to={`/groups/${groupId}/edit`}>Edit</NavLink>
                    <button onClick={()=>deleteGroup(groupId)}>Delete</button>
                </div> */}

            </form>
        )



}
export default EventDetailPage;