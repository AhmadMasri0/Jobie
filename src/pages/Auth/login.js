import classes from './signup.module.css';
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { Image } from "react-bootstrap";
import { Button, Checkbox, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from '@ant-design/icons';
import UserContext from "../../store/user-context";
import axios from 'axios';

const Login = () => {

    const authCxt = useContext(AuthContext);
    const userCxt = useContext(UserContext);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setIsFormValid(email.includes('@') && password.trim() !== '')
        // console.log(isFormValid);
    }, [email, password])

    const loginHandler = () => {
        setIsLoading(true);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        setIsLoading(true);

        axios.post("http://localhost:2000/users/login", {email, password})

            .then(res => {

                console.log(res.data.user)
                if (res.status === 200) 
                {
                    authCxt.login(res.data.token);
                    userCxt.setCurrentUser(res.data.user)
                    setIsLoading(false);
                    history.replace('/');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
                setError('Check your email and password.')

                console.log(err)
            });
     
    }
    const checkEmailHandler = (e) => {
        const checkedEmail = e.target.value;
        setEmail(checkedEmail);
        // console.log(isEmailValid)
        if (checkedEmail.includes('@'))
            setIsEmailValid('')
        else setIsEmailValid('error')
    }
    const submitHandler = event => {
        // event.preventDefault();
    }
    return <div className={`row ${classes.main}`}>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-xs-12 ${classes.leftSide}`}>
            <Image className={`${classes.img}`} src={require('../../images/jobie.png')} />
        </div>
        <div className={`col-lg-8 col-md-6 col-sm-12 col-xs-12${classes.rightSide}`}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <Input ref={emailRef} type={'email'} placeholder="example@exapmle.com" name='email' id='email'
                        className={classes.customInput}
                        status={isEmailValid ? '' : 'error'}
                        required
                        onChange={checkEmailHandler}
                        prefix={<MailOutlined />} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password ref={passRef} name='password' id='password'
                        placeholder={'***'}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        className={classes.customInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    {error && <p>{error}</p>}
                    <Checkbox className={classes.checkbox}>Remember me</Checkbox>
                </div>
                <div className={classes.action}>
                    <Button loading={isLoading} disabled={!isFormValid} className={classes.btn} shape="round" onClick={loginHandler}>
                        Login
                    </Button>
                    <br />
                    <span><Link to='/signup'>No account? Register now</Link></span>
                </div>
            </form>
        </div>
    </div>;
}

export default Login;
