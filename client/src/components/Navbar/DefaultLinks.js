import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import Login from '../Login';


function DefaultLinks() {
    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    const showModal = () => {
        setModalState({
            visible: true,
        });
    };
    return (
        <div>
            <Menu
                className="menu"
                mode="horizontal"
                style={{ textAlign: 'right', border: '0px' }}
                defaultSelectedKeys={['2']}>
                <Menu.Item key="1" icon={<LoginOutlined />} onClick={showModal}>Log in</Menu.Item>
                <Menu.Item key="2" icon={<UserAddOutlined />}><Link to="/register">Register</Link></Menu.Item>
            </Menu>

            <Login
                modalState={modalState}
                setModalState={setModalState}
            />
        </div>
    )
}

export default DefaultLinks;