import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./store/auth-context";
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContextProvider} from "./store/user-context";

ReactDOM.render(
    <UserContextProvider>
        <AuthContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthContextProvider>
    </UserContextProvider>,
    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
