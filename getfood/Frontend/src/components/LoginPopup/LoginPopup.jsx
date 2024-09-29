import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const LoginPopup = ({SetShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);
    const [currState,setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onLogin = async(event)=>{
      event.preventDefault();
      let newUrl = url;
      if (currState == "Login") {
        newUrl += "/api/user/login";
      }else{
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl,data)

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        SetShowLogin(false);
      }else{
        alert(response.data.message);
      }
    }

    // useEffect(()=>{
    //   console.log(data);
      
    // },[data])
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>SetShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required/>
        </div>
        <button>{currState === "Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy. </p>
        </div>
        {currState==="Login"
        ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
        :<p>Allready have an Account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopup
