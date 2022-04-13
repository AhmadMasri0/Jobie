import classes from "./settings.module.css";
import { Divider } from "antd";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import Phones from "../../Components/Settings/Phones";
import Password from "../../Components/Settings/Password";
import ChangingMail from "../../Components/Settings/ChangingMail";
import BirthDate from "../../Components/Settings/Birthdate";
import axios from "axios";

const Settings = (props) => {
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [phones, setPhones] = useState([{}]);
    const [password, setPassword] = useState();
    const [emails, setEmails] = useState();
    // const [birthDate, setBirthDate] = useState();

    useEffect(() => {
        // const id = JSON.parse(localStorage.getItem('user'))._id;
        const id = localStorage.getItem('id');
        // console.log();
        axios.get(`http://localhost:2000/users/${id}`, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(data => {

            if (!data)
                throw new Error('Wrong')
            // setUser(data.data);
            // setToken(userCtx.token);

            setPhones(data.data.phone);

        }).catch(err => console.log(err))
        // user = userCtx.user;

        // return function f() {
        //     console.log('f' + birthDate);

        // }();
    }, [userCtx])
    return <div className={`container container-fluid ${classes.group}`}>
        <Divider orientation={"center"}><b>Settings</b></Divider>
        <Phones phones={phones} />
        <Password/>
        {/* <ChangingMail/> */}
        {user && user.userType !== 'Business' && <BirthDate />}
    </div>
}
    ;

export default Settings;
