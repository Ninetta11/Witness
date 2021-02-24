import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { sendDocumentEmail } from '../../utils/documentFunctions';

const { TextArea } = Input;


function SendDeclaration({
    modalState,
    handleCancel,
    title,
    hash
}) {
    const [state, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        to_email: '',
        to_name: '',
        message: '',
        alerts: ''
    });

    const onChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileSend = () => {
        //const encodeData = window.btoa(content)
        sendDocumentEmail(formState.to_email, formState.to_name, formState.message, state.user.first_name, state.user.last_name, title, hash).then((res) => {
            let alerts = { type: res.type, message: res.message };
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
                <div></div>
            }

            <Form
                noValidate
                initialValues={{ remember: true, }}>

                <Form.Item
                    label="Name"
                    name="to_name"
                    rules={[
                        {
                            required: true,
                            message: "Enter recipient's name"
                        }
                    ]}
                ><Input
                        name="to_name"
                        value={formState.to_name}
                        onChange={onChange} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="to_email"
                    rules={[
                        {
                            required: true,
                            message: "Enter recipient's email"
                        }
                    ]}
                ><Input
                        name="to_email"
                        value={formState.to_email}
                        onChange={onChange} />
                </Form.Item>

                <Form.Item
                    label="Message"
                    name="message"
                ><TextArea
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={onChange} />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default SendDeclaration;