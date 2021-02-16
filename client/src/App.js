import 'antd/dist/antd.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import { StoreProvider } from './store';
import { Layout } from 'antd';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

const { Header, Footer } = Layout;


function App() {
    return (
        <Router>
            <StoreProvider>
                <Layout style={{ backgroundColor: 'white' }}>
                    <Header className="header" style={{ backgroundColor: '#274156' }}>
                        <Navbar />
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
                        <Register />
                    </Route>
                </Layout>
            </StoreProvider>
            <Footer
                style={{ textAlign: 'center', fontSize: '10px', width: "100%", }}>
                <h2>Witness ©2021 Created by Nina Welsh</h2>
            </Footer>
        </Router>
    )
}

export default App;
