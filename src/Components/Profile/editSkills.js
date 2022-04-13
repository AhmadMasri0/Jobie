import classes from "../Modal/modal.module.css";
import { Button } from "antd"; 
import 'moment-precise-range-plugin'
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import axios from "axios";

const EditSkills = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const enteredSkill = useRef();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        enteredSkill.current.value = props.skill &&  props.skill.skill ? props.skill.skill : null;
           
    }, [])

    const editSkill = () => {

        setIsLoading(true)

        const skill = {skill: enteredSkill.current.value};

        // console.log('rhht0', userCtx.token)
        const skills = user.skills || [{skill: {}}];
        let sentSkills;
        if (!props.editing) {
            skills.push(skill);
            sentSkills = skills;
        }
        else {
            sentSkills = skills;
            sentSkills = sentSkills.map((j) => {
                if ((j._id == props.skill._id)) {
                    // if (!deleting)
                    return skill;
                }
                else return j;
            })
        }
        // console.log(skills);

        axios.patch(`http://localhost:2000/users/me`, {
            skills: sentSkills
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    // console.log(res.data)
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
    const deleteSkill = () => {
    
        setIsLoading(true)

        // console.log(user.skills)

        const sentSkills = user.skills.filter((j) => {

            if ((j._id != props.skill._id)) {
                return j;

            }
        })

        // console.log(sentSkills)
        axios.patch(`http://localhost:2000/users/me`, {
            skills: sentSkills
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
    // console.log('gdf',props.skill)
    return <div>
        <div className={`row ${classes.customRow}`}>
            <div className={`${classes.customCol}`}>
                <label style={{ marginLeft: '28%' }}>Skill</label>
                <input ref={enteredSkill} className={classes.customInput} type='text' placeholder={'Write a skill you have'}
                    defaultValue={props.skill && props.skill.skill ? props.skill.skill : null} />
            </div>
        </div>
        <div className={`${classes.customCol}`}>
            <Button className={` ${classes['custom-btn']}`} onClick={editSkill}
                style={!props.editing ? { marginLeft: '38%' } : {}}>
                {!props.editing ? 'Add' : 'Edit'}</Button>
            {props.editing && <Button loading={isLoading} className={` ${classes['custom-btn']}`} onClick={deleteSkill}>Delete skill</Button>}
        </div>
        <hr />
    </div>
}
export default EditSkills;
