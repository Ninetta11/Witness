import DayJS from 'react-dayjs';
import { Form, Input, Button, Typography, Space } from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';

const { TextArea } = Input;
const { Title, Text } = Typography;


function CreateDeclaration() {
    const [state, appDispatch] = useAppContext();

    return (
        <Form
            layout="horizontal"
        >
            <Space direction="vertical">
                <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
                <Text>I, <strong>{state.user.first_name} {state.user.last_name}</strong> residing at <strong>{state.user.street_no} {state.user.street}, {state.user.suburb} {state.user.state} {state.user.postcode}</strong> and having the occupation of <strong>{state.user.occupation}</strong>, make the following statutory declaration under the <strong>Oaths and Affirmations Act 2018:</strong></Text>
                <br></br>
                <Text type="secondary">Set out matter declared to in numbered paragraphs.</Text>
                <Form.Item label="1." name="Declaration">
                    <TextArea placeholder="Enter Declaration Here" rows={10} />
                </Form.Item>
                <Form.Item name="Add">
                    <Button type="secondary" shape="round" icon={<PlusOutlined />}>Add paragraph</Button>
                </Form.Item>
                <Text strong>I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.</Text>
                <Form.Item label="Signature:" name="Signature">
                    <Input style={{ width: 250 }} placeholder="Sign Here" />
                </Form.Item>
                <Text strong>Declared at { } on {<DayJS format="DD MMMM YYYY, h:mm A.">{Date.now()}</DayJS>}</Text>
                <Form.Item name="Submit">
                    <Button type="primary" shape="round" icon={<SendOutlined />}>Submit</Button>
                </Form.Item>
            </Space>
        </Form>
    )
};

export default CreateDeclaration;