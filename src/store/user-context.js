import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";


const UserContext = createContext({
    user: {},
    token: '',
    setCurrentUser: () => { },
});

export const UserContextProvider = props => {

    const initToken = localStorage.getItem('userToken');
    const [user, setUser] = useState({});
    const [token, setToken] = useState(initToken);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id)
            axios.get(`http://localhost:2000/users/${id}`).then(data => {
                if (!data)
                    throw new Error('Wrong')

                setUser(data.data);
            }).catch(err => {
                authCtx.logout();
            })

    }, [])
    const setCurrentUserHandler = (value, token) => {
        setUser(value);

        if (token) setToken(token);
    }

    const userContextValue = {
        token,
        setCurrentUser: setCurrentUserHandler,
        user,
    }
    return <UserContext.Provider value={userContextValue}>{props.children} </UserContext.Provider>

}
export default UserContext;
