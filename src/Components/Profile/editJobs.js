import classes from "../Modal/modal.module.css";
import {Button} from "react-bootstrap";
import {useRef} from "react";

const EditJob = (props) => {

    const enteredNam = useRef();
    const enteredPlace = useRef();
    const enteredPosition = useRef();
    const enteredDuration = useRef();

    const editJobs = () => {
        const job = {
            id: props.job.id,
            companyName: enteredNam.current.value,
            place: enteredPlace.current.value,
            position: enteredPosition.current.value,
            duration: enteredDuration.current.value
        }
        props.onEditJob(job);
        if (!props.editing) {
            props.overlay(false);
        }
    }
    const deleteJob = () => {
        props.onDeleteJob(props.job.id);
        props.overlay(false);
    }
    return <div>
        <div key={props.job.id} className={`row ${classes.customRow}`}>
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
                <input ref={enteredDuration} className={classes.customInput} type='text' placeholder={'Duration'}
                       defaultValue={props.job.duration}/>
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
