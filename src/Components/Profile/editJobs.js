import classes from "../Modal/modal.module.css";
import {Button} from "react-bootstrap";
import {useEffect, useRef} from "react";
import {DatePicker} from "antd";
import moment from "moment";
import 'moment-precise-range-plugin'

const dateFormat = 'YYYY/MM/DD';
const EditJob = (props) => {


    const duration = props.job.duration;


    const y1 = duration ? duration.split('-')[0].split('/')[0] : '2022';
    const m1 = duration ? duration.split('-')[0].split('/')[1] : '3';
    const y2 = duration ? duration.split('-')[1].split('(')[0].split('/')[0] : '2021';
    const m2 = duration ? duration.split('-')[1].split('(')[0].split('/')[1] : '5';


    const enteredNam = useRef();
    const enteredPlace = useRef();
    const enteredPosition = useRef();
    const enteredDuration = useRef();

    useEffect(() => {
        enteredDuration.current.value = props.job.duration;

    }, [])
    const editJobs = () => {
        console.log(enteredDuration.current.value.length);
        const job = {
            id: props.job.id,
            companyName: enteredNam.current.value,
            place: enteredPlace.current.value,
            position: enteredPosition.current.value,
            duration: enteredDuration.current.value
        }
        props.onEditJob(job);
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
                       defaultValue={props.job.companyName}/>
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Place</label>
                <input ref={enteredPlace} className={classes.customInput} type='text' placeholder={'Place'}
                       defaultValue={props.job.place}/>
            </div>
            <div className={` ${classes.customCol}`}>
                <label>Position</label>
                <input ref={enteredPosition} className={classes.customInput} type='text' placeholder={'Position'}
                       defaultValue={props.job.position}/>
            </div>
            <div className={`${classes.customCol}`}>
                <label>Duration</label>
                <DatePicker.RangePicker
                    ref={enteredDuration}
                    className={classes.customInput}
                    defaultPickerValue={[moment(`${y1}-${m1}-1`, dateFormat), moment(`${y2}-${m2}-1`, dateFormat)]}
                    defaultValue={[moment(`${y1}-${m1}-1`, dateFormat), moment(`${y2}-${m2}-1`, dateFormat)]}
                    onCalendarChange={(e) => {
                        const s = moment(e[0]);
                        const end = moment(e[1]);
                        const years = moment.preciseDiff(s, end, true).years;
                        const months = moment.preciseDiff(s, end, true).months;
                        const ye1 = s.year() + '/' + s.month();
                        const ye2 = end.year() + '/' + end.month();
                        console.log(ye1 + '-' + ye2 + '(' + years + 'years & ' + months + 'months)')
                        enteredDuration.current.value = ye1 + '-' + ye2 + '(' + years + 'years & ' + months + 'months)';
                    }}
                    format={dateFormat}
                />
            </div>
        </div>
        <div className={`${classes.customCol}`}>
            <Button className={` ${classes['custom-btn']}`} onClick={editJobs}
                    style={!props.editing ? {marginLeft: '38%'} : {}}>
                {!props.editing ? 'Add' : 'Edit'}</Button>
            {props.editing && <Button className={` ${classes['custom-btn']}`} onClick={deleteJob}>Delete job</Button>}
        </div>
        <hr/>
    </div>
}
export default EditJob;
