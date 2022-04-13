import classes from './modal.module.css';
import {CgAdd, CgRemove} from "react-icons/all";
import {useContext, useState} from "react";
import UserContext from "../../store/user-context";
import EditSkills from "../Profile/editSkills";
import {Space} from "antd";

const SkillsModal = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    const [addingSkill, setAddingSkill] = useState(false);

    const addSkillHandler = () => {
        setAddingSkill(true);

    }
    const removeSkillHandler = () => {
        setAddingSkill(false);
    }

    const editSkillHandler = (skill) => {
        userCtx.editSkill(skill);
    }
    const deleteSkillHandler = (id) => {
        userCtx.removeSkill(id);
    }

    
    if (!user.skills || (user.skills && user.skills.length === 0)) {
        return <div className={`${classes.modal}`}>
            <div className="row">
                <EditSkills overlay={props.overlay} editing={false} />
            </div>
        </div>
    }
    return <div className={`${classes.modal}`}>
        <div className="row">
            <Space direction={"horizontal"}>
                <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                    <h3>Skills</h3>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-4  ${classes.icons}`}>
                    {!addingSkill && <CgAdd onClick={addSkillHandler} style={{cursor: 'pointer', color: 'black'}}/>
                    }
                    {addingSkill &&
                    <CgRemove onClick={removeSkillHandler} style={{cursor: 'pointer', color: 'black'}}/>}
                </div>
            </Space>
            {addingSkill && <EditSkills overlay={props.overlay} editing={false} onEditSkill={editSkillHandler} skill={{}}/>}

            <div className={`row `}>
                {user.skills.map(skill => <EditSkills overlay={props.overlay} editing={true}
                                                      key={skill.id}
                                                      onDeleteSkill={deleteSkillHandler}
                                                      onEditSkill={editSkillHandler}
                                                      skill={skill}/>)}
            </div>

        </div>
    </div>;
}
export default SkillsModal;
