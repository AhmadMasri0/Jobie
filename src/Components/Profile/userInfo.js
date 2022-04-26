import classes from "./Profile.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserInfo = (props) => {
    const user = props.user;
    const param = useParams();
    const id = param.userId;
    const [image, setImage] = useState(props.image)

    // console.log(user)
    useEffect(() => {
        let i = id;
        if (!id)
            i = user._id;
        axios.get(`http://localhost:2000/users/${i}/avatar`).then(data => {
            if (!data)
                throw new Error('Wrong')
            setImage(data.data)
            // console.log(data.data)
        }).catch(err => console.log(err))

    }, [user])

    let birth, d;
    if (user) {
        birth = new Date(user.dayOfBirth);
        d = birth.getFullYear() + '-' + (birth.getMonth() + 1) + '-' + birth.getUTCDate();
    }

    let img = `https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=`;
    if (image) {

        img = `data:image/png;base64,${image}`;
    }
    return <section>
        <div className={`container  ${classes.profile}`} style={{ marginBottom: '20px', marginTop: '20px' }}>
            <div className='row align-items-center flex-row'>
                {
                    <div className="col-lg-6">
                        <div className={classes['about-avatar']}>
                            <img src={img} alt={user.name} />
                        </div>
                        <h3 style={{ marginLeft: '30%' }}>{user.name}</h3>
                        {user.specialization && <h6 className={`${classes['theme-color']} lead`} style={{ marginLeft: '33%' }}>
                            <p> {user.specialization}</p>
                        </h6>}
                    </div>
                }
                <div className="col-lg-6">
                    <div className={classes['about-text']}>
                        {user && user.bio && <p><b> {user.bio} </b></p>}
                        <div className={`row ${classes['about-list']}`}>
                            {user && user.userType !== 'Business' && user.dayOfBirth &&
                                <div className="col-lg-6 col-md-6 col-sm-3">
                                    <div className={classes.media}>
                                        <label htmlFor="birthday">Birthday</label>
                                        <span>{d}</span>
                                    </div>
                                </div>}
                            {user && user.userType !== 'Business' &&
                                <div className="col-lg-6 col-md-6 col-sm-3">
                                    <div className={classes.media}>
                                        <label htmlFor="gender">Gender</label>
                                        <span>{user.gender}</span>
                                    </div>
                                </div>}
                            {user.location && user.location.country &&
                                <div className="col-lg-6 col-md-6 col-sm-3">
                                    <div className={classes.media}>
                                        <label htmlFor="country">Country</label>
                                        <span>{user.location.country}</span>
                                    </div>
                                </div>}
                            {user.location && user.location.city &&
                                <div className="col-lg-6 col-md-6 col-sm-4">
                                    <div className={classes.media}>
                                        <label>City</label>
                                        <span>{user.location.city}</span>
                                    </div>
                                </div>}
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className={classes.media}>
                                    <label htmlFor="email">E-mail</label>
                                    <span><a href={`mailto:${user.email}`}>{user.email}</a>
                                    </span>
                                </div>
                            </div>
                            {user.phone && user.phone.map(phone =>
                                <div key={phone.id} className="col-lg-6 col-md-6 col-sm-4">
                                    <div className={classes.media}>
                                        <label htmlFor="phone">{phone.phoneNum.type} number</label>
                                        <span>
                                            <a href={`tel:${phone.phoneNum.number}`}>{phone.phoneNum.number ? phone.phoneNum.number : <Link to='/settings'>add a phone number</Link>} </a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>;
}
export default UserInfo;
