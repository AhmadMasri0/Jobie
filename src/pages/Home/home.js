import { useContext, useState } from "react";
import ApplicationContext from "../../store/application-context";
import AppCard from "../../Components/Application/AppCard";
import classes from "../Applications/applications.module.css";
import { Input, Select } from "antd";

const Home = props => {

    const [filter, setFilter] = useState('applications');
    const [value, setValue] = useState('');

    const appCtx = useContext(ApplicationContext);

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
        if (!appCtx.length) {
            return <p><b>No applications found.</b></p>
        }

        content = (appCtx.map((app) => {
            if (!app[filter])
                return <AppCard key={app.id} app={app} />
            if (app[filter].toLowerCase().toString().includes(value.toLowerCase().toString()))
                return <AppCard key={app.id} app={app} />
        }));
    }


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
                        <Select.Option value={'business'}>Business</Select.Option>
                        <Select.Option value={'freelancer'}>Freelancer</Select.Option>
                    </Select>
                </div>
            </div>

        </div>
        <div className={`container ${classes.cardsGroup}`} style={{ marginTop: '-40px' }}>
            {content.length > 0 && content}
            {content.length === 0 && <p><b>No applications found.</b></p>}
        </div>
    </>
}

export default Home;
