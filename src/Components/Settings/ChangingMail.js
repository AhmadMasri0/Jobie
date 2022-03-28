import {Button, Divider, Input, Switch} from "antd";
import classes from "../../pages/Settings/settings.module.css";
import {useContext, useEffect, useRef} from "react";
import UserContext from "../../store/user-context";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

const ChangingMail = () => {
    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    return <>
        <Divider orientation={"left"} style={{fontWeight: 'bold'}}>E-mail</Divider>
        <Divider orientation={'right'} style={{fontWeight: 'normal', borderColor: 'transparent'}}>who can see my email?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                    style={{marginLeft: '10px'}}
                    onClick={(e, d) => {
                    }}
            /></Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                E-mail address:
            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <Input type={"email"} className={classes.customPhone} placeholder={'example@example.com'}
                       defaultValue={user.email}/>
            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                Confirm password:
            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'****'}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round">
                    Change email
                </Button>
            </div>
        </div>
    </>;
}

export default ChangingMail;
