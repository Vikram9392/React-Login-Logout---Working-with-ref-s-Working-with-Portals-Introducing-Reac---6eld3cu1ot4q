import React, { useReducer, useState } from "react";

const reducer = (state,action)=>
{
  switch(action.type){
    case "username" :
      return {...state,username:action.usernameValue}
    case "password" :
      return {...state,password:action.passwordValue}
    case "error" :
      return {...state,error:true}
    case "login" :
      return {...state,isloggedIn:true}
    case "logout" :
      return {...state,isloggedIn:false,error:false,username:"",password:""}
    default:
      break;
  }
}

export default function Home() {
  const [updatedState,dispatch] = useReducer(reducer,{
    username:'',
    password:'',
    isloggedIn:false,
    error:false
  })
  const handleUserNameChange = (e)=>{
    dispatch({type:"username",usernameValue:e.target.value})
  }
  const handlePasswordChange = (e)=>{
    dispatch({type:"password",passwordValue:e.target.value})
  }
  const handleformSubmit = (e)=>{
    e.preventDefault();
    if(updatedState.username.length!=0 && updatedState.password.length!=0){
      dispatch({type:"login"});
    }
    else{
      dispatch({type:"error"});
    }
  }
  const handleLogout = ()=>{
    dispatch({type:"logout"})

  }
  return (

    <div id="main">
      {updatedState.isloggedIn?(
         <section className="logout-section">
         <h2>Logged in successfully!</h2>
         <p>Welcome {updatedState.username}!</p>
         <button className="logout-btn" onClick={handleLogout}>Logout</button>
       </section>
      ):(<form className="login-form">
      {updatedState.error?(<p className='invalid-error'>Invalid username or password!</p>):null}
      <section className="username-input">
        <label>Username: </label>
        <input type="text" onChange={handleUserNameChange} value={updatedState.username} placeholder="Username" className="username" />
      </section>
      <section className="password-input">
        <label>Password: </label>
        <input type="password" onChange={handlePasswordChange} value={updatedState.password} placeholder="Password" className="password" />
      </section>
      <button className="login-btn" onClick={handleformSubmit}>Login</button>
    </form>)}
     
      
    </div>
  );
}
