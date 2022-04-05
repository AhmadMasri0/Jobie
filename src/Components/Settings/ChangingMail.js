import { Button, Divider, Input, Space, Switch } from "antd";
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
    const [isAddingEmailVisible, setIsAddingEmailVisible] = useState(false);

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
    const showAddingEmailHandler = () => {
        setIsAddingEmailVisible(!isAddingEmailVisible);
    }

    return <>
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>Emails</Divider>
        <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my email?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                }}
            /></Divider>
        <Divider orientation={'left'} style={{
            fontWeight: 'bold', borderColor: 'transparent', paddingLeft: '10%',
           
        }}><span style={{ color: 'rgba(14, 40, 130, 0.85)', background: 'white', borderRadius:'10px',padding: '10px'}}>{user.email}</span></Divider>
        {/* <div className={'row'}>
            <label className={` ${classes.phone}`}>
                E-mail address:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input type={"email"} contentEditable={false} className={classes.customPhone} placeholder={'example@example.com'}
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={user.email} />
            </div>
        </div> */}
        <Divider orientation={"right"} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>
            <p className={classes.addPhone} onClick={showAddingEmailHandler}>
                {isAddingEmailVisible ? 'Close adding a new email' : 'Add a new email?'}
            </p>
        </Divider>

        {isAddingEmailVisible && <Space className={'d-flex justify-content-center'} direction={"horizontal"}
            style={{ marginBottom: '3%', width: '100%' }}>

            <Input controls={false}
                placeholder={'example@example.com'}
                onChange={(e) => {

                }}
                addonAfter={
                    <label style={{
                        fontWeight: 'normal',
                        marginLeft: '-12px',
                        marginRight: '4px',
                        paddingLeft: '0',
                        cursor: 'pointer',
                    }} onClick={() => {

                    }}
                    >Add</label>}
            />
        </Space>}

        {/* <div className={'row'}>
            <label className={` ${classes.phone}`}>
                Confirm password:
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'****'}
                    onChange={(e) => setPassword(e.target.value)}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
        </div> */}
        {/* <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round" loading={isLoading} onClick={changeEmailHandler}>
                    Change email
                </Button>
            </div>
        </div> */}
    </>;
}

export default ChangingMail;
