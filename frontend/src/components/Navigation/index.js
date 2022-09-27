import { NavLink } from 'react-router-dom';
import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import LoginForm from '../LoginFormModal/LoginForm';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation (isLoaded){
    const sessionUser = useSelector(state => state.session.user)
    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <ProfileButton user={sessionUser}/>
        )
    }else{
        sessionLinks = (
            <>
            <LoginFormModal />
            <SignupFormModal />
            </>
        )
    }
    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home Page</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}
export default Navigation;