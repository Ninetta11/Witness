import React, { useState } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import FullName from '../InputItems/FullName';
import Email from '../InputItems/Email';
import Message from '../InputItems/Message';
import { useAppContext } from '../../store';
import { sendDocumentEmail } from '../../utils/documentFunctions';

function SendDeclaration({
    modalState,
    setModalState,
    title,
    hash
}) {
    const [state] = useAppContext();

    const [formState, setFormState] = useState({
        email: '',
        name: '',
        message: '',
        alerts: ''
    });

    const onChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = () => {
        setModalState({ visible: false });
    };

    const handleFileSend = () => {
        //const encodeData = window.btoa(content)
        sendDocumentEmail(formState.email, formState.name, formState.message, state.user.first_name, state.user.last_name, title, hash)
            .then((res) => {
                setFormState({ ...formState, alerts: res, loading: false });
                handleCancel()
            }).catch((error) => {
                let alerts = { type: error.type, message: error.message };
                setFormState({ ...formState, alerts, loading: false });
            })
    }

    return (
        <Modal
            visible={modalState.visible}
            title="Send Document To:"
            onOk={handleFileSend}
            onCancel={handleCancel}
            footer={[
                <Button key="back" icon={<CloseOutlined />} onClick={handleCancel}>
                    Cancel</Button>,
                <Button key="submit" type="primary" loading={modalState.loading} icon={<SendOutlined />} onClick={handleFileSend}>
                    Send</Button>,
            ]}
        >
            {formState.alerts ?
                message[formState.alerts.type](formState.alerts.message).then(setFormState({ ...formState, alerts: '' }))
                :
                null
            }

            <Form
                noValidate
                initialValues={{ remember: true, }}>

                <FullName
                    value={formState.name}
                    onChange={onChange} />

                <Email
                    value={formState.email}
                    onChange={onChange} />

                <Message
                    label="Message"
                    value={formState.message}
                    onChange={onChange} />
            </Form>
        </Modal>
    )
}

export default SendDeclaration;