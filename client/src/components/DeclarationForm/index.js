import { Form, Input, Button, Typography, Space } from 'antd';
import 'antd/dist/antd.css';
import { useStoreContext } from "../../utils/GlobalState";

const { TextArea } = Input;
const { Title, Text } = Typography;

function DeclarationForm() {
    const [state, dispatch] = useStoreContext();

    return (
        <Form
            layout="horizontal"
        >
            <Space direction="vertical">
                <Title level={2}>Statutory Declaration</Title>
                <Text>I, <strong>{state.currentUser.first_name} {state.currentUser.last_name}</strong> residing at <strong>{state.currentUser.street_no} {state.currentUser.street}, {state.currentUser.suburb} {state.currentUser.state} {state.currentUser.postcode}</strong> and having the occupation of <strong>{state.currentUser.occupation}</strong>, make the following statutory declaration under the <strong>Oaths and Affirmations Act 2018:</strong></Text>
                <br></br>
                <Text type="secondary">Set out matter declared to in numbered paragraphs.</Text>
                <Form.Item label="1." name="Declaration">
                    <TextArea placeholder="Enter Declaration Here" rows={10} />
                </Form.Item>
                <Form.Item name="Add">
                    <Button>Add paragraph ></Button>
                </Form.Item>
                <Text strong>I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.</Text>
                <Form.Item label="Signature:" name="Signature">
                    <Input style={{ width: 250 }} placeholder="Sign Here" />
                </Form.Item>
                <Text strong>Declared at { } on {Date.now()}</Text>
                <Form.Item name="Submit">
                    <Button>Submit</Button>
                </Form.Item>
            </Space>
        </Form>
    )
};

export default DeclarationForm;