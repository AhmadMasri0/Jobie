import {Button, Divider, Input} from "antd";
import classes from "../../pages/Settings/settings.module.css";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

const Password = () => {

    return <>
        <Divider orientation={"left"} style={{fontWeight: 'bold'}}>Password</Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                current password:
            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'old password'}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                New password:
            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'new password'}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>

            </div>
        </div>
        <div className={'row'}>
            <label className={` ${classes.phone}`}>
                New password confirmation:
            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <Input.Password controls={false} className={classes.customPhone} placeholder={'password confirmation'}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>

            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round">
                    Change password
                </Button>
            </div>
        </div>
    </>
        ;
}

export default Password;
