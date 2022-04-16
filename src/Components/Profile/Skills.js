import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import classes from "./Profile.module.css";
import { AiFillEdit } from "react-icons/all";
import axios from "axios";
import { useParams } from "react-router-dom";

const Skills = props => {
    const user = props.user;
    const isAllowed = props.isAllowed;

    if ((!user.skills || (user.skills && user.skills.length === 0)) && !isAllowed) return <p></p>;

    if (!user.skills || (user.skills && user.skills.length === 0)) {
        return <section>
            <div className={`container ${classes.profile}`}>
                <div className='row flex-row'>
                    <p onClick={() => {
                        props.showOverlay();
                        props.showSkills();
                    }} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <b className={classes.noWorks}>Add new skills now!</b>
                    </p>
                </div>
            </div>
        </section>
    }
    return <section>
        <div className={`container ${classes.profile}`}>
            <div className='row flex-row'>
                <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                    <h3>Skills</h3>
                </div>
                {isAllowed && <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>

                    <AiFillEdit onClick={() => {
                        props.showOverlay();
                        props.showSkills();
                    }} style={{ cursor: 'pointer' }} />

                </div>}
                <div className={`row ${classes['about-list']}`}>
                    {user.skills.map(skill =>
                        <div className={` col-lg-3 col-md-12 col-sm-12 ${classes.jobs} `} key={skill}>
                            <p className={classes.business}>
                                {skill}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>

}
export default Skills;
