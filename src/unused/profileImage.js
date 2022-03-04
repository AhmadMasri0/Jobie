import classes from './Images.module.css';

const ProfileImage = props => {

    return <div //className={classes.mainImageContainer}
        style={{backgroundImage: 'url(' + require('../images/cover.jpg') + ''}}>
    </div>;
}

export default ProfileImage;
