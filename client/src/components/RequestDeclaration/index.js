import { useState } from 'react';
import { Form, Space, Typography, Result, message } from 'antd';
import DocumentBorder from '../DocumentBorder';
import FullName from '../InputItems/FullName';
import Email from '../InputItems/Email';
import DocumentType from '../InputItems/DocumentType';
import Message from '../InputItems/Message';
import Spinner from '../ActionItems/Spinner';
import SubmitButton from '../Buttons/SubmitButton';
import CloseButton from '../Buttons/CloseButton';
import { useAppContext } from '../../store';
import { sendRequestEmail } from '../../utils/documentFunctions';

const { Paragraph } = Typography;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
};

function RequestDeclaration() {
    const [state] = useAppContext();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        document_type: '',
        message: '',
        alerts: '',
        errors: '',
        loading: false
    });

    const onChange = (event) => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const requestDocument = () => {
        setFormState({ ...formState, loading: true });
        sendRequestEmail(state.user.first_name, state.user.last_name, formState.email, formState.name, formState.document_type, formState.message)
            .then((res) => {
                let name = '';
                let email = '';
                let document_type = '';
                let message = '';
                setFormState({ ...formState, name, email, document_type, message, alerts: res, loading: false });
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
                    null
            }

            {formState.loading ?
                <Spinner />
                : null}

            {
                formState.alerts ?
                    <Result
                        status={formState.alerts.type}
                        title={formState.alerts.message}
                    ><div style={{ textAlign: 'center' }}>
                            <CloseButton
                                setState={setFormState} />
                        </div>
                    </Result>
                    :

                    <DocumentBorder
                        title="Request a Statutory Declaration"
                        colour='#3939' >
                        <div style={{ textAlign: 'center' }}>
                            <Form
                                {...layout}
                                layout="horizontal"
                                onFinish={requestDocument}
                            >
                                <Space direction="vertical">
                                    <Paragraph>Fill in the details below and an email with a link will be sent to the intended receipient.</Paragraph>

                                    <FullName
                                        value={formState.name}
                                        onChange={onChange} />

                                    <Email
                                        value={formState.email}
                                        onChange={onChange} />

                                    <div style={{ textAlign: 'left' }}>
                                        <DocumentType
                                            setState={setFormState} />
                                    </div>

                                    <Message
                                        label="Message"
                                        value={formState.message}
                                        onChange={onChange} />

                                    <SubmitButton text=" Send" />
                                </Space>
                            </Form>
                        </div>
                    </DocumentBorder>
            }
        </div >
    )
}

export default RequestDeclaration;