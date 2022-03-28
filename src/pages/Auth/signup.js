import classes from './signup.module.css';
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Button, Input, Radio, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const Signup = () => {

    // const passwordRef = useRef();
    // const confirmPasswordRef = useRef();
    // const emailRef = useRef();
    // const usernameRef = useRef();

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    // const [isValidP, setIsValidEmail] = useState(true);
    // const [isValidEmail, setIsValidEmail] = useState(true);

    // const [gender, setGender] = useState('male');//
    const [userType, setUserType] = useState('businessOwner');//
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    // const changeGenderHandler = (event) => {
    //     setGender(event.target.value);
    // }
    useEffect(()=>{
        console.log('f')
        setIsConfirmed((password === confirmPassword) && password.trim() !== '');
        // setIsValidEmail(email.includes('@'));
        // setIsValidUsername(username.trim() === '');
        const isValid = email.includes('@') && username.trim() !== '' && isConfirmed; 
        setIsValidForm(isValid)
    }, [email, username, password, confirmPassword, isConfirmed])

    const submitHandler = event => {
        event.preventDefault();
        // const nameVal = usernameRef.current.state.value;
        // const passVal = passwordRef.current.state.value;
        // const confPassVal = confirmPasswordRef.current.state.value;
        // const emailVal = emailRef.current.state.value;
        if(username.trim() === ''){
            setIsValidUsername(false);
            return;
        }
        if(email.includes('@')){
            setIsValidEmail(false);
            return;
        }
        // if(isConfirmed && password.trim)
        


    }
    const confirmPassHandler = (e) => {
        // const pass = passwordRef.current.state.value;
        // const conf = confirmPasswordRef.current.state.value
        setIsConfirmed((password === confirmPassword) && password.trim() !== '')
        // if (password === confirmPassword) {
        //     setIsConfirmed(true);
        // } else {
        //     setIsConfirmed(false);
        // }
    }

    const userTypeHandler = (type) => {
        setUserType(type.target.value);
    };
    return <div className={`row ${classes.main}`}>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-xs-12 ${classes.leftSide}`}>
            <Image fluid={true} rounded={true} className={`${classes.img}`} src={require('../../images/jobie.png')} />
        </div>
        <div className={`col-lg-8 col-md-6 col-sm-12 col-xs-12 ${classes.rightSide}`}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='userName'>Username</label>
                    <Input type={'text'} placeholder="Username" name='username' id='username'
                        className={classes.customInput}
                        // ref={usernameRef}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        prefix={<UserOutlined />} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <Input type={'email'} placeholder="example@exapmle.com" name='email' id='email'
                        className={classes.customInput}
                        // ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        prefix={<MailOutlined />} />
                </div>
                {/* <div className={classes.control}>
                    <Space direction="horizontal">
                        <label htmlFor='gender' style={{ marginLeft: '10px', paddingRight: '-10px' }}>Gender:</label>
                        <Radio.Group className={`${classes.gender}  ${classes.customInput}`}
                            onChange={changeGenderHandler} defaultValue={'male'}
                            ref={genderRef}
                            id={'gender'}
                            name={'gender'} value={gender}>
                            <Space direction="horizontal" style={{ marginLeft: '-25px' }}>
                                <Radio value={'male'}>Male</Radio>
                                <Radio value={'female'}>Female</Radio>
                            </Space>
                        </Radio.Group>

                    </Space>
                </div> */}
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password placeholder={'***'} name='password' id='password'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className={classes.customInput}
                        // ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <Input.Password placeholder={'***'} name='confirmPassword' id='confirmPassword'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        // ref={confirmPasswordRef}
                        onKeyPress={(e) => {
                            setIsTouched(true)
                        }}
                        onBlur={(e) => {
                            setConfirmPassword(e.target.value);
                            // console.log(enteredPass.current.value)
                            // confirmPassHandler(e)
                        }}
                        onFocus={() => setIsConfirmed(true)}
                        className={classes.customInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    {isTouched && !isConfirmed && <span style={{ color: 'red' }}>Passwords are not matched!</span>}
                </div>
                <div className={classes.control}>
                    <Space direction="horizontal">
                        <label htmlFor='userType'>Register as:</label>
                        <Radio.Group className={`${classes.gender}  ${classes.customInput}`}
                            onChange={userTypeHandler} defaultValue={'businessOwner'}
                            name={'userType'}>
                            <Radio value={'businessOwner'}>Business owner</Radio>
                            <Radio value={'applicant'}>Applicant</Radio>
                            <Radio value={'freelancer'}>Freelancer</Radio>
                        </Radio.Group>
                    </Space>
                </div>
                <div className={classes.action}>
                    <Button className={classes.btn} disabled={!isValidForm} shape="round" htmlType={'submit'}>
                        Register
                    </Button>
                    <br />
                    <span><Link to='/login'>Have an account? Login</Link></span>
                </div>
            </form>
        </div>
    </div>;
}

export default Signup;
