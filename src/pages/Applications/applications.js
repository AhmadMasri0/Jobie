import 'antd/dist/antd.css';
import classes from './applications.module.css';
import { useContext, useState } from "react";
import ApplicationContext from "../../store/application-context";
import './applications.module.css';
import AppCard from "../../Components/Application/AppCard";
import { Input, Select } from "antd";

const Applications = () => {

    const [filter, setFilter] = useState('');
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
    if (!appCtx.length) {
        return <p><b>No applications found.</b></p>
    }

    const applications = (appCtx.map((app) => {
        if (!app[filter])
            return <AppCard key={app.id} app={app} />
        if (app[filter].toLowerCase().toString().includes(value.toLowerCase().toString()))
            return <AppCard key={app.id} app={app} />
    }));

    return <>
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
        <div className={`container ${classes.cardsGroup}`} >
            {applications.length > 0 && applications}
            {applications.length == 0 && <p><b>No applications found.</b></p>}
        </div>
    </>
}

export default Applications;
