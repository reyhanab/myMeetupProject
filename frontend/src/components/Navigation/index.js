import { NavLink } from 'react-router-dom';
import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import LoginForm from '../LoginFormModal/LoginForm';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logo from './images/logo.png'


function Navigation (isLoaded){
    const sessionUser = useSelector(state => state.session.user)
    const depthLevel = 0;
    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <p className='profile_nav'>
                <NavLink className='startGroup' to='/start/group'>Start a new group!</NavLink>
                <ProfileButton className='profileButton' user={sessionUser} depthLevel={depthLevel}/>
            </p>

        )
    }else{
        sessionLinks = (
            <p className='log_sign_div'>
                <LoginFormModal />
                <SignupFormModal />
            </p>
        )
    }
    return (

            <div className='nav'>
                <NavLink exact to='/'>
                    <img className='logo' src={logo}/>
                </NavLink>
                {isLoaded && sessionLinks}
            </div>


    )
}
export default Navigation;