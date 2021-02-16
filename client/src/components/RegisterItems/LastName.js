import { Form, Input } from 'antd';


function LastName({
    registerState,
    onChange,
}) {
    return (
        <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: 'Please input your last name!',
                },
            ]}
        ><Input
                name="last_name"
                placeholder="Enter Last Name"
                value={registerState.last_name}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default LastName;