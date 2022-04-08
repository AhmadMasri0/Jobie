import { Button, Divider, Input } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../store/user-context";
import { useHistory } from "react-router-dom";

const Password = () => {

    const history = useHistory();
    const userCtx = useContext(UserContext);
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [newPass, setNewPass] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isDisabled, setIsDisabled] = useState();

    useEffect(() => {

        if(!password || !confirmPass || !newPass){
            setIsDisabled(true);
        }else {
            setIsDisabled(false)
        }
    }, [password, newPass, confirmPass])
    function changePasswordHandler() {

        if (confirmPass !== newPass) {
            setError('The password confirmation does not match.')
            return;
        }
        setIsLoading(true);

        axios.patch(`http://localhost:2000/users/me/password`, {
            password,
            newPass
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {
                setIsLoading(false)

                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data)
                    history.push('/profile');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
            });
    }


    return <>
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>Password</Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                current password:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'old password'}
                    onChange={(e) => setPassword(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                New password:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password onFocus={() => setError(false)} controls={false} className={classes.customPhone} placeholder={'new password'}
                    onChange={(e) => setNewPass(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />

            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                New password confirmation:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password onFocus={() => setError(false)} controls={false} className={classes.customPhone} placeholder={'password confirmation'}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                    <br/>
                {error && <span style={{color: 'red'}}>{error}</span>}
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button loading={isLoading} className={` ${classes['custom-btn']}`} shape="round" disabled={isDisabled} onClick={changePasswordHandler}>
                    Change password
                </Button>
            </div>
        </div>
    </>
        ;
}

export default Password;
