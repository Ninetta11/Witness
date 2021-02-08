import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { StoreProvider } from './store';
import { Row, Col, Layout } from 'antd';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

const { Header } = Layout;


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
                            <Navbar />
                        </Row>
                    </Header>
                    <Route exact path={["/", "/home"]}>
                        <Home />
                    </Route>
                    <Route exact path="/user" >
                        <Dashboard />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Signup />
                    </Route>
                </Layout>
            </StoreProvider>
        </Router>
    )
}

export default App;
