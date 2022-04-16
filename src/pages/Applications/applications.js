import 'antd/dist/antd.css';
import classes from './applications.module.css';
import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../store/application-context";
import './applications.module.css';
import AppCard from "../../Components/Application/AppCard";
import { Input, Select, Spin } from "antd";
import UserContext from '../../store/user-context';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Applications = () => {

    const [filter, setFilter] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const appCtx = useContext(ApplicationContext);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        // setIsLoading(true);
        if (user._id) {
            // let field = ''
            let url = "http://localhost:2000/forms?search=owner:" + user._id;
            // console.log(userCtx.token)
            if (user.userType !== 'Business')
                url = "http://localhost:2000/response/me" + '';


            // console.log(url)
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userCtx.token
                }
            })
                .then(res => {
                    // console.log(res.data.token)
                    setIsLoading(false);

                    if (res.status === 200) {
                        setApplications(res.data);
                        if (user.userType != 'Business') {
                            let forms = [];
                            console.log(res.data)
                            res.data.forEach(d => {
                                forms.push(d.form);
                            })
                            console.log(forms)
                        }
                    } else {
                        setIsLoading(false);
                        throw new Error('wrong');
                    }
                }).catch(err => {
                    setIsLoading(false);
                    console.log(err)
                });
        }

    }, [user])
    const searchValueHandler = (e) => {
        const v = e.target.value;
        setValue(v);
        // console.log(value)
    }
    const filterChangeHandler = (e) => {
        setFilter(e)
    }
    if (!appCtx.length) {
        return <p><b>No applications found.</b></p>
    }

    let content = (applications.map((app) => {
        if (!app[filter])
            return <AppCard key={app._id} app={app} />
        if (app[filter].toLowerCase().toString().includes(value.toLowerCase().toString()))
            return <AppCard key={app._id} app={app} />
    }));

    return <>

        {user && user.userType === 'Business' &&
            <div className={` ${classes.cardsGroup} d-flex justify-content-center`} style={{ border: '', marginBottom: '' }}>
                {/* <div className={'row'} style={{ border: 'solid', marginBottom: '' }} > */}
                {/* <div> */}
                <Button className={` ${classes['custom-btn']}`} //style={{ maxWidth: '100%', marginBottom: '' }}
                    onClick={() => history.push('/applications/app')}
                    type='button'>Add a new application</Button>
                {/* </div> */}
                {/* </div> */}
            </div>
        }

        <div className={`container ${classes.cardsGroup} d-flex justify-content-end`} style={{ border: '', marginBottom: '30px' }}>
            <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                <Input defaultValue={value} placeholder={'Searching for...'}
                    style={{ width: '150px', borderRadius: '10px', marginBottom: '-30px' }}
                    onChange={searchValueHandler} />
                <Select placeholder={'Choose a filter'}
                    style={{ width: '170px', borderRadius: '20px', marginBottom: '-30px' }}
                    onChange={filterChangeHandler}>

                    <Select.Option value={'location'}>Place</Select.Option>
                    <Select.Option value={'title'}>subject</Select.Option>
                    <Select.Option value={'jobType'}>Job type</Select.Option>
                    <Select.Option value={'owner'}>business name</Select.Option>
                </Select>
            </div>
        </div>
        {/* <Spin loading={isLoading}> */}

            <div className={`container ${classes.cardsGroup}`} >
                {/* {applications.length > 0 && applications}
            {applications.length == 0 && <p><b>No applications found.</b></p>} */}
                {content}
            </div>
        {/* </Spin> */}
    </>
}

export default Applications;
