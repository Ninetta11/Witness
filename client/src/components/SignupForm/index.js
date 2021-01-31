import { Layout, Row, Col, Form, Input, InputNumber, Button, Select, Typography } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

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

function SignupForm() {
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
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true, }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Sign up</Title>

                        <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input />
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
                            <Input style={{ width: 120 }} />
                        </Form.Item>

                        <Form.Item
                            label="Street"
                            name="street"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your street!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Suburb"
                            name="suburb"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your suburb!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="State"
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your state!',
                                },
                            ]}
                        >
                            <Select defaultValue="VIC" style={{ width: 120 }}>
                                <Option value="VIC">VIC</Option>
                                <Option value="NSW">NSW</Option>
                                <Option value="ACT">ACT</Option>
                                <Option value="QLD">QLD</Option>
                                <Option value="WA">ACT</Option>
                                <Option value="SA">QLD</Option>
                                <Option value="NT">ACT</Option>
                                <Option value="TAS">QLD</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Postcode"
                            name="postcode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your postcode!',
                                },
                            ]}
                        >
                            <InputNumber min={1000} max={10000} />
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
                        >
                            <Select defaultValue="Student" >
                                <Option value="Student">Student</Option>
                                {/* // Prefill with API
                                <Option value="NSW">NSW</Option>
                                <Option value="ACT">ACT</Option>
                                <Option value="QLD">QLD</Option>
                                <Option value="WA">ACT</Option>
                                <Option value="SA">QLD</Option>
                                <Option value="NT">ACT</Option>
                                <Option value="TAS">QLD</Option> */}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
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
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" shape="round" icon={<RightCircleOutlined />} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content>
    );
};

export default SignupForm;