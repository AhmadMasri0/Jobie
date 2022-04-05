import classes from './signup.module.css';
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { Image } from "react-bootstrap";
import { Button, Checkbox, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from '@ant-design/icons';
import UserContext from "../../store/user-context";

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

    useEffect(() => {
        setIsFormValid(email.includes('@') && password.trim() !== '')
        // console.log(isFormValid);
    }, [email, password])

    const loginHandler = () => {
        setIsLoading(true);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // fetch('', {
        //     method: 'post',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password })
        // }).then(res => {
        //     setIsLoading(false);
        //     if (res.ok) {
        //         // authCxt.login(res.token);

        //     } else {
        //         throw new Error('wrong');
        //     }
        // }).catch(err => {
        //     console.log(err);
        // });
        if (email === userCxt.user.email && password === userCxt.user.password) {
            setIsLoading(false);
            authCxt.login();
        } else {
            setIsLoading(false);
            alert('E-mail or password was wrong, try again.')
        }
    }
    const checkEmailHandler = (e) => {
        const checkedEmail = e.target.value;
        setEmail(checkedEmail);
        console.log(isEmailValid)
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
