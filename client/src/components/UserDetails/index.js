import { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, List, message, Typography } from 'antd';
import { UserOutlined, MailOutlined, HomeOutlined, ScheduleOutlined, KeyOutlined } from '@ant-design/icons';
import { useAppContext } from '../../store';
import { updateUserDetails } from '../../utils/userFunctions';
import { REFRESH_DETAILS } from '../../utils/types';

const { Paragraph } = Typography;
const { Option } = Select;

function UserDetails({
    drawerState,
    onClose
}) {
    const [state, appDispatch] = useAppContext();

    const [formState, setFormState] = useState({
        alerts: '',
    });

    const updateOccupation = (value) => {
        let name = 'occupation';
        onUpdate(name, value)
    }

    const updateAddress = (value) => {
        let name = 'address';
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
                    {
                        formState.alerts ?
                            message[formState.alerts.type](formState.alerts.message)
                            :
                            <div></div>
                    }
                    < Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
              </Button >
                    <Button onClick={onClose} type="primary">
                        Submit
              </Button>
                </div >
            }
        >
            <List
                itemLayout="horizontal">
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
                    /><Paragraph editable={{ onChange: updateAddress }}>{state.user.address}</Paragraph>
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
                    /><Paragraph editable={{ onChange: updatePassword }}>{state.user.password}</Paragraph>
                </List.Item>
            </List>

        </Drawer >
    )
}

export default UserDetails;