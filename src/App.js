import Navigation from "./Components/layout/navigation";
import Signup from "./pages/Auth/signup";
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Login from "./pages/Auth/login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/edit-profile";
import Applications from "./pages/applications";
import Settings from "./pages/Settings";

function App() {
    return (
        <React.Fragment>
            <Navigation/>
            <Switch>
                <Route path='/signup'>
                    <Signup/>
                </Route>
                <Route path='/logout'>
                    <Redirect to='/login'/>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/profile' exact>
                    <Profile/>
                </Route>
                <Route path='/profile/edit-profile'>
                    <EditProfile/>
                </Route>
                <Route path='/applications'>
                    <Applications/>
                </Route>
                <Route path='/settings'>
                    <Settings/>
                </Route>
            </Switch>
        </React.Fragment>
    )
        ;
}

export default App;
