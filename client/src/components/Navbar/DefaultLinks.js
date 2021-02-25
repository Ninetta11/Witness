import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';


function DefaultLinks({
    setModalState
}) {
    const showModal = () => {
        setModalState({
            visible: true,
        });
    };
    return (
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
}

export default DefaultLinks;