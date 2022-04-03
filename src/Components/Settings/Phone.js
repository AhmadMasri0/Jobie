import { Input } from "antd";
import { useContext } from "react";
import classes from "../../pages/Settings/settings.module.css";
import UserContext from "../../store/user-context";


const Phone = (props) => {

    const phone = props.phone;
    const isEditing = props.isEditing;
    const userCtx = useContext(UserContext);

    return <Input key={isEditing ? phone.id : ''} id={isEditing ? phone.id : ''} pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'}
        controls={false}
        className={isEditing ? classes.customPhone : ''}
        placeholder={!isEditing && 'enter a valid number'}
        defaultValue={phone.value}
        onChange={(e) => {
            if(isEditing){
                const p = { id: e.target.id, value: e.target.value }
                props.dispatch({
                    type: 'phoneValue',
                    p
                })
            }else{
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
                props.clickHandler(isEditing);
                if(isEditing){
                    userCtx.editPhones(props.phones);
                }else {
                userCtx.addPhone({ type: props.newPhoneType, value: props.newPhoneValue })
                props.setNewPhoneValue(null);
                props.setNewPhoneType(null);
                props.setIsAddingPhoneVisible(false);
                }
            }}
            >{isEditing ? 'Edit' : 'Add'}</label>}
    />;
}

export default Phone;