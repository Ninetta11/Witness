import DayJS from 'react-dayjs';
import dayjs from 'dayjs';
import { Form, Input, Button, Typography, Space, Alert } from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../store';
import { saveDocument } from '../../utils/documentFunctions';
import generateMarkdown from '../../utils/generateMarkdown';
import API from '../../utils/blockchainAPI';
import { getLocation } from '../../utils/geocodingAPI';
import { REFRESH_DETAILS } from '../../utils/types';

const { ErrorBoundary } = Alert;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;


function CreateDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [documentState, setDocumentState] = useState({
        content: '',
        signature: '',
        date: dayjs().format('DD MMMM YYYY, h:mm A'),
        location: '',
        alerts: ''
    });

    useEffect(() => {
        getCurrentLocation()
    }, []);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            let location = state.user.suburb;
            setDocumentState({ ...documentState, location });
        }
    }

    const showPosition = (position) => {
        getLocation(position.coords.latitude, position.coords.longitude).then((location) => {
            setDocumentState({ ...documentState, location });
        })
    }

    const onChange = (event) => {
        setDocumentState({ ...documentState, [event.target.name]: event.target.value });
    };

    const changeLocation = (value) => {
        setDocumentState({ ...documentState, location: value });
    };

    const onSubmit = () => {
        const details = {
            first_name: state.user.first_name,
            last_name: state.user.last_name,
            IOTA_address: state.user.IOTA_address[0],
            IOTA_seed: state.user.IOTA_seed,
            street_no: state.user.street_no,
            street: state.user.street,
            suburb: state.user.suburb,
            state: state.user.state,
            postcode: state.user.postcode,
            occupation: state.user.occupation,
            content: documentState.content,
            signature: documentState.signature,
            date: documentState.date,
            location: documentState.location
        };
        console.log(details.date);
        const declaration = generateMarkdown(details);
        let content = '';
        let signature = '';
        API.sendToBlockchain(details.IOTA_address, details.IOTA_seed, declaration)
            .then((hash) => {
                details.hash = hash;
                // send returned hash to database
                saveDocument(details)
                    .then((res) => {
                        let alerts = { type: res.data.type, message: res.data.message };
                        appDispatch({ type: REFRESH_DETAILS, payload: res.data.details });
                        setDocumentState({ ...documentState, alerts, content, signature });
                        console.log('Stat dec submitted' + res);
                    })
                    .catch((error) => {
                        let alerts = { type: error.response.data.type, message: error.response.data.message };
                        setDocumentState({ ...documentState, alerts });
                    })
            })
    }

    return (
        <Form
            layout="horizontal"
            onFinish={onSubmit}
        >
            <Space direction="vertical">
                <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
                <ErrorBoundary>
                    {documentState.alerts ?
                        <Alert
                            message={documentState.alerts.message}
                            type={documentState.alerts.type}
                            showIcon
                        />
                        :
                        <br></br>
                    }
                </ErrorBoundary>
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
                <Input.Group compact>
                    <Text strong>Declared at  *</Text><Paragraph strong
                        value={documentState.location}
                        editable={{ onChange: changeLocation }}>
                        {documentState.location}
                    </Paragraph><Text strong> , on {<DayJS format="DD MMMM YYYY, h:mm A.">{Date.now()}</DayJS>}</Text>
                </Input.Group>
                <Form.Item
                    name="Submit">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<SendOutlined />}
                        htmlType="submit" > Submit</Button>
                </Form.Item>
            </Space>
        </Form>
    )
};

export default CreateDeclaration;