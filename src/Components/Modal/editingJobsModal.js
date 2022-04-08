import classes from './modal.module.css';
import { CgAdd, CgRemove } from "react-icons/all";
import { useContext, useState } from "react";
import EditJob from "../Profile/editJobs";
import UserContext from "../../store/user-context";

const EditingJobsModal = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [isLoading, setIsLoading] = useState(false);
    const [addingJob, setAddingJob] = useState(false);

    const addJobHandler = () => {
        setAddingJob(true);

    }
    const removeJobHandler = () => {
        setAddingJob(false);
    }

    if (user.prevJobs && user.prevJobs.length === 0) {
        return <div className={`${classes.modal}`}>
            <div className="row">
                <EditJob overlay={props.overlay} editing={false} />
            </div>
        </div>
    }
    return <div className={`${classes.modal}`}>
        <div className="row">
            <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                <h3>Previous jobs</h3>
            </div>
            <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>

                {!addingJob && <CgAdd onClick={addJobHandler} style={{ cursor: 'pointer', color: 'black' }} />
                }
                {addingJob && <CgRemove onClick={removeJobHandler} style={{ cursor: 'pointer', color: 'black' }} />}
            </div>
            {addingJob && <EditJob overlay={props.overlay} editing={false} job={{}} />}

            <div className={`row `}>
                {user.prevJobs.map(job =>
                    <EditJob overlay={props.overlay} editing={true}
                        key={job.id}
                        job={job}
                        isLoading={isLoading} />)}
            </div>
        </div>
    </div>;
}
export default EditingJobsModal;
