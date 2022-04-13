import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../store/application-context";
import AppCard from "../../Components/Application/AppCard";
import classes from "../Applications/applications.module.css";
import { Input, Select } from "antd";
import UserContext from "../../store/user-context";
import axios from "axios";
import UserCard from "../../Components/Users/UserCard";

const Home = props => {

    const userCtx = useContext(UserContext);
    const [filter, setFilter] = useState('applications');
    const [value, setValue] = useState('');
    const [shownData, setShownData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplication] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        console.log('entered')
        let url = "http://localhost:2000/forms"
        if (filter !== 'applications')
            url = "http://localhost:2000/users?search=userType:" + filter;
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                // console.log(res.data.token)
                if (res.status === 200) {

                    if (filter === 'applications')
                        setApplication(res.data);
                    else
                        setUsers(res.data);

                    console.log(res.data)
                    setIsLoading(false);
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
                // console.log(err)
            });

    }, [filter]);

    const searchValueHandler = (e) => {
        const v = e.target.value;
        setValue(v);
        // console.log(value)
    }
    const filterChangeHandler = (e) => {
        setFilter(e)
    }
    let content;

    if (filter === 'applications') {
        if (applications && !applications.length) {
            content =
                <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                    <div className={'col-12  text-center'}>
                        <p><b>No applications found.</b></p>
                    </div>
                </div>
        }
        else if (applications)
            content = (applications.map((app) => {
                if (app && !app[filter])
                    return <AppCard key={app._id} app={app} />
                if (app[filter].toLowerCase().toString().includes(value.toLowerCase().toString()))
                    return <AppCard key={app._id} app={app} />
            }));
    } else {
        if (users && !users.length) {
            content =
                <div className={'row'} style={{ border: '', marginBottom: '10px' }}>
                    <div className={'col-12  text-center'}>
                        <p><b>No {filter} found.</b></p>
                    </div>
                </div>
        } else if (users) {
            content = (users.map((user) => {
                if (user && !user[filter])
                    return <UserCard key={user._id} user={user} />
                if (user[filter].toLowerCase().toString().includes(value.toLowerCase().toString()))
                    return <UserCard key={user._id} user={user} />
            }));
        }

    }
    // }


    // console.log(applications.length);

    return <>
        <div className={`container ${classes.cardsGroup} d-flex justify-content-end`} style={{ border: '', marginBottom: '30px' }}>
            <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Title</p>
                    {/*<br/>*/}
                    <Input defaultValue={value} placeholder={'some title'}
                        style={{ width: '150px', borderRadius: '10px' }}
                        onChange={searchValueHandler} />
                </div>
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Profession</p>
                    {/*<br/>*/}
                    <Input defaultValue={value} placeholder={'some profession'}
                        style={{ width: '150px', borderRadius: '10px' }}
                        onChange={searchValueHandler} />
                </div>
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Place</p>
                    {/*<br/>*/}
                    <Input defaultValue={value} placeholder={'some place'}
                        style={{ width: '150px', borderRadius: '10px' }}
                        onChange={searchValueHandler} />
                </div>
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Searching for?</p>
                    {/*<br/>*/}
                    <Select placeholder={'Choose a filter'}
                        defaultValue={'applications'}
                        style={{ width: '150px', borderRadius: '20px' }}
                        onChange={filterChangeHandler}>
                        <Select.Option value={'applications'}>Applications</Select.Option>
                        <Select.Option value={'Business'}>Business</Select.Option>
                        <Select.Option value={'FreeLancer'}>Freelancer</Select.Option>
                    </Select>
                </div>
            </div>

        </div>
        <div className={`container ${classes.cardsGroup}`} style={{ marginTop: '-40px' }}>
            {/* {content.length > 0 && content} */}
            {/* {content.length === 0 && content} */}
            {content}
        </div>
    </>
}

export default Home;
