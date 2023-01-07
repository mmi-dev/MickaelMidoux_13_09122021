import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { signInUser } from "../services/UserServices";
import useStorage from "../hooks/useStorage";

function SingInForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const storage = useStorage();

  const [email, setEmail] = useState(auth.loginData.email);
  const [password, setPassword] = useState(auth.loginData.password);
  const [remember, setRemember] = useState(auth.loginData.persist);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      storage.set("userLogin", auth.loginData.email, remember);
      storage.set("userToken", auth.userToken, remember);
      storage.set("isAuthenticated", auth.authenticated, remember);
      storage.set("rememberMe", remember, remember);
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
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
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
