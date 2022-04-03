import classes from './signup.module.css';
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Button, Input, Radio, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const history = useHistory()
    const [userType, setUserType] = useState('businessOwner');//
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('f')
        setIsConfirmed((password === confirmPassword) && password.trim() !== '');
        const isValid = email.includes('@') && username.trim() !== '' && isConfirmed;
        setIsFormValid(isValid)
    }, [email, username, password, confirmPassword, isConfirmed])

    const submitHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        const sentData = {
            email,
            password,
            userType,
            username
        };
        setIsLoading(true);
        fetch('', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sentData)
        }).then(res => {

            if (res.ok) {
                history.push('/');
            } else {
                throw new Error('wrong');
            }

        }).catch(err => {
            setIsLoading(false);
        });

        // const data = await response.json();
        // setIsLoading(false);
        // if (!response.ok) {
        //     //error handling
        //     const errorMsg = data.error.message;//should be modified.

        // } else {

        //     history.push('/');
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
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        prefix={<UserOutlined />} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <Input type={'email'} placeholder="example@exapmle.com" name='email' id='email'
                        className={classes.customInput}
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
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <Input.Password placeholder={'***'} name='confirmPassword' id='confirmPassword'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        onKeyPress={(e) => {
                            setIsTouched(true)
                        }}
                        onBlur={(e) => {
                            setConfirmPassword(e.target.value);
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
                    <Button loading={isLoading} className={classes.btn} disabled={!isFormValid || isLoading} shape="round" htmlType={'submit'}>
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
