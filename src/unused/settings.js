import classes from "./settings.module.css";
import {Divider, Input, Select, Space, Switch, Typography} from "antd";
import {useContext, useState} from "react";
import UserContext from "../store/user-context";

let index = 0;

const Settings = (props) => {
        const userCtx = useContext(UserContext);
        const user = userCtx.user;
        const [numbersArray, setNumbersArray] = useState(user.phones.map(phone => {
            return {
                id: phone.id,
                number: phone.value
            }
        }));
        const [editingPhone, setEditingPhone] = useState({type: '', id: '', value: '', visible: null});
        const [items, setItems] = useState(user.phones.map(phone => phone.type));
        const [name, setName] = useState('');

        const onNameChange = event => {
            setName(event.target.value);
        };

        const addItem = e => {
            e.preventDefault();
            setItems([...items, name || `New item ${index++}`]);
            setName('');
        };
        const deletePhoneHandler = (id) => {
            userCtx.deletePhone(id);
        }
        const editPhoneHandler = () => {
            userCtx.editPhone(editingPhone);
        };
        return <div className={`container container-fluid ${classes.group}`}>
            <Divider orientation={"center"}><b>Settings</b></Divider>
            <Divider orientation={"left"} style={{fontWeight: 'bold'}}>Phone numbers</Divider>
            <div className={'row'}>
                {user.phones.map(phone => <div key={phone.id}>
                        <Select
                            className={classes.label}
                            style={{width: '200px'}}
                            placeholder="Choose a type"
                            defaultValue={phone.type}
                            dropdownRender={menu => (
                                <>
                                    {menu}
                                    <Divider style={{margin: '8px 0'}}/>
                                    <Space align="center" style={{padding: '0 8px 4px'}}>
                                        <Input placeholder="Enter a new type" value={name} onChange={onNameChange}/>
                                        <Typography.Link onClick={addItem} style={{fontSize: '10px', whiteSpace: 'nowrap'}}>
                                            Add type
                                        </Typography.Link>
                                    </Space>
                                </>
                            )}
                        >
                            {items.map(item => (
                                <Select.Option key={item}>{item}</Select.Option>
                            ))}
                        </Select>
                        <Input key={phone.id} id={phone.id} pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'}
                               controls={false}
                               className={classes.customPhone}
                               defaultValue={numbersArray.find(number => number.id === phone.id).number}
                               onChange={() => {
                                   const value = document.getElementById(phone.id).value;

                                   setEditingPhone({type: phone.type, id: phone.id, value, visible: phone.visible})
                               }}
                               addonAfter={<label style={{
                                   fontWeight: 'normal',
                                   marginLeft: '-12px',
                                   marginRight: '4px',
                                   paddingLeft: '0',
                                   cursor: 'pointer'
                               }} onClick={() => {
                                   // setEditingPhone(phone);
                                   editPhoneHandler()
                                   // setVisibleEditingPhone(true)
                               }}
                               >Edit</label>}/>
                        <span style={{color: 'darkblue', cursor: 'pointer', marginLeft: '2px'}}
                              onClick={() => deletePhoneHandler(phone.id)}>Delete</span>
                        <Switch id={phone.id} checkedChildren="only me" unCheckedChildren="everyone"
                                onChange={() => {
                                    const value = !document.getElementById(phone.id).checked;

                                    setEditingPhone({type: phone.type, id: phone.id, value: phone.value, visible: value})
                                }}
                                style={{marginLeft: '10px'}}
                                defaultChecked={!phone.visible}/>
                    </div>
                )}
            </div>
        </div>

    }
;

export default Settings;
