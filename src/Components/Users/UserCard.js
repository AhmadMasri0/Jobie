import { Card } from "antd";
import { useHistory } from 'react-router-dom';

const UserCard = (props) => {

    const history = useHistory();
    const user = props.user;


    return <Card key={user._id} title={user.name} hoverable={true}
        onClick={() => (history.push('/profile/' + user._id))}
        extra={<div style={{ color: 'white' }}> {user.specialization}</div>}
        style={{ borderRadius: '20px', marginBottom: '20px' }}
        headStyle={{ backgroundColor: "#0E2882", color: 'white', borderRadius: '20px' }}
        bodyStyle={{ borderRadius: '25px' }}>
        <p>
            <b>
                {user.bio}
            </b>
        </p>
    </Card>
}

export default UserCard;
