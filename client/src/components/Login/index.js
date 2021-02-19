import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Modal, Button, Form, Input, message } from 'antd';
import { RightCircleOutlined, LoginOutlined } from '@ant-design/icons';
import { SET_CURRENT_USER } from '../../utils/types';
import { useAppContext } from '../../store';
import { loginUser } from '../../utils/userFunctions';
import { setAuthToken } from '../../utils/setAuthToken';

function Login({
    modalState,
    setModalState,
    handleCancel,
}) {
    const history = useHistory();

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        alerts: ''
    });

    const [, appDispatch] = useAppContext();

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

    const onFinishFailed = (errorInfo) => {
        let alerts = { type: 'error', message: 'Please complete all form fields' };
        setFormState({ ...formState, alerts });
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {formState.alerts ?
                message[formState.alerts.type](formState.alerts.message).then(setFormState({ ...formState, alerts: '' }))
                :
                <div></div>
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
                    noValidate
                    initialValues={{ remember: true, }}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    ><Input
                            name="email"
                            value={formState.email}
                            onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    ><Input.Password
                            name="password"
                            value={formState.password}
                            onChange={onChange} />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default Login;