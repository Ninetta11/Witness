import 'antd/dist/antd.css';
import { HashRouter as Router } from 'react-router-dom';
import { StoreProvider } from './store';
import Container from './views/Container';


function App() {
    return (
        <Router>
            <StoreProvider>
                <Container />
            </StoreProvider>
        </Router>
    )
}

export default App;
