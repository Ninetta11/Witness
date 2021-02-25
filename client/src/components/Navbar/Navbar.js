import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Image } from 'antd';
import DefaultLinks from './DefaultLinks';
import UserLink from './UserLink';
import Login from '../Login';
import UserDetails from '../UserDetails';
import { useAppContext } from '../../store';
import { useLoginCheck, logout } from '../../utils/setAuthToken';

function Navbar() {
    const history = useHistory();

    const [state, appDispatch] = useAppContext();

    useLoginCheck(appDispatch);

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    const [drawerState, setDrawerState] = useState({
        visible: false
    });

    const handleLogOut = (e) => {
        logout(appDispatch);
        history.push('/');
    };

    return (
        <div>
            <Row>
                <Col span={8}>
                    <Link onClick={handleLogOut} to="/"><Image src='/assets/images/logo.png' preview={false} height='65px' width='150px' /></Link>
                </Col>
                <Col span={8} offset={8}>
                    {state.isAuthenticated ?
                        <UserLink
                            setDrawerState={setDrawerState} />
                        :
                        <DefaultLinks
                            setModalState={setModalState} />}
                </Col>
            </Row>

            <UserDetails
                drawerState={drawerState}
                setDrawerState={setDrawerState} />

            <Login
                modalState={modalState}
                setModalState={setModalState}
            />
        </div>
    )
}

export default Navbar;