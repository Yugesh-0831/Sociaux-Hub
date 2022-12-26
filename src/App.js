import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "./context/AuthContext";

function App() {
// const[userr,setUserr] = useState(null);
const {user} = useContext(AuthContext);

// useEffect(()=>{
//   setUserr(user);
//   let User = JSON.stringify(userr);
//   window.localStorage.setItem("user",User);
// },[user])


  return(
    <Router>
      <Routes>
    <Route exact path="/" element =
    {user ? <Home/>: <Register/>}/>
    <Route path="/login" element =
    {user ? <Navigate to ="/"/> : <Login/>}/>
    <Route path="/register" element =
    {user ? <Navigate to ="/"/> : <Register/>}/>
    <Route path="/profile/:username" element ={<Profile/>}/>
    </Routes>
  </Router>
  )
}

export default App;
