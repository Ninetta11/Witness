import { Form, Input } from 'antd';




function PasswordConfirm() {
    return (
        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject('The passwords you entered do not match!');
                    },
                }),
            ]}
        ><Input.Password
                placeholder="Confirm Password" />
        </Form.Item>
    )
}

export default PasswordConfirm;