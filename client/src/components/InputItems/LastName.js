import { Form, Input } from 'antd';


function LastName({
    value,
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
                value={value}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default LastName;