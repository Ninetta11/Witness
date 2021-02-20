import { useState } from 'react';
import { Form, Space, Input, Typography, message } from 'antd';
import { useAppContext } from '../../store';
import { updateUserDetails } from '../../utils/userFunctions';
import { REFRESH_DETAILS } from '../../utils/types';

const { Paragraph, Title } = Typography;
const layout = {
    labelCol: { span: 7, },
    wrapperCol: { span: 15, },
};


function UpdateDetails() {
    const [state, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        alerts: '',
    });

    const [googlevalue, setValue] = useState({ value: { description: "" } });

    const updateStreetNo = (value) => {
        let name = 'street_no';
        onUpdate(name, value)
    }

    const updateStreet = (value) => {
        let name = 'street';
        onUpdate(name, value)
    }

    const updateSuburb = (value) => {
        let name = 'suburb';
        onUpdate(name, value)
    }

    const updateState = (value) => {
        let name = 'state';
        onUpdate(name, value)
    }

    const updatePostcode = (value) => {
        let name = 'postcode';
        onUpdate(name, value)
    }

    const updateOccupation = (value) => {
        let name = 'occupation';
        onUpdate(name, value)
    }

    const updatePassword = (value) => {
        let name = 'occupation';
        // will need to decrypt first and then recrypt to save
        onUpdate(name, value)
    }

    const onUpdate = (name, value) => {
        const details = {
            email: state.user.email,
            name: name,
            value: value
        }
        updateUserDetails(details)
            .then((res) => {
                console.log(res);
                let alerts = { type: res.data.type, message: res.data.message };
                appDispatch({ type: REFRESH_DETAILS, payload: res.data.details });
                setFormState({ ...formState, alerts });
                console.log('details updated' + res);
            })
            .catch((error) => {
                let alerts = { type: error.response.data.type, message: error.response.data.message };
                setFormState({ ...formState, alerts });
            })
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
        >
            <Title level={2} style={{ paddingBottom: '25px' }}>Update Details</Title>
            {formState.alerts ?
                message[formState.alerts.type](formState.alerts.message)
                :
                <div></div>
            }
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
                                editable={{ onChange: updateStreet }}>
                                {state.user.street}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "suburb"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a suburb' }]}>
                            <Paragraph
                                editable={{ onChange: updateSuburb }}>
                                {state.user.suburb}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "state"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a state' }]}>
                            <Paragraph
                                editable={{ onChange: updateState }}>
                                {state.user.state}
                            </Paragraph>
                        </Form.Item>
                        <Form.Item
                            name={["address", "postcode"]}
                            noStyle
                            rules={[{ required: true, message: 'Please enter a postcode' }]}>
                            <Paragraph
                                editable={{ onChange: updatePostcode }}>
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
                        editable={{ onChange: updateOccupation }}>
                        {state.user.occupation}
                    </Paragraph>
                </Form.Item>

                <Form.Item
                    label="Password:"
                    name="password"
                    rules={[{ required: true, message: 'Please enter a password' }]}>
                    <Paragraph
                        editable={{ onChange: updatePassword }}>
                        {state.user.password}
                    </Paragraph>
                </Form.Item>
            </Space>
        </Form>
    )
}

export default UpdateDetails;