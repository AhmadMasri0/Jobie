import classes from './navigation.module.css';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import AuthContext from "../../store/auth-context";
import {useContext} from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import UserContext from "../../store/user-context";
import {Dropdown, Input, Menu} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';

const Navigation = () => {
    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);
    const location = useLocation().pathname;
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    }
    const isSearchVisible = !((location === '/login') || (location === '/signup'));

    const menu = (<Menu>
        <Menu.Item key={'2'}>
            <NavLink className='nav-link' to='/profile/edit-profile'>
                Edit profile
            </NavLink>
        </Menu.Item>
        <Menu.Item key={'3'}>
            <NavLink className='nav-link' to='/settings'>
                Settings
            </NavLink>
        </Menu.Item>
    </Menu>);
    return <Navbar className={classes.navBar} collapseOnSelect expand="lg" variant="dark" sticky='top'>
        <Container className=''>
            <Navbar.Brand>
                <NavLink to={'/'} className={`nav-link`} exact>
                    <Image className={classes.img} src={require('../../images/logo.png')}/>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isSearchVisible &&
                    <Input prefix={<SearchOutlined/>} placeholder={'Search'} size="small"/>}
                </Nav>
                <Nav>
                    {isLoggedIn &&
                    <NavLink to={'/profile'} style={{textDecoration: 'none'}}>
                        <Dropdown overlay={menu} className="nav-link ant-dropdown-link" arrow>
                            <a>
                                {userCtx.user.username}
                            </a>
                        </Dropdown>
                    </NavLink>
                    }
                    {isLoggedIn && <NavLink className='nav-link' to='/applications'>Applications</NavLink>}
                    {!isLoggedIn && <NavLink className='nav-link' to='/login'>Sign in</NavLink>}
                    {isLoggedIn && <NavLink className='nav-link' to='/logout' onClick={logoutHandler}>Logout</NavLink>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Navigation;
