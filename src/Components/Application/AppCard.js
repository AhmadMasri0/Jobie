import {Card} from "antd";
import {useHistory} from 'react-router-dom';

const AppCard = (props) => {

    const history = useHistory();
    const app = props.app;

    const date = app.deadline && new Date(app.deadline).toLocaleDateString();

    return <Card key={app._id} title={app.title} hoverable={true}
                 onClick={() => (history.push('/applications/' + app._id))}
                 extra={<div style={{color: 'white'}}>Available until {date}</div>}
                 style={{borderRadius: '20px', marginBottom: '20px'}}
                 headStyle={{backgroundColor: "#0E2882", color: 'white', borderRadius: '20px'}}
                 bodyStyle={{borderRadius: '25px'}}>
        <p>
            <b>
                {app.owner.name} offers a <span
                style={{textDecoration: 'underline'}}>{app.jobType}</span> job
                in {app.location.city}-{app.location.country}
            </b>
        </p>
    </Card>
}

export default AppCard;
