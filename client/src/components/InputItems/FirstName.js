import { Form, Input } from 'antd';


function FirstName({
    value,
    onChange,
}) {
    return (
        <Form.Item
            name="first_name"
            label="First Name"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: 'Please input your first name!',
                },
            ]}
        ><Input
                name="first_name"
                placeholder="Enter First Name"
                value={value}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default FirstName;