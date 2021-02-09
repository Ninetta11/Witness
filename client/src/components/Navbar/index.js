import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Menu, Typography, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { useLoginCheck, logout } from '../../utils/setAuthToken';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Text } = Typography;

function Navbar() {
    const history = useHistory();
    const [state, appDispatch] = useAppContext();

    useLoginCheck(appDispatch);

    const handleLogOut = (e) => {
        logout(appDispatch);
        history.push('/');
    };

    const loginRegLink = (
        <Menu
            className="menu"
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: '#274156', textAlign: 'right' }}
            defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/login">Log in</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/register">Sign Up</Link></Menu.Item>
        </Menu>
    )

    const userLink = (
        <Menu
            className="menu"
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: '#274156', textAlign: 'right' }}
            defaultSelectedKeys={['2']}>
            <MenuItem><Link to='/user'>
                <span className="avatar-item">
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        style={{ marginRight: '10px' }}
                    /><Text
                        style={{ fontSize: '18px', color: '#d4b483' }}> Welcome {state.user.first_name} </Text>
                </span></Link></MenuItem>
            < Menu.Item
                key="5" icon={<LogoutOutlined />}
                id="logoutBtn"
                onClick={handleLogOut}>Logout
                </Menu.Item>
        </Menu>
    )

    return (
        <Row>
            <Col span={8}>
                <Link onClick={handleLogOut} to="/"><h1 style={{ color: '#d4b483' }} >Witness</h1></Link>
            </Col>
            <Col span={8} offset={8}>
                {state.isAuthenticated ? userLink : loginRegLink}
            </Col>
        </Row>
    )
}

export default Navbar;