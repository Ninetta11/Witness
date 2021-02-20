import { useState } from 'react';
import { Drawer, Button, Form, List, message, Typography } from 'antd';
import { UserOutlined, MailOutlined, HomeOutlined, ScheduleOutlined, KeyOutlined, EditOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { updateUserDetails } from '../../utils/userFunctions';
import { REFRESH_DETAILS } from '../../utils/types';
import Address from '../RegisterItems/Address';
import Password from '../RegisterItems/Password';

const { Paragraph } = Typography;


function UserDetails({
    drawerState,
    onClose
}) {
    const [state, appDispatch] = useAppContext();

    // manages alert state and sets state
    const [formState, setFormState] = useState({
        alerts: '',
    });

    // manages google maps autocomplete state and sets state
    const [googlevalue, setValue] = useState({ value: { description: "" } });

    // manages address state and sets state according to whether edit is desired
    const [addressInputState, setAddressInputState] = useState({
        visible: false
    });

    const showAddressInput = () => {
        setAddressInputState({ visible: true })
    };

    const closeAddressInput = () => {
        setAddressInputState({ visible: false })
    };

    const updateAddress = () => {
        closeAddressInput();
        onUpdate('address', googlevalue.value.description)
    }

    // manages password state and sets state according to whether edit is desired
    const [passwordInputState, setPasswordInputState] = useState({
        visible: false,
        password: ''
    });

    const showPasswordInput = () => {
        setPasswordInputState({ visible: true })
    };

    const closePasswordInput = () => {
        setPasswordInputState({ visible: false })

    };

    const updatePassword = () => {
        closePasswordInput();
        onUpdate('password', passwordInputState.password)
    }

    // updates global state when data is entered into any of the inputs
    const onChange = (event) => {
        setPasswordInputState({ ...passwordInputState, [event.target.name]: event.target.value });
    };

    // updates occupation with input
    const updateOccupation = (value) => {
        let name = 'occupation';
        onUpdate(name, value)
    }

    // updates database with updated details
    const onUpdate = (name, value) => {
        const details = {
            email: state.user.email,
            name: name,
            value: value
        };
        updateUserDetails(details)
            .then((res) => {
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
        <Drawer
            title='Account Details'
            width={720}
            onClose={onClose}
            visible={drawerState.visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                < div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    < Button onClick={onClose} style={{ marginRight: 8 }}>
                        Close
              </Button >
                </div >
            }
        >
            <List
                itemLayout="horizontal">
                {
                    formState.alerts ?
                        message[formState.alerts.type](formState.alerts.message).then(setFormState({ ...formState, alerts: '' }))
                        :
                        <div></div>
                }
                <List.Item
                    actions={[<UserOutlined />]}>
                    <List.Item.Meta
                        description="Name"
                    /><div>{state.user.first_name + ' ' + state.user.last_name}</div>
                </List.Item>
                <List.Item
                    actions={[<MailOutlined />]}>
                    <List.Item.Meta
                        description="Email"
                    /><div>{state.user.email}</div>
                </List.Item>
                <List.Item
                    actions={[<HomeOutlined />]}
                ><List.Item.Meta
                        description="Address"
                    />
                    {!addressInputState.visible ?
                        <div onClick={showAddressInput}>{state.user.address}<a ><EditOutlined /></a></div>
                        :
                        <div style={{ width: 500, textAlign: 'center' }}>
                            <Address
                                googlevalue={googlevalue}
                                setValue={setValue} />
                            <Button type='primary' style={{ margin: '0 8px' }} onClick={updateAddress}>Update</Button>
                            <Button onClick={closeAddressInput}>Cancel</Button></div>
                    }
                </List.Item>
                <List.Item
                    actions={[<ScheduleOutlined />]}
                ><List.Item.Meta
                        description="Occupation"
                    /><Paragraph editable={{ onChange: updateOccupation }}>{state.user.occupation}</Paragraph>
                </List.Item>
                <List.Item
                    actions={[<KeyOutlined />]}
                ><List.Item.Meta
                        description="Password"
                    />
                    {!passwordInputState.visible ?
                        <div onClick={showPasswordInput}>**********<a ><EditOutlined /></a></div>
                        :
                        <div style={{ width: 500, textAlign: 'center' }}>
                            <Form>
                                <Password
                                    onChange={onChange}
                                    registerState={passwordInputState} />
                                <Button type='primary' style={{ margin: '0 8px' }} onClick={updatePassword}>Update</Button>
                                <Button onClick={closePasswordInput}>Cancel</Button>
                            </Form>
                        </div>
                    }
                </List.Item>
            </List>

        </Drawer >
    )
}

export default UserDetails;