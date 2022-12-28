import { useEffect } from "react";
import SingInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("main").classList.add("bg-dark");
    if (sessionStorage.isAuthenticated === "true") {
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
