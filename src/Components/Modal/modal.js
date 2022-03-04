import classes from './modal.module.css';
import {CgAdd, CgRemove} from "react-icons/all";
import {useContext, useState} from "react";
import EditJob from "../Profile/editJobs";
import UserContext from "../../store/user-context";

const Modal = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;

    const [addingJob, setAddingJob] = useState(false);

    const addJobHandler = () => {
        setAddingJob(true);

    }
    const removeJobHandler = () => {
        setAddingJob(false);
    }

    const editJobHandler = (job) => {
        userCtx.addPrevJob(job);
    }
    const deleteJobHandler = (id) => {
        userCtx.removePrevJob(id);
    }
    return <div className={`${classes.modal}`}>
        <div className="row">
            <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                <h3>Previous jobs</h3>
            </div>
            <div className={`col-lg-4 col-md-6 col-sm-4 text-end ${classes.icons}`}>

                {!addingJob && <CgAdd onClick={addJobHandler} style={{cursor: 'pointer', color: 'black'}}/>
                }
                {addingJob && <CgRemove onClick={removeJobHandler} style={{cursor: 'pointer', color: 'black'}}/>}
            </div>
            {addingJob && <EditJob overlay={props.overlay} editing={false} onEditJob={editJobHandler} job={{}}/>}

            <div className={`row `}>
                {user.prevJobs.map(job => <EditJob overlay={props.overlay} editing={true}
                                                   onDeleteJob={deleteJobHandler}
                                                   onEditJob={editJobHandler}
                                                   job={job}/>)}
            </div>

        </div>
    </div>;
}
export default Modal;
