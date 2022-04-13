import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./user-context";

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
    const expirationTime = new Date(expTime).getTime();
    return expirationTime - currTime;
}
export const AuthContextProvider = (props) => {
    const initialState = localStorage.getItem('userToken');
    const [token, setToken] = useState(initialState);
    const isLoggedIn = !!token;
    const history = useHistory();
    const userCtx = useContext(UserContext);


    const loginHandler = (t, id) => {
        setToken(t);

        localStorage.setItem('userToken', t);
        localStorage.setItem('id', id);
        // setIsLoggedIn(true);
        // history.replace('/');

    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('userToken');
        localStorage.removeItem('id');
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
