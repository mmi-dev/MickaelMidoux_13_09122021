import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
import UserContext from "../contexts/UserProvider";

function Header() {
  const { setAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const [linkFirstName, setLinkFirstName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.userFirstName) {
      setLinkFirstName(sessionStorage.userFirstName);
    }
  }, []);

  useEffect(() => {
    setLinkFirstName(user.firstName);
  }, [user]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="./">
        <img
          className="main-nav-logo-image"
          src="../src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {sessionStorage.isAuthenticated !== "true" ? (
          <>
            <Link className="main-nav-item" to="./sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Link className="main-nav-item" to="./user">
              <i className="fa fa-user-circle"></i>
              {linkFirstName}
            </Link>
            <Link
              className="main-nav-item"
              to="./"
              onClick={() => {
                setAuth({});
                setUser({});
                clearSessionStorage();
                navigate("./");
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const clearSessionStorage = () => {
  if (sessionStorage.rememberMe !== "true") {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("rememberMe");
  }
  sessionStorage.removeItem("userFirstName");
  sessionStorage.removeItem("userLastName");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isAuthenticated");
};

export default Header;
