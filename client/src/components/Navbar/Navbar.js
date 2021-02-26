import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image } from 'antd';
import DefaultLinks from './DefaultLinks';
import UserLink from './UserLink';
import { useAppContext } from '../../store';
import { useLoginCheck, logout } from '../../utils/setAuthToken';

function Navbar({
    documentState,
    setDocumentState
}) {
    const history = useHistory();

    const [state, appDispatch] = useAppContext();

    useLoginCheck(appDispatch);

    const handleLogOut = (e) => {
        logout(appDispatch);
        history.push('/');
    };

    return (
        <Row>
            <Col span={6}>
                <Link onClick={handleLogOut} to="/"><Image src='/assets/images/logo.png' preview={false} height='65px' width='150px' /></Link>
            </Col>
            <Col span={18} offset={0}>
                {state.isAuthenticated ?
                    <UserLink
                        documentState={documentState}
                        setDocumentState={setDocumentState}
                        handleLogOut={handleLogOut} />
                    :
                    <DefaultLinks />}
            </Col>
        </Row>
    )
}

export default Navbar;