import classes from "./settings.module.css";
import {Divider, Input, Switch} from "antd";
import {useContext, useEffect, useReducer, useState} from "react";
import UserContext from "../store/user-context";

let index = 0;
const reducer = (state, action) => {
    let phones = [...state];
    if (action.type === 'phoneType') {

    } else if (action.type === 'phoneValue') {
        const id = action.p.id;
        // console.log(id)
        const value = action.p.value;
        const index = phones.findIndex(phone => phone.id.toString() === id.toString());
        phones[index] = {type: phones[index].type, value, id, visible: phones[index].visible}

    } else if (action.type === 'phoneVisible') {

    } else if (action.type === 'setPhones') {
        phones = action.p;
    }
    return phones;
}
const Settings = (props) => {
        const userCtx = useContext(UserContext);
        const user = userCtx.user;
        const [Phones, dispatch] = useReducer(reducer, user.phones);
        const [items, setItems] = useState(user.phones.map(phone => phone.type));
        const [name, setName] = useState('');

        useEffect(() => {
            const p = user.phones;
            dispatch({type: 'setPhones', p});
        }, [user.phones])
        const onNameChange = event => {
            setName(event.target.value);
        };

        const addItem = e => {
            e.preventDefault();
            setItems([...items, name || `New item ${index++}`]);
            setName('');
        };


        return <div className={`container container-fluid ${classes.group}`}>
            <Divider orientation={"center"}><b>Settings</b></Divider>
            <Divider orientation={"left"} style={{fontWeight: 'bold'}}>Phones</Divider>
            <Divider orientation={'right'} style={{fontWeight: 'normal', borderColor: 'transparent'}}>who can see my Phones?
                <Switch checkedChildren="only me" unCheckedChildren="everyone"
                        style={{marginLeft: '10px'}}
                        onClick={(e, d) => {

                        }}
                /></Divider>

            {Phones.map(phone =>
                <div className={`row`} key={phone.id}>
                    <label className={` ${classes.phone}`}>
                        {phone.type}:
                    </label>
                    <div style={{border: '', maxWidth: '50%'}}>
                        {/*<Select*/}
                        {/*    key={'-' + phone.id}*/}
                        {/*    className={classes.label}*/}
                        {/*    style={{width: '200px'}}*/}
                        {/*    placeholder="Choose a type"*/}
                        {/*    defaultValue={phone.type}*/}
                        {/*    onChange={(e, d) => {*/}
                        {/*        console.log(d)*/}
                        {/*    }}*/}
                        {/*    dropdownRender={menu => (*/}
                        {/*        <>*/}
                        {/*            {menu}*/}
                        {/*            <Divider style={{margin: '8px 0'}}/>*/}
                        {/*            <Space align="center" style={{padding: '0 8px 4px'}}>*/}
                        {/*                <Input placeholder="Enter a new type" value={name} onChange={onNameChange}/>*/}
                        {/*                <Typography.Link onClick={addItem} style={{fontSize: '10px', whiteSpace: 'nowrap'}}>*/}
                        {/*                    Add type*/}
                        {/*                </Typography.Link>*/}
                        {/*            </Space>*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*>*/}
                        {/*    {items.map(item => (*/}
                        {/*        <Select.Option key={item}>{item}</Select.Option>*/}
                        {/*    ))}*/}
                        {/*</Select>*/}
                        <Input key={phone.id} id={phone.id} pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'}
                               controls={false}
                               className={classes.customPhone}
                               defaultValue={phone.value}
                               onChange={(e) => {
                                   const p = {id: e.target.id, value: e.target.value}
                                   dispatch({
                                       type: 'phoneValue',
                                       p
                                   })
                               }}
                               addonAfter={
                                   <label style={{
                                       fontWeight: 'normal',
                                       marginLeft: '-12px',
                                       marginRight: '4px',
                                       paddingLeft: '0',
                                       cursor: 'pointer',
                                   }} onClick={() => {
                                       userCtx.editPhones(Phones)
                                   }}
                                   >Edit</label>}
                        />
                        <span style={{color: 'darkblue', cursor: 'pointer', marginLeft: '2px'}} onClick={() => {
                            userCtx.deletePhone(phone.id);
                        }}>Delete</span>

                    </div>
                </div>
            )}
            <Divider/>


        </div>


    }
;

export default Settings;
