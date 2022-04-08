import classes from "./Profile.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import { Link } from "react-router-dom";
import axios from "axios";

const UserInfo = (props) => {
    const userCtx = useContext(UserContext);

    let user = userCtx.user;

    useEffect(() => {
        user = userCtx.user;
    }, [userCtx.user])
    // console.log(user)
    // const [user, setUser] = useState(userCtx.user);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [city, setCity] = useState(JSON.stringify());
    const [country, setCountry] = useState();
    const [bio, setBio] = useState();
    const [profession, setProfession] = useState();
    // console.log(user.data);

    // useEffect(() => {
    //     const id = JSON.parse(localStorage.getItem('user'))._id;
    //     axios.get(`http://localhost:2000/users/${id}`).then(data => {
    //         if (!data)
    //             throw new Error('Wrong')
    //         // setName(data.data ? data.data.name : null);
    //         // setGender(data.data ? data.data.gender : 'male');
    //         // setCity(data.data && data.data.location ? data.data.location.city : null)
    //         // setCountry(data.data && data.data.location ? data.data.location.country : null)
    //         // setProfession(data.data ? data.data.specialization : null);
    //         // setBio(data.data ? data.data.bio : null);

    //         // userCtx.setCurrentUser(data.data, localStorage.getItem('userToken'))
    //         // setUser(data.data);
    //         // console.log(data)
    //     }).catch(err => console.log(err))
    // }, [])

    // useEffect(() => {
    //     console.log(props)
    //     setUser(userCtx.user)
    // }, []);

    const birth = new Date(user.dayOfBirth);
    const d = birth.getFullYear() + '-' + (birth.getMonth() + 1) + '-' + birth.getUTCDate();

    console.log(birth.getUTCDate());
    return <section>
        { user.bio &&
            <div className={`container  ${classes.profile}`} style={{ marginBottom: '20px', marginTop: '20px' }}>
                <div className='row align-items-center flex-row'>
                    {
                        <div className="col-lg-6">
                            <div className={classes['about-avatar']}>
                                <img
                                    // src={require(`../../images/${user.image ? user.image : ''}`)}
                                    src={`https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=`}
                                    onClick={() => setVisible(true)} title=""
                                    alt={user.name} />
                            </div>
                            <h3 style={{ marginLeft: '30%' }}>{user.name}</h3>
                            <h6 className={`${classes['theme-color']} lead`} style={{ marginLeft: '33%' }}>
                                {user.specialization ? user.specialization : <Link to='/profile/edit-profile'>add a profession</Link>}
                            </h6>
                        </div>
                    }
                    <div className="col-lg-6">
                        <div className={classes['about-text']}>
                            <p><b>{user.bio ? user.bio : <Link to='/profile/edit-profile'>add a bio</Link>}</b></p>
                            <div className={`row ${classes['about-list']}`}>
                                <div className="col-lg-6 col-md-6 col-sm-3">
                                    <div className={classes.media}>
                                        <label htmlFor="birthday">Birthday</label>
                                        <span>{user.dayOfBirth ? d : <Link to='/profile/settings'>add your birthdate</Link>}</span>
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
                                        <label htmlFor="country">Country</label>
                                        <span>{user.location.country ? user.location.country : <Link to='/profile/edit-profile'>add a country</Link>}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-4">
                                    <div className={classes.media}>
                                        <label>City</label>
                                        <span>{user.location.city ? user.location.city : <Link to='/profile/edit-profile'>add a city</Link>}</span>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className={classes.media}>
                                        <label htmlFor="email">E-mail</label>
                                        <span><a href={`mailto:${user.email}`}>{user.email}</a>
                                        </span>
                                    </div>
                                </div>
                                {user.phone.map(phone =>
                                    <div key={phone.id} className="col-lg-6 col-md-6 col-sm-4">
                                        <div className={classes.media}>
                                            <label htmlFor="phone">{phone.type} number</label>
                                            <span>
                                                <a href={`tel:${phone.number}`}>{phone.number ? phone.number : <Link to='/settings'>add a phone number</Link>} </a>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/*<br/>*/}
            </div>}
        { !user.bio &&
            <div className={`container  ${classes.profile}`} style={{ marginBottom: '20px', marginTop: '20px' }}>
                <div className='row align-items-center flex-row'>
                    <p>It seems that your account is new,<Link to='/profile/edit-profile'>complete your account now!</Link></p>
                </div>
            </div>}
    </section>;
}
export default UserInfo;
