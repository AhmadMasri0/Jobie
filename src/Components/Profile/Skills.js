import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import classes from "./Profile.module.css";
import { AiFillEdit } from "react-icons/all";
import axios from "axios";
import { useParams } from "react-router-dom";

const Skills = props => {
    const userCtx = useContext(UserContext);
    const user = props.user;

    const param = useParams();
    const id = param.userId;
    const isAllowed = props.isAllowed;

    // useEffect(() => {

    //     console.log(id, userCtx.user._id)
    //     if (!id || id === userCtx.user._id) {
    //         setIsAllowed(true);
    //         setUser(userCtx.user);
    //     }
    //     else {
    //         axios.get(`http://localhost:2000/users/${id}`).then(data => {
    //             if (!data)
    //                 throw new Error('Wrong')
    //             setUser(data.data);
    //             setIsAllowed(false);
    //             console.log(data)
    //         }).catch(err => console.log(err))

    //     }

    // }, [userCtx.user]);
    // console.log('fd',user.skills )

    if ((!user.skills || (user.skills && user.skills.length === 0)) && !isAllowed) return <p></p>;

    if (!user.skills || (user.skills && user.skills.length === 0)) {
        return <section>
            <div className={`container ${classes.profile}`}>
                <div className='row flex-row'>
                    <p onClick={() => {
                        props.showOverlay();
                        props.showSkills();
                    }} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <b className={classes.noWorks}>Add a new skill now!</b>
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
