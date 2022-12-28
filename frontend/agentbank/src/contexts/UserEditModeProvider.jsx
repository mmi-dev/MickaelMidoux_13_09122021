import { createContext, useState } from "react";

const UserEditModeContext = createContext({});

export const UserEditModeProvider = ({ children }) => {
  const [userEditMode, setUserEditMode] = useState(false);

  return (
    <UserEditModeContext.Provider value={{ userEditMode, setUserEditMode }}>
      {children}
    </UserEditModeContext.Provider>
  );
};

export default UserEditModeContext;
