import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
import UserContext from "../contexts/UserProvider";

function Header() {
  const { setAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./">
        <img
          className="main-nav-logo-image"
          src="../src/assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {!sessionStorage.isAuthenticated ? (
          <>
            <a className="main-nav-item" href="./sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          </>
        ) : (
          <>
            <a className="main-nav-item" href="./user">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </a>
            <a
              className="main-nav-item"
              href="#"
              onClick={() => {
                setAuth({});
                setUser({});
                clearSessionStorage();
                navigate("/");
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
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
