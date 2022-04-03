import classes from "./edit-profile.module.css";
import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import { useHistory } from 'react-router-dom';
import { Radio, Space, Upload, Spin } from "antd";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import TextArea from "antd/es/input/TextArea";

const EditProfile = () => {

    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [gender, setGender] = useState(user.gender);
    const [bio, setBio] = useState(user.bio);
    const usernameRef = useRef();
    const professionRef = useRef();
    const cityRef = useRef();
    const countryRef = useRef();
    const submitHandler = () => {
        setIsLoading(true);
        const info = {
            username: usernameRef.current.value,
            bio: bio,
            profession: professionRef.current.value,
            city: cityRef.current.value,
            country: countryRef.current.value,
            gender: gender
        }
        userCtx.editUserInfo(info);
        setIsLoading(false)
        history.push('/profile');
    }
    useEffect(() => {
        setGender(user.gender);
        setBio(user.bio);
        // genderRef.current.value = user.gender;
        // bioRef.current.value = user.bio;

    }, [])

    const cancelHandler = () => {
        history.push('/profile');
    }

    const uploadImageHandler = (event) => {
        const file = event.target.value;
        console.log(event.target.value);
        handlerUpload(file);
    }

    const handlerUpload = (file) => {
        const metadata = {
            contentType: 'image/png'
        };
        if (!file)
            return;
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed', (snapshot => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(prog);
        }, err => {
            console.log(err)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => console.log(url))
        }))
    }
    return <div className='container'>
        <div className={`row ${classes.firstRow} justify-content-md-center`}>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className={classes['about-avatar']}>
                    <img src={require(`../../images/${user.image}`)} onClick={() => setVisible(true)} title=""
                        alt={user.username} />
                </div>
                <Upload
                    action={'http://localhost:3000/'}
                    listType={'picture'}
                    className={classes.span}
                    accept={'image/*'}
                    beforeUpload={() => false}
                    onChange={uploadImageHandler}
                >
                    Edit profile picture
                </Upload>
            </div>
        </div>
        <Spin spinning={isLoading}>
             <Container className={`container-fluid ${classes.group}`}>
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor="username">Username</label>
                    <input ref={usernameRef} type="text" defaultValue={user.username} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor='gender'>Gender:</label>
                    <Space direction="horizontal" className={''}>
                        <Radio.Group onChange={(e) => setGender(e.target.value)} name={'gender'}
                            defaultValue={gender}>
                            <Space direction="horizontal">
                                <Radio value={'male'}>Male</Radio>
                                <Radio value={'female'}>Female</Radio>
                            </Space>
                        </Radio.Group>
                    </Space>
                </div>
            </div>
            <hr />
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor="city">City</label>
                    <input type="text" ref={cityRef} defaultValue={user.city} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor="country">Country</label>
                    <input type="text" ref={countryRef} defaultValue={user.country} />
                </div>
            </div>
            <hr />
            <div className='row'>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor="profession">Profession</label>
                    <input type="text" ref={professionRef} defaultValue={user.profession} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <label htmlFor="bio">Bio</label>
                    <TextArea showCount maxLength={200} style={{ height: 120, width: '90%' }} onChange={(e) => setBio(e.currentTarget.value)} className={'float-end '}
                        name="bio" id="" defaultValue={bio} />
                </div>
            </div>
            <div className='row '>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <Button className={classes['custom-btn']} type='button' onClick={submitHandler}>Save</Button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                    <Button className={`float-md-none ${classes['custom-btn']}`} onClick={cancelHandler}
                        type='button'>Cancel</Button>
                </div>
            </div>
        </Container>
        </Spin>
    </div>;
}

export default EditProfile;
