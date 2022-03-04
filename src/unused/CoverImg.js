import classes from './Images.module.css';
import cover from '../images/cover.jpg';

const CoverImg = (props) => {
    console.log(props.imgUrl);
    const url = '../images/' + props.imgUrl;
    return <div className={classes.container}>
        <img className={classes.img} src={cover} alt={props.name}/>
    </div>;
}
export default CoverImg;
