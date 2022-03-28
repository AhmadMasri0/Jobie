import {Card} from "antd";
import {useHistory} from 'react-router-dom';

const AppCard = (props) => {

    const history = useHistory();
    const app = props.app;
    return <Card key={app.id} title={app.title} hoverable={true}
                 onClick={() => (history.push('/applications/' + app.id))}
                 extra={<div style={{color: 'white'}}>Available until {app.deadline}</div>}
                 style={{borderRadius: '20px', marginBottom: '20px'}}
                 headStyle={{backgroundColor: "#0E2882", color: 'white', borderRadius: '20px'}}
                 bodyStyle={{borderRadius: '25px'}}>
        <p>
            <b>
                {app.owner} offers a <span
                style={{textDecoration: 'underline'}}>{app.jobType}</span> job
                in {app.location}
            </b>
        </p>
    </Card>
}

export default AppCard;
