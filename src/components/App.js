import React, { useState, Navigate, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./pages-components/Footer"
import Navbar from "./pages-components/Navbar"
import Homepage from "./Homepage";
import About from "./About"
import Register from "./Register"
import Login from "./Login"
import EditProfile from "./EditProfile"
import Friends from "./Friends"
import PageNotFound from "./PageNotFound";
import Context from "../context";
import PrivateRoutes from "../PrivateRoutes"
import PrivateRoutesLogged from "../PrivateRoutesLogged"
import { getCookie } from "../handle-user-cookie";

function App() {

  let user = getCookie()
  const [userState, setUserState] = useState(null)

  useEffect(() => {
    setUserState(user)
  }, [])

  return (
    // <Context.Provider value={user}>
    <div className="container">
      {userState && <Navbar setUserState={setUserState} />}
      {/* <div className="page"> */}
        <Routes>
          {/* <Route exact path="/" element={<Homepage/>}></Route> */}
          {/* <Route exact path="/" element={user ? <Homepage /> : <Navigate to="/login" />}></Route> */}
          <Route path="/about" element={<About/>}></Route>
          <Route element={<PrivateRoutes/>}>
            <Route exact path="/" element={<Homepage/>}></Route>
            <Route path="/editProfile" element={<EditProfile setUserState={setUserState}/>}></Route>
            <Route path="/friends" element={<Friends/>}></Route>
            <Route path="*" element={<PageNotFound/>} />
          </Route>
          {/* <Route path="/addFriends" element={<AddFriends/>}></Route> */}
          <Route element={<PrivateRoutesLogged/>}>
            <Route path="/login" element={<Login setUserState={setUserState}/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Route>
        </Routes>
        {/* </div> */}
      {userState && <Footer />}
    </div>
    // </Context.Provider>
  );
}

export default App;
