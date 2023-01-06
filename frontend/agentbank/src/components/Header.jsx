import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/userSlice";
import { Link } from "react-router-dom";
import { logout } from "../features/authSlice";

function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const [linkFirstName, setLinkFirstName] = useState();

  useEffect(() => {
    if (localStorage.userFirstName) {
      setLinkFirstName(localStorage.userFirstName);
    }
  }, []);

  useEffect(() => {
    setLinkFirstName(userData.firstName);
  }, [userData]);

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
        {localStorage.isAuthenticated !== "true" ? (
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
                dispatch(setUserData([]));
                dispatch(logout());
                localStorage.clear();
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

export default Header;
