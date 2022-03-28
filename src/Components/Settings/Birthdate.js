import {Button, DatePicker, Divider, Switch} from "antd";
import classes from "../../pages/Settings/settings.module.css";
import moment from "moment";
import {useContext} from "react";
import UserContext from "../../store/user-context";
const dateFormat = 'YYYY-MM-DD';

const Birthdate = () => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    return <>
        <Divider orientation={"left"} style={{fontWeight: 'bold'}}>Birthdate</Divider>
        <Divider orientation={'right'} style={{fontWeight: 'normal', borderColor: 'transparent'}}>who can see my
            birthdate?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                    style={{marginLeft: '10px'}}
                    onClick={(e, d) => {
                    }}/>
        </Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>

            </label>
            <div style={{border: '', maxWidth: '50%'}}>
                <DatePicker className={classes.customPhone} defaultValue={moment(user.birthday, dateFormat)}
                            format={dateFormat}/>
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round">
                    Change birthdate
                </Button>
            </div>
        </div>
    </>
}

export default Birthdate;
