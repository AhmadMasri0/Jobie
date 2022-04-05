import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: () => {
    },
    logout: () => {
    }
});

const calculateRemainingTime = (expTime) => {
    const currTime = new Date().getTime();
    const expirationTime = new Date().getTime();
    return expirationTime - currTime;
}
export const AuthContextProvider = (props) => {
    const initialState = localStorage.getItem('userToken');
    const [token, setToken] = useState(initialState);
    const isLoggedIn = !!token;
    const history = useHistory();


    const loginHandler = (token) => {
        setToken(true);
        localStorage.setItem('userToken', true);
        // setIsLoggedIn(true);
        // history.replace('/');

    }
    const logoutHandler = () => {
        setToken(false);
        localStorage.removeItem('userToken');
        // setIsLoggedIn(false);
        // history.replace('/login');

    }

    const contextValue = {
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler, 
        token
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}


export default AuthContext;
