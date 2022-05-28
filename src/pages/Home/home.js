import { useContext, useEffect, useState } from "react";
import ApplicationContext from "../../store/application-context";
import AppCard from "../../Components/Application/AppCard";
import classes from "../Applications/applications.module.css";
import { Input, Select, Skeleton, Pagination } from "antd";
import UserContext from "../../store/user-context";
import axios from "axios";
import UserCard from "../../Components/Users/UserCard";

const Home = props => {

    const userCtx = useContext(UserContext);
    const [filter, setFilter] = useState('applications');
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplication] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState(null);
    const [place, setPlace] = useState(null);
    const [profession, setProfession] = useState(null);
    const [flag, setFlag] = useState(false);
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(5)

    useEffect(() => {
        setIsLoading(true);
        let url = "http://localhost:2000/forms?"
        if (filter !== 'applications')
            url = "http://localhost:2000/users?userType=" + filter + '&';


        if (title && title.trim() !== '') {
            if (filter === 'applications')
                url = url + 'title=' + title + '&';
            else
                url = url + 'name=' + title + '&';
        }
        if (profession && profession.trim() !== '') {
            if (filter === 'applications')
                url = url + 'profession=' + profession + '&';
            else
                url = url + 'specialization=' + profession + '&';
        }
        if (place && place.trim() !== '') {
            url = url + 'place=' + place + '&';
        }
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {
                if (res.status === 200) {

                    if (filter === 'applications')
                        setApplication(res.data);
                    else
                        setUsers(res.data);

                    setFlag(true);
                    setIsLoading(false);
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
            });

    }, [filter, title, place, profession]);

    const compare = (a, b) => {
        let words1 = a.split(/\s+/g);
        let words2 = b.split(/\s+/g)
        for (let i = 0; i < words1.length; i++) {
            for (let j = 0; j < words2.length; j++) {
                if (words1[i].toLowerCase() == words2[j].toLowerCase()) {
                    return -1
                }
            }
        }
        return 1;
    }

    const filterChangeHandler = (e) => {
        setFilter(e)
        setMin(0)
        setMax(5)
    }
    const paginationHandler = (v) => {
        console.log(v)
        setMin((v - 1) * 5)
        setMax((v) * 5)
    }
    let content;

    if (flag) {
        let t;
        if (filter === 'applications')
            t = applications;
        else t = users
        if (userCtx.user && !(Object.keys(userCtx.user).length === 0 && userCtx.user.constructor === Object)) {
            t = t.sort((a, b) => {
                if (filter === 'applications' ? (a.owner.name.toLowerCase() === userCtx.user.name.toLowerCase()) : (a.name.toLowerCase() === userCtx.user.name.toLowerCase()))
                    return -1;

                if (filter === 'applications' && userCtx.user.specialization) {
                    if (compare(a.field, userCtx.user.specialization) === -1)
                        return -1
                    if (compare(a.title, userCtx.user.specialization) === -1)
                        return -1
                }
                if (filter !== 'applications' && a.specialization && userCtx.user.specialization)
                    if (compare(a.specialization, userCtx.user.specialization) === -1)
                        return -1

                return 1;
            })
        }
        // console.log(t)
        if (filter === 'applications')
            setApplication(t)
        else
            setUsers(t)
        setFlag(false)
    }

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
            content = (applications.slice(min, max).map((app) => {
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
            content = (users.slice(min, max).map((user) => {
                return <UserCard key={user._id} user={user} />
            }));
        }

    }

    console.log(typeof content)

    return <>
        <div className={`container ${classes.cardsGroup} d-flex justify-content-end`} style={{ border: '', marginBottom: '30px' }}>
            <div className={'row'} style={{ border: '', marginBottom: '10px' }} >
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Title</p>
                    {/*<br/>*/}
                    <Input value={title} placeholder={'some title'}
                        style={{ width: '150px', borderRadius: '10px', backgroundColor: '' }}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Profession</p>
                    {/*<br/>*/}
                    <Input value={profession} placeholder={'some profession'}
                        style={{ width: '150px', borderRadius: '10px' }}
                        onChange={(e) => setProfession(e.target.value)} />
                </div>
                <div className={'col-sm-6 col-lg-3 col-md-3  text-center'}>
                    <p style={{ textAlign: 'center', marginBottom: '-1px' }}>Place</p>
                    {/*<br/>*/}
                    <Input value={place} placeholder={'some place'}
                        style={{ width: '150px', borderRadius: '10px' }}
                        onChange={(e) => setPlace(e.target.value)} />
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
            <Skeleton loading={isLoading} style={{ color: 'blue' }} active>
                {content}
            </Skeleton>
            {filter === 'applications' && applications.length > 5 && <Pagination total={ applications.length} pageSize={5} onChange={paginationHandler} />}
            {filter !== 'applications' && users.length > 5 && <Pagination total={ users.length} pageSize={5} onChange={paginationHandler} />}
        </div>
    </>
}

export default Home;
