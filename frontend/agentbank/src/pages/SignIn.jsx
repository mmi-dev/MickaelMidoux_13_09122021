import { useEffect } from "react";
import SingInForm from "../components/SignInForm";

function SignIn() {

    useEffect(()=>{
        document.getElementById('main').classList.add('bg-dark')
    })

    return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <SingInForm />
    </section>
        );
}

export default SignIn;