import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Dropdown.css'


function Dropdown ({dropdown, depthLevel}){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state=> state.session.user)
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    let ref = useRef();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
      };
    return (
        <ul
        ref={ref}
        className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
          <li>{user.firstName}{ user.lastName}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
    )
}
export default Dropdown;