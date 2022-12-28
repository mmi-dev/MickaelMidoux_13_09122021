import { useContext } from "react";
import UserEditModeContext from "../contexts/UserEditModeProvider";

function UserForm({ firstName, lastName }) {
  const { userEditMode, setUserEditMode } = useContext(UserEditModeContext);
  return (
    <form>
      <div className="inputs">
        <input
          type="text"
          id="firstname"
          // ref={userRef}
          autoComplete="off"
          defaultValue={firstName}
          required
        />
        <input
          type="text"
          id="lastname"
          autoComplete="off"
          defaultValue={lastName}
          required
        />
      </div>
      <div className="buttons">
        <button
          className="edit-button"
          onClick={(e) => {
            e.preventDefault();
            setUserEditMode(!userEditMode);
            console.log(firstname.value + lastname.value);
          }}
        >
          Save
        </button>
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
    </form>
  );
}

export default UserForm;
