import classes from './signup.module.css';
import {Link, useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";
import {Image} from "react-bootstrap";
import {Button, Checkbox, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined} from '@ant-design/icons';

const Login = () => {

    const history = useHistory();

    // const [isLogin, setIsLogin] = useState(true);
    const authCxt = useContext(AuthContext);

    const loginHandler = () => {
        authCxt.login();
        history.push('/');
    }
    const submitHandler = event => {
        event.preventDefault();
    }
    return <div className={`row ${classes.main}`}>
        <div className={`col-lg-4 col-md-6 col-sm-12 col-xs-12 ${classes.leftSide}`}>
            <Image className={`${classes.img}`} src={require('../../images/jobie.png')}/>
        </div>
        <div className={`col-lg-8 col-md-6 col-sm-12 col-xs-12${classes.rightSide}`}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <Input type={'email'} placeholder="example@exapmle.com" name='email' id='email'
                           className={classes.customInput}

                           prefix={<MailOutlined/>}/>

                    {/*<input type='email' name='email' id='email'/>*/}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <Input.Password name='password' id='password'
                                    placeholder={'***'}
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    className={classes.customInput}
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                    {/*<input type='password' name='password' id='password'/>*/}
                    <Checkbox className={classes.checkbox}>Remember me</Checkbox>
                </div>
                <div className={classes.action}>
                    <Button className={classes.btn} shape="round" onClick={loginHandler}>
                        Login
                    </Button>

                    <br/>
                    <span><Link to='/signup'>No account? Register now</Link></span>
                </div>
            </form>
        </div>
    </div>;
}

export default Login;
