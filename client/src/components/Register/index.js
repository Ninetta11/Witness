import jwt_decode from 'jwt-decode';
import './style.css';
import { Layout, Row, Col, Form, Button, Typography, Steps, message } from 'antd';
import { RightCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterSteps from '../RegisterSteps';
import { registerUser, loginUser, getUsers, generateSeed } from '../../utils/userFunctions';
import API from '../../utils/blockchainAPI';
import { SET_CURRENT_USER } from '../../utils/types';
import { useAppContext } from '../../store';
import { setAuthToken } from '../../utils/setAuthToken';
import steps from '../../data/steps.json';

const { Content } = Layout;
const { Step } = Steps;
const { Title } = Typography;
const layout = {
    labelCol: {
        span: 8,
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


function Register() {
    const history = useHistory();

    const [, appDispatch] = useAppContext();

    const [googlevalue, setValue] = useState({ value: { description: "" } });

    const [registerState, setRegisterState] = useState({
        first_name: '',
        last_name: '',
        address: googlevalue,
        occupation: '',
        email: '',
        password: '',
        IOTA_seed: '',
        IOTA_address: '',
        alerts: '',
        formIsValid: true,
    });

    const [current, setCurrent] = React.useState(0);

    useEffect(() => {
        setRegisterState({
            ...registerState,
            address: googlevalue.value.description,
        });
    }, [googlevalue.value.description]);

    // updates global state when data is entered into any of the inputs
    const onChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value });
    };

    // on form submit
    const handleSubmit = () => {
        let alerts = '';
        const userData = {
            first_name: registerState.first_name,
            last_name: registerState.last_name,
            address: registerState.address,
            occupation: registerState.occupation,
            email: registerState.email,
            password: registerState.password
        };
        // current registered user information is pulled from the database
        getUsers().then((data) => {
            // compares all current registered user emails against inputted email
            var alreadyRegisteredUser = data
                .find((element) => element.email === registerState.email)
            // if email does not exist in the database
            if (!alreadyRegisteredUser) {
                // generate random seed for new user 
                let seed = generateSeed();
                // generate an IOTA blockchain address from seed
                API.generateNewAddress(seed)
                    .then((address) => {
                        userData.IOTA_seed = seed;
                        userData.IOTA_address = address;
                        // registers user and redirects to login page
                        registerUser(userData)
                            .then((res) => {
                                alerts = { type: res.data.type, message: res.data.message };
                                setRegisterState({ ...registerState, alerts });
                                const user = {
                                    email: registerState.email,
                                    password: registerState.password,
                                };
                                loginUser(user).then((response) => {
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
                                    setRegisterState({ ...registerState, alerts });
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                                alerts = { type: error.response.data.type, message: error.response.data.message };
                                setRegisterState({ ...registerState, alerts });
                            })
                    })
            }
            else {
                // If user already exists, alerts user
                alerts = { type: 'error', message: 'User already existed. Please login' };
                setRegisterState({ ...registerState, alerts });
            }
        }).catch((error) => {
            console.log(error);
            alerts = { type: error.response.data.type, message: error.response.data.message };
            setRegisterState({ ...registerState, alerts });
        })
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleProgress = (currentStep) => {
        if (registerState[currentStep]) {
            next()
        }
        else {
            let alerts = { type: 'error', message: 'Please complete all form fields' };
            setRegisterState({ ...registerState, alerts });
        }
    }

    return (
        <Content className="content" >
            {registerState.alerts ?
                message[registerState.alerts.type](registerState.alerts.message).then(setRegisterState({ ...registerState, alerts: '' }))
                :
                null
            }
            <Row>
                <Col span={18} offset={3}>
                    <Form
                        noValidate
                        {...layout}
                        onFinish={handleSubmit}
                    >
                        <div style={{ textAlign: 'center', fontSize: '30px' }} >
                            <UserAddOutlined />
                            <Title level={2} style={{ paddingBottom: '25px' }} >Register</Title>
                        </div>

                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>

                        <div className="steps-content">
                            <RegisterSteps
                                step={steps[current].title}
                                googlevalue={googlevalue}
                                setValue={setValue}
                                registerState={registerState}
                                setRegisterState={setRegisterState}
                                onChange={onChange} />
                        </div>

                        <div className="steps-action" {...tailLayout}>
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" icon={<RightCircleOutlined />} htmlType="submit" >
                                    Complete
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => handleProgress(steps[current].name)}>
                                    Next
                                </Button>
                            )}
                        </div>

                    </Form>
                </Col>
            </Row>
        </Content >
    );
};

export default Register;