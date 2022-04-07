import {useContext} from "react";
import UserContext from "../../store/user-context";
import classes from "./Profile.module.css";
import {AiFillEdit} from "react-icons/all";

const Skills = props => {
    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    return <section>
        <div className={`container ${classes.profile}`}>
            <div className='row flex-row'>
                <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                    <h3>Skills</h3>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>

                    <AiFillEdit onClick={() => {
                        props.showOverlay();
                        props.showSkills();
                    }} style={{cursor: 'pointer'}}/>

                </div>
                {user.skills && user.skills.length === 0 && <p><b>There are no skills, add a new one now!</b></p>}
                {user.skills && user.skills.length > 0 && <div className={`row ${classes['about-list']}`}>
                    {user.skills.map(skill =>
                        <div className={` col-lg-3 col-md-12 col-sm-12 ${classes.jobs} `} key={skill.id}>
                            <p className={classes.business}>
                                {skill.skill}
                            </p>
                            {/*<hr/>*/}
                        </div>
                    )}
                </div>}
            </div>
        </div>
    </section>

}
export default Skills;
