import classes from "./settings.module.css";
import {Divider} from "antd";
import {useContext} from "react";
import UserContext from "../../store/user-context";
import Phones from "../../Components/Settings/Phones";
import Password from "../../Components/Settings/Password";
import ChangingMail from "../../Components/Settings/ChangingMail";
import BirthDate from "../../Components/Settings/Birthdate";

const Settings = (props) => {
        const userCtx = useContext(UserContext);
        const user = userCtx.user;

//nb
        return <div className={`container container-fluid ${classes.group}`}>
            <Divider orientation={"center"}><b>Settings</b></Divider>
            <Phones/>
            <Password/>
            <ChangingMail/>
            <BirthDate/>
        </div>
    }
;

export default Settings;
