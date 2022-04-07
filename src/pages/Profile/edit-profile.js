import classes from "./edit-profile.module.css";
import { Container } from "react-bootstrap";
import { Button } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import { useHistory } from 'react-router-dom';
import { Radio, Space, Upload, Spin } from "antd";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const EditProfile = () => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const userCtx = useContext(UserContext);
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [token, setToken] = useState();
    const [gender, setGender] = useState('male');
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [bio, setBio] = useState();
    const [profession, setProfession] = useState();
    const [image, setImage] = useState();

    // useEffect(() => {
    //     const settingName = (u) => {
    //         setName(u.name);
    //     }
    //     setUser(userCtx.user);
    //     return function settingName() {
    //         setName(user.name)
    //     }
    // })
    const submitHandler = () => {
        // console.log(token)
        setIsLoading(true);

        console.log(name, bio, profession, { city, country }, gender)
        axios.patch(`http://localhost:2000/users/me`, {
            name,
            bio,
            specialization: profession,
            location: { city, country },
            gender
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                // console.log('----------------',res.data)
                setIsLoading(false)

                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data)
                    history.replace('/profile');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false)

                console.log(err)
            });


    }
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        console.log();
        axios.get(`http://localhost:2000/users/${id}`, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(data => {

            if (!data)
                throw new Error('Wrong')
            setUser(data.data);
            setToken(userCtx.token);
            setName(data.data ? data.data.name : null);
            setGender(data.data ? data.data.gender : 'male');
            setCity(data.data && data.data.location ? data.data.location.city : null)
            setCountry(data.data && data.data.location ? data.data.location.country : null)
            setProfession(data.data ? data.data.specialization : null);
            console.log(data)
            setBio(data.data ? data.data.bio : null);
            const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data.image)));
            setImage(base64String);
            // console.log(data.data);
        }).catch(err => console.log(err))
        // user = userCtx.user;

    }, [])

    const cancelHandler = () => {
        history.push('/profile');
    }

    const uploadImageHandler = ({ fileList }) => {

        let formData = new FormData();
        formData.append('avatar', fileList[0].originFileObj);


        axios.post(`http://localhost:2000/users/me/avatar`, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                // console.log(res)


            })
            .catch(err => console.log(err));
        // setImage(fileList);
        // const file = event.target.value;
        console.log(fileList[0].originFileObj);
        // handlerUpload(file);
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
            // console.log(prog);
        }, err => {
            // console.log(err)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => console.log(url))
        }))
    }
    return <div className='container'>
        <div className={`row ${classes.firstRow} justify-content-md-center`}>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className={classes['about-avatar']} onClick={() => setVisible(true)}>
                    <img
                //    src={`data:image/png;base64,${image}`}
                        src={`https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=`}
                        // onClick={() => setVisible(true)} title=""
                        alt={name} 
                        />
                </div>
                <Upload
                    maxCount={1}
                    name="avatar"
                    showUploadList={false}
                    action={'http://localhost:2000/users/me/avatar'}
                    listType={'picture'}
                    className={classes.span}
                    customRequest={uploadImageHandler}
                    accept={'image/*'}
                    beforeUpload={() => false}
                    onChange={uploadImageHandler}
                // onChange={({fileList}) => setImage(fileList[0].originFileObj)}
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
                        <input type="text" placeholder={'Will Smith'} onChange={e => setName(e.target.value)}
                            defaultValue={name} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor='gender'>Gender:</label>
                        <Space direction="horizontal" className={''}>
                            <Radio.Group onChange={(e) => setGender(e.target.value)} name={'gender'} defaultValue={gender}
                            >
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
                        <input type="text" placeholder={'Nablus'}
                            onChange={e => setCity(e.target.value)} defaultValue={city} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="country">Country</label>
                        <input type="text" placeholder={'Palestine'}
                            onChange={e => setCountry(e.target.value)} defaultValue={country} />
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="profession">Profession</label>
                        <input type="text" onChange={e => setProfession(e.target.value)}
                            placeholder={'Developer'} defaultValue={profession} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="bio">Bio</label>
                        <TextArea showCount maxLength={200} style={{ height: 120, width: '90%' }}
                            onChange={(e) => setBio(e.currentTarget.value)} className={'float-end '}
                            name="bio" id="" placeholder="talk briefly about yourself" value={bio} />
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
