import classes from './modal.module.css';
import { useContext, useState } from "react";
import UserContext from "../../store/user-context";
import axios from 'axios';
import { Button, Select } from 'antd';


const OPTIONS = ['Problem solving', 'critical thinking', 'Communications skills',
    'Teamwork', 'Organizations skills', 'Emotional Intelligence', 'Leadership experience',
    'Responsibility', 'Attention to detail', 'Creativity', 'Decision making',
    'Multitasking', 'Positivity', 'Time management', 'Self-motivation', 'Multilingualism',
    'management', 'Commitment to deadlines', 'Verbal and presentation skills',
    'Data analysis', 'Microsoft Office Pack', 'Big Data Analysis & SQL', 'Research & Data analysis'
];


const SkillsModal = (props) => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [selectedItems, setSelectedItems] = useState(user.skills ? user.skills : []);
    const [isLoading, setIsLoading] = useState(false);

    const editSkill = () => {

        setIsLoading(true)
        axios.patch(`http://localhost:2000/users/me`, {
            skills: selectedItems
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            }
        })
            .then(res => {

                setIsLoading(false);
                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data);
                } else {

                    throw new Error('wrong');
                }
            })
            .catch(err => {
                setIsLoading(false)
            });
        props.overlay(false);
    }
    const skillsChangeHandler = (items) => {
        setSelectedItems(items);
    }

    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

    return <div className={`${classes.modal}`}>
        <div className={`row ${classes.customRow}`}>
            <div>
                <label style={{ marginTop: '170px' }}>Skills</label>
                <Select className={classes.customInput} mode="multiple" placeholder="Choose your skills"
                    value={selectedItems} onChange={skillsChangeHandler}>
                    {filteredOptions.map(item => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
                <Button loading={isLoading} className={`${classes['custom-btn']}`} onClick={editSkill}>
                    Update skills
                </Button>
            </div>
        </div>
    </div>;
}
export default SkillsModal;
