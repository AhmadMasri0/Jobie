import { Card, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const AppCard = (props) => {

    const history = useHistory();
    const app = props.app;

    const date = app.deadline && new Date(app.deadline).toLocaleDateString();

    const [image, setImage] = useState();

    useEffect(() => {
        let i = app.owner._id;
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

    return <Card key={app._id} title={app.title} hoverable={true}
        onClick={() => (history.push('/applications/' + app._id))}
        extra={<div style={{ color: 'white' }}>Available until {date}</div>}
        style={{ borderRadius: '20px', marginBottom: '20px', border: '0.2px #0E2882 solid' }}
        headStyle={{ backgroundColor: "#0E2882", color: 'white', borderRadius: '20px' }}
        bodyStyle={{ borderRadius: '25px', border: '' }}>
        <div style={{ border: '', position: 'relative'}}>
            <Image src={img} preview={false} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '' }} />
            <p style={{display: 'inline-block', marginTop: '35px', marginLeft: '5px' , position: 'absolute'}}>
                <b style={{ marginTop: '-50%' }}>
                    {app.owner.name}offers a <span
                        style={{ fontWeight: 'bolder' }}>{app.jobType}</span> job
                    in {app.location.city}-{app.location.country}
                </b>
            </p>
        </div>
    </Card>
}

export default AppCard;
