import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

import { signInUser } from "../services/UserServices";

function SingInForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    !localStorage.userLogin ? "" : localStorage.userLogin
  );
  const [password, setPassword] = useState(
    !localStorage.password ? "" : localStorage.password
  );
  const [remember, setRemember] = useState(
    !localStorage.rememberMe || localStorage.rememberMe !== "true"
      ? ""
      : JSON.parse(localStorage.rememberMe)
  );

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      localStorage.setItem("userLogin", auth.loginData.email);
      localStorage.setItem("userToken", auth.userToken);
      localStorage.setItem("isAuthenticated", auth.authenticated);
      localStorage.setItem("rememberMe", remember);
      navigate("/user");
    }
  }, [success, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signInUser(email, password);

    if (res.responseStatus === 200) {
      const accessToken = res.accessToken;
      dispatch(login({ email, password, accessToken }));
      setSuccess(true);
    } else {
      setErrMsg(res.responseStatus + " " + res.responseMessage);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="username"
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
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
    </form>
  );
}

export default SingInForm;
