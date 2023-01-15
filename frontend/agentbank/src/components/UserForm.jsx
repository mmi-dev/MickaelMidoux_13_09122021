import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userSlice";
import { updateUserProfile } from "../services/UserServices";

/**
 * user profile update form
 * @param {string} props.firstName
 * @param {string} props.lastName
 */
function UserForm({ firstName, lastName }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.auth);

  const userRef = useRef();
  const errRef = useRef();

  const [updatedFirstName, setUpdatedFirstName] = useState(userData.firstName);
  const [updatedLastName, setUpdatedLastName] = useState(userData.lastName);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const editBlock = document.getElementById("edit");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setUpdatedFirstName(userData.firstName);
    setUpdatedLastName(userData.lastName);
  }, [userData]);

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
      auth.userToken,
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
        Il y a eu un problème
        <br />
        <span>{errMsg}</span>
      </p>
    </form>
  );
}

export default UserForm;
