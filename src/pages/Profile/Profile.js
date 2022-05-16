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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true)

        // console.log('g')
        if (userCtx.user.userType === 'Business')
            setIsAllowedToFeedback(true);
        // console.log(userCtx.user)
        if (!id || id === userCtx.user._id) {
            setIsAllowed(true);
            setUser(userCtx.user);

            // setIsAllowedToFeedback(false)
        }
        else {

            setIsLoading(true)
            axios.get(`http://localhost:2000/users/${id}`).then(data => {
                if (!data)
                    throw new Error('Wrong')
                setUser(data.data);
                setIsAllowed(false);
                setIsLoading(false)
                // console.log(data)
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
            })

        }
        setIsLoading(false)

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
       {!isLoading &&  <UserInfo showOverlay={showEditingOverlayHandler} isAllowed={isAllowed} user={user} isLoading={isLoading}/>}
       {!isLoading && <PreJobs showOverlay={showOverlayHandler} hideOverlay={hideOverlayHandler} isAllowed={isAllowed} user={user} isLoading={isLoading} />}
       {!isLoading && user && user.userType !== 'Business' && <Skills showOverlay={showOverlayHandler} isAllowed={isAllowed} user={user}  isLoading={isLoading}
            showSkills={showSkillsHandler} hideOverlay={hideOverlayHandler} />}
        {!isLoading && user && user.userType === 'FreeLancer' && <FeedBack isAllowed={isAllowedToFeedback} user={user} />}
        {overlay && <Overlay hideOverlay={hideOverlayHandler} />}
        {overlay && !showSkillsModal && <EditingJobsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
        {overlay && showSkillsModal && <SkillsModal overlay={setOverlay} hideOverlay={hideOverlayHandler} />}
    </>;
}

export default Profile;
