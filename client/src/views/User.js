import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Row, Col, Layout, Menu } from 'antd';
import { UserOutlined, FileOutlined, LogoutOutlined, IdcardOutlined, FileAddOutlined, MailOutlined } from '@ant-design/icons';
import DeclarationForm from '../components/DeclarationForm';
import UpdateDetailsForm from '../components/UpdateDetailsForm';
import Document from '../components/Document';
import RequestForm from '../components/RequestForm';
import { useStoreContext } from '../utils/GlobalState';

const { Content } = Layout;
const { Sider } = Layout;
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
                        < Menu.Item key="3" icon={<FileAddOutlined />}><Link to="/declarationform">Create New Document</Link></Menu.Item>
                        < Menu.Item key="4" icon={<MailOutlined />}><Link to="/request">Request Document</Link></Menu.Item>
                        < Menu.Item key="5" icon={<LogoutOutlined />}><Link to="/">Logout</Link></Menu.Item>
                    </Menu>

                </Sider >
                <Content>
                    <div className="content" style={{ marginTop: '50px' }}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Switch>
                                    <Route path="/update">
                                        <UpdateDetailsForm />
                                    </Route>
                                    <Route path="/document/:hash">
                                        <Document />
                                    </Route>
                                    <Route path="/declarationform">
                                        <DeclarationForm />
                                    </Route>
                                    <Route path="/request">
                                        <RequestForm />
                                    </Route>
                                </Switch>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Router>
        </Layout >
    )
};

export default User;