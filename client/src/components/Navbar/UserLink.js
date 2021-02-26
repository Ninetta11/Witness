import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { UserOutlined, FileOutlined, IdcardOutlined, FileAddOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import UserDetails from '../UserDetails';
import { useAppContext } from '../../store';
import API from '../../utils/blockchainAPI';

const { SubMenu } = Menu;


function UserLink({
    documentState,
    setDocumentState,
    handleLogOut
}) {
    const [state] = useAppContext();

    const [drawerState, setDrawerState] = useState({
        visible: false
    });

    const showDrawer = () => {
        setDrawerState({ visible: true });
    };

    const handleDocumentSelect = (e) => {
        const hash = e.key;
        const title = e.item.props.name;
        API.extractFromBlockchain(hash).then((document) => {
            const content = document.message;
            setDocumentState({ ...documentState, hash, content, title })
        })
    }

    return (
        <div>
            <UserDetails
                drawerState={drawerState}
                setDrawerState={setDrawerState} />

            <Menu
                mode="horizontal"
                defaultSelectedKeys={['sub1']}
                style={{ height: '100%', textAlign: 'right', border: '0px' }}
            >
                < Menu.Item key="4" icon={<FileAddOutlined />}><Link to="/declaration">Create New Document</Link></Menu.Item>

                < Menu.Item key="3" icon={<MailOutlined />}><Link to="/request">Request a Document</Link></Menu.Item>

                <SubMenu key="sub2" icon={<FileOutlined />} title="My Documents">
                    {(state.user.documents ?
                        state.user.documents.map(document =>
                            <Menu.Item
                                name={document.title}
                                key={document.hash}
                                onClick={handleDocumentSelect}
                            ><Link to="/document">{document.title}</Link></Menu.Item>)
                        :
                        <Menu.Item key="noDocuments">You have no documents</Menu.Item>
                    )}
                </SubMenu>

                <SubMenu key="sub1" style={{ fontWeight: 'bold' }} icon={<UserOutlined />} title={state.user.first_name + ' ' + state.user.last_name}>
                    <Menu.Item
                        key="2"
                        icon={<IdcardOutlined />}
                        onClick={showDrawer}>Update Details</Menu.Item>
                    < Menu.Item
                        key="5" icon={<LogoutOutlined />}
                        id="logoutBtn"
                        onClick={handleLogOut}>Logout
                        </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default UserLink;