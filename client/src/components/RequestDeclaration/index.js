import { useState } from 'react';
import { Form, Space, Input, Button, Select, Typography, Result, Spin, message } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { sendRequestEmail } from '../../utils/documentFunctions';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function RequestDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        to_name: '',
        to_email: '',
        document_type: '',
        message: '',
        alerts: '',
        errors: '',
        loading: false
    });

    const onChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const onSelect = (value) => {
        setFormState({ ...formState, document_type: value });
    };

    const handleCloseMessage = () => {
        let alerts = '';
        setFormState({ ...formState, alerts });
    }

    const requestDocument = () => {
        setFormState({ ...formState, loading: true });
        sendRequestEmail(state.user.first_name, state.user.last_name, formState.to_email, formState.to_name, formState.document_type, formState.message)
            .then((res) => {
                let to_name = '';
                let to_email = '';
                let document_type = '';
                let message = '';
                setFormState({ ...formState, to_name, to_email, document_type, message, alerts: res, loading: false });
            }).catch((error) => {
                setFormState({ ...formState, errors: error, loading: false });
            })
    }

    return (
        <div>
            {
                formState.errors ?
                    message[formState.errors.type](formState.errors.message).then(setFormState({ ...formState, errors: '' }))
                    :
                    <div></div>
            }

            {formState.loading ?
                <div style={{ textAlign: 'center' }}>
                    <Space size='middle'>
                        <Spin size='large'></Spin>
                    </Space>
                </div>
                : null}

            {
                formState.alerts ?
                    <Result
                        status={formState.alerts.type}
                        title={formState.alerts.message}
                    ><div style={{ textAlign: 'center' }}>
                            <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                onClick={handleCloseMessage}>Close</Button>
                        </div></Result>
                    :

                    <Form
                        layout="horizontal"
                        onFinish={requestDocument}
                    >
                        <Space direction="vertical">
                            <Title level={2} style={{ paddingBottom: '25px' }}>Request a Statutory Declaration</Title>
                            <Paragraph>Fill in the details below and an email with a link will be sent to the intended receipient.</Paragraph>

                            <Input.Group compact>

                                <Form.Item
                                    label="To:"
                                    name="to_name"
                                    rules={[
                                        {
                                            type: 'string',
                                            required: true,
                                            message: "Please enter your recipients name!"
                                        }
                                    ]}
                                >
                                    <Input
                                        name="to_name"
                                        style={{ width: 250 }}
                                        placeholder="Name"
                                        value={formState.to_name}
                                        onChange={onChange} />
                                </Form.Item>

                                <Form.Item
                                    label="Email:"
                                    name="to_email"
                                    rules={[
                                        {
                                            type: 'email',
                                            required: true,
                                            message: 'Please enter your recipients email!',
                                        },
                                    ]}>
                                    <Input
                                        name="to_email"
                                        style={{ width: 500 }}
                                        placeholder="address@email.com.au"
                                        value={formState.to_email}
                                        onChange={onChange} />
                                </Form.Item>

                                <Form.Item label="Type:" name="document_type">
                                    <Select style={{ width: 500 }} defaultValue="Select a Document Type" onChange={onSelect}>
                                        <Option value="Certification of Injury or Illness">Certification of Injury or Illness</Option>
                                        <Option value="Certification of Injury/Illness/Death of Family Member">Certification of Injury/Illness/Death of Family Member</Option>
                                        <Option value="Confirmation of Personal Details">Confirmation of Personal Details</Option>
                                        <Option value="Confirmation of Financial Expenditure">Confirmation of Financial Expenditure</Option>
                                        <Option value="Statement as Witness to Event">Statement as Witness to Event</Option>
                                        <Option value="Statement as to Involvement in an Event">Statement as to Involvement in an Event</Option>
                                        <Option value="Contractual Agreement">Contractual Agreement</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Additional Information/ Requirements:" name="message">
                                    <TextArea
                                        name="message"
                                        style={{ width: 500 }}
                                        row={5}
                                        value={formState.message}
                                        onChange={onChange} />
                                </Form.Item>

                            </Input.Group>

                            <Form.Item name="Submit">
                                <Button type="primary" shape="round" icon={<SendOutlined />} htmlType="submit" >Submit</Button>
                            </Form.Item>
                        </Space>
                    </Form>
            }
        </div>
    )
}

export default RequestDeclaration;