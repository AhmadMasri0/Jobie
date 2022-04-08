import Overlay from '../../Components/overlay/overlay';
import UserInfo from "../../Components/Profile/userInfo";
import PreJobs from "../../Components/Profile/preJobs";
import React, { useContext, useEffect, useState } from "react";
import EditingJobsModal from "../../Components/Modal/editingJobsModal";
import Skills from "../../Components/Profile/Skills";
import SkillsModal from "../../Components/Modal/slillsModal";
import axios from 'axios';
import UserContext from '../../store/user-context';


const Profile = () => {

    const [overlay, setOverlay] = useState(false);
    const [showSkillsModal, setShowSkillsModal] = useState(false);
    const [user, setUser] = useState();
    const userCtx = useContext(UserContext);

    // useEffect(() => {
    //     const id = JSON.parse(localStorage.getItem('user'))._id;
    //     axios.get(`http://localhost:2000/users/${id}`).then(data => {
    //         if (!data)
    //             throw new Error('Wrong')
    //             userCtx.setCurrentUser(data.data, localStorage.getItem('userToken'))
    //         setUser(data.data);
    //         console.log(data)
    //     }).catch(err => console.log(err))
    // }, [])

    const showOverlayHandler = () => {
        setOverlay(true);
    }

    const hideOverlayHandler = () => {
        setOverlay(false);
        setShowSkillsModal(false);
    }
    const showEditingOverlayHandler = () => {
        setOverlay(true);
    }

    const showSkillsHandler = () => {
        setOverlay(true);
        setShowSkillsModal(true);
    }
    return <>
        <UserInfo showOverlay={showEditingOverlayHandler} user={user} />
        <PreJobs showOverlay={showOverlayHandler} hideOverlay={hideOverlayHandler}/>
        <Skills showOverlay={showOverlayHandler} showSkills={showSkillsHandler} hideOverlay={hideOverlayHandler}/>
        {overlay && <Overlay hideOverlay={hideOverlayHandler} />}
        {overlay && !showSkillsModal && <EditingJobsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
        {overlay && showSkillsModal && <SkillsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
    </>;
}

export default Profile;
