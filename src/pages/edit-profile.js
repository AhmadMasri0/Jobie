import classes from "./edit-profile.module.css";
import {Button, Container} from "react-bootstrap";
import {useContext, useEffect, useRef} from "react";
import UserContext from "../store/user-context";
import {useHistory} from 'react-router-dom';
import {Radio, Space} from "antd";

const EditProfile = () => {

    const history = useHistory();
    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    const usernameRef = useRef();
    const birthdayRef = useRef();
    const bioRef = useRef();
    const professionRef = useRef();
    const genderRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    const submitHandler = () => {
        const info = {
            username: usernameRef.current.value,
            bio: bioRef.current.value,
            profession: professionRef.current.value,
            // phone: phoneRef.current.value,
            city: cityRef.current.value,
            country: countryRef.current.value,
            // email: emailRef.current.value,
            gender: genderRef.current.value,
            // birthday: birthdayRef.current.value,
        }
        userCtx.editUserInfo(info);
        history.push('/profile');
    }
    useEffect(() => {
        genderRef.current.value = user.gender;

    }, [])

    const cancelHandler = () => {
        history.push('/profile');
    }
    return <div className='container'>
        <div className={`row ${classes.firstRow}`}>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className={classes['about-avatar']}>
                    <img src={require(`../images/${user.image}`)} title="" alt={user.username}/>
                </div>
                <span className={classes.span}><a>Edit profile picture</a></span>
            </div>
        </div>
        <Container className={`container-fluid ${classes.group}`}>
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <label htmlFor="username">Username</label>
                    <input ref={usernameRef} type="text" defaultValue={user.username}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    {/*<label htmlFor="gender">Gender</label>*/}
                    <label htmlFor='gender'>Gender:</label>
                    <Space direction="horizontal" className={''}>
                        <Radio.Group onChange={(e) => genderRef.current.value = e.target.value} name={'gender'}
                                     ref={genderRef} defaultValue={user.gender}>
                            <Space direction="horizontal">
                                <Radio value={'male'}>Male</Radio>
                                <Radio value={'female'}>Female</Radio>
                            </Space>
                        </Radio.Group>

                    </Space>
                    {/*<input type="text" ref={genderRef} defaultValue={user.gender}/>*/}
                </div>
            </div>
            <hr/>
            {/*<div className='row'>*/}
            {/*<div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">*/}
            {/*    <label htmlFor="birthday">Birthday</label>*/}
            {/*    <input ref={birthdayRef} type="date" defaultValue={user.birthday}/>*/}
            {/*</div>*/}
            {/*<div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">*/}
            {/*    /!*<label htmlFor="gender">Gender</label>*!/*/}
            {/*    <label htmlFor='gender'>Gender:</label>*/}
            {/*    <Space direction="horizontal" className={''}>*/}
            {/*        <Radio.Group onChange={(e) => genderRef.current.value = e.target.value} name={'gender'}*/}
            {/*                     ref={genderRef} defaultValue={user.gender}>*/}
            {/*            <Space direction="horizontal">*/}
            {/*                <Radio value={'male'}>Male</Radio>*/}
            {/*                <Radio value={'female'}>Female</Radio>*/}
            {/*            </Space>*/}
            {/*        </Radio.Group>*/}

            {/*    </Space>*/}
            {/*    /!*<input type="text" ref={genderRef} defaultValue={user.gender}/>*!/*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<hr/>*/}
            {/*<div className='row'>*/}
            {/*    <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">*/}
            {/*        <label htmlFor="email">E-mail</label>*/}
            {/*        <input type="email" ref={emailRef} defaultValue={user.email}/>*/}
            {/*    </div>*/}
            {/*    <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">*/}
            {/*        <label htmlFor="phone">Mobile</label>*/}
            {/*        <input type="tel" pattern={'[0-9]{10}'} ref={phoneRef} defaultValue={user.phone}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<hr/>*/}
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <label htmlFor="city">City</label>
                    <input type="text" ref={cityRef} defaultValue={user.city}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <label htmlFor="country">Country</label>
                    <input type="text" ref={countryRef} defaultValue={user.country}/>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <label htmlFor="profession">Profession</label>
                    <input type="text" ref={professionRef} defaultValue={user.profession}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <label htmlFor="bio">Bio</label>
                    <textarea className={'float-end '} ref={bioRef} name="bio" id="" defaultValue={user.bio}/>
                </div>
            </div>
            {/*<hr/>*/}
            <div className='row '>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <Button className={classes['custom-btn']} type='button' onClick={submitHandler}>Save</Button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 justify-content col-xs-12">
                    <Button className={`float-md-none ${classes['custom-btn']}`} onClick={cancelHandler}
                            type='button'>Cancel</Button>
                </div>
            </div>
        </Container>
    </div>;
}

export default EditProfile;
