import Overlay from '../../Components/overlay/overlay';
import UserInfo from "../../Components/Profile/userInfo";
import PreJobs from "../../Components/Profile/preJobs";
import React, { useContext, useEffect, useState } from "react";
import EditingJobsModal from "../../Components/Modal/editingJobsModal";
import Skills from "../../Components/Profile/Skills";
import SkillsModal from "../../Components/Modal/slillsModal";
import axios from 'axios';
import UserContext from '../../store/user-context';
import { useParams } from 'react-router-dom';
import FeedBack from '../../Components/Profile/feedback';


const Profile = () => {

    const [overlay, setOverlay] = useState(false);
    const [showSkillsModal, setShowSkillsModal] = useState(false);
    const userCtx = useContext(UserContext);
    const [user, setUser] = useState({});
    const param = useParams();
    const id = param.userId;
    const [isAllowed, setIsAllowed] = useState(false);
    const [isAllowedToFeedback, setIsAllowedToFeedback] = useState(false);

    useEffect(() => {


        if (userCtx.user.userType === 'Business')
            setIsAllowedToFeedback(true);
        // console.log(id, userCtx.user._id)
        if (!id || id === userCtx.user._id) {
            setIsAllowed(true);
            setUser(userCtx.user);
            // setIsAllowedToFeedback(false)
        }
        else {

            axios.get(`http://localhost:2000/users/${id}`).then(data => {
                if (!data)
                    throw new Error('Wrong')

                setUser(data.data);
                setIsAllowed(false);
                // console.log(data)
            }).catch(err => console.log(err))

        }

    }, [userCtx.user]);


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
        <UserInfo showOverlay={showEditingOverlayHandler} isAllowed={isAllowed} user={user} />
        <PreJobs showOverlay={showOverlayHandler} hideOverlay={hideOverlayHandler} isAllowed={isAllowed} user={user} />
        {user && user.userType !== 'Business' && <Skills showOverlay={showOverlayHandler} isAllowed={isAllowed} user={user}
            showSkills={showSkillsHandler} hideOverlay={hideOverlayHandler} />}
        {user && user.userType === 'FreeLancer' && <FeedBack isAllowed={isAllowedToFeedback} user={user} />}
        {overlay && <Overlay hideOverlay={hideOverlayHandler} />}
        {overlay && !showSkillsModal && <EditingJobsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
        {overlay && showSkillsModal && <SkillsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
    </>;
}

export default Profile;
