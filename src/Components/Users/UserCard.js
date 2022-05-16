import { Card, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const UserCard = (props) => {

    const history = useHistory();
    const user = props.user;


    const [image, setImage] = useState();

    useEffect(() => {
        let i = user._id;
        console.log(i);
        axios.get(`http://localhost:2000/users/${i}/avatar`).then(data => {
            if (!data)
                throw new Error('Wrong')
            setImage(data.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    let img = `https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=`;
    if (image) {

        img = `data:image/png;base64,${image}`;
    }

    return <Card key={user._id} title={user.name} hoverable={true}
        onClick={() => (history.push('/profile/' + user._id))}
        extra={<div style={{ color: 'white' }}> {user.specialization}</div>}
        style={{ borderRadius: '20px', marginBottom: '20px' }}
        headStyle={{ backgroundColor: "#0E2882", color: 'white', borderRadius: '20px' }}
        bodyStyle={{ borderRadius: '25px' }}>
        <div style={{ border: '', position: 'relative' }}>
            <Image src={img} preview={false} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '' }} />
            <p style={{ display: 'inline-block', marginTop: '35px', marginLeft: '5px', position: 'absolute' }}>
                <b style={{ marginTop: '-50%' }}>
                    {user.bio}
                </b>
            </p>
        </div>
    </Card>
}

export default UserCard;
