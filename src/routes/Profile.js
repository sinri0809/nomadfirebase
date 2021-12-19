import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authService } from "../fbase";

const Profile = () => {
  let history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }

  return <>
    <span>Profile</span>
    <button onClick={onLogOutClick}>LogOut</button>
  </>
  
}

export default Profile;