import { Button, Divider, Input, Switch } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const ChangingMail = () => {
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const changeEmailHandler = () => {

        setIsLoading(true);
        fetch('',
            {
                method: 'post',
                body: JSON.stringify({ email, password }),
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
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>E-mail</Divider>
        <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my email?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                }}
            /></Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                E-mail address:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input type={"email"} className={classes.customPhone} placeholder={'example@example.com'}
                onChange={(e) => setEmail(e.target.value)}
                    defaultValue={user.email} />
            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                Confirm password:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'****'}
                onChange={(e) => setPassword(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round" loading={isLoading} onClick={changeEmailHandler}>
                    Change email
                </Button>
            </div>
        </div>
    </>;
}

export default ChangingMail;
