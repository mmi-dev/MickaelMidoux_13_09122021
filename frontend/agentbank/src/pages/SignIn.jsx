import { useEffect } from "react";
import SingInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SignIn() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    document.getElementById("main").classList.add("bg-dark");
    document.getElementById("main").classList.add("bg-mobile-w");
    if (auth.authenticated) {
      navigate("/user");
    }
  });

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <SingInForm />
    </section>
  );
}

export default SignIn;
