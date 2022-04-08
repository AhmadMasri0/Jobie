import { Divider, Input, Select, Space, Spin, Switch, Typography } from "antd";
import classes from "../../pages/Settings/settings.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import UserContext from "../../store/user-context";
import Phone from "./Phone";
import axios from "axios";
import { useHistory } from "react-router-dom";


let index = 0;
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const Phones = props => {

    const userCtx = useContext(UserContext);
    const user = userCtx.user;
    const history = useHistory();
    const [items, setItems] = useState();
    const [name, setName] = useState('');
    const [isAddingPhoneVisible, setIsAddingPhoneVisible] = useState(false);
    const [newPhoneType, setNewPhoneType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const t = (user.phone && user.phone.length > 0) ? user.phone.map(p => p.phoneNum.type) : [];
        setItems(t.filter(onlyUnique));
        return function d() {
            console.log(items)
        }()
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

    const clickHandler = (isEditing, value, id) => {

        let sentPhones;

        setIsLoading(true);
        const p = { phoneNum: { type: newPhoneType, number: value } };

        if (!isEditing) {
            user.phone.push(p);
            sentPhones = user.phone;
        } else {
            sentPhones = user.phone;
            sentPhones = sentPhones.map((j) => {

                if ((j._id == id)) {
                    j.phoneNum.number = value;
                }
                return j;
            })
        }
        axios.patch(`http://localhost:2000/users/me`, {
            phone: sentPhones
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token

            }
        })
            .then(res => {
                setIsLoading(false)
                setIsAddingPhoneVisible(false)

                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data)
                    history.push('/profile');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false)

                console.log(err)
            });
    };

    const deletePhoneHandler = (id) => {

        setIsLoading(true)

        const sentPhones = user.phone.filter((j) => {

            if ((j._id != id)) {
                return j;
            }
        })

        axios.patch(`http://localhost:2000/users/me`, {
            phone: sentPhones
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
    }
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

            <Phone phone={{}} isEditing={false} clickHandler={clickHandler} />
        </Space>}

        {user.phone && user.phone.length !== 0 && user.phone.map(phone =>
            <div className={`row`} key={phone._id}>
                <label className={` ${classes.phone}`}>
                    {phone.phoneNum && phone.phoneNum.type}:
                </label>
                <div style={{ border: '', maxWidth: '50%' }}>
                    <Phone phone={phone} id={phone._id} isEditing={true} clickHandler={clickHandler} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px' }} onClick={() => {
                        deletePhoneHandler(phone._id);
                    }}>Delete</span>
                </div>
            </div>
        )}
    </>
}

export default Phones;
