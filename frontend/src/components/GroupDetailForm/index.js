import { NavLink, Redirect, useHistory, useParams,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupThunk } from "../../store/group";
import { loadGroups } from "../../store/group";
import { useEffect } from "react";
import './GroupDetailPage.css'
import { deleteEventThunk, loadAllEvents } from "../../store/event";


function GroupDetailPage(){
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const events = Object.values(useSelector(state=>state.event))
    const groups = useSelector(state=> state.group)
    const {groupId} = useParams()
    const groupEvents = events.filter(e=> e.groupId == groupId)

    const {id} = sessionUser
    const group = groups[groupId]
    const {organizerId} = group

    const location = useLocation()

    useEffect(()=>{
        dispatch(loadGroups())
    },[dispatch, location.key])
    
    useEffect(()=>{
        dispatch(loadAllEvents())
    },[dispatch, location.key])


    const deleteGroup = (e, groupId) =>{
        e.preventDefault()
        console.log(groupEvents)
        dispatch(deleteGroupThunk(groupId))
        groupEvents.map(event=> {dispatch(deleteEventThunk(event.id))})
        alert('Group has been deleted')
        history.push('/')
    }
    // const editGroup = ()=>{
    //     return <Redirect to={`/groups/${groupId}/edit`}/>
    //     // return history.push(`/groups/${groupId}/edit`)

    // }
    let organizerLinks;
    if (id == organizerId){
        organizerLinks = (
            <>
                <div className="edit-delete-div">
                    <NavLink to={`/groups/${groupId}/edit`}>Edit</NavLink>
                    <button onClick={(e)=>deleteGroup(e,groupId)}>Delete</button>
                    <NavLink to={`/groups/${groupId}/event`}>Create Event</NavLink>
                </div>
            </>
        )
    }
    return (
        <form className="group-detail-form">
            <div>
                <img className='group-image-background' src={group?.previewImage}/>
            </div>
            <div className="group-detail-div">
                <h2 >{group?.name}</h2>
                <h3>{group?.about}</h3>
                <h2>Number of Members:{group?.numMembers}</h2>
                <h2>City:{group?.city}</h2>
                <h2>State:{group?.state}</h2>
            </div>
                {organizerLinks}
            {/* <div className="show-events-div">
                <NavLink to={`/groups/${groupId}/events`}>Show Events</NavLink>
            </div> */}
        </form>
    )
}

export default GroupDetailPage;