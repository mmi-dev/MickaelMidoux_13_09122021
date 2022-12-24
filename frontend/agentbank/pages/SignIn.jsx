import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {

    const navigate = useNavigate()

    useEffect(()=>{
        console.log(document.getElementById('main').classList.add('bg-dark'))
    })

    return (<section className="sign-in-content">
    <i className="fa fa-user-circle sign-in-icon"></i>
    <h1>Sign In</h1>
    <form>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
      <a href="#" className="sign-in-button" onClick={navigate('/user')}>Sign In</a>
      {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
      {/* <button className="sign-in-button" >Sign In</button> */}
      
    </form>
  </section>
        );
}

export default SignIn;