import { useState } from 'react';
import dayjs from 'dayjs';
import { Form, Button, Typography, Space, Result, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DocumentBorder from '../DocumentBorder';
import Spinner from '../ActionItems/Spinner';
import DocumentTitle from '../InputItems/DocumentTitle';
import Declaration from '../InputItems/Declaration';
import DeclaredAt from '../InputItems/DeclaredAt';
import Signature from '../InputItems/Signature';
import SaveFileButton from '../Buttons/SaveFileButton';
import SendviaEmailButton from '../Buttons/SendviaEmailButton';
import SubmitButton from '../Buttons/SubmitButton';
import CloseButton from '../Buttons/CloseButton';
import SendDeclaration from '../SendDeclaration';
import { useAppContext } from '../../store';
import { saveDocument } from '../../utils/documentFunctions';
import generateMarkdown from '../../utils/generateMarkdown';
import API from '../../utils/blockchainAPI';
import { REFRESH_DETAILS } from '../../utils/types';

const { Paragraph } = Typography;


function CreateDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [documentState, setDocumentState] = useState({
        title: '',
        content: '',
        signature: '',
        date: dayjs().format('DD MMMM YYYY, h:mm A'),
        location: '',
        declaration: '',
        hash: '',
        alerts: '',
        errors: '',
        loading: false
    });

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    const [form] = Form.useForm();

    const onChange = (event) => {
        setDocumentState({ ...documentState, [event.target.name]: event.target.value });
    };

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
                setDocumentState({ ...documentState, hash: details.hash });
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
        <div>
            {documentState.errors ?
                message[documentState.errors.type](documentState.errors.message).then(setDocumentState({ ...documentState, errors: '' }))
                :
                null
            }
            {documentState.alerts ?
                <div>
                    <Result
                        status={documentState.alerts.type}
                        title={documentState.alerts.message}
                        subTitle={"Hash: " + documentState.alerts.hash}
                    ><div style={{ textAlign: 'center' }}>
                            <SaveFileButton
                                title={documentState.title}
                                content={documentState.declaration} />
                            <SendviaEmailButton
                                setModalState={setModalState} />
                            <CloseButton
                                setState={setDocumentState} />
                        </div>
                    </Result>

                    <SendDeclaration
                        modalState={modalState}
                        setModalState={setModalState}
                        title={documentState.title}
                        hash={documentState.hash}
                    />
                </div>
                :
                <DocumentBorder
                    title="Statutory Declaration"
                    colour='#AA3939' >
                    <Form
                        form={form}
                        layout="horizontal"
                        onFinish={onSubmit}
                    >
                        <Space direction="vertical">

                            <div style={{ fontSize: '16px' }}>
                                <Paragraph>I, <strong>{state.user.first_name} {state.user.last_name}</strong> residing at <strong>{state.user.address}
                                </strong> and having the occupation of <strong>{state.user.occupation}
                                    </strong>, make the following statutory declaration under the <strong>Oaths and Affirmations Act 2018:</strong></Paragraph>

                                <Paragraph type="secondary">Set out matter declared to in numbered paragraphs.</Paragraph>

                                {documentState.loading ?
                                    <Spinner />
                                    : null}

                                <Declaration
                                    number="1."
                                    value={documentState.content}
                                    onChange={onChange} />

                                {/* <Form.Item
                                    name="Add">
                                    <Button
                                        type="secondary"
                                        shape="round"
                                        icon={<PlusOutlined />}>Add paragraph</Button>
                                </Form.Item> */}

                                <Paragraph strong>I declare that the contents of this statutory declaration are true and correct and I make it knowing that making a statutory declaration that I know to be untrue is an offence.</Paragraph>

                                <Signature
                                    value={state.user.first_name + ' ' + state.user.last_name}
                                    currentState={documentState}
                                    setCurrentState={setDocumentState}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter your Full Name to sign your declaration"
                                        }
                                    ]}
                                />

                                <DeclaredAt
                                    value={documentState.location}
                                    currentState={documentState}
                                    setCurrentState={setDocumentState}
                                />
                                <br></br>
                                <DocumentTitle
                                    value={documentState.title}
                                    onChange={onChange}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter a Title for your Statutory Declaration"
                                        }
                                    ]} />

                                <div style={{ textAlign: 'center' }}>
                                    <SubmitButton
                                        text=" Submit" />
                                </div>
                            </div>
                        </Space>
                    </Form >
                </DocumentBorder >
            }
        </div>
    )
};

export default CreateDeclaration;