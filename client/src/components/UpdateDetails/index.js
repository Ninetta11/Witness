import { Form, Space, Input, Typography } from 'antd';
import { useAppContext } from '../../store';

const { Paragraph, Title } = Typography;
const layout = {
    labelCol: { span: 7, },
    wrapperCol: { span: 15, },
};


function UpdateDetails() {
    const [state, appDispatch] = useAppContext();

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <Title level={2} style={{ paddingBottom: '25px' }}>Update Details</Title>
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
                                editable={{ onChange: appDispatch("SET_STREET_NUMBER") }}>
                                {state.user.street_no}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "street"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a street' }]}>
                            <Paragraph
                                editable={{ onChange: appDispatch("SET_STREET") }}>
                                {state.user.street}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "suburb"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a suburb' }]}>
                            <Paragraph
                                editable={{ onChange: appDispatch("SET_SUBURB") }}>
                                {state.user.suburb}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "state"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a state' }]}>
                            <Paragraph
                                editable={{ onChange: appDispatch("SET_STATE") }}>
                                {state.user.state}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "postcode"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a postcode' }]}>
                            <Paragraph
                                editable={{ onChange: appDispatch("SET_POSTCODE") }}>
                                {state.user.postcode}
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
                        editable={{ onChange: appDispatch("SET_OCCUPATION") }}>
                        {state.user.occupation}
                    </Paragraph>
                </Form.Item>

                <Form.Item
                    label="Password:"
                    name="password"
                    rules={[{ required: true, message: 'Please enter a password' }]}>
                    <Paragraph
                        editable={{ onChange: appDispatch("SET_PASSWORD") }}>
                        {state.user.password}
                    </Paragraph>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default UpdateDetails;