import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userSlice";
import { updateUserProfile } from "../services/UserServices";

function UserForm({ firstName, lastName }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const userRef = useRef();
  const errRef = useRef();

  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const editBlock = document.getElementById("edit");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(
        updateUser({ firstName: updatedFirstName, lastName: updatedLastName })
      );
      editBlock.classList.remove("edit-mode");
      setSuccess(false);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUserProfile(
      localStorage.userToken,
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
    <form onSubmit={handleSubmit} className="edit">
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
        <button
          className="edit-button"
          disabled={
            userData.firstName === updatedFirstName &&
            userData.lastName === updatedLastName
          }
        >
          Save
        </button>
        <button
          className="edit-button"
          onClick={(e) => {
            e.preventDefault();
            editBlock.classList.remove("edit-mode");
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
