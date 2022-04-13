import { Button, Col, DatePicker, Divider, Input, Row, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../store/user-context";
import classes from "./applications.module.css";

const dateFormat = 'YYYY-MM-DD';

const NewApplication = () => {

    const userCtx = useContext(UserContext)
    const history = useHistory();
    const [requirements, setRequirements] = useState([]);
    const [details, setDetails] = useState({});
    const [newTitle, setNewTitle] = useState();
    const [newVale, setNewValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [jobType, setJobType] = useState();
    const [title, setTitle] = useState();
    const [city, setCity] = useState();
    const [country, setCounty] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [addingReq, setAddingReq] = useState(false);
    const [addingDet, setAddingDet] = useState(false);
    const requirement = useRef();

    const addingRequirementHandler = () => {
        const temp = requirements;
        temp.push(requirement.current.state.value);
        setRequirements(temp);
        setAddingReq(false)
        // console.log(temp)
    }

    const addingDetailHandler = () => {
        const temp = details;
        temp[newTitle] = newVale;
        setDetails(temp);
        setAddingDet(false)
    }

    const publishHandler = () => {

        const sentForm = {
            description,
            deadline,
            jobType,
            title,
            location: { city, country },
            email,
            phone,
            requirements,
            details
        }

        // console.log(sentForm)
        setIsLoading(true);

        axios.post("http://localhost:2000/forms", sentForm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })

            .then(res => {

                // console.log(res.data.token)
                if (res.status === 200) {
                    setIsLoading(false);
                    history.replace('/applications');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
            });
    }

    return <>
        <div className={`container ${classes.cardsGroup}`} style={{ backgroundColor: '#FFFFFFBA' }}>
            <div className={'row'}>
                <Space style={{ border: '' }} className={`justify-content-center`}>
                    <label className={`${classes.label}`}>Title</label>
                    <Input className={`${classes.customInput}`} placeholder={'Graphic designer'} onChange={(e) => setTitle(e.target.value)} />
                    <label className={`${classes.label}`}>Deadline</label>
                    <DatePicker className={`${classes.customInput}`} format={dateFormat} onChange={(e) => setDeadline(e._d)} />
                </Space>
                {/* <hr className={classes.hr} /> */}
            </div>
            {/* <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: '' }} /> */}
            {/* <div className={'row'}> */}
            {/* <b style={{ color: 'darkred' }}> */}
            {/* <div className="col-12"> */}
            {/* <Space style={{ border: '' }} className={`justify-content-center`}>
                    <label className={`${classes.label}`}>Deadline</label>
                    <DatePicker className={`${classes.customInput}`} format={dateFormat} />
                </Space> */}
            {/* </div> */}
            {/* <hr className={classes.hr} /> */}
            {/* </b> */}
            {/* </div> */}
            <Divider orientation={'center'} style={{ fontWeight: 'bold', borderColor: '' }} >Description</Divider>
            <div className={'row justify-content-center'} style={{ marginTop: '40px', border: '' }}>
                {/* <div className={`justify-content-center`}> */}
                {/* <Space direction="" style={{ marginTop: '25px' }} className={`justify-content-center`}> */}
                {/* <label>Description</label> */}
                <TextArea className="" maxLength={500} placeholder="Please type a brief description about the job"
                    style={{ height: 200, width: '80%', borderRadius: '15px' }} onChange={(e) => setDescription(e.target.value)} />
                {/* </Space> */}
                {/* </div> */}
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold" }}>Requirements</Divider>
            <div className={'row'}>
                <div>
                    <Button className={`float-end ${classes['custom-btn']}`} onClick={() => setAddingReq(true)}>Add a requirement</Button>
                </div>

                <br />
                {addingReq && <space className={` justify-content-start`}>
                    <Input ref={requirement} className={`${classes.customInput}`} style={{ width: '30%', marginLeft: '10%' }} placeholder={'type a requirement'} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px', marginRight: '5px' }}
                        onClick={addingRequirementHandler}>Add</span>|
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '7px' }} onClick={() => setAddingReq(false)}>Cancel</span>
                </space>}
                <space className={` justify-content-start`}>
                    {requirements.map((req) => <p className={`${classes.customInput}`} style={{ width: '30%', marginLeft: '10%' }}>-{req}</p>)}
                </space>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold" }}>Details</Divider>
            <div className={'row'}>
                <div>
                    <Button className={`float-end ${classes['custom-btn']}`} onClick={() => setAddingDet(true)}>Add details</Button>
                </div>
                {addingDet && <space className={` justify-content-start`}>
                    <Input className={`${classes.customInput}`} style={{ width: '20%', marginLeft: '10%' }} placeholder={'title'}
                        onChange={(e) => setNewTitle(e.target.value)} />
                    <Input className={`${classes.customInput}`} style={{ width: '20%', marginLeft: '5%' }} placeholder={'value'}
                        onChange={(e) => setNewValue(e.target.value)} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px', marginRight: '5px' }}
                        onClick={addingDetailHandler}>Add</span>|
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '7px' }} onClick={() => setAddingDet(false)}>Cancel</span>
                    <br />
                    <br />
                </space>}
                <Row style={{ border: '' }} className={`justify-content-center`}>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>Job type</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} placeholder={'Full-time'}
                            onChange={(e) => setJobType(e.target.value)} />
                    </Col>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>city</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} placeholder={'Nablus'}
                            onChange={(e) => setCity(e.target.value)} />
                    </Col>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>Country</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} placeholder={'Palestine'}
                            onChange={(e) => setCounty(e.target.value)} />
                    </Col>
                    {Object.entries(details).map(([key, value]) => <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>{key}</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} value={value} placeholder={key} />
                    </Col>)
                    }

                </Row>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold" }}>Contacts</Divider>

            <div className={'row'}>
                <Space className={`justify-content-center`}>
                    {/* <Space> */}
                    <b>Phone: </b>
                    <Input className={`${classes.customInput}`} placeholder={'0599121311'} onChange={(e) => setPhone(e.target.value)} ></Input>
                    {/* </Space> */}
                    {/* <Space> */}
                    <b>E-mail: </b>
                    <Input className={`${classes.customInput}`} placeholder={'example@gmai.com'} onChange={(e) => setEmail(e.target.value)}  ></Input>
                    {/* </Space> */}
                </Space>
            </div>
            <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }} />

            {/* <div className={'row'}> */}
            <div className={`d-flex justify-content-center`}>
                {/* <Space className={`justify-content-center`} > */}
                <Button loading={isLoading} className={` ${classes['custom-btn']}`} type='button' onClick={publishHandler}>Publish</Button>
                <Button className={` ${classes['custom-btn']}`} style={{ width: '' }} type='button'
                    onClick={() => history.push('/applications')}>Cancel</Button>
                {/* </Space> */}
            </div>
            {/* </div> */}
        </div>
    </>;
}

export default NewApplication;