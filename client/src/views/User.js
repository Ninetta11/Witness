import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Row, Col, Layout, Menu } from 'antd';
import { UserOutlined, FileOutlined, LogoutOutlined, IdcardOutlined, FileAddOutlined, MailOutlined } from '@ant-design/icons';
import CreateDeclaration from '../components/CreateDeclaration';
import UpdateDetails from '../components/UpdateDetails';
import Document from '../components/Document';
import Request from '../components/Request';
import { useStoreContext } from '../utils/GlobalState';

const { Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;


function User() {
    const [state, dispatch] = useStoreContext();

    return (
        <Layout>
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
                    >  <SubMenu key="sub1" icon={<UserOutlined />} title={state.currentUser.first_name + ' ' + state.currentUser.last_name}>
                            <Menu.Item key="2" icon={<IdcardOutlined />}><Link to="/update">Update Details</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Documents">
                            {state.currentUserDocuments.map(document =>
                                <Menu.Item key={document.hash}><Link to="/document/:hash">{document.hash}</Link></Menu.Item>
                            )}
                        </SubMenu>
                        < Menu.Item key="3" icon={<FileAddOutlined />}><Link to="/declaration">Create New Document</Link></Menu.Item>
                        < Menu.Item key="4" icon={<MailOutlined />}><Link to="/request">Request Document</Link></Menu.Item>
                        < Menu.Item key="5" icon={<LogoutOutlined />}><Link to="/">Logout</Link></Menu.Item>
                    </Menu>
                </Sider >
                <Content className="content" style={{ marginTop: '50px' }}>
                    <Row>
                        <Col span={20} offset={2}>
                            <Switch>
                                <Route exact path="/update">
                                    <UpdateDetails />
                                </Route>
                                <Route exact path="/document/:hash">
                                    <Document />
                                </Route>
                                <Route exact path="/declaration">
                                    <CreateDeclaration />
                                </Route>
                                <Route exact path="/request">
                                    <Request />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{
                    position: "fixed",
                    left: "0",
                    bottom: "0", textAlign: 'center', fontSize: '10px', width: "100%",
                }}>
                    <h2>Witness ©2021 Created by Nina Welsh</h2>
                </Footer>
            </Router>
        </Layout >
    )
};

export default User;