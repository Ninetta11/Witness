import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Result, Space, Spin, message } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import SendDeclaration from '../SendDeclaration';
import { useAppContext } from '../../store';
import { sendRequestEmail } from '../../utils/documentFunctions';


function RequestDeclaration() {
    const [state, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        alerts: '',
        errors: '',
        loading: false
    });

    const handleCloseMessage = () => {
        let alerts = '';
        setFormState({ ...formState, alerts });
    }

    const requestDocument = (event) => {
        setFormState({ ...formState, loading: true });
        sendRequestEmail(event).then((res) => {
            let alerts = { type: res.type, message: res.message };
            setFormState({ ...formState, alerts: res, loading: false });
        }).catch((error) => {
            let errors = { type: error.type, message: error.message };
            setFormState({ ...formState, errors, loading: false });
        })
    }

    return (
        <div>
            {
                formState.errors ?
                    message[formState.errors.type](formState.errors.message).then(setFormState({ ...formState, errors: '' }))
                    :
                    <div></div>
            }
            {
                formState.alerts ?
                    <Result
                        status={formState.alerts.type}
                        title={formState.alerts.message}
                    ><div style={{ textAlign: 'center' }}>
                            <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                onClick={handleCloseMessage}>Close</Button>
                        </div></Result>
                    :

                    <Form onSubmit={requestDocument}>
                        <h2 style={{ paddingBottom: '25px' }}>Request a Statutory Declaration</h2>
                        <p>Fill in the details below and an email with a link will be sent to the intended receipient.</p>

                        <Form.Group controlId="from_name">
                            <Form.Label>From</Form.Label>
                            <Form.Control name="from_name" readOnly defaultValue={state.user.first_name + ' ' + state.user.last_name} />
                        </Form.Group>

                        {formState.loading ?
                            <div style={{ textAlign: 'center' }}>
                                <Space size='middle'>
                                    <Spin size='large'></Spin>
                                </Space>
                            </div>
                            : null}

                        <Form.Group controlId="to_name">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="text" name="to_name" placeholder="Enter recipient name" />
                        </Form.Group>

                        <Form.Group controlId="to_email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="to_email" placeholder="name@example.com" />
                        </Form.Group>

                        <Form.Group controlId="document_type">
                            <Form.Label>Document type</Form.Label>
                            <Form.Control as="select" name="document_type" >
                                <option>Certification of Injury or Illness</option>
                                <option>Certification of Injury/Illness/Death of Family Member</option>
                                <option>Confirmation of Personal Details</option>
                                <option>Confirmation of Financial Expenditure</option>
                                <option>Statement as Witness to Event</option>
                                <option>Statement as to Involvement in an Event</option>
                                <option>Contractual Agreement</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.Label>Additional Information/ Requirements</Form.Label>
                            <Form.Control name="message" as="textarea" rows={3} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Send <SendOutlined />
                        </Button>
                    </Form>
            }
        </div>
    )
};

export default RequestDeclaration;