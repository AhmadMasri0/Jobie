import classes from "./Profile.module.css";
import { AiFillEdit, FaBusinessTime, GiPositionMarker, MdBusiness, TiBusinessCard } from "react-icons/all";
import { useContext } from "react";
import UserContext from "../../store/user-context";

const PreJobs = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    return <section>
        <div className={`container ${classes.profile}`}>
            <div className='row flex-row'>
                <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                    <h3>Previous jobs</h3>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>

                    <AiFillEdit onClick={props.showOverlay} style={{ cursor: 'pointer' }} />

                </div>
                {user.prevJobs && user.prevJobs.length === 0 && <p><b>There are no previous works, add a new one now!</b></p>}
                {user.prevJobs && user.prevJobs.length > 0 && <div className={`row ${classes['about-list']}`}>
                    {user.prevJobs.map(job =>
                        <div className={`row ${classes.jobs} `} key={job.id}>
                            <div className={`col-lg-3 col-md-12 col-sm-12`}>
                                <MdBusiness className={classes.icon} />
                                <p className={classes.business}>
                                    {job.companyName}
                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <GiPositionMarker className={classes.icon} />
                                <p className={classes.business}>
                                    {job.location.city}-{job.location.country}
                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <FaBusinessTime className={classes.icon} />
                                <p className={classes.business}>
                                    {job.duration.start}-{job.duration.end}
                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <TiBusinessCard className={classes.icon} />
                                <p className={classes.business}>
                                    {job.position}
                                </p>
                            </div>
                            <hr />
                        </div>
                    )}
                </div>
                }
            </div>
        </div>
    </section>
}
export default PreJobs;
