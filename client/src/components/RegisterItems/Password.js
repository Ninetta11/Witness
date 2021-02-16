import { Form, Input } from 'antd';


function Password({
    registerState,
    onChange
}) {
    return (
        <div>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        min: 8,
                        required: true,
                        message: 'Please input a valid password',
                    },
                ]}
            ><Input.Password
                    name="password"
                    placeholder="Must contain min 8 mixed characters"
                    value={registerState.password}
                    onChange={onChange} />
            </Form.Item>

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

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            ><Input.Password
                    placeholder="Confirm Password" />
            </Form.Item>
        </div>
    )
}

export default Password;