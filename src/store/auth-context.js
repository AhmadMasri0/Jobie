import { createContext, useState } from "react";

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: () => {
    },
    logout: () => {
    }
});
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const loginHandler = (token) => {
        setToken(true);
        setIsLoggedIn(true);
    }
    const logoutHandler = () => {
        setToken(false);
        setIsLoggedIn(false);
    }

    const contextValue = {
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}


export default AuthContext;
