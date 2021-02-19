import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom';
import { Row, Col, Layout, Menu } from 'antd';
import { UserOutlined, FileOutlined, IdcardOutlined, FileAddOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import CreateDeclaration from '../components/CreateDeclaration';
import UpdateDetails from '../components/UpdateDetails';
import DisplayDeclaration from '../components/DisplayDeclaration';
import Request from '../components/Request';
import { useAppContext } from '../store';
import { useLoginCheck, logout } from '../utils/setAuthToken';
import API from '../utils/blockchainAPI';
import './style.css';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;


function Dashboard() {
    const history = useHistory();

    const [state, appDispatch] = useAppContext();

    const [documentState, setDocumentState] = useState({
        hash: '',
        content: '',
        title: ''
    });

    useLoginCheck(appDispatch);

    const handleLogOut = (e) => {
        logout(appDispatch);
        history.push('/');
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
        <Layout >
            <Router>
                <Sider className="site-layout-background" width={250} breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title={state.user.first_name + ' ' + state.user.last_name}>
                            <Menu.Item key="2" icon={<IdcardOutlined />}><Link to="/user/update">Update Details</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Documents">
                            {(state.user.documents ?
                                state.user.documents.map(document =>
                                    <Menu.Item
                                        name={document.title}
                                        key={document.hash}
                                        onClick={handleDocumentSelect}
                                    ><Link to="/user/document">{document.title}</Link></Menu.Item>)
                                :
                                <Menu.Item key="noDocuments">You have no documents</Menu.Item>
                            )}
                        </SubMenu>
                        < Menu.Item key="3" icon={<FileAddOutlined />}><Link to="/user/declaration">Create New Document</Link></Menu.Item>
                        < Menu.Item key="4" icon={<MailOutlined />}><Link to="/user/request">Request Document</Link></Menu.Item>
                        < Menu.Item
                            key="5" icon={<LogoutOutlined />}
                            id="logoutBtn"
                            onClick={handleLogOut}>Logout
                </Menu.Item>
                    </Menu>
                </Sider >
                <Content className="content" >
                    <Row>
                        <Col span={20} offset={2}>
                            <Switch>
                                <Route exact path="/user/update">
                                    <UpdateDetails />
                                </Route>
                                <Route exact path="/user/document">
                                    <DisplayDeclaration
                                        hash={documentState.hash}
                                        title={documentState.title}
                                        content={documentState.content} />
                                </Route>
                                <Route exact path="/user/declaration">
                                    <CreateDeclaration />
                                </Route>
                                <Route exact path="/user/request">
                                    <Request />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Content>
            </Router>
        </Layout >
    )
};

export default Dashboard;