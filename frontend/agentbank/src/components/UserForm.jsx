import { useContext, useRef, useEffect, useState } from "react";
import UserEditModeContext from "../contexts/UserEditModeProvider";
import UserContext from "../contexts/UserProvider";

import { updateUserProfile } from "../services/UserServices";

function UserForm({ firstName, lastName }) {
  const { userEditMode, setUserEditMode } = useContext(UserEditModeContext);
  const { user, setUser } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();

  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      setUser({
        ...user,
        firstName: updatedFirstName,
        lastName: updatedLastName,
      });
      setUserEditMode(!userEditMode);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUserProfile(
      sessionStorage.token,
      updatedFirstName,
      updatedLastName
    );

    if (res.responseStatus === 200) {
      setSuccess(true);
    } else {
      setErrMsg(res.responseStatus + " " + res.responseMessage);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <input
          type="text"
          id="firstname"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUpdatedFirstName(e.target.value)}
          defaultValue={updatedFirstName}
          required
        />
        <input
          type="text"
          id="lastname"
          autoComplete="off"
          onChange={(e) => setUpdatedLastName(e.target.value)}
          defaultValue={updatedLastName}
          required
        />
      </div>
      <div className="buttons">
        <button className="edit-button">Save</button>
        <button
          className="edit-button"
          onClick={(e) => {
            e.preventDefault();
            setUserEditMode(!userEditMode);
          }}
        >
          Cancel
        </button>
      </div>
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

export default UserForm;
