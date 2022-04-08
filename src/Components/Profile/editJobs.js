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
    const duration = props.job.duration;


    const y1 = duration ? duration.split('-')[0].split('/')[0] : '2022';
    const m1 = duration ? duration.split('-')[0].split('/')[1] : '3';
    const y2 = duration ? duration.split('-')[1].split('(')[0].split('/')[0] : '2021';
    const m2 = duration ? duration.split('-')[1].split('(')[0].split('/')[1] : '5';


    const enteredNam = useRef();
    const enteredCity = useRef();
    const enteredCountry = useRef();
    const enteredPosition = useRef();
    const enteredDuration = useRef();

    let start, end;

    useEffect(() => {
        start = props.job.duration ? props.job.duration.start : moment(`${y1}-${m1}-1`, dateFormat);
        end = props.job.duration ? props.job.duration.end : moment(`${y2}-${m2}-1`, dateFormat);
        enteredDuration.current.value = [start, end];
    }, [])

    const editJobs = () => {
        const s = new Date(enteredDuration.current.value[0]._d);
        const d = new Date(enteredDuration.current.value[1]._d);
        // console.log();
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
        // const rem = [job,{}];
        user.prevJobs.push(job);
        console.log(job);

        axios.patch(`http://localhost:2000/users/me`, {
            prevJobs: user.prevJobs
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    // setBirthDate(res.data.BirthDate);
                    userCtx.setCurrentUser(res.data);
                    // history.push('/profile');
                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                setIsLoading(false)

                //error handling
            });
        // props.onEditJob(job);


        props.overlay(false);
    }
    const deleteJob = () => {
        props.onDeleteJob(props.job.id);
        props.overlay(false);
    }
    return <div>
        <div className={`row ${classes.customRow}`}>
            <div className={`${classes.customCol}`}>
                <label>Business name</label>
                <input ref={enteredNam} className={classes.customInput} type='text' placeholder={'Business name'}
                    defaultValue={props.job.companyName} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>City</label>
                <input ref={enteredCity} className={classes.customInput} type='text' placeholder={'city'}
                    defaultValue={props.job.place} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Country</label>
                <input ref={enteredCountry} className={classes.customInput} type='text' placeholder={'country'}
                    defaultValue={props.job.place} />
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Position</label>
                <input ref={enteredPosition} className={classes.customInput} type='text' placeholder={'Position'}
                    defaultValue={props.job.position} />
            </div>
            <div className={`${classes.customCol}`}>
                <label>Duration</label>
                <DatePicker.RangePicker
                    ref={enteredDuration}
                    className={classes.customInput}
                    defaultPickerValue={[moment(`${y1}-${m1}-1`, dateFormat), moment(`${y2}-${m2}-1`, dateFormat)]}
                    defaultValue={[moment(`${y1}-${m1}-1`, dateFormat), moment(`${y2}-${m2}-1`, dateFormat)]}
                    onCalendarChange={(e) => {
                        if (e) {
                            // const s = moment(e[0]);
                            // const end = moment(e[1]);
                            // const years = moment.preciseDiff(s, end, true).years;
                            // const months = moment.preciseDiff(s, end, true).months;
                            // const ye1 = s.year() + '/' + s.month();
                            // const ye2 = end.year() + '/' + end.month();
                            // // console.log(ye1 + '-' + ye2 + '(' + years + 'years & ' + months + 'months)')
                            enteredDuration.current.value = e //ye1 + '-' + ye2 + '(' + years + 'years & ' + months + 'months)';
                        } else enteredDuration.current.value = null
                        // console.log('f',enteredDuration.current.value[0]._d);

                    }}
                    format={dateFormat}
                />
            </div>
        </div>
        <div className={`${classes.customCol}`}>
            <Button loading={isLoading} className={` ${classes['custom-btn']}`} onClick={editJobs}
                style={!props.editing ? { marginLeft: '38%' } : {}}>
                {!props.editing ? 'Add' : 'Edit'}</Button>
            {props.editing && <Button className={` ${classes['custom-btn']}`} loading={props.isLoading} onClick={deleteJob}>Delete job</Button>}
        </div>
        <hr />
    </div>
}
export default EditJob;
