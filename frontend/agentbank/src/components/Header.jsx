import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/userSlice";
import { Link } from "react-router-dom";
import { logout } from "../features/authSlice";
import useStorage from "../hooks/useStorage";

/**
 * header section with logo & navigation
 */
function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.auth);

  const storage = useStorage();

  const [linkFirstName, setLinkFirstName] = useState();

  useEffect(() => {
    if (userData.firstName) {
      setLinkFirstName(userData.firstName);
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
        {!auth.authenticated ? (
          <>
            <Link className="main-nav-item" to="./sign-in">
              <i className="fa fa-user-circle"></i>
              <span>Sign In</span>
            </Link>
          </>
        ) : (
          <>
            <Link className="main-nav-item" to="./user">
              <i className="fa fa-user-circle"></i>
              <span>{linkFirstName}</span>
            </Link>
            <Link
              className="main-nav-item"
              to="./"
              onClick={() => {
                dispatch(setUserData([]));
                dispatch(logout());
                storage.clear(true);
                storage.clear(false);
              }}
            >
              <i className="fa fa-sign-out"></i>
              <span>Sign Out</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
