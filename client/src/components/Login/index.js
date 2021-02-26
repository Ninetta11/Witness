import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Modal, Button, Form, message } from 'antd';
import Email from '../InputItems/Email';
import Password from '../InputItems/Password';
import { SET_CURRENT_USER } from '../../utils/types';
import { useAppContext } from '../../store';
import { loginUser } from '../../utils/userFunctions';
import { setAuthToken } from '../../utils/setAuthToken';


function Login({
    modalState,
    setModalState,
}) {
    const history = useHistory();

    const [, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        alerts: ''
    });

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 24 },
    };

    const onChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        const user = {
            email: formState.email,
            password: formState.password,
        };
        loginUser(user).then((response) => {
            // closes the modal
            setModalState({ loading: true });
            setTimeout(() => {
                setModalState({ loading: false, visible: false });
            }, 3000);
            // Set token to localStorage
            const token = response.data;
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decodedToken = jwt_decode(token);
            // Set current user
            appDispatch({ type: SET_CURRENT_USER, payload: decodedToken });
            history.push('/user');
        }).catch((error) => {
            let alerts = { type: error.response.data.type, message: error.response.data.message };
            setFormState({ ...formState, alerts });
        })
    };

    const handleCancel = () => {
        setModalState({ visible: false });
    };

    return (
        <div>
            {formState.alerts ?
                message[formState.alerts.type](formState.alerts.message).then(setFormState({ ...formState, alerts: '' }))
                :
                null
            }

            <Modal
                visible={modalState.visible}
                title="Log in"
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel</Button>,
                    <Button key="submit" type="primary" loading={modalState.loading} onClick={handleSubmit}>
                        Log in</Button>,
                ]}
            >
                <Form
                    {...layout}
                    noValidate
                    initialValues={{ remember: true, }}>

                    <Email
                        value={formState.email}
                        onChange={onChange} />

                    <Password
                        value={formState.password}
                        onChange={onChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please input a valid password'
                            }
                        ]} />

                </Form>
            </Modal>

        </div>
    )
}

export default Login;