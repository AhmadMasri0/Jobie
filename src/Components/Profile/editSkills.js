import classes from "../Modal/modal.module.css";
import {Button} from "react-bootstrap";
import 'moment-precise-range-plugin'
import {useRef} from "react";

const EditSkills = (props) => {

    const enteredSkill = useRef();

    const editSkill = () => {
        const skill = {
            id: props.skill.id,
            skill: enteredSkill.current.value
        }
        props.onEditSkill(skill);
        props.overlay(false);
    }
    const deleteSkill = () => {
        props.onDeleteSkill(props.skill.id);
        props.overlay(false);
    }
    return <div>
        <div className={`row ${classes.customRow}`}>
            <div className={`${classes.customCol}`}>
                <label style={{marginLeft: '28%'}}>Skill</label>
                <input ref={enteredSkill} className={classes.customInput} type='text' placeholder={'Write a skill you have'}
                       defaultValue={props.skill.skill}/>
            </div>
        </div>
        <div className={`${classes.customCol}`}>
            <Button className={` ${classes['custom-btn']}`} onClick={editSkill}
                    style={!props.editing ? {marginLeft: '38%'} : {}}>
                {!props.editing ? 'Add' : 'Edit'}</Button>
            {props.editing && <Button className={` ${classes['custom-btn']}`} onClick={deleteSkill}>Delete skill</Button>}
        </div>
        <hr/>
    </div>
}
export default EditSkills;
