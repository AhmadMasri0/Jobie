import Overlay from '../Components/overlay/overlay';
import UserInfo from "../Components/Profile/userInfo";
import PreJobs from "../Components/Profile/preJobs";
import React, {useState} from "react";
import Modal from "../Components/Modal/modal";
import {Spin} from 'antd'
import {Route, Switch} from "react-router-dom";
import EditProfile from "./edit-profile";

const Profile = () => {

    const [overlay, setOverlay] = useState(false);

    const showOverlayHandler = () => {
        setOverlay(true);
    }

    const hideOverlayHandler = () => {
        setOverlay(false);
    }
    const showEditingOverlayHandler = () => {
        setOverlay(true);
    }

    return <>
        <UserInfo showOverlay={showEditingOverlayHandler}/>
        <PreJobs showOverlay={showOverlayHandler} hideOverlay={hideOverlayHandler}/>
        {overlay && <Overlay hideOverlay={hideOverlayHandler}/>}
        {overlay && <Modal overlay={setOverlay} hideOverlay={hideOverlayHandler}/>}
    </>;
}

export default Profile;
