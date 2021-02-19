import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Menu, Typography, Avatar, Image } from 'antd';
import { UserOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { useLoginCheck, logout } from '../../utils/setAuthToken';
import MenuItem from 'antd/lib/menu/MenuItem';
import Login from '../Login';
import UserDetails from '../UserDetails';
import { useState } from 'react';

const { Text } = Typography;

function Navbar() {
    const history = useHistory();
    const [state, appDispatch] = useAppContext();

    useLoginCheck(appDispatch);

    const handleLogOut = (e) => {
        logout(appDispatch);
        history.push('/');
    };

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    const showModal = () => {
        setModalState({
            visible: true,
        });
    };

    const handleCancel = () => {
        setModalState({ visible: false });
    };

    const [drawerState, setDrawerState] = useState({
        visible: false
    });

    const showDrawer = () => {
        setDrawerState({ visible: true });
    };

    const onClose = () => {
        setDrawerState({ visible: false });
    };

    const loginRegLink = (
        <Menu
            className="menu"
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: '#274156', textAlign: 'right' }}
            defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<LoginOutlined />} onClick={showModal}>Log in</Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}><Link to="/register">Register</Link></Menu.Item>
        </Menu>
    )

    const userLink = (
        <Menu
            className="menu"
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: '#274156', textAlign: 'right' }}
            defaultSelectedKeys={['2']}>
            <MenuItem onClick={showDrawer}>
                <span className="avatar-item">
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        style={{ marginRight: '10px' }}
                    /><Text
                        style={{ fontSize: '18px', color: '#d4b483' }}> Welcome {state.user.first_name} </Text>
                </span></MenuItem>
        </Menu>
    )

    return (
        <div>
            <Row>
                <Col span={8}>
                    <Link onClick={handleLogOut} to="/"><Image src='/assets/images/logo.png' preview={false} height='65px' width='150px' /></Link>
                </Col>
                <Col span={8} offset={8}>
                    {state.isAuthenticated ? userLink : loginRegLink}
                </Col>
            </Row>
            <UserDetails
                drawerState={drawerState}
                onClose={onClose} />
            <Login
                modalState={modalState}
                setModalState={setModalState}
                handleCancel={handleCancel}
            />
        </div>
    )
}

export default Navbar;