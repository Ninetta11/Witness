import { useState } from 'react';
import { Form, Space, Input, Alert, Typography } from 'antd';
import { useAppContext } from '../../store';
import { updateUserDetails } from '../../utils/userFunctions';
import { REFRESH_DETAILS } from '../../utils/types';

const { ErrorBoundary } = Alert;
const { Paragraph, Title } = Typography;
const layout = {
    labelCol: { span: 7, },
    wrapperCol: { span: 15, },
};


function UpdateDetails() {
    const [state, appDispatch] = useAppContext();

    const [updateState, setUpdateState] = useState({
        alerts: ''
    })

    const onUpdate = (value) => {
        console.log(value);
    }

    const updateStreetNo = (value) => {
        const details = {
            email: state.user.email,
            name: 'street_no',
            value: value
        }
        updateUserDetails(details)
            .then((res) => {
                console.log(res);
                let alerts = { type: res.data.type, message: res.data.message };
                appDispatch({ type: REFRESH_DETAILS, payload: res.data.details });
                setUpdateState({ ...updateState, alerts });
                console.log('details updated' + res);
            })
            .catch((error) => {
                let alerts = { type: error.response.data.type, message: error.response.data.message };
                setUpdateState({ ...updateState, alerts });
            })
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
        >
            <Title level={2} style={{ paddingBottom: '25px' }}>Update Details</Title>
            <ErrorBoundary>
                {updateState.alerts ?
                    <Alert
                        message={updateState.alerts.message}
                        type={updateState.alerts.type}
                        showIcon
                    />
                    :
                    <br></br>
                }
            </ErrorBoundary>
            <Space direction="vertical">
                <Form.Item
                    label="Address:"
                    rules={[{ required: true, message: 'Please enter an address' }]}>
                    <Input.Group compact>
                        <Form.Item
                            name={["address", "street_no"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a street number' }]}>
                            <Paragraph
                                name={["address", "street_no"]}
                                value={state.user.street_no}
                                editable={{ onChange: updateStreetNo }}>
                                {state.user.street_no}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "street"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a street' }]}>
                            <Paragraph
                                editable={{ onChange: onUpdate }}>
                                {state.user.street}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "suburb"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a suburb' }]}>
                            <Paragraph
                                editable={{ onChange: onUpdate }}>
                                {state.user.suburb}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "state"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a state' }]}>
                            <Paragraph
                                editable={{ onChange: onUpdate }}>
                                {state.user.state}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "postcode"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a postcode' }]}>
                            <Paragraph
                                editable={{ onChange: onUpdate }}>
                                {state.user.postcode}
                            </Paragraph>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    label="Occupation:"
                    name="occupation"
                    rules={[{ required: true, message: 'Please enter an occupation' }]}
                >
                    <Paragraph
                        editable={{ onChange: onUpdate }}>
                        {state.user.occupation}
                    </Paragraph>
                </Form.Item>

                <Form.Item
                    label="Password:"
                    name="password"
                    rules={[{ required: true, message: 'Please enter a password' }]}>
                    <Paragraph
                        editable={{ onChange: onUpdate }}>
                        {state.user.password}
                    </Paragraph>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default UpdateDetails;