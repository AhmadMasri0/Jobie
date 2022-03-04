import classes from './signup.module.css';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import {Button, Cascader, Input, Radio, Space} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, MailOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

const Signup = () => {

    const [gender, setGender] = useState('male');
    const [userType, setUserType] = useState('');
    const changeGenderHandler = (event) => {
        console.log(event.target.value);
        setGender(event.target.value);
    }
    const submitHandler = event => {
        event.preventDefault();
    }
    const userTypeOptions = [
        {
            label: 'Business owner',
            value: 'Business owner',
        }, {
            label: 'Applicant',
            value: 'Applicant',
        }, {
            label: 'Freelancer',
            value: 'Freelancer',
        },
    ];

    const userTypeHandler = (type) => {
        setUserType(type);
    };
    return <div className={`row ${classes.main}`}>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-xs-12 ${classes.leftSide}`}>
            <Image fluid={true} rounded={true} className={`${classes.img}`} src={require('../../images/jobie.png')}/>
        </div>
        <div className={`col-lg-8 col-md-6 col-sm-12 col-xs-12${classes.rightSide}`}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='userName'>Username</label>
                    <Input type={'text'} placeholder="UserName" name='userName' id='userName'
                           className={classes.customInput}

                           prefix={<UserOutlined/>}/>
                    {/*<input placeholder='UserName' type='text' name='userName' id='userName'/>*/}
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <Input type={'email'} placeholder="example@exapmle.com" name='email' id='email'
                           className={classes.customInput}

                           prefix={<MailOutlined/>}/>
                    {/*<input type='email' placeholder={'example@exapmle.com'} name='email' id='email'/>*/}
                </div>
                <div className={classes.control}>
                    <Space direction="horizontal">
                        <label htmlFor='gender' style={{marginLeft: '10px', paddingRight: '-10px'}}>Gender:</label>
                        <Radio.Group className={`${classes.gender}  ${classes.customInput}`}
                                     onChange={changeGenderHandler} defaultValue={'male'}
                                     name={'gender'} value={gender}>
                            <Space direction="horizontal" style={{marginLeft: '-25px'}}>
                                <Radio value={'male'}>Male</Radio>
                                <Radio value={'female'}>Female</Radio>
                            </Space>
                        </Radio.Group>

                    </Space>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password placeholder={'***'} name='password' id='password'
                                    className={classes.customInput}
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <Input.Password placeholder={'***'} name='confirmPassword' id='confirmPassword'
                                    className={classes.customInput}
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                </div>
                <div className={classes.control}>
                    <Space direction="horizontal">                        <label htmlFor='userType'>Register as:</label>
                        <Cascader options={userTypeOptions} placement={'topRight'}
                                  className={classes.customInput}
                                  onChange={userTypeHandler}
                                  placeholder="User type"/>
                    </Space>
                </div>
                <div className={classes.action}>
                    <Button className={classes.btn} shape="round" htmlType={'submit'}>
                        Register
                    </Button>
                    <br/>
                    <span><Link to='/login'>Have an account? Login</Link></span>
                </div>
            </form>
        </div>
    </div>;
}

export default Signup;
