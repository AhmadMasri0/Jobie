// import classes from "../Modal/modal.module.css";
// import { Button, Select } from "antd";
// import 'moment-precise-range-plugin'
// import { useContext, useEffect, useRef, useState } from "react";
// import UserContext from "../../store/user-context";
// import axios from "axios";

// const OPTIONS = ['Problem solving', 'critical thinking', 'Communications skills',
//     'Teamwork', 'Organizations skills', 'Emotional Intelligence', 'Leadership experience',
//     'Responsibility', 'Attention to detail', 'Creativity', 'Decision making',
//     'Multitasking', 'Positivity', 'Time management', 'Self-motivation', 'Multilingualism',
//     'management', 'Commitment to deadlines', 'Verbal and presentation skills',
//     'Data analysis', 'Microsoft Office Pack', 'Big Data Analysis & SQL', 'Research & Data analysis'];

// const EditSkills = (props) => {

//     const userCtx = useContext(UserContext);
//     // const user = userCtx.user;
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedItems, setSelectedItems] = useState(props.skills ? props.skills : []);
//     const editSkill = () => {

//         setIsLoading(true)
//         axios.patch(`http://localhost:2000/users/me`, {
//             skills: selectedItems
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + userCtx.token
//             }
//         })
//             .then(res => {

//                 setIsLoading(false);
//                 if (res.status === 200) {
//                     userCtx.setCurrentUser(res.data);
//                 } else {

//                     throw new Error('wrong');
//                 }
//             })
//             .catch(err => {
//                 setIsLoading(false)
//             });
//         props.overlay(false);
//     }
//     const skillsChangeHandler = (items) => {
//         setSelectedItems(items);

//     }
//     const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
//     return <div>
//         <div className={`row ${classes.customRow}`}>
//             <div className={`${classes.customCol}`}>
//                 <label style={{ marginLeft: '' }}>Skills</label>

//                 <Select className={classes.customInput} mode="multiple"
//                     placeholder="Choose your skills" value={selectedItems} onChange={skillsChangeHandler}
//                 >
//                     {filteredOptions.map(item => (
//                         <Select.Option key={item} value={item}>
//                             {item}
//                         </Select.Option>
//                     ))}
//                 </Select>
//                 <Button className={` ${classes['custom-btn']}`} onClick={editSkill}>
//                     Update skills
//                 </Button>
//             </div>
//         </div>

//     </div>
// }
// export default EditSkills;
