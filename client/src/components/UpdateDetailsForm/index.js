import { Form, Space, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useStoreContext } from '../../utils/GlobalState';

const { Paragraph, Title, Text } = Typography;
const layout = {
    labelCol: { span: 8, },
    wrapperCol: { span: 16, },
};


function UpdateDetailsForm() {
    const [state, dispatch] = useStoreContext();

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <Title level={2}>Update Details</Title>
            <Space direction="vertical">
                <Form.Item
                    label="Address:"
                    rules={[{ required: true, message: 'Please enter an address' }]}>
                    <Input.Group compact>
                        <Form.Item
                            name={["address", "street_no"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a street number' }]}>
                            <Paragraph
                                editable={{ onChange: dispatch("SET_STREET_NUMBER") }}>
                                {state.currentUser.street_no}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "street"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a street' }]}>
                            <Paragraph
                                editable={{ onChange: dispatch("SET_STREET") }}>
                                {state.currentUser.street}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "suburb"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a suburb' }]}>
                            <Paragraph
                                editable={{ onChange: dispatch("SET_SUBURB") }}>
                                {state.currentUser.suburb}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "state"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a state' }]}>
                            <Paragraph
                                editable={{ onChange: dispatch("SET_STATE") }}>
                                {state.currentUser.state}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "postcode"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a postcode' }]}>
                            <Paragraph
                                editable={{ onChange: dispatch("SET_POSTCODE") }}>
                                {state.currentUser.postcode}
                            </Paragraph>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    label="Occupation:"
                    name="occupation"
                    rules={[{ required: true, message: 'Please enter an occupation' }]}
                >
                    <Paragraph
                        editable={{ onChange: dispatch("SET_OCCUPATION") }}>
                        {state.currentUser.occupation}
                    </Paragraph>
                </Form.Item>

                <Form.Item
                    label="Password:"
                    name="password"
                    rules={[{ required: true, message: 'Please enter a password' }]}>
                    <Paragraph
                        editable={{ onChange: dispatch("SET_PASSWORD") }}>
                        {state.currentUser.password}
                    </Paragraph>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default UpdateDetailsForm;