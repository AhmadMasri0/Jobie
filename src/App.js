import Navigation from "./Components/layout/navigation";
import Signup from "./pages/Auth/signup";
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from "./pages/Auth/login";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/edit-profile";
import Applications from "./pages/Applications/applications";
import Settings from "./pages/Settings/Settings";
import Application from "./pages/Applications/application";
import Notifications from "./pages/Notifications/Notifications";
import Home from "./pages/Home/home";

function App() {
    return (
        <React.Fragment>
            <Navigation/>
            <Switch>
                <Route path='/' exact>
                    <Home/>
                </Route>
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
                <Route path='/applications' exact>
                    <Applications/>
                </Route>
                <Route path='/applications/:appId'>
                    <Application/>
                </Route>
                <Route path='/settings'>
                    <Settings/>
                </Route>
                <Route path='/notifications'>
                    <Notifications/>
                </Route>
            </Switch>
        </React.Fragment>
    )
        ;
}

export default App;
