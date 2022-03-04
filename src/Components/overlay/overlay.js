import classes from './ovaerlay.module.css';

const Overlay = props => {

    return <div className={classes.overlay} onClick={props.hideOverlay}/>

}
export default Overlay;
