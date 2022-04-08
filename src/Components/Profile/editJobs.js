import classes from "../Modal/modal.module.css";
import { Button } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import 'moment-precise-range-plugin'
import UserContext from "../../store/user-context";
import axios from "axios";

const dateFormat = 'YYYY/MM/DD';
const EditJob = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [isLoading, setIsLoading] = useState(false);
    const enteredNam = useRef();
    const enteredCity = useRef();
    const enteredCountry = useRef();
    const enteredPosition = useRef();
    const enteredDuration = useRef();

    useEffect(() => {

        enteredDuration.current.value = props.job && props.job.job ?
            [moment(new Date(props.job.job.duration.start).toISOString().split('T')[0], dateFormat),
            moment(new Date(props.job.job.duration.end).toISOString().split('T')[0], dateFormat)] : null;

    }, [])
    const editJobs = () => {

        setIsLoading(true)
        const s = new Date(enteredDuration.current.value[0]._d);
        const d = new Date(enteredDuration.current.value[1]._d);
        const job = {
            job: {
                companyName: enteredNam.current.value,
                location: {
                    city: enteredCity.current.value,
                    country: enteredCountry.current.value
                },
                position: enteredPosition.current.value,
                duration: {
                    start: s,
                    end: d
                }
            }
        }
        let sentJob;
        if (!props.editing) {
            user.prevJobs.push(job);
            sentJob = user.prevJobs;
        }
        else {
            sentJob = user.prevJobs;
            sentJob = sentJob.map((j) => {
                if ((j._id == props.job._id)) {
                    // if (!deleting)
                    return job;
                }
                else return j;
            })
        }
        console.log(sentJob);

        axios.patch(`http://localhost:2000/users/me`, {
            prevJobs: sentJob
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data);
                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                setIsLoading(false)
            });
        props.overlay(false);
    }
    const deleteJob = () => {

        setIsLoading(true)

        const sentJob = user.prevJobs.filter((j) => {
            console.log(j)

            if ((j._id != props.job._id)) {
                return j;

            }
        })

        axios.patch(`http://localhost:2000/users/me`, {
            prevJobs: sentJob
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data);
                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                setIsLoading(false)
            });
        props.overlay(false);
      
    }
    return <div>
        <div className={`row ${classes.customRow}`}>
            <div className={`${classes.customCol}`}>
                <label>Business name</label>
                <input ref={enteredNam} className={classes.customInput} type='text' placeholder={'Business name'}
                    defaultValue={props.job && props.job.job ? props.job.job.companyName : null} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>City</label>
                <input ref={enteredCity} className={classes.customInput} type='text' placeholder={'city'}
                    defaultValue={props.job && props.job.job ? props.job.job.location.city : null} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Country</label>
                <input ref={enteredCountry} className={classes.customInput} type='text' placeholder={'country'}
                    defaultValue={props.job && props.job.job ? props.job.job.location.country : null} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Position</label>
                <input ref={enteredPosition} className={classes.customInput} type='text' placeholder={'Position'}
                    defaultValue={props.job && props.job.job ? props.job.job.position : null} />
            </div>
            <div className={`${classes.customCol}`}>
                <label>Duration</label>
                <DatePicker.RangePicker
                    ref={enteredDuration}
                    className={classes.customInput}
                    defaultValue={props.job && props.job.job ? [moment(new Date(props.job.job.duration.start).toISOString().split('T')[0], dateFormat),
                    moment(new Date(props.job.job.duration.end).toISOString().split('T')[0], dateFormat)] : null}
                    onCalendarChange={(e) => {
                        if (e) {
                            enteredDuration.current.value = e
                        } else enteredDuration.current.value = null
                    }}
                    format={dateFormat}
                />
            </div>
        </div>
        <div className={`${classes.customCol}`}>
            <Button loading={isLoading} className={` ${classes['custom-btn']}`} onClick={editJobs}
                style={!props.editing ? { marginLeft: '38%' } : {}}>
                {!props.editing ? 'Add' : 'Edit'}</Button>
            {props.editing && <Button className={` ${classes['custom-btn']}`} loading={isLoading} onClick={deleteJob}>Delete job</Button>}
        </div>
        <hr />
    </div>
}
export default EditJob;
