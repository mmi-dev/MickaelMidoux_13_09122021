import { useEffect, useContext, useState } from "react";
import { getUserProfile } from "../services/UserServices";
import UserContext from "../contexts/UserProvider";
import AccountBalance from "../components/AccountBalance";
import UserForm from "../components/UserForm";
import { getMokedAccounts } from "../moks/servicesMock";
import UserEditModeContext from "../contexts/UserEditModeProvider";
import { useNavigate } from "react-router-dom";

function User() {
  const { userEditMode, setUserEditMode } = useContext(UserEditModeContext);
  const [accounts, setAccounts] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const getUser = async () => {
    const response = await getUserProfile(sessionStorage.token);
    if (response.responseStatus === 200) {
      setUser({
        ...user,
        firstName: response.userProfile.firstName,
        lastName: response.userProfile.lastName,
        id: response.userProfile.id,
      });
      getAccounts();
      // getAccounts().then((res) => setAccounts(res));
    } else {
      console.log("error redirection");
    }
  };

  const getAccounts = async () => {
    const response = await getMokedAccounts();
    if (response.responseStatus === 200) {
      setAccounts(response.data);
    } else {
      console.log("error message");
    }
  };

  useEffect(() => {
    document.getElementById("main").classList.add("bg-dark");
    setUserEditMode(false);
    if (sessionStorage.isAuthenticated === "true") {
      getUser();
      console.log("not redirected");
    } else {
      navigate("/sign-in");
      console.log("redirected");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("userFirstName", user.firstName);
    sessionStorage.setItem("userLastName", user.lastName);
    sessionStorage.setItem("userId", user.id);
    sessionStorage.setItem("rememberMe", user.remember);
  }, [user]);

  return (
    <>
      <div className="header">
        {!userEditMode ? (
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName}!
          </h1>
        ) : (
          <h1>Welcome back</h1>
        )}
        {!userEditMode && (
          <button
            className="edit-button"
            onClick={() => {
              setUserEditMode(!userEditMode);
            }}
          >
            Edit Name
          </button>
        )}
        {userEditMode && (
          <UserForm firstName={user.firstName} lastName={user.lastName} />
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {accounts &&
        accounts.map((account, index) => {
          return (
            <AccountBalance
              key={index}
              title={account.title}
              amount={account.amount}
              description={account.description}
            />
          );
        })}
    </>
  );
}

export default User;
