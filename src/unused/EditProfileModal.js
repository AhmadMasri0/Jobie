import classes from "../Components/Modal/modal.module.css";
import classes2 from '../Components/Profile/Profile.module.css';
import me from "../images/me.jpg";
import {Button} from "react-bootstrap";


const EditProfileModal = (props) => {

    return <div className={`${classes.modal}`}>
        <div className="row">
            <div className={`col-lg-8 col-md-6 col-sm-8 ${classes.title}`}>
                <h3>Edit Profile</h3>
            </div>
            <div className='row align-items-center flex-row'>
                <div className="col-lg-6">
                    <div className={classes2['about-avatar']}>
                        <img src={me} title="" alt=""/>
                    </div>
                    <span><a>Edit profile picture</a></span>
                </div>
                <div className="col-lg-6">
                    <div className={classes2['about-text']}>
                        <h3 className={classes2.darkColor}>{props.user.firstName} {props.user.lastName}</h3>
                        <h6 className={`${classes2['theme-color']} lead`}>{props.user.profession}</h6>
                        <p><b>{props.user.bio}</b></p>
                        <div className={`row ${classes2['about-list']}`}>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes2.media}>
                                    <label htmlFor="birthday">Birthday</label>
                                    <p>{props.user.birthday}</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes2.media}>
                                    <label htmlFor="gender">Gender</label>
                                    <p>{props.user.gender}</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes2.media}>
                                    <label htmlFor="age">age</label>
                                    <p>22</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes2.media}>
                                    <label htmlFor="country">Country</label>
                                    <p>{props.user.country}</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4">
                                <div className={classes2.media}>
                                    <label>City</label>
                                    <p>{props.user.city}</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={classes2.media}>
                                    <label htmlFor="email">E-mail</label>
                                    <p><a href={`mailto:${props.user.email}`}>{props.user.email}</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4">
                                <div className={classes2.media}>
                                    <label htmlFor="phone">Phone</label>
                                    <p><a href={`tel:${props.user.phone}`}>{props.user.phone}</a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4">
                                <div className={classes2.media}>
                                    <Button className={classes['custom-btn']} onClick={props.showOverlay}>Edit
                                        Profile</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;

}
export default EditProfileModal;
