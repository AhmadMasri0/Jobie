import Navigation from "./Components/layout/navigation";
import Signup from "./pages/Auth/signup";
import React, { useContext, useEffect, useState } from 'react';
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
import Applying from "./pages/Applications/Applying";
import Responses from "./pages/Applications/Responses";
import {
     getToken1,
     onMessageListener, firebase,
     requestFirebaseNotificationPermission } from './firebase/firebase';
import '@firebase/messaging';
// import firebase from './firebase/firebase';
// import 'firebase/compat/messaging';


function App() {
    const authCxt = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: 'hgghgh', body: 'bghh' });
    const [isTokenFound, setTokenFound] = useState(false);
    getToken1(setTokenFound);

    // requestFirebaseNotificationPermission()
    //     .then((firebaseToken) => {
    //         // eslint-disable-next-line no-console
    //         console.log(firebaseToken);
    //     })
    //     .catch((err) => {
    //         console.log( err);
    //     });

    // useEffect(() => {
    //     const msg = firebase.messaging();
    //     console.log(msg);
    //     msg.requestPermission().then(() => msg.getToken()).then((data) => console.log(data))
    // })
    // onMessageListener().then(payload => {
    //     setShow(true);
    //     setNotification({ title: payload.notification.title, body: payload.notification.body })
    //     console.log(payload);
    // }).catch(err => console.log('failed: ', err));

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
                {authCxt.isLoggedIn && <Route path='/applications/app' exact>
                    <NewApplication />
                </Route>
                }
                {authCxt.isLoggedIn && <Route path='/applications/app/:id' exact>
                    <NewApplication />
                </Route>
                }
                {<Route path='/applications/applying/:appId' exact>
                    <Applying />
                </Route>
                }
                <Route path='/applications/:appId'>
                    <Application />
                </Route>
                {authCxt.isLoggedIn && <Route path='/settings'>
                    <Settings />
                </Route>
                }
                {authCxt.isLoggedIn && <Route path='/notifications'>
                    <Notifications />
                </Route>}
                {authCxt.isLoggedIn && <Route path='/responses/:formId' exact>
                    <Responses />
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
