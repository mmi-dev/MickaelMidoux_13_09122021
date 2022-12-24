import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";

import { signInUser } from "../services/UserServices";

import axios from '../../api/axios';
const LOGIN_URL = '/user/login';

function SingInForm({user, onChangeForm, signInUser }) {
    const {auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState('');
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
    sessionStorage.setItem("auth",JSON.stringify(auth))   
     navigate('/user')
}    
    }, [success])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                // { email, password },
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response?.data.body.token));
            const accessToken = response?.data?.body?.token;
            setAuth({ email, password, accessToken, authenticated: true });
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response.statusText);
            }
            errRef.current.focus();
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