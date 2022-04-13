import Navigation from "./Components/layout/navigation";
import Signup from "./pages/Auth/signup";
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from "./pages/Auth/login";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/edit-profile";
import Applications from "./pages/Applications/applications";
import Settings from "./pages/Settings/Settings";
import Application from "./pages/Applications/application";
import Notifications from "./pages/Notifications/Notifications";
import Home from "./pages/Home/home";
import AuthContext from "./store/auth-context";
import NewApplication from './pages/Applications/newApplication';

function App() {
    const authCxt = useContext(AuthContext);

    return (
        <React.Fragment>
            <Navigation />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                {!authCxt.isLoggedIn && <Route path='/signup'>
                    <Signup />
                </Route>
                }
                {/* <Route path='/logout'>
                    <Redirect to='/login'/>
                </Route> */}
                {!authCxt.isLoggedIn && <Route path='/login'>
                    <Login />
                </Route>}
                <Route path='/profile' exact>
                    {authCxt.isLoggedIn && <Profile />}
                    {!authCxt.isLoggedIn && <Redirect to={'/login'} />}
                </Route>
                {authCxt.isLoggedIn && <Route path='/profile/edit-profile'>
                    <EditProfile />
                </Route>
                }
                <Route path='/profile/:userId' >
                    <Profile />
                </Route>

                {authCxt.isLoggedIn && <Route path='/applications' exact>
                    <Applications />
                </Route>
                }
                {authCxt.isLoggedIn && <Route path='/applications/newApp' exact>
                    <NewApplication />
                </Route>
                }
                {/* {authCxt.isLoggedIn && */}
                <Route path='/applications/:appId'>
                    <Application />
                </Route>
                {/* } */}
                {authCxt.isLoggedIn && <Route path='/settings'>
                    <Settings />
                </Route>
                }
                {authCxt.isLoggedIn && <Route path='/notifications'>
                    <Notifications />
                </Route>}
                <Route path='*'>
                    <Redirect to={'/'} />
                </Route>
            </Switch>
        </React.Fragment>
    )
        ;
}

export default App;
