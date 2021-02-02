import React, { useState } from 'react';
import { GET_ERRORS, SET_CURRENT_USER } from '../../actions/types';
import { useAppContext } from '../../store';
import { loginUser } from '../../utils/userFunctions';
import { setAuthToken } from '../../utils/setAuthToken';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Layout, Row, Col, Form, Input, Button, Checkbox, Typography } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Login() {
    const history = useHistory();

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const [, appDispatch] = useAppContext();

    const onChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: formState.email,
            password: formState.password,
        };
        try {
            const response = await loginUser(user);
            // Set token to localStorage
            const token = response.data;
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decodedToken = jwt_decode(token);
            // Set current user
            appDispatch({ type: SET_CURRENT_USER, payload: decodedToken });
            history.push('/dashboard');
        } catch (error) {
            appDispatch({
                type: GET_ERRORS,
                payload: error,
            });
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content className="content" style={{ marginTop: '50px' }}>
            <Row>
                <Col span={12} offset={6}>
                    <Form
                        noValidate
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true, }}
                        onSubmit={handleSubmit}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Log in</Title>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                            value={formState.email}
                            onChange={onChange}
                        >
                            <Input />
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
                            value={formState.password}
                            onChange={onChange}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" shape="round" icon={<RightCircleOutlined />} htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    );
};

export default Login;