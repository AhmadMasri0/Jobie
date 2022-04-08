import classes from "./Profile.module.css";
import { AiFillEdit, FaBusinessTime, GiPositionMarker, MdBusiness, TiBusinessCard } from "react-icons/all";
import { useContext } from "react";
import UserContext from "../../store/user-context";

const PreJobs = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    if (user.prevJobs && user.prevJobs.length === 0) {
        return <section>
            <div className={`container ${classes.profile}`}>
                <div className='row flex-row'>
                    <p onClick={props.showOverlay} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <b className={classes.noWorks}>Add a new previous work now!</b>
                    </p>
                </div>
            </div>
        </section>
    }


    // return <p>fhd</p>
    return <section>
        <div className={`container ${classes.profile}`}>
            <div className='row flex-row'>
                <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                    <h3>Previous jobs</h3>
                </div>
                <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>
                    <AiFillEdit onClick={props.showOverlay} style={{ cursor: 'pointer' }} />
                </div>
                <div className={`row ${classes['about-list']}`}>
                    {user.prevJobs.map(job =>
                        <div className={`row ${classes.jobs} `} key={job.job.id}>
                            <div className={`col-lg-3 col-md-12 col-sm-12`}>
                                <MdBusiness className={classes.icon} />
                                <p className={classes.business}>
                                    {job.job.companyName}
                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <GiPositionMarker className={classes.icon} />
                                <p className={classes.business}>
                                    {job.job.location.city + '-' + job.job.location.country}
                                    {/* {job.job.location ? job.job.location.city + '-' + job.job.location.country : ''} */}
                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <FaBusinessTime className={classes.icon} />
                                <p className={classes.business}>
                                    {new Date(job.job.duration.start).toLocaleDateString() + '-' + new Date(job.job.duration.end).toLocaleDateString() }
                                {/* {job.job.duration ? job.job.duration.start + '-' + job.job.duration.end : ''} */}

                                </p>
                            </div>
                            <div className='col-lg-3 col-md-12 col-sm-12'>
                                <TiBusinessCard className={classes.icon} />
                                <p className={classes.business}>
                                    {job.job.position}
                                </p>
                            </div>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
}
export default PreJobs;
