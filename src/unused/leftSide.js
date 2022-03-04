import classes from './leftSide.module.css';
import ProfileImage from "./profileImage";
import classes2 from './Images.module.css';

const LeftSide = props => {
    return <div className={classes.container}>
        <div className={classes2.mainImageContainer}
             style={{backgroundImage: 'url(' + require('../images/cover.jpg') + ''}}/>
        {/*<ProfileImage/>*/}
    </div>;
}
export default LeftSide;
