import classes from "./Profile.module.css";
import {useContext, useState} from "react";
import UserContext from "../../store/user-context";

const UserInfo = () => {
    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [visible, setVisible] = useState(false);

    return <section>
        <div className={`container  ${classes.profile}`} style={{marginBottom: '20px', marginTop: '20px'}}>
            <div className='row align-items-center flex-row'>
                <div className="col-lg-6">
                    <div className={classes['about-avatar']}>
                        <img src={require(`../../images/${user.image}`)} onClick={() => setVisible(true)} title=""
                             alt=""/>
                    </div>
                    <h3 style={{marginLeft: '30%'}}>{user.username}</h3>
                    <h6 className={`${classes['theme-color']} lead`} style={{marginLeft: '33%'}}>{user.profession}</h6>
                </div>
                <div className="col-lg-6">
                    <div className={classes['about-text']}>
                        <p><b>{user.bio}</b></p>
                        <div className={`row ${classes['about-list']}`}>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes.media}>
                                    <label htmlFor="birthday">Birthday</label>
                                    <span>{user.birthday}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes.media}>
                                    <label htmlFor="gender">Gender</label>
                                    <span>{user.gender}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes.media}>
                                    <label htmlFor="age">age</label>
                                    <span>22</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-3">
                                <div className={classes.media}>
                                    <label htmlFor="country">Country</label>
                                    <span>{user.country}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-4">
                                <div className={classes.media}>
                                    <label>City</label>
                                    <span>{user.city}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={classes.media}>
                                    <label htmlFor="email">E-mail</label>
                                    <span><a href={`mailto:${user.email}`}>{user.email}</a>
                                        </span>
                                </div>
                            </div>
                            {user.phones.map(phone =>
                                <div key={phone.id} className="col-lg-6 col-md-6 col-sm-4">
                                    <div className={classes.media}>
                                        <label htmlFor="phone">{phone.type} number</label>
                                        <span>
                                            <a href={`tel:${phone.value}`}>{phone.value}</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*<br/>*/}
        </div>
    </section>;
}
export default UserInfo;
