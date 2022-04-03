import { Button, Divider, Input } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";

const Password = () => {

    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [newPass, setNewPass] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function changePasswordHandler() {

        setIsLoading(true);
        fetch('',
            {
                method: 'post',
                body: JSON.stringify({ password, confirmPass, newPass }),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {

                setIsLoading(false);
                if (res.ok) {

                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                //error handling
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
                <Input.Password controls={false} className={classes.customPhone} placeholder={'new password'}
                    onChange={(e) => setNewPass(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />

            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                New password confirmation:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'password confirmation'}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />

            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button loading={isLoading} className={` ${classes['custom-btn']}`} shape="round" onClick={changePasswordHandler}>
                    Change password
                </Button>
            </div>
        </div>
    </>
        ;
}

export default Password;
