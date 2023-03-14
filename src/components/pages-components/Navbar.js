import React, { useEffect, useState, useContext } from "react";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai"
import { Link } from "react-router-dom";
import "../../styles/Navbar.scss"
import Context from "../../context";
import { setCookie } from "../../handle-user-cookie";
import Cookies from "js-cookie";

function  Navbar() {

  let [user, setUser] = useContext(Context)

  const [width, setWidth] = useState(null)
  const [userProfile, setUserProfile] = useState(false)
  const [notifications, setNotifications] = useState(false)

  const logout = async () => {
    try {
        setUser(null)
        Cookies.remove('id')
    } catch(err) {
        console.log(err)
    }
}

  function getWindowDimensions() {
    const { innerWidth: width } = window
    if(width > 650) setWidth(true)
    else setWidth(false)
  }
  useEffect(() => {
    getWindowDimensions()
    window.addEventListener('resize', getWindowDimensions)
    // getUser(user.id).then(data => {
    //   setUsername(data.name)
    // })
    
  }, [])

  useEffect(() => {
    if(userProfile === true) {
      setNotifications(false)
    }
  }, [userProfile])

  const style = {
    color: "white",
    cursor: "pointer",
  } 
  

  return (
    <div className="navbar">

    {width ? <button className="logo"><Link to="/">M</Link></button> : null}

      <span className="search">
        <input  placeholder="Search..."></input>
        <button><AiOutlineSearch /></button>
      </span>

      <span className="notif" onClick={() => setNotifications(!notifications)}>
          <AiOutlineStar style={style} /></span>
          {notifications ? 
            <div className="dropdownNotif">
              <ul>
                <li>notif1</li>
                <li>notif2</li>
                <li>notif3</li>
              </ul>
            </div>
          :null}
      
<span onMouseLeave={() => setUserProfile(false)} >
    <span className="userProfile"  onMouseEnter={() => setUserProfile(true)} >
      {width ? <p className="username">{user?.name}</p> : null}
      <div className="imgProfile"></div>
    </span>
    { userProfile ?
      <div className="dropdownMenu">
        <ul>
          {!width ? <li><Link to="/">Home page</Link></li> : null}
          <li><Link to="/editProfile">Edit Profile</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          <li onClick={logout}><Link to="/login">Log out</Link></li>
        </ul>
      </div>
    : null}
    </span>
     
    </div>
  )
}

export default Navbar