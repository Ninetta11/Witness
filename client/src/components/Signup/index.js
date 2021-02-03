import { Layout, Row, Col, Form, Input, Button, Select, Typography, Alert } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser, getUsers } from '../../utils/userFunctions';
import AlertMessage from '../AlertMessage';
import states from '../../data/states.json';
import occupations from '../../data/occupationlist.json';
import API from '../../utils/blockchainAPI';

const { ErrorBoundary } = Alert;
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

function Signup(props) {
    const history = useHistory();

    const [registerState, setRegisterState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        state: '',
        postcode: '',
        suburb: '',
        street: '',
        street_no: '',
        occupation: '',
        IOTA_seed: '',
        IOTA_address: '',
        errors: '',
        formIsValid: true,
    });

    // updates global state when data is entered into any of the inputs
    const onChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value });
    };

    // updates global state when data is selected from any of the select options
    const OnSelect = (value) => {
        (value.key.length > 3) ?
            setRegisterState({ ...registerState, occupation: value.key })
            :
            setRegisterState({ ...registerState, state: value.key })
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
    const onSubmit = () => {
        let errors = '';
        const userData = {
            first_name: registerState.first_name,
            last_name: registerState.last_name,
            email: registerState.email,
            password: registerState.password,
            street_no: registerState.street_no,
            street: registerState.street,
            suburb: registerState.suburb,
            state: registerState.state,
            postcode: registerState.postcode,
            occupation: registerState.occupation
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

                        // registers user 
                        registerUser(userData).then((res) => {
                            errors = { type: 'success', message: 'Your registration was successful' };
                            console.log(res)
                            //history.push('/login');
                        });
                        console.log('Form submitted');
                    })
            } else {
                errors = { type: 'error', message: 'This user already exists' };
                setRegisterState({ ...registerState, errors });
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        let errors = {};
        errors = { type: 'error', message: 'Please complete all form fields' };
        setRegisterState({ ...registerState, errors });
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
                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                    >
                        <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Sign up</Title>
                        <ErrorBoundary>
                            {registerState.errors ?
                                <AlertMessage type={registerState.errors.type} message={registerState.errors.message} />
                                :
                                <h2></h2>}
                        </ErrorBoundary>

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
                            name="street_no"
                            label="Street No."
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your street number!',
                                },
                            ]}
                        ><Input
                                style={{ width: 120 }}
                                name="street_no"
                                value={registerState.street_no}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="street"
                            label="Street"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Please input your street!',
                                },
                            ]}
                        ><Input
                                name="street"
                                placeholder="Enter Street Name"
                                value={registerState.street}
                                onChange={onChange}
                            />
                        </Form.Item>

                        <Form.Item
                            name="suburb"
                            label="Suburb"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Please input your suburb!',
                                },
                            ]}
                        ><Input
                                name="suburb"
                                placeholder="Enter Suburb"
                                value={registerState.suburb}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            name="state"
                            label="State"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your state!',
                                },
                            ]}
                        ><Select
                            style={{ width: 120 }}
                            labelInValue
                            name="state"
                            onChange={OnSelect}>
                                {states.map(state =>
                                    <Option value={state}>{state}</Option>
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="postcode"
                            label="Postcode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your postcode!',
                                },
                            ]}
                        ><Input
                                style={{ width: 120 }}
                                name="postcode"
                                value={registerState.postcode}
                                onChange={onChange} />
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
                            labelInValue
                            name="occupation"
                            onChange={OnSelect}>
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

export default Signup;