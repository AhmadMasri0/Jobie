import {useParams} from 'react-router-dom'
import classes from "./applications.module.css";
import {useContext} from "react";
import ApplicationContext from "../../store/application-context";
import {Divider} from "antd";
import {Button} from "react-bootstrap";
import AuthContext from '../../store/auth-context';

const Application = () => {

    const authCxt = useContext(AuthContext);
    const param = useParams()
    const appCtx = useContext(ApplicationContext);
    const application = appCtx.find(app => app.id.toString() === param.appId);

    // console.log(authCxt.token)

    return <div className={`container ${classes.cardsGroup}`} style={{backgroundColor: '#FFFFFFBA'}}>
        <div className={'d-flex justify-content-lg-center justify-content-md-start ms-md-4 me-sm-5 justify-content-sm-center'}>
            <h3>
                {application.title}
                <hr className={classes.hr}/>

            </h3>
        </div>
        <div className={'d-flex justify-content-lg-start justify-content-md-center justify-content-sm-center'}>
            <b style={{color: 'darkred'}}>
                Applying is available until {application.deadline}
                <hr className={classes.hr}/>
            </b>
        </div>
        <div className={'d-flex justify-content-center'}>
            <p>
                <b>
                    {application.description}
                </b>
            </p>
        </div>
        <Divider orientation={"left"} style={{fontWeight: "bold"}}>Requirements</Divider>
        <div className={'d-flex justify-content-lg-start justify-content-sm-center me-sm-5 '}>

            <ul style={{marginLeft: '10%', listStyle: 'none'}}>
                {application.requirements.map(req =>
                    <li key={req} style={{marginBottom: '10px', border: ''}}>
                        <b>- {req}</b>
                    </li>
                )}
            </ul>
        </div>
        <Divider orientation={"left"} style={{fontWeight: "bold"}}>More details</Divider>
        <div className={'row justify-content-lg-start'}
            // style={{backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '20px'}}
        >
            {Object.entries(application.details).map(([k, v]) =>
                <div key={k} className={'col-lg-4 col-md-6 col-sm-12'}>
                    <label className={'text-lg-center'}>{k}: </label>
                    <span style={{marginLeft: '5px'}}>
                        {v}
                    </span>
                </div>
            )}
            <div className={'ms-5 container'}>
                <b>
                    If you have any question, contact us:
                </b>
                <div style={{paddingLeft: '10%'}}>

                    <p style={{marginTop: '20px'}}>
                        <b>Phone: </b>
                        <a href={`tel:${application.phone}`}>{application.phone}</a>
                    </p>
                    <p>
                        <b>E-mail: </b>
                        <a href={`mailto:${application.email}`}>{application.email}</a>
                    </p>
                </div>
            </div>
        </div>
    {!authCxt.token &&    <div className={'d-flex justify-content-center'}>
            <Button className={`float-md-none ${classes['custom-btn']}`}
                    type='button'>Apply</Button>
        </div>}
    </div>
}

export default Application;
