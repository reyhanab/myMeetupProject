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
            <div className="home_page" >
                <h2>Welcome, {sessionUser.firstName} 👋</h2>
                <div className="groups-container">
                    <div className="groups">
                        <h3 className="groups-label">Groups</h3>
                        <NavLink to='/user/groups' className='see-all-groups'>See all groups</NavLink>
                    </div>
                    <div className="groups-prview">
                        <img className="group-image-preview" src={groupsArr[0]?.previewImage} />
                        <img className="group-image-preview" src={groupsArr[1]?.previewImage} />
                        <img className="group-image-preview" src={groupsArr[2]?.previewImage} />
                        {(groupsArr[0])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[0]?.id}`}>{groupsArr[0]?.name}</NavLink>:''}
                        {(groupsArr[1])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[1]?.id}`}>{groupsArr[1]?.name}</NavLink>:''}
                        {(groupsArr[2])?<NavLink className='name-group-preview' to={`/groups/${groupsArr[2]?.id}`}>{groupsArr[2]?.name}</NavLink>:''}
                    </div>
                </div>
                <div className="groups-container">
                    <div className="groups">
                        <h3 >Events</h3>
                        <NavLink to='/events' className='see-all-events'>See all events</NavLink>
                    </div>
                    <div className="events-prview">
                        <img className="event-image-preview" src={eventsArr[0]?.previewImage} />
                        <img className="event-image-preview" src={eventsArr[1]?.previewImage} />
                        <img className="event-image-preview" src={eventsArr[4]?.previewImage} />
                        {(eventsArr[0]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[0]?.id}`}>{eventsArr[0]?.name}</NavLink>: ''}
                        {(eventsArr[1]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[1]?.id}`}>{eventsArr[1]?.name}</NavLink>: ''}
                        {(eventsArr[4]) ? <NavLink className='name-event-preview' to={`/events/${eventsArr[4]?.id}`}>{eventsArr[4]?.name}</NavLink>: ''}
                    </div>
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
                <div className="splash-container">
                    <div className="splash">
                        <img src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256"/>
                        <h2>Join a group</h2>
                        <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
                    </div>
                    <div className="splash">
                        <img src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256"/>
                        <h2>Find an event</h2>
                        <p>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
                    </div>
                    <div className="splash">
                        <img src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256"/>
                        <h2>Start a group</h2>
                        <p>You don’t have to be an expert to gather people together and explore shared interests.</p>
                    </div>

                </div>

            </form>
        )
    }


}
export default Homepage;