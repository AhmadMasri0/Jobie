import { Input } from "antd";
import { useContext, useState } from "react";
import classes from "../../pages/Settings/settings.module.css";
import UserContext from "../../store/user-context";


const Phone = (props) => {

    const phone = props.phone;
    const isEditing = props.isEditing;
    const userCtx = useContext(UserContext);
    // const [newPhoneType, setNewPhoneType] = useState('');
    const [newPhoneValue, setNewPhoneValue] = useState('');

    return <Input key={isEditing ? phone.number : ''} id={isEditing ? phone.id : ''} pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'}
        controls={false}
        className={isEditing ? classes.customPhone : ''}
        placeholder={!isEditing && 'Enter a valid number'}
        defaultValue={phone.number}
        onChange={(e) => {
            if(isEditing){
                // const p = { number: e.target.value }
            }else{
                // const p = { number: e.target.value }
                setNewPhoneValue(e.target.value);
            }
        }}
        addonAfter={
            <label style={{
                fontWeight: 'normal',
                marginLeft: '-12px',
                marginRight: '4px',
                paddingLeft: '0',
                cursor: 'pointer',
            }} onClick={() => {
                props.clickHandler(isEditing, newPhoneValue);
                // if(isEditing){
                    // userCtx.editPhones(props.phones);
                // }else {
                // userCtx.addPhone({ type: props.newPhoneType, value: props.newPhoneValue })
                // props.setNewPhoneValue(null);
                // props.setNewPhoneType(null);
                // props.setIsAddingPhoneVisible(false);
                // }
            }}
            >{isEditing ? 'Edit' : 'Add'}</label>}
    />;
}

export default Phone;