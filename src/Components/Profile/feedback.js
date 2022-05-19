import { FrownOutlined, MehOutlined, PlusCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../store/user-context";
import classes from "./Profile.module.css";

const customIcons = {
    1: <FrownOutlined style={{ color: '  ' }} />,
    2: <FrownOutlined style={{ color: '  ' }} />,
    3: <MehOutlined style={{ color: '  ' }} />,
    4: <SmileOutlined style={{ color: '  ' }} />,
    5: <SmileOutlined style={{ color: '  ' }} />,
};


const FeedBack = (props) => {

    const userCtx = useContext(UserContext);
    const isAllowed = props.isAllowed;
    const [allowedBusiness, setAllowedBusiness] = useState()
    const freelancer = props.user;
    const feedbacker = userCtx.user;
    const [feedbacks, setFeedbacks] = useState([]);
    const [text, setText] = useState('');
    const [rate, setRate] = useState(2);
    const textRef = useRef();
    const [isEmpty, setIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {

        axios.get(`http://localhost:2000/feedback/` + freelancer._id).then(data => {
            if (!data)
                throw new Error('Wrong')

            setFeedbacks(data.data)
            // console.log(data.data)
        }).catch(err => console.log(err))

    }, [feedbacks])

    useEffect(() => {

        if (text === '')
            setIsEmpty(true)
        else
            setIsEmpty(false)
    }, [text])

    useEffect(() => {

        // console.log(feedbacker.name.toLowerCase())

        for (let p of freelancer.prevJobs) {
            console.log(p.job.companyName)
            if (p.job.companyName === feedbacker.name) {
                setAllowedBusiness(true);
                break;
            }
        }
        // freelancer.prevJobs.forEach(p => {

        // });

    }, [])
    const publishFeedbackHandler = () => {

        const feedback = {
            Text: text,
            rate,
            freelancer,
            feedbacker
        }

        setIsLoading(true)
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
            setIsLoading(false)
            // console.log(data)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
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
            {isAllowed && allowedBusiness && <div className={`container row row-flow ${classes['about-list']}`} style={{ border: '', alignContent: 'center' }}>
                <TextArea value={text} maxLength={300} onChange={(e) => setText(e.target.value)} className={classes.TextArea}
                    style={{ height: 120, width: '50%', marginLeft: '10%' }}

                    placeholder={'Add your feedback'} />
                <Rate value={rate} style={{ color: '#98aff5', borderColor: 'black', border: '   ', width: '20% ' }} onChange={(e) => setRate(e)}
                    defaultValue={3} character={({ index }) => customIcons[index + 1]} />
                <Button className={`${classes['custom-btn']}`} disabled={isEmpty} style={{ width: '20%', maxWidth: '30%' }}
                    onClick={publishFeedbackHandler} isLoading={isLoading} >Add</Button>
            </div>}
            {content}
        </div>
    </section>
}
export default FeedBack;