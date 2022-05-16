import classes from './navigation.module.css';
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import UserContext from "../../store/user-context";
import { Dropdown, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import NotificationCard from "../notifications/notificationCard";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Navigation = () => {
    const authCtx = useContext(AuthContext);
    const userCtx = useContext(UserContext);
    const history = useHistory();
    const location = useLocation().pathname;
    const isLoggedIn = authCtx.isLoggedIn;
    const [isLoading, setIsLoading] = useState(false);

    const logoutHandler = () => {
        const token = authCtx.token;
        const user = userCtx.value;
        // console.log(token)
        axios.post(`http://localhost:2000/users/logout`, user, {
            headers: {
                'Content-Type': 'application/json',
                // 'Accept' : 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    userCtx.setCurrentUser(null);
                    authCtx.logout();
                } else {
                    throw new Error('wrong');
                }
            }).then(() => history.replace('/login'))
            .catch(err => {
                console.log(err)
            });

        // authCtx.logout();
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

    const notifications = (
        <Menu style={{ backgroundColor: '#a3b4e0' }}>
            <Menu.Item>
                <NotificationCard />
            </Menu.Item>
        </Menu>
    );
    return <Navbar className={classes.navBar} collapseOnSelect expand="lg" variant="dark" sticky='top'>
        <Container className=''>
            <Navbar.Brand>
                <NavLink to={'/'} className={`nav-link`} exact>
                    <Image className={classes.img} src={require('../../images/jobie3.png')} />
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* {isSearchVisible &&
                        <Input prefix={<SearchOutlined />} style={{ borderRadius: '20px' }} placeholder={'Search'}
                            size="small" />} */}
                </Nav>
                <Nav>
                    {isLoggedIn &&
                        <NavLink to={'/profile'} style={{ textDecoration: 'none' }}>
                            <Dropdown overlay={menu} className="nav-link ant-dropdown-link" arrow>
                                <a>
                                    {userCtx.user ? userCtx.user.name : ''}
                                </a>
                            </Dropdown>
                        </NavLink>
                    }
                    {isLoggedIn && <NavLink className='nav-link' to='/applications'>Applications</NavLink>}
                    {/* {isLoggedIn &&
                        <NavLink to='/notifications' style={{ textDecoration: 'none' }}>
                            <Dropdown trigger={['click']} overlay={notifications} className="nav-link ant-dropdown-link"
                                overlayStyle={{ width: '20%' }}>
                                <a>
                                    Notifications
                                </a>
                            </Dropdown>
                        </NavLink>} */}
                    {!isLoggedIn && <NavLink className='nav-link' to='/login'>Sign in</NavLink>}
                    {isLoggedIn && <NavLink className='nav-link' to='/logout' onClick={logoutHandler}>Logout</NavLink>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default Navigation;
