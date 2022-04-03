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

    const editJobHandler = (job) => {
        userCtx.addPrevJob(job);

        setIsLoading(true);
        fetch('',
            {
                method: 'post',
                body: JSON.stringify(job),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {

                setIsLoading(false);
                if (res.ok) {

                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {

            });

    }
    const deleteJobHandler = (id) => {

        setIsLoading(true);
        fetch('',
            {
                method: 'DELETE'
            }).then(res => {

                setIsLoading(false);
                if (res.ok) {

                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {

            });

        userCtx.removePrevJob(id);
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
            {addingJob && <EditJob overlay={props.overlay} editing={false} onEditJob={editJobHandler} job={{}} />}

            <div className={`row `}>
                {user.prevJobs.map(job =>
                    <EditJob overlay={props.overlay} editing={true}
                        key={job.id}
                        onDeleteJob={deleteJobHandler}
                        onEditJob={editJobHandler}
                        job={job}
                        isLoading={isLoading} />)}
            </div>

        </div>
    </div>;
}
export default EditingJobsModal;
