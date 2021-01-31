import { Form, Space, Input, Button, Select, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import TextArea from 'antd/lib/input/TextArea';
import { useStoreContext } from '../../utils/GlobalState';

const { Title, Text } = Typography;
const { Option } = Select;


function RequestForm() {
    const [state, dispatch] = useStoreContext();

    return (
        <Form
            layout="horizontal"
        >
            <Space direction="vertical">
                <Title level={2} style={{ paddingBottom: '25px' }}>Request a Statutory Declaration</Title>
                <Text>Fill in the details below and an email with a link will be sent to the intended receipient.</Text>
                <br></br>
                <Input.Group compact>
                    <Form.Item label="To:" name="receipent_name">
                        <Input style={{ width: 250 }} placeholder="First Name" />
                        <Input style={{ width: 250 }} placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item label="Email:" name="receipent_email">
                        <Input style={{ width: 500 }} placeholder="address@email.com.au" />
                    </Form.Item>
                    <Form.Item label="Type:" name="category">
                        <Select style={{ width: 500 }} defaultValue="Certification of Injury or Illness">
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
                    <Form.Item label="Additional Information/ Requirements:" name="details">
                        <TextArea style={{ width: 500 }} row={5} />
                    </Form.Item>
                </Input.Group>
                <Form.Item name="Submit">
                    <Button type="primary" shape="round" icon={<SendOutlined />}>Submit</Button>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default RequestForm;