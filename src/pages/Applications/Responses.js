import classes from "../Profile/edit-profile.module.css";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Divider, Row, Skeleton, Space } from 'antd';
import { Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import UserContext from "../../store/user-context";

const Responses = () => {

    const param = useParams();
    const formId = param.formId;
    const history = useHistory();
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    // console.log(formId);

    useEffect(() => {

        setIsLoading(true);
        axios.get("http://localhost:2000/response/form/" + formId)
            .then(res => {

                // console.log(res.data)
                if (res.status === 200) {

                    // const t = res.data.value;
                    // t.submitters = res.data.submitters;
                    setResponses(res.data);
                    // console.log(res.data)
                    setIsLoading(false);
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
                // console.log(err)
            });
    }, [])

    const deleteResponse = (id) => {
        axios.delete("http://localhost:2000/response/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                // console.log(res.data)
                if (res.status === 200) {

                    history.replace('/applications')
                    // const t = res.data.value;
                    // t.submitters = res.data.submitters;
                    // setResponses(res.data);
                    // console.log(res.data)
                    // setIsLoading(false);
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
                // console.log(err)
            });
    }
    return <div className={`container`}>
        <Container className={`container-fluid ${classes.group}`} style={{ marginTop: '25px' }}>
            <Skeleton loading={isLoading}>
                {responses.map((response) =>
                    <div className={`row`}>
                        <div className={`col-lg-4 col-md-4 justify-content  col-sm-12 col-xs-12`} style={{ border: '' }} >
                            <div>
                                <label htmlFor="username" className={classes.input} style={{ textAlign: 'start' }}>Username: </label>
                                <span>{response.name}</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 justify-content col-xs-12">
                            <label htmlFor='gender' className={classes.input} style={{ textAlign: 'start' }}>Gender: </label>
                            <span>{response.gender}</span>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 justify-content col-xs-12">
                            <label htmlFor='gender' className={classes.input} style={{ textAlign: 'start' }}>profession: </label>
                            <span>{response.specialization}</span>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 justify-content col-xs-12">
                            <label htmlFor='gender' className={classes.input} style={{ textAlign: 'start' }}>Location: </label>
                            <span>{response.location.city}-{response.location.country}</span>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 justify-content col-xs-12">
                            <label htmlFor='gender' className={classes.input} style={{ textAlign: 'start' }}>E-mail: </label>
                            <span>{response.email}</span>
                        </div>
                        {response.phone.map(p => <div className="col-lg-4 col-md-4 col-sm-12 justify-content col-xs-12">
                            <label htmlFor='gender' className={classes.input} style={{ textAlign: 'start' }}>{p.phoneNum.type}: </label>
                            <span>{p.phoneNum.number}</span>
                        </div>)}
                        {response.Skills.length > 0 &&
                            <div className="col-lg-12 col-md-12 col-sm-12 justify-content-start col-xs-12">
                                <label htmlFor='gender' className={`float-start ${classes.input}`} style={{ textAlign: 'start', marginRight: '-20%', border: '' }}>Skills:</label>
                                {response.Skills.map(s =>
                                    <p style={{ marginLeft: '20%' }}>{s}</p>
                                )}
                            </div>
                        }
                        <Divider orientation={"right"} style={{ fontWeight: 'normal', borderColor: 'transparent' }} >
                            <Button className={` ${classes['custom-btn']}`} style={{ marginTop: '0%', marginBottom: '0px', width: '100%' }}
                                type='button' onClick={() => deleteResponse(response._id)}>Delete response</Button>
                        </Divider>
                        <Divider orientation={"right"} style={{ fontWeight: 'normal', borderColor: '' }} />

                        <Divider orientation={"right"} style={{ fontWeight: 'normal', borderColor: 'transparent' }} />

                    </div>
                )}
            </Skeleton>
        </Container>
    </div>;
}


export default Responses;