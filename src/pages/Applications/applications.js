import 'antd/dist/antd.css';
import classes from './applications.module.css';
import { useContext, useEffect, useState } from "react";
import './applications.module.css';
import AppCard from "../../Components/Application/AppCard";
import { Input, Select, Skeleton, Spin } from "antd";
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
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);
        if (user._id) {
            let url = "http://localhost:2000/forms?owner=" + user._id + '&';
            // console.log(userCtx.token)
            if (user.userType !== 'Business')
                url = "http://localhost:2000/response/me?" + '';


            if (filter) {
                url = url + `${filter}=${value}`;
            }
            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userCtx.token
                }
            })
                .then(res => {
                    setIsLoading(false);

                    if (res.status === 200) {
                        let forms = [];

                        console.log(res.data);
                        if (user.userType != 'Business') {
                            res.data.forEach((f) => {
                                forms.push(f.form);
                            });
                            setApplications(forms)
                        } else setApplications(res.data);

                    } else {
                        setIsLoading(false);
                        throw new Error('wrong');
                    }
                }).catch(err => {
                    setIsLoading(false);
                    console.log(err)
                });
        }

    }, [user, value])
    const searchValueHandler = (e) => {
        const v = e.target.value;
        setValue(v);
    }
    const filterChangeHandler = (e) => {
        setFilter(e)
    }

    let content;
    if (applications && !applications.length) {
        content =
            <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                <div className={'col-12  text-center'}>
                    <p><b>No applications found.</b></p>
                </div>
            </div>
    }
    else
        content = (applications.map((app) => {
            return <AppCard key={app._id} app={app} />
        }));

    return <>

        {user && user.userType === 'Business' &&
            <div className={` ${classes.cardsGroup} d-flex justify-content-center`} style={{ border: '', marginBottom: '' }}>

                <Button className={` ${classes['custom-btn']}`}
                    onClick={() => history.push('/applications/app')}
                    type='button'>Add a new application</Button>
            </div>
        }

        <div className={`container ${classes.cardsGroup} d-flex justify-content-end`} style={{ border: '', marginBottom: '30px' }}>
            <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                <Input defaultValue={value} placeholder={'Searching for...'}
                    style={{ width: '150px', borderRadius: '10px', marginBottom: '-30px' }}
                    onChange={searchValueHandler} />
                <Select placeholder={'Choose a filter'} allowClear
                    style={{ width: '170px', borderRadius: '20px', marginBottom: '-30px', paddingRight: '5px' }}
                    onChange={filterChangeHandler}>

                    <Select.Option value={'location'}>Place</Select.Option>
                    <Select.Option value={'title'}>subject</Select.Option>
                    <Select.Option value={'jobType'}>Job type</Select.Option>
                </Select>
            </div>
        </div>

        <div className={`container ${classes.cardsGroup}`} >
            <Skeleton loading={isLoading} style={{ color: 'blue' }} active>
                {content}
            </Skeleton>
        </div>
    </>
}

export default Applications;
