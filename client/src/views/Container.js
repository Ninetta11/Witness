import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import CreateDeclaration from '../components/CreateDeclaration';
import Navbar from '../components/Navbar/Navbar';
import Home from './Home';
import Register from '../components/Register';
import DisplayDeclaration from '../components/DisplayDeclaration';
import RequestDeclaration from '../components/RequestDeclaration';
import './style.css';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;


function Dashboard() {

    const [documentState, setDocumentState] = useState({
        hash: '',
        content: '',
        title: ''
    });

    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Header className="header" style={{ backgroundColor: 'white' }}>
                <Navbar
                    documentState={documentState}
                    setDocumentState={setDocumentState} />
            </Header>
            <Content className="content">
                <Route exact path={["/", "/home"]}>
                    <Home />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path={["/user", "/declaration"]}>
                    <CreateDeclaration />
                </Route>
                <Route exact path="/request">
                    <RequestDeclaration />
                </Route>
                <Route exact path="/document">
                    <DisplayDeclaration
                        hash={documentState.hash}
                        title={documentState.title}
                        content={documentState.content} />
                </Route>
            </Content>
            <Footer
                style={{ textAlign: 'center', backgroundColor: 'white', fontSize: '14px', width: "100%", }}>
                <Text>Witness ©2021 Created by Nina Welsh</Text>
            </Footer>
        </Layout>
    )
}
export default Dashboard;