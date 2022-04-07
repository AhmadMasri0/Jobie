import { Divider, Input, Select, Space, Switch, Typography } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import UserContext from "../../store/user-context";
import Phone from "./Phone";
import axios from "axios";


let index = 0;
// const reducer = (state, action) => {
//     let phones = [...state];
//     if (action.type === 'phoneType') {

//     } else if (action.type === 'phoneValue') {
//         const id = action.p.id;
//         const value = action.p.value;
//         const index = phones.findIndex(phone => phone.id.toString() === id.toString());
//         phones[index] = { type: phones[index].type, value, id, visible: phones[index].visible }

//     } else if (action.type === 'setPhones') {
//         phones = action.p;
//     }
//     return phones;
// }

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const Phones = props => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    // const [Phones, dispatch] = useReducer(reducer, user.phones);
    const [Phones, setPhones] = useState(props.phones);
    const [items, setItems] = useState();
    const [name, setName] = useState('');
    const [isAddingPhoneVisible, setIsAddingPhoneVisible] = useState(false);
    const [newPhoneType, setNewPhoneType] = useState('');
    const [newPhoneValue, setNewPhoneValue] = useState('');

    useEffect(() => {
        // const p = user.phones;
        const t = user.phone.map(phone => phone.type);
        setItems(t.filter(onlyUnique));
        return function d() {
            setPhones(user.phone);
            console.log(items)
        }()
        // dispatch({ type: 'setPhones', p });
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

    const clickHandler = (isEditing, value) => {

        let _id, p;
        if (isEditing) {

        } else {
            _id = Math.floor(Math.random() * 100000000000);
            p = { type: newPhoneType, number: value, _id: _id };
        }
        let allPhones = Phones.filter((p) => JSON.stringify(p) !== JSON.stringify({}))
        console.log(allPhones[0]);
        allPhones.push(p);
        console.log(allPhones);

        axios.patch(`http://localhost:2000/users/me`, {
            phone: allPhones
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token

            }
        })
            .then(res => {
                // console.log('----------------',res.data)
                // setIsLoading(false)

                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data)
                    setIsAddingPhoneVisible(false)
                    setPhones(allPhones)
                    // history.replace('/profile');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                // setIsLoading(false)

                console.log(err)
            });
    };

    // return <p>fgg</p>
    return <>
        <Divider orientation={"left"} style={{ fontWeight: 'bold' }}>Phones</Divider>
        {/* <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }}>who can see my Phones? */}
        {/* <Switch checkedChildren="only me" unCheckedChildren="everyone"
                defaultChecked={Phones[0] ? Phones[0].visible : false}
                style={{ marginLeft: '10px' }}
                onClick={(e, d) => {
                    userCtx.setPhonesVisibility(e);
                }}
            /> */}
        {/* </Divider> */}
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
                    console.log(e)
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
                ))}
            </Select>

            <Phone phone={{}} isEditing={false}
                setNewPhoneValue={setNewPhoneValue}
                setIsAddingPhoneVisible={setIsAddingPhoneVisible} setNewPhoneType={setNewPhoneType}
                clickHandler={clickHandler} newPhoneType={newPhoneType} newPhoneValue={newPhoneValue}
            />
        </Space>}

        {Phones.map(phone =>
            <div className={`row`} key={phone.id}>
                <label className={` ${classes.phone}`}>
                    {phone.type}:
                </label>
                <div style={{ border: '', maxWidth: '50%' }}>
                    <Phone phone={phone} phones={Phones} isEditing={true} clickHandler={clickHandler} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px' }} onClick={() => {
                        userCtx.deletePhone(phone.id);
                    }}>Delete</span>
                </div>
            </div>
        )}
    </>
}

export default Phones;
