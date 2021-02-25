import { Form, Input } from 'antd';


function Password({
    value,
    onChange,
    rules
}) {
    return (
        <Form.Item
            name="password"
            label="Password"
            rules={rules}
        ><Input.Password
                name="password"
                placeholder="Enter a Password"
                value={value}
                onChange={onChange} />
        </Form.Item>
    )
}

export default Password;