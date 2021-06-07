import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggin, setIsLoggin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("IsLoggin") === "1") {
      setIsLoggin(true);
    }
  }, []);

  const LogginHandler = (email, password) => {
    setIsLoggin(true);
    console.log(email, password);
  };

  const logoutHandler = () => {
    setIsLoggin(false);
    localStorage.removeItem("IsLoggin");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggin,
        onLogin: LogginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
