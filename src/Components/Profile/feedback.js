import { FrownOutlined, MehOutlined, PlusCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import classes from "./Profile.module.css";

const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};


const FeedBack = (props) => {

    const userCtx = useContext(UserContext);
    const isAllowed = props.isAllowed;
    const freelancer = props.user;
    const feedbacker = userCtx.user;
    const [feedbacks, setFeedbacks] = useState([]);
    const [text, setText] = useState('');
    const [rate, setRate] = useState(2);
    const textRef = useRef();

    useEffect(() => {

        axios.get(`http://localhost:2000/feedback/` + freelancer._id).then(data => {
            if (!data)
                throw new Error('Wrong')

            setFeedbacks(data.data)
            // console.log(data.data)
        }).catch(err => console.log(err))

    }, [])
    const publishFeedbackHandler = () => {

        const feedback = {
            Text: text,
            rate,
            freelancer,
            feedbacker
        }

        const t = [...feedbacks, feedback];
        console.log(feedback)
        axios.post(`http://localhost:2000/feedback`, feedback, {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        }).then(data => {
            if (!data)
                throw new Error('Wrong')

            setText(null)
            setRate(2)
            setFeedbacks(t);
            // console.log(data)
        }).catch(err => console.log(err))
    }
    let content;

    if (!feedbacks.length && !isAllowed) return <></>
    if (!feedbacks.length)
        content = <></>;
    else content = <div className={`row container ${classes['about-list']}`}>
        {feedbacks.map((feedback) =>
            <Card key={feedback._id} title={feedback.feedbacker.name}
                extra={<Rate value={feedback.rate} style={{ color: '#ffffff71' }}
                    disabled character={({ index }) => customIcons[index + 1]} />}
                style={{ borderRadius: '20px', marginBottom: '20px' }}
                headStyle={{ backgroundColor: "#0E2882", color: 'white', borderRadius: '20px' }}
                bodyStyle={{ borderRadius: '25px' }}>
                {feedback.Text}

            </Card>
        )}
    </div>
    return <section>
        <div className={`container ${classes.profile}`}>
            <div className={`container ${classes.title}`}>
                <h3>Feedbacks</h3>
            </div>
            <br />
            <br />
            {isAllowed && <div className={`container row row-flow ${classes['about-list']}`} style={{ border: '', alignContent: 'center' }}>
                <TextArea value={text} maxLength={300} onChange={(e) => setText(e.target.value)} style={{ height: 120, width: '50%', marginLeft: '10%' }}

                    placeholder={'Add your feedback'} />
                <Rate value={rate} style={{ color: 'blue', borderColor: 'black', border: '   ', width: '20% ' }} onChange={(e) => setRate(e)}
                    defaultValue={3} character={({ index }) => customIcons[index + 1]} />
                <Button className={`${classes['custom-btn']}`} style={{ width: '20%', maxWidth: '30%' }} onClick={publishFeedbackHandler} >Add</Button>
            </div>}
            {content}
        </div>
    </section>
}
export default FeedBack;