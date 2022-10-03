
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import profile from './images/profile.png'
import Dropdown from "./Dropdown";


function ProfileButton({depthLevel}) {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);

  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  return (
    <>
      {/* <button className="profile-button" onClick={openMenu}>
      <i className="fa-solid fa-user"></i>
      </button> */}
      <img
      src={profile}
      className="profile"
      aria-expanded={dropdown ? "true" : "false"}
      onClick={()=>setDropdown((prev)=> !prev)}
      {...depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
      />
      <Dropdown dropdown={dropdown} depthLevel={depthLevel}/>
      {/* {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName}{ user.lastName}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )} */}
    </>
  );
}

export default ProfileButton;