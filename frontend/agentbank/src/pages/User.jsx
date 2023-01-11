import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, getUserAccounts } from "../features/userSlice";
import { getUserProfile } from "../services/UserServices";
import AccountBalance from "../components/AccountBalance";
import UserForm from "../components/UserForm";
import { getMokedAccounts } from "../mocks/servicesMock";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";

function User() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const userAccountsData = useSelector((state) => state.user.user.accounts);
  const auth = useSelector((state) => state.auth);

  const storage = useStorage();

  const navigate = useNavigate();

  const getUser = async () => {
    const response = await getUserProfile(auth.userToken);
    if (response.responseStatus === 200) {
      dispatch(setUserData(response.userProfile));
      getAccounts();
    } else {
      console.log("error redirection");
    }
  };

  const getAccounts = async () => {
    const response = await getMokedAccounts();
    if (response.responseStatus === 200) {
      dispatch(getUserAccounts(response.data));
    } else {
      console.log("error message");
    }
  };

  useEffect(() => {
    document.getElementById("main").classList.add("bg-dark");
    document.getElementById("main").classList.remove("bg-mobile-w");
    if (auth.authenticated) {
      getUser();
    } else {
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    console.log(auth.persist);
    storage.set("userFirstName", userData.firstName, auth.persist);
  }, [userData]);

  const editBlock = document.getElementById("edit");

  return (
    <>
      <div id="edit" className="header ">
        <h1 visibility="hidden">
          Welcome back
          <span className="not-edit">
            <br />
            {userData.firstName} {userData.lastName}!
          </span>
        </h1>
        <button
          className="edit-button not-edit"
          onClick={() => {
            editBlock.classList.add("edit-mode");
          }}
        >
          Edit Name
        </button>
        <UserForm firstName={userData.firstName} lastName={userData.lastName} />
      </div>

      <h2 className="sr-only">Accounts</h2>
      {"accounts" in userData &&
        userAccountsData.map((account, index) => {
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
