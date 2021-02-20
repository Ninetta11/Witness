import DayJS from 'react-dayjs';
import dayjs from 'dayjs';
import { Form, Input, Button, Typography, Space, Result, AutoComplete, Spin, message } from 'antd';
import { FilePdfFilled, PlusOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../store';
import { saveDocument, saveToPDF } from '../../utils/documentFunctions';
import generateMarkdown from '../../utils/generateMarkdown';
import API from '../../utils/blockchainAPI';
import { getLocation } from '../../utils/geocodingAPI';
import { REFRESH_DETAILS } from '../../utils/types';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = AutoComplete;


function CreateDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [documentState, setDocumentState] = useState({
        title: '',
        content: '',
        signature: '',
        date: dayjs().format('DD MMMM YYYY, h:mm A'),
        location: '',
        declaration: '',
        alerts: '',
        errors: '',
        loading: false
    });

    const [form] = Form.useForm();

    useEffect(() => {
        // something is wrong here - need to fix
        getCurrentLocation()
    }, []);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            const location = state.user.suburb + ', ' + state.user.state;
            setDocumentState({ ...documentState, location });
        }
    }

    const showPosition = (position) => {
        getLocation(position.coords.latitude, position.coords.longitude)
            .then((location) => {
                setDocumentState({ ...documentState, location });
            }).catch((error) => {
                const location = state.user.suburb + ', ' + state.user.state;
                setDocumentState({ ...documentState, location });
            })
    }

    const onChange = (event) => {
        setDocumentState({ ...documentState, [event.target.name]: event.target.value });
    };

    const onSelect = (value) => {
        setDocumentState({ ...documentState, signature: value });
    };

    const changeLocation = (value) => {
        setDocumentState({ ...documentState, location: value });
    };

    const handleFileSave = () => {
        saveToPDF(documentState.title, documentState.declaration)
    }

    const handleFileSend = () => {

    }

    const handleCloseMessage = () => {
        let alerts = '';
        setDocumentState({ ...documentState, alerts });
    }

    const onSubmit = () => {
        setDocumentState({ ...documentState, loading: true });
        const details = {
            title: documentState.title,
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
        const declaration = generateMarkdown(details);
        API.sendToBlockchain(details.IOTA_address, details.IOTA_seed, declaration)
            .then((hash) => {
                details.hash = hash;
                // send returned hash to database
                saveDocument(details)
                    .then((res) => {
                        let alerts = { type: res.data.type, message: res.data.message, hash: details.hash };
                        setDocumentState({ ...documentState, alerts, declaration, loading: false });
                        form.resetFields();
                        appDispatch({ type: REFRESH_DETAILS, payload: res.data.details });
                        console.log('Stat dec submitted' + res);
                    })
                    .catch((error) => {
                        let errors = { type: error.response.data.type, message: error.response.data.message };
                        setDocumentState({ ...documentState, errors, loading: false });
                    })
            })
    }

    return (
        <Form
            form={form}
            layout="horizontal"
            onFinish={onSubmit}
        >
            <Space direction="vertical">
                <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
                {documentState.errors ?
                    message[documentState.errors.type](documentState.errors.message).then(setDocumentState({ ...documentState, errors: '' }))
                    :
                    <div></div>
                }
                {documentState.alerts ?
                    <Result
                        status={documentState.alerts.type}
                        title={documentState.alerts.message}
                        subTitle={"Hash: " + documentState.alerts.hash}
                    ><div style={{ textAlign: 'center' }}><Button
                        type="primary"
                        icon={<FilePdfFilled />}
                        style={{ marginRight: '20px' }}
                        onClick={handleFileSave}>Save as PDF</Button>
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                style={{ marginRight: '20px' }}
                                onClick={handleFileSend}>Send via email</Button>
                            <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                onClick={handleCloseMessage}>Close</Button>
                        </div></Result>
                    :
                    <div>
                        < Form.Item
                            label="Title:"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter a Title for your Statutory Declaration"
                                }
                            ]}><Input
                                style={{ width: 250 }}
                                name="title"
                                placeholder="Enter a Title"
                                value={documentState.title}
                                onChange={onChange} />
                        </Form.Item>

                        <Paragraph>I, <strong>{state.user.first_name} {state.user.last_name}</strong> residing at <strong>{state.user.address}
                        </strong> and having the occupation of <strong>{state.user.occupation}
                            </strong>, make the following statutory declaration under the
                        <strong>Oaths and Affirmations Act 2018:</strong></Paragraph>

                        <Paragraph type="secondary">Set out matter declared to in numbered paragraphs.</Paragraph>
                        {documentState.loading ?
                            <Space size='middle'>
                                <Spin size='large'></Spin>
                            </Space>
                            : null}
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

                        <Paragraph strong>I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.</Paragraph>

                        <Form.Item
                            label="Signature:"
                            name="signature"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter your Full Name to sign your declaration"
                                }
                            ]}><AutoComplete
                                name="signature"
                                style={{ width: 250 }}
                                placeholder="Sign here"
                                onChange={onSelect}
                            ><Option value={state.user.first_name + ' ' + state.user.last_name}>
                                    {state.user.first_name + ' ' + state.user.last_name}
                                </Option>
                            </AutoComplete>
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
                    </div>
                }
            </Space>
        </Form >

    )
};

export default CreateDeclaration;