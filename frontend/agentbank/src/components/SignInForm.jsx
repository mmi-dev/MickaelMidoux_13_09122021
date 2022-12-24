import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";

import { signInUser } from "../services/UserServices";

console.log(typeof(signInUser))
function SingInForm() {

    const {auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState('');
    const [status, setStatus] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    useEffect(() => {
      if(success ){  
        sessionStorage.setItem("email",auth.email)     
        sessionStorage.setItem("password",auth.password)     
        sessionStorage.setItem("token",auth.accessToken)     
        sessionStorage.setItem("isAuthenticated",auth.authenticated)   
        navigate('/user')
      }    
    }, [success])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)

        const res = await signInUser(email,password)

        if (res.responseStatus===200){
          const accessToken = res.accessToken
              setAuth({ email, password, accessToken, authenticated: true });
              setEmail('');
              setPassword('');
              setSuccess(true);
        }else{
          setErrMsg(res.responseStatus+" "+res.responseMessage)
        }
    }

    return ( <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            // autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="input-remember">
          <input 
            type="checkbox"
            id="remember-me"
            onChange={(e) => {
                console.log(e)
                setRemember(e.target.value)
            }}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button">Sign In</button>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      </form> );
}

export default SingInForm