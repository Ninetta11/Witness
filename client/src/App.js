import { HashRouter as Router, Route, Link } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
import { Row, Col, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Home from './views/Home';
import User from './views/User';
import LoginForm from './components/LoginForm';
import SignupForm from "./components/SignupForm";

const { Header, Footer } = Layout;


function App() {
    return (
        <Router>
            <StoreProvider>
                <Layout>
                    <Header className="header" style={{ backgroundColor: '#274156' }}>
                        <Row>
                            <Col span={8}>
                                <Link to="/"><h1 style={{ color: '#d4b483' }} >Witness</h1></Link>
                            </Col>
                            <Col span={8} offset={8}>
                                <Menu className="menu" theme="dark" mode="horizontal" style={{ backgroundColor: '#274156', textAlign: 'right' }} defaultSelectedKeys={['2']}>
                                    <Menu.Item key="1"><Link to="/login">Log in</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/signup">Sign Up</Link></Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    </Header>
                    <Route exact path={["/", "/home"]}>
                        <Home />
                    </Route>
                    <Route exact path="/user" >
                        <User />
                    </Route>
                    <Route exact path="/login">
                        <LoginForm />
                    </Route>
                    <Route exact path="/signup">
                        <SignupForm />
                    </Route>
                </Layout>
            </StoreProvider>
        </Router>
    )
}

export default App;
