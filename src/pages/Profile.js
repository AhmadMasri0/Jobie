import Overlay from '../Components/overlay/overlay';
import UserInfo from "../Components/Profile/userInfo";
import PreJobs from "../Components/Profile/preJobs";
import React, {useState} from "react";
import EditingJobsModal from "../Components/Modal/editingJobsModal";
import Skills from "../Components/Profile/Skills";
import SkillsModal from "../Components/Modal/slillsModal";

const Profile = () => {

    const [overlay, setOverlay] = useState(false);
    const [showSkillsModal, setShowSkillsModal] = useState(false);
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
        <UserInfo showOverlay={showEditingOverlayHandler}/>
        <PreJobs showOverlay={showOverlayHandler} hideOverlay={hideOverlayHandler}/>
        <Skills showOverlay={showOverlayHandler} showSkills={showSkillsHandler} hideOverlay={hideOverlayHandler}/>
        {overlay && <Overlay hideOverlay={hideOverlayHandler}/>}
        {overlay && !showSkillsModal && <EditingJobsModal overlay={setOverlay} hideOverlay={hideOverlayHandler}/>}
        {overlay && showSkillsModal && <SkillsModal overlay={setOverlay} hideOverlay={hideOverlayHandler}/>}
    </>;
}

export default Profile;
