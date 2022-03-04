import {createContext, useState} from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {
    },
    logout: () => {
    }
});
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const loginHandler = () => {
        setIsLoggedIn(true);
    }
    const logoutHandler = () => {
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
