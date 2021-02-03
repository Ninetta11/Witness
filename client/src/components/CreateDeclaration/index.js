import DayJS from 'react-dayjs';
import { Form, Input, Button, Typography, Space } from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { useState } from 'react';
import generateMarkdown from '../../utils/generateMarkdown';
import API from '../../utils/blockchainAPI';

const { TextArea } = Input;
const { Title, Text } = Typography;


function CreateDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [documentState, setDocumentState] = useState({
        content: '',
        signature: '',
        date: Date.now(),
        location: ''
    })

    const onChange = (event) => {
        setDocumentState({ ...documentState, [event.target.name]: event.target.value });
    };

    const onSubmit = () => {
        const details = {
            first_name: state.user.first_name,
            last_name: state.user.last_name,
            street_no: state.user.street_no,
            street: state.user.street,
            suburb: state.user.suburb,
            state: state.user.state,
            postcode: state.user.postcode,
            occupation: state.user.occupation,
            content: documentState.content,
            signature: documentState.content,
            date: documentState.date,
            location: documentState.location
        }
        const declaration = generateMarkdown(details);
        console.log(declaration);
        API.sendToBlockchain(state.user.IOTA_address, state.user.IOTA_seed, declaration).then((hash) => {
            // send returned hash to database)
        }
        )
    }

    return (
        <Form
            layout="horizontal"
            onFinish={onSubmit}
        >
            <Space direction="vertical">
                <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
                <Text>I, <strong>{state.user.first_name} {state.user.last_name}</strong> residing at <strong>{state.user.street_no} {state.user.street}, {state.user.suburb} {state.user.state} {state.user.postcode}</strong> and having the occupation of <strong>{state.user.occupation}</strong>, make the following statutory declaration under the <strong>Oaths and Affirmations Act 2018:</strong></Text>
                <br></br>
                <Text type="secondary">Set out matter declared to in numbered paragraphs.</Text>
                <Form.Item
                    label="1."
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: "Enter your declaration"
                        }
                    ]}><TextArea
                        name="content"
                        placeholder="Enter Declaration Here"
                        rows={10}
                        value={documentState.content}
                        onChange={onChange} />
                </Form.Item>
                <Form.Item
                    name="Add">
                    <Button
                        type="secondary"
                        shape="round"
                        icon={<PlusOutlined />}>Add paragraph</Button>
                </Form.Item>
                <Text strong>I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.</Text>
                <Form.Item
                    label="Signature:"
                    name="signature"
                    rules={[
                        {
                            required: true,
                            message: "Enter your Full Name to sign your declaration"
                        }
                    ]}><Input
                        name="signature"
                        style={{ width: 250 }}
                        placeholder="Sign Here"
                        value={documentState.signature}
                        onChange={onChange} />
                </Form.Item>
                <Text strong>Declared at { } on {<DayJS format="DD MMMM YYYY, h:mm A.">{Date.now()}</DayJS>}</Text>
                <Form.Item
                    name="Submit">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<SendOutlined />}
                        htmlType="submit" >Submit</Button>
                </Form.Item>
            </Space>
        </Form>
    )
};

export default CreateDeclaration;