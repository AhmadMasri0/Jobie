import { Button, DatePicker, Divider, Switch } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import axios from "axios";
import { useHistory } from "react-router-dom";
const dateFormat = 'YYYY-MM-DD';


const BirthDate = () => {

    const history = useHistory();
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [isLoading, setIsLoading] = useState(false);
    const [birthDate, setBirthDate] = useState();

    useEffect(() => {

        setBirthDate(user.dayOfBirth);
        // const id = JSON.parse(localStorage.getItem('user'))._id;
        // // console.log();
        // axios.get(`http://localhost:2000/users/${id}`, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }).then(data => {

        //     if (!data)
        //         throw new Error('Wrong')
        //     setBirthDate(data.data.dayOfBirth);

        // }).catch(err => {
        //     console.log(err)
        // })

        return function f() {
            // console.log('f' + birthDate);

        }();
    }, [])

    // console.log( birthDate);

    const changeBirthDateHandler = () => {

        setIsLoading(true);
        // console.log(new Date (birthDate));

        axios.patch(`http://localhost:2000/users/me`, {
            dayOfBirth: new Date (birthDate)
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    // setBirthDate(res.data.BirthDate);
                    userCtx.setCurrentUser(res.data);
                    history.push('/profile');
                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                setIsLoading(false)

                //error handling
            });

    }


    return <>
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>BirthDate</Divider>
        {/* <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my
            birthdate?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                }} />
        </Divider> */}

        <div className={'row'}>
            <label className={` ${classes.phone}`}>
            </label>
            <div style={{ border: '', maxWidth: '50%' }}>
                <DatePicker className={classes.customPhone} placeholder={'2000-07-13'} 
                value={birthDate ? moment(birthDate, dateFormat) : null}
                    onChange={(e) => {
                        //  console.log(d)

                        setBirthDate(e ? moment(e._d).format('YYYY-MM-DD'): null)
                    }}
                    format={dateFormat} />
            </div>
        </div>
        <div className="row">
            <div className={'d-flex justify-content-center'}>
                <Button className={` ${classes['custom-btn']}`} shape="round" onClick={changeBirthDateHandler} loading={isLoading}>
                    Change birthDate
                </Button>
            </div>
        </div>
    </>
}

export default BirthDate;
