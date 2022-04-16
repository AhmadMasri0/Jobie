import { useParams } from 'react-router-dom'
import classes from "./applications.module.css";
import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../store/application-context";
import { Divider, Spin } from "antd";
import { Button } from 'antd';
import AuthContext from '../../store/auth-context';
import UserContext from '../../store/user-context';
import axios from 'axios';
import Skills from '../../Components/Profile/Skills';
import { useHistory } from 'react-router-dom';

const Application = () => {

    const history = useHistory();
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const param = useParams()
    const [application, setApplication] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    // console.log(param)

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:2000/forms/" + param.appId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                // console.log(res.data)
                if (res.status === 200) {

                    setApplication(res.data[0]);
                    console.log(res.data)
                    setIsLoading(false);
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
                // console.log(err)
            });
    }, []);

    useEffect(() => {
        console.log(application.owner === user._id)
        if (application.owner === user._id)
            setIsEditor(true);
    }, [application])
    const applyingHandler = () => {
        // Skills

        console.log(user)
        if (user) {
            const sentResponse = {
                owner: user._id,
                form: application._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                phone: user.phone,
                specialization: user.specialization,
                location: user.location,
                skills: user.skills
            };
            setIsLoading(true);
            axios.post(`http://localhost:2000/response`, sentResponse, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userCtx.token
                }
            })
                .then(res => {
                    // console.log('----------------',res.data)
                    setIsLoading(false)

                    if (res.status === 200) {
                        history.replace('/');
                    } else {
                        throw new Error('wrong');
                    }
                }).catch(err => {
                    setIsLoading(false)
                    console.log(err)
                });
            // console.log(sentResponse)
        } else {
            history.push('/login')
        }
    }

    //dg
    const deleteApp = () => {

        setIsLoading1(true)
        axios.delete('http://localhost:2000/forms/' + param.appId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userCtx.token
                }
            }).then(res => {
                // console.log('----------------',res.data)
                setIsLoading1(false)

                if (res.status === 200) {
                    history.replace('/applications');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading1(false)
                console.log(err)
            });
    }

    const date = application.deadline && new Date(application.deadline).toLocaleDateString();
    return <div>
        {isEditor && <div className={`container ${classes.cardsGroup}`} >
            <Button loading={isLoading1} disabled={!application.submitters} className={`float-start ${classes['custom-btn']}`}
                style={{ marginLeft: '10px' }}
                onClick={deleteApp} type='button'>Submitters: {application.submitters}</Button>
            <Button loading={isLoading1} className={`float-end ${classes['custom-btn']}`} style={{ marginLeft: '10px' }}
                onClick={deleteApp} type='button'>Delete the application</Button>
            {/* <br /> */}
            <Button className={`float-end ${classes['custom-btn']}`}
                onClick={() => history.push('/applications/app/' + param.appId)} type='button'>Update the application</Button>
            <br />
        </div>}
        <div className={`container ${classes.cardsGroup}`} style={{ backgroundColor: '#FFFFFFBA' }}>

            <div className={'d-flex justify-content-lg-center justify-content-md-start ms-md-4 me-sm-5 justify-content-sm-center'}>
                <h3>
                    {application.title}
                    <hr className={classes.hr} />

                </h3>
            </div>
            <div className={'d-flex justify-content-lg-start justify-content-md-center justify-content-sm-center'}>
                <b style={{ color: 'darkred' }}>
                    Applying is available until {date}
                    <hr className={classes.hr} />
                </b>
            </div>
            <div className={'d-flex justify-content-center'}>
                <p>
                    <b>
                        {application.description}
                    </b>
                </p>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold" }}>Requirements</Divider>
            <div className={'d-flex justify-content-lg-start justify-content-sm-center me-sm-5 '}>

                <ul style={{ marginLeft: '10%', listStyle: 'none' }}>
                    {application.requirements && application.requirements.map(req =>
                        <li key={req} style={{ marginBottom: '10px', border: '' }}>
                            <b>- {req}</b>
                        </li>
                    )}
                </ul>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold" }}>More details</Divider>
            <div className={'row justify-content-lg-start'}
            // style={{backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '20px'}}
            >
                {application.details && Object.entries(application.details).map(([k, v]) =>
                    <div key={k} className={'col-lg-4 col-md-6 col-sm-12'}>
                        <label className={'text-lg-center'}>{k}: </label>
                        <span style={{ marginLeft: '5px' }}>
                            {v}
                        </span>
                    </div>
                )}
                <div className={'col-lg-4 col-md-6 col-sm-12'}>
                    <label className={'text-lg-center'}>Job type</label>
                    <span style={{ marginLeft: '5px' }}>
                        {application.jobType}
                    </span>
                </div>
                <div className={'col-lg-4 col-md-6 col-sm-12'}>
                    <label className={'text-lg-center'}>Location</label>
                    <span style={{ marginLeft: '5px' }}>
                        {application.location && (application.location.city + '-' + application.location.country)}
                    </span>
                </div>
                <div className={'ms-5 container'}>
                    <b>
                        If you have any question, contact us:
                    </b>
                    <div style={{ paddingLeft: '10%' }}>

                        <p style={{ marginTop: '20px' }}>
                            <b>Phone: </b>
                            <a href={`tel:${application.phone}`}>{application.phone}</a>
                        </p>
                        <p>
                            <b>E-mail: </b>
                            <a href={`mailto:${application.email}`}>{application.email}</a>
                        </p>
                    </div>
                </div>
            </div>
            {(!user || user.userType !== 'Business') && <div className={'d-flex justify-content-center'}>
                <Button loading={isLoading} className={`float-md-none ${classes['custom-btn']}`} onClick={applyingHandler}
                    type='button'>Apply</Button>
            </div>}
        </div>
    </div>
}

export default Application;
