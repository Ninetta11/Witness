import { Layout, Row, Col, Form, Input, Button, Select, Typography, message } from 'antd';
import { RightCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser, getUsers } from '../../utils/userFunctions';
import occupations from '../../data/occupationlist.json';
import API from '../../utils/blockchainAPI';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const { Option } = Select;
const { Content } = Layout;
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

    useEffect(() => {
        setRegisterState({
            ...registerState,
            address: googlevalue.value.description,
        });
        console.log(registerState.address);
    }, [googlevalue.value.description]);

    // updates global state when data is entered into any of the inputs
    const onChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value });
    };

    // updates global state when data is selected from any of the select options
    const onSelect = (value) => {
        setRegisterState({ ...registerState, occupation: value.key })
    };

    // generates random seed
    const generateSeed = () => {
        // IOTA seed must be 81 characters and can include letters and the number 9
        const options = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let seed = '';
        // randomised selection
        for (let i = 0; i < 81; i++) {
            seed += options.charAt(parseInt(Math.random() * options.length))
        };
        return seed;
    }

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
                                console.log('Form submitted' + res);
                                history.push('/login');
                            })
                            .catch((error) => {
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
            alerts = { type: error.response.data.type, message: error.response.data.message };
            setRegisterState({ ...registerState, alerts });
        })
    };

    const onFinishFailed = (errorInfo) => {
        let alerts = {};
        alerts = { type: 'error', message: 'Please complete all form fields' };
        setRegisterState({ ...registerState, alerts });
        console.log('Failed:', errorInfo);
    };

    return (
        <Content className="content" >
            {registerState.alerts ?
                message[registerState.alerts.type](registerState.alerts.message).then(setRegisterState({ ...registerState, alerts: '' }))
                :
                null
            }
            <Row>
                <Col span={12} offset={6}>
                    <Form
                        noValidate
                        {...layout}
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                    >
                        <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }} icon={<UserAddOutlined />}>Register</Title>

                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        ><Input
                                name="first_name"
                                placeholder="Enter First Name"
                                value={registerState.first_name}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        ><Input
                                name="last_name"
                                placeholder="Enter Last Name"
                                value={registerState.last_name}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your address!',
                                },
                            ]}
                        ><GooglePlacesAutocomplete
                                apiKey="AIzaSyCHR4pzxUoksFuNAA1Wkp0Xs7qmdn9wlKI&callback=initAutocomplete&libraries=places&v=weekly"
                                value={registerState.address}
                                selectProps={{
                                    googlevalue,
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="occupation"
                            label="Occupation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your occupation!',
                                },
                            ]}
                        ><Select
                            showSearch
                            labelInValue
                            name="occupation"
                            placeholder="Select an occupation"
                            onChange={onSelect}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {occupations.map(occupation =>
                                    <Option value={occupation}>{occupation}</Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        ><Input
                                name="email"
                                placeholder="Enter Email Address"
                                value={registerState.email}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    min: 8,
                                    required: true,
                                    message: 'Please input a valid password',
                                },
                            ]}
                        ><Input.Password
                                name="password"
                                placeholder="Must contain min 8 mixed characters"
                                value={registerState.password}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        ><Input.Password
                                placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" shape="round" icon={<RightCircleOutlined />} htmlType="submit" >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content >
    );
};

export default Register;