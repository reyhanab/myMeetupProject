import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { loadAllEvents } from "../../store/event";
import './HomePage.css'
import { useLocation } from 'react-router'
import { loadGroups } from "../../store/group";


function Homepage(){
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllEvents())
    },[dispatch, location.key])
    useEffect(()=>{
        dispatch(loadGroups())
    },[dispatch, location.key])

    const sessionUser = useSelector(state => state.session.user)
    const groupsArr = Object.values(useSelector(state=> state.group))
    const eventsArr = Object.values(useSelector(state=> state.event))

    if (sessionUser){
        return (
            <div >
                <h2>Welcome, {sessionUser.firstName} 👋</h2>
                <div className="groups-container">
                    <h3 className="your-groups">Groups</h3>
                    <div className="groups-prview">
                        <img className="group-image-preview" src={groupsArr[0]?.previewImage} />
                        <img className="group-image-preview" src={groupsArr[1]?.previewImage} />
                        <img className="group-image-preview" src={groupsArr[2]?.previewImage} />
                        {(groupsArr[0])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[0]?.id}`}>{groupsArr[0]?.name}</NavLink>:''}
                        {(groupsArr[1])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[1]?.id}`}>{groupsArr[1]?.name}</NavLink>:''}
                        {(groupsArr[2])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[2]?.id}`}>{groupsArr[2]?.name}</NavLink>:''}
                    </div>
                    <NavLink to='/user/groups' className='see-all-groups'>See all groups</NavLink>
                </div>
                <div className="events-container">
                    <h3 className="your-events">Events</h3>
                    <div className="events-prview">
                        <img className="event-image-preview" src={eventsArr[0]?.previewImage} />
                        <img className="event-image-preview" src={eventsArr[1]?.previewImage} />
                        <img className="event-image-preview" src={eventsArr[2]?.previewImage} />
                        {(eventsArr[0]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[0]?.id}`}>{eventsArr[0]?.name}</NavLink>: ''}
                        {(eventsArr[1]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[1]?.id}`}>{eventsArr[1]?.name}</NavLink>: ''}
                        {(eventsArr[2]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[2]?.id}`}>{eventsArr[2]?.name}</NavLink>: ''}
                    </div>
                    <NavLink to='/events' className='see-all-events'>See all events</NavLink>
                </div>
                <div className="footer">
                    <div className="about-link">
                        <a target="_blank" rel="noopener noreferrer" className="about" href='https://github.com/reyhanab/myMeetupProject'>
                            {/* <img className='github-icon'src="http://localhost:8080/github.png" /> */}
                        Github</a>
                    {/* </div>
                    <div className="about-link"> */}
                        <a target="_blank" rel="noopener noreferrer"  className="about" href='https://www.linkedin.com/in/reyhaneh-abdollahi-408895110/'>
                            {/* <img className='linkedIn-icon'src='http://localhost:8080/linkedIn.png' /> */}
                        LinkedIn</a>
                    </div>
                </div>
            </div>

        )
    }else{
        return (
            <form className="homepage-form">
                <div className="homepage-div">
                    <div>
                        <h1>Celebrating 20 years of real connections on Meetup</h1>
                        <div>Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.Whatever you’re looking to do this year, Meetup can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</div>
                    </div>
                    <img className="homepage-image" src='https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640'></img>
                </div>

            </form>
        )
    }


}
export default Homepage;