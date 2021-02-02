import { Layout, Row, Col, Form, Input, Button, Select, Typography, Alert } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser, getUsers } from '../../utils/userFunctions';
import AlertMessage from '../AlertMessage';
import API from '../../utils/blockchainAPI';
const { ErrorBoundary } = Alert;
const { Option } = Select;
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
        alerts: '',
        formIsValid: true,
    });

    // updates global state when data is entered into any of the inputs
    const onChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value });
    };

    // const selectOnChange = (value) => {
    //     console.log(value);
    //     setRegisterState({ ...registerState, [name]: value });
    // };

    // generates a unique IOTA blockchain address
    const generateNewAddress = () => {
        // IOTA seed must be 81 characters and can include letters and numbers
        const options = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let seed = '';
        // randomised selection
        for (let i = 0; i < 81; i++) {
            seed += options.charAt(parseInt(Math.random() * options.length))
        };
        console.log(seed.length);
        // an IOTA blockchain address is generated from the random seed
        let address = API.generateNewAddress(seed);
        setRegisterState({ ...registerState, IOTA_seed: seed, IOTA_address: address });
        console.log(registerState)
    }

    // on form submit
    const onSubmit = () => {
        let alerts = {};
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
        // if information entered into the form is validated at the frontend
        if (registerState.formIsValid) {
            // current registered user information is pulled from the database
            getUsers().then((data) => {
                // compares all current registered user emails against inputted email
                var alreadyRegisteredUser = data
                    .find((element) => element.email === registerState.email)
                // if imputted email does not exist in the database
                if (!alreadyRegisteredUser) {
                    // 
                    generateNewAddress();
                    // console.log('seed' + seed);
                    // console.log('address' + address);
                    // userData.IOTA_address = address;
                    // userData.IOTA_seed = seed;
                    console.log(userData);
                    registerUser(userData).then((res) => {
                        alerts = { type: 'success', message: 'Your registration was successful' };
                        console.log(res)
                        //history.push('/login');
                    });
                    console.log('Form submitted');
                } else {
                    alerts = { type: 'error', message: 'This user already exists' };
                    setRegisterState({ ...registerState, alerts });
                }
            });
        } else {
            console.log('Form has errors.' + JSON.stringify(alerts));
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

                        onFinish={onSubmit}
                        onFinishFailed={onFinishFailed}
                    >
                        <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Sign up</Title>
                        <ErrorBoundary>
                            {registerState.alerts ?
                                <AlertMessage type={registerState.alerts.type} message={registerState.alerts.message} />
                                :
                                <h2></h2>}
                        </ErrorBoundary>
                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'Please enter a valid name'
                                },
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },

                            ]}
                        >
                            <Input
                                name="first_name"
                                placeholder="Enter First Name"
                                value={registerState.first_name}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'Please enter a valid surname'
                                },
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                }
                            ]}
                        >
                            <Input
                                name="last_name"
                                placeholder="Enter Last Name"
                                value={registerState.last_name}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="Street No."
                            name="street_no"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your street number!',
                                },

                            ]}
                        >
                            <Input
                                style={{ width: 120 }}
                                name="street_no"
                                value={registerState.street_no}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="Street"
                            name="street"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'Please enter a valid street name'
                                },
                                {
                                    required: true,
                                    message: 'Please input your street!',
                                },

                            ]}
                        >
                            <Input
                                name="street"
                                placeholder="Enter Street Name"
                                value={registerState.street}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="Suburb"
                            name="suburb"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'Please enter a valid suburb'
                                },
                                {
                                    required: true,
                                    message: 'Please input your suburb!',
                                },

                            ]}
                        >
                            <Input
                                name="suburb"
                                placeholder="Enter Suburb"
                                value={registerState.suburb}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="State"
                            name="state"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'Please enter a valid state'
                                },
                                {
                                    required: true,
                                    message: 'Please input your state!',
                                },

                            ]}
                        ><Input
                                name="state"
                                value={registerState.state}
                                onChange={onChange} />
                            {/*  <Select
                                refs="state"
                                name="state"
                                defaultValue="VIC"
                                style={{ width: 120 }}
                                onChange={selectOnChange}>
                                <Option value="VIC">VIC</Option>
                                <Option value="NSW">NSW</Option>
                                <Option value="ACT">ACT</Option>
                                <Option value="QLD">QLD</Option>
                                <Option value="WA">WA</Option>
                                <Option value="SA">SA</Option>
                                <Option value="NT">NT</Option>
                                <Option value="TAS">TAS</Option>
                            </Select>
                           */}
                        </Form.Item>

                        <Form.Item
                            label="Postcode"
                            name="postcode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a valid postcode!',
                                },

                            ]}
                        >
                            <Input
                                name="postcode"
                                value={registerState.postcode}
                                onChange={onChange} />
                        </Form.Item>

                        <Form.Item
                            label="Occupation"
                            name="occupation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your occupation!',
                                },
                            ]}
                        ><Input
                                name="occupation"
                                value={registerState.occupation}
                                onChange={onChange} />
                            {/* <Select
                                refs="occupation"
                                defaultValue="Student"
                                onChange={selectOnChange}>
                                <Option name="occupation" value="Student">Student</Option>
                                {/* // Prefill with API
                                <Option value="NSW">NSW</Option>
                                <Option value="ACT">ACT</Option>
                                <Option value="QLD">QLD</Option>
                                <Option value="WA">ACT</Option>
                                <Option value="SA">QLD</Option>
                                <Option value="NT">ACT</Option>
                                <Option value="TAS">QLD</Option> 
                            </Select>
                            */}

                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Please enter a valid Email',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },

                            ]}
                        >
                            <Input
                                name="email"
                                placeholder="Enter Email"
                                value={registerState.email}
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
                            hasFeedback
                        >
                            <Input.Password
                                name="password"
                                placeholder="Enter Password"
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
                        >
                            <Input.Password />
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