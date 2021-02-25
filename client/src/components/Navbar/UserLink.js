import { Menu, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';

const { Text } = Typography;


function UserLink({
    setDrawerState
}) {
    const [state] = useAppContext();

    const showDrawer = () => {
        setDrawerState({ visible: true });
    };

    return (
        <Menu
            className="menu"
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: '#274156', textAlign: 'right' }}
            defaultSelectedKeys={['2']}>
            <Menu.Item onClick={showDrawer}>
                <span className="avatar-item">
                    <Avatar
                        size="large"
                        icon={<UserOutlined />}
                        style={{ marginRight: '10px' }}
                    /><Text
                        style={{ fontSize: '18px', color: '#d4b483' }}> Welcome {state.user.first_name} {state.user.last_name}</Text>
                </span></Menu.Item>
        </Menu>
    )
}

export default UserLink;