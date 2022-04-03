import { Button, DatePicker, Divider, Switch } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import moment from "moment";
import { useContext, useState } from "react";
import UserContext from "../../store/user-context";
const dateFormat = 'YYYY-MM-DD';


const BirthDate = () => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [isLoading, setIsLoading] = useState(false);
    const [birthDate, setBirthDate] = useState('');

    const changeBirthDateHandler = () => {

        setIsLoading(true);
        fetch('',
            {
                method: 'post',
                body: JSON.stringify({birthDate}),
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
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>Birthdate</Divider>
        <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my
            birthdate?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                }} />
        </Divider>

        <div className={'row'}>
            <label className={` ${classes.phone}`}>

            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <DatePicker className={classes.customPhone} defaultValue={moment(user.birthday, dateFormat)}
                    onChange={(e) => {
                        setBirthDate(moment(e._d).format('YYYY-MM-DD'))
                    }}
                    format={dateFormat} />
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round" onClick={changeBirthDateHandler} loading={isLoading}>
                    Change birthdate
                </Button>
            </div>
        </div>
    </>
}

export default BirthDate;
