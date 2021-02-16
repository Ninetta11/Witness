import { Form, Input } from 'antd';


function Email({
    registerState,
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
                    message: 'Please input your email!',
                },
            ]}
        ><Input
                name="email"
                placeholder="Enter Email Address"
                value={registerState.email}
                onChange={onChange} />
        </Form.Item>
    )
}

export default Email;