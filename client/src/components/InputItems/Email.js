import { Form, Input } from 'antd';


function Email({
    value,
    onChange
}) {
    return (
        <Form.Item
            name="email"
            label="Email"
            rules={[
                {
                    type: 'email',
                    required: true,
                    message: 'Please enter an email!',
                },
            ]}
        ><Input
                name="email"
                placeholder="address@email.com.au"
                value={value}
                onChange={onChange} />
        </Form.Item>
    )
}

export default Email;