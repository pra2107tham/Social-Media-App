import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("userID")){
      localStorage.removeItem("userID")
    }
  },[])
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData ={
      username: username,
      password: password
    }
    console.log("FormData",formData)
    try {
      const response = await axios.post("/api/auth/login",formData)
      console.log("Response",response)
      if(response.status === 200){
        localStorage.setItem("userID",response.data.data._id)
        localStorage.setItem("image",response.data.data.img)
        localStorage.setItem("followersList",response.data.followersList)
        localStorage.setItem("name",response.data.data.firstName+" "+response.data.data.lastName)
        navigate("/home")
        console.log('User signed up successfully', response.data)
      }else if(response.status === 401){
        alert("Invalid Username or Password")
      }
    } catch (error) {
      console.log("Error",error)
    }
  }


  return (
    <div className="a-right" style={{ fontSize:"28px", fontFamily:"Verdana, Geneva, Tahoma, sans-serif" }}>
      <form className="infoForm authForm" onSubmit={handleLogin}>
        <h3 >Log In</h3>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="infoInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="infoInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <span style={{ fontSize: "14px", fontFamily: "'Roboto', sans-serif" }}>
            Dont have an account? <Link to="/signup">Sign Up</Link>
          </span>
          <button className="button infoButton">Login</button>
        </div>
      </form>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate;
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      localStorage.removeItem("userID");
    }
  },[])
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();
    
    const formData = {
      firstName: firstName,
      lastName: lastname,
      username: username,
      password: password
    }
    console.log("FormData",formData)
    try {
      const response = await axios.post("/auth/signup",formData)
      console.log("Response",response)
      if(response.status === 200){
        localStorage.setItem("userID",response.data._id)
        localStorage.setItem("image",response.data.img)
        localStorage.setItem("followersList",response.followersList)
        localStorage.setItem("name",response.data.firstName+" "+response.data.lastName)
        navigate("/home")
      }else if(response.status === 401){
        alert("User already exists. Please login.")
      }
    } catch (error) {
      console.log("Error",error)
    }
  }

  return (
    <div className="a-right" style={{ fontSize:"28px", fontFamily:"Verdana, Geneva, Tahoma, sans-serif" }}>
      <form className="infoForm authForm" onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="infoInput"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="infoInput"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="infoInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="infoInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="infoInput"
          />
        </div>
        <div>
          <span style={{ fontSize: "14px", fontFamily: "'Roboto', sans-serif" }}>
            Already have an account? <Link to="/">Login</Link>
          </span>
          <button className="button infoButton">Signup</button>
        </div>
      </form>
    </div>
  );
};

export  {Auth, SignUp};
