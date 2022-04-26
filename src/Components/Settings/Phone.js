import { Input } from "antd";
import { useEffect, useRef } from "react";
import classes from "../../pages/Settings/settings.module.css";


const Phone = (props) => {

    const isEditing = props.isEditing;

    const enteredPhone = useRef();
    useEffect(() => {
        enteredPhone.current.value = (props.phone && props.phone.phoneNum) ? props.phone.phoneNum.number : null
    }, [])
    return <Input pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'}
        controls={false}
        ref={enteredPhone}
        className={isEditing ? classes.customPhone : ''}
        style={{ border: 0 }}
        placeholder={!isEditing && 'Enter a valid number'}
        defaultValue={props.phone && props.phone.phoneNum && props.phone.phoneNum.number}
        onChange={(e) => {
            enteredPhone.current.value = e.target.value;
        }}
        addonAfter={
            <label style={{
                fontWeight: 'normal',
                marginLeft: '-12px',
                marginRight: '4px',
                paddingLeft: '0',
                cursor: 'pointer',
            }} onClick={() => {
                props.clickHandler(isEditing, enteredPhone.current.value, props.id);
            }}
            >{isEditing ? 'Edit' : 'Add'}</label>}
    />;
}

export default Phone;