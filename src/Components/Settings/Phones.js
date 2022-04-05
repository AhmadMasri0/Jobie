import { Divider, Input, Select, Space, Switch, Typography } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import UserContext from "../../store/user-context";
import Phone from "./Phone";


let index = 0;
const reducer = (state, action) => {
    let phones = [...state];
    if (action.type === 'phoneType') {

    } else if (action.type === 'phoneValue') {
        const id = action.p.id;
        const value = action.p.value;
        const index = phones.findIndex(phone => phone.id.toString() === id.toString());
        phones[index] = { type: phones[index].type, value, id, visible: phones[index].visible }

    } else if (action.type === 'setPhones') {
        phones = action.p;
    }
    return phones;
}
const Phones = props => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const [Phones, dispatch] = useReducer(reducer, user.phones);
    const [items, setItems] = useState(user.phones.map(phone => phone.type));
    const [name, setName] = useState('');
    const [isAddingPhoneVisible, setIsAddingPhoneVisible] = useState(false);
    const [newPhoneType, setNewPhoneType] = useState('');
    const [newPhoneValue, setNewPhoneValue] = useState('');

    useEffect(() => {
        const p = user.phones;
        // console.log(Phones[0].visible)
        dispatch({ type: 'setPhones', p });
    }, [user.phones]);

    const onNameChange = event => {
        setName(event.target.value);
    };

    const addItem = e => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
    };

    const showAddingPHoneHandler = () => {
        setIsAddingPhoneVisible(!isAddingPhoneVisible);
    }

    const clickHandler = (isEditing) => {

        if (isEditing) {

        } else {

        }
    };

    return <>
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>Phones</Divider>
        <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my Phones?
            <Switch checkedChildren="only me" unCheckedChildren="everyone"
                defaultChecked={Phones[0] ? Phones[0].visible : false}
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                    userCtx.setPhonesVisibility(e);
                }}
            /></Divider>
        <Divider orientation={"right"} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>
            <p className={classes.addPhone} onClick={showAddingPHoneHandler}>
                {isAddingPhoneVisible ? 'Close adding a new hone' : 'Add a new phone'}
            </p>
        </Divider>

        {isAddingPhoneVisible && <Space className={'d-flex justify-content-center'} direction={"horizontal"}
            style={{ marginBottom: '3%', width: '100%' }}>
            <Select
                style={{ width: '200px', border: "", marginLeft: '' }}
                placeholder="Choose a type"
                onChange={(e, d) => {
                    setNewPhoneType(e);
                    // console.log(d)
                }}
                dropdownRender={menu => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space align="center" style={{ padding: '0 8px 4px' }}>
                            <Input placeholder="Enter a new type" value={name} onChange={onNameChange} />
                            <Typography.Link onClick={addItem} style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                                Add type
                            </Typography.Link>
                        </Space>
                    </>
                )}
            >
                {items.map(item => (
                    <Select.Option key={item}>{item}</Select.Option>
                ))}</Select>

            <Phone phone={{}} isEditing={false} setNewPhoneValue={setNewPhoneValue}
                setIsAddingPhoneVisible={setIsAddingPhoneVisible} setNewPhoneType={setNewPhoneType}
                clickHandler={clickHandler} newPhoneType={newPhoneType} newPhoneValue={newPhoneValue} />
        </Space>}

        {Phones.map(phone =>
            <div className={`row`} key={phone.id}>
                <label className={` ${classes.phone}`}>
                    {phone.type}:
                </label>
                <div style={{ border: '', maxWidth: '50%' }}>
                    <Phone phone={phone} phones={Phones} isEditing={true} dispatch={dispatch} clickHandler={clickHandler} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px' }} onClick={() => {
                        userCtx.deletePhone(phone.id);
                    }}>Delete</span>
                </div>
            </div>
        )}
    </>
}

export default Phones;
